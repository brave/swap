// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Types
import {
  CoinType,
  JupiterErrorResponse,
  JupiterQuoteResponse,
  JupiterRoute,
  QuoteOption,
  SwapParams,
  SwapFee
} from '~/constants/types'

// Hooks
import { useSwapContext } from '~/context/swap.context'
import { useWalletState } from '~/state/wallet'

// Constants
import { WRAPPED_SOL_CONTRACT_ADDRESS } from '~/constants/magics'

// Utils
import Amount from '~/utils/amount'

export function useJupiter (params: SwapParams) {
  const [quote, setQuote] = React.useState<JupiterQuoteResponse | undefined>(undefined)
  const [error, setError] = React.useState<JupiterErrorResponse | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [selectedRoute, setSelectedRoute] = React.useState<JupiterRoute | undefined>(undefined)
  const [braveFee, setBraveFee] = React.useState<SwapFee | undefined>(undefined)

  // Context
  const { swapService, solWalletAdapter, account, network, defaultBaseCurrency } = useSwapContext()

  // State
  const {
    state: { spotPrices }
  } = useWalletState()

  const refresh = React.useCallback(
    async function (
      overrides: Partial<SwapParams> = {}
    ): Promise<JupiterQuoteResponse | undefined> {
      const overriddenParams: SwapParams = {
        ...params,
        ...overrides
      }

      // Perform data validation and early-exit
      if (network.coin !== CoinType.Solana) {
        return
      }
      if (!overriddenParams.fromToken || !overriddenParams.toToken) {
        return
      }
      if (!overriddenParams.fromAmount) {
        setQuote(undefined)
        setError(undefined)
        return
      }

      const fromAmountWrapped = new Amount(overriddenParams.fromAmount)
      if (
        fromAmountWrapped.isNaN() ||
        fromAmountWrapped.isZero() ||
        fromAmountWrapped.isUndefined()
      ) {
        setQuote(undefined)
        setError(undefined)
        return
      }

      setLoading(true)

      try {
        const fee = await swapService.getBraveFeeForAsset(overriddenParams.toToken)
        setBraveFee(fee)
      } catch (e) {
        console.log(`Error getting Brave fee (Jupiter): ${overriddenParams.toToken.symbol}`)
      }

      let response
      try {
        response = await swapService.getJupiterQuote({
          inputMint: overriddenParams.fromToken.contractAddress || WRAPPED_SOL_CONTRACT_ADDRESS,
          outputMint: overriddenParams.toToken.contractAddress || WRAPPED_SOL_CONTRACT_ADDRESS,
          amount: new Amount(overriddenParams.fromAmount)
            .multiplyByDecimals(overriddenParams.fromToken.decimals)
            .format(),
          slippagePercentage: overriddenParams.slippagePercentage
        })
        setQuote(response)
      } catch (e) {
        console.log(`Error getting Jupiter quote: ${e}`)
        try {
          const err = JSON.parse((e as Error).message) as JupiterErrorResponse
          setError(err)
        } catch (e) {
          console.error(`Error parsing Jupiter response: ${e}`)
        }
      }

      setLoading(false)
      return response
    },
    [network, params]
  )

  const exchange = React.useCallback(
    async function () {
      // Perform data validation and early-exit
      if (!quote || quote?.routes.length === 0) {
        return
      }
      if (network.coin !== CoinType.Solana) {
        return
      }
      if (!params.toToken) {
        return
      }

      setLoading(true)
      let response
      try {
        response = await swapService.getJupiterTransactionsPayload({
          userPublicKey: account.address,
          route: selectedRoute || quote.routes[0],
          outputMint: params.toToken.contractAddress || WRAPPED_SOL_CONTRACT_ADDRESS
        })
      } catch (e) {
        console.log(`Error getting Jupiter swap transactions: ${e}`)
        try {
          const err = JSON.parse((e as Error).message) as JupiterErrorResponse
          setError(err)
        } catch (e) {
          console.error(`Error parsing Jupiter response: ${e}`)
        }
      }

      if (!response) {
        setLoading(false)
        return
      }

      // Ignore setupTransaction and cleanupTransaction
      const { setupTransaction, swapTransaction, cleanupTransaction } = response

      try {
        await solWalletAdapter.sendTransaction({
          encodedTransaction: swapTransaction,
          from: account.address,
          sendOptions: {
            skipPreflight: true
          }
        })
      } catch (e) {
        // Bubble up error
        console.error(`Error creating Solana transaction: ${e}`)
      }

      setLoading(false)
    },
    [quote, selectedRoute, account, network, params]
  )

  const networkFee = new Amount('0.000005')

  const quoteOptions: QuoteOption[] = React.useMemo(() => {
    if (!params.fromToken || !params.toToken) {
      return []
    }

    if (quote === undefined) {
      return []
    }

    return quote.routes.map(
      route =>
        ({
          label: route.marketInfos.map(marketInfo => marketInfo.label).join(' x '),
          fromAmount: new Amount(route.inAmount.toString()).divideByDecimals(
            // @ts-ignore
            params.fromToken.decimals
          ),
          toAmount: new Amount(route.outAmount.toString()).divideByDecimals(
            // @ts-ignore
            params.toToken.decimals
          ),
          minimumToAmount: new Amount(route.otherAmountThreshold.toString()).divideByDecimals(
            // @ts-ignore
            params.toToken.decimals
          ),
          fromToken: params.fromToken,
          toToken: params.toToken,
          rate: new Amount(route.otherAmountThreshold.toString())
            // @ts-ignore
            .divideByDecimals(params.toToken.decimals)
            // @ts-ignore
            .div(new Amount(route.inAmount.toString()).divideByDecimals(params.fromToken.decimals)),
          impact: new Amount(route.priceImpactPct),
          sources: route.marketInfos.flatMap(marketInfo =>
            // Split "Cykura (95%) + Lifinity (5%)" into "Cykura (95%)" and "Lifinity (5%)"
            marketInfo.label.split('+').map(label => {
              // Extract name and proportion from Cykura (95%)
              const match = label.match(/(.*)\s+\((\d+)%\)/)
              if (match && match.length === 3) {
                return {
                  name: match[1].trim(),
                  proportion: new Amount(match[2]).div(100)
                }
              }

              return {
                name: label.trim(),
                proportion: new Amount(1)
              }
            })
          ),
          routing: route.marketInfos.length > 1 ? 'flow' : 'split',
          networkFee: networkFee.times(spotPrices.nativeAsset).formatAsFiat(defaultBaseCurrency),
          braveFee
        } as QuoteOption)
    )
  }, [
    quote,
    params.fromToken,
    params.toToken,
    networkFee,
    defaultBaseCurrency,
    spotPrices.nativeAsset,
    braveFee
  ])

  return {
    quote,
    error,
    loading,
    exchange,
    refresh,
    selectedRoute,
    setSelectedRoute,
    quoteOptions,
    networkFee
  }
}
