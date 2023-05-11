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

const networkFee = new Amount('0.000005')

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

  const reset = React.useCallback(async (callback?: () => Promise<void>) => {
    setQuote(undefined)
    setError(undefined)
    setLoading(false)
    setSelectedRoute(undefined)
    setBraveFee(undefined)
    if (callback) {
      await callback()
    }
  }, [])

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
      if (!overriddenParams.fromAmount && !overriddenParams.toAmount) {
        await reset()
        return
      }

      const fromAmountWrapped = new Amount(overriddenParams.fromAmount)
      const toAmountWrapped = new Amount(overriddenParams.toAmount)
      const isFromAmountEmpty =
        fromAmountWrapped.isZero() || fromAmountWrapped.isNaN() || fromAmountWrapped.isUndefined()
      const isToAmountEmpty =
        toAmountWrapped.isZero() || toAmountWrapped.isNaN() || toAmountWrapped.isUndefined()

      if (isFromAmountEmpty && isToAmountEmpty) {
        await reset()
        return
      }

      if (!overriddenParams.fromAddress) {
        return
      }

      setLoading(true)

      try {
        const fee = await swapService.getBraveFeeForAsset(overriddenParams.toToken)
        setBraveFee(fee)
      } catch (e) {
        console.log(`Error getting Brave fee (Jupiter): ${overriddenParams.toToken.symbol}`)
      }

      let jupiterQuoteResponse
      try {
        jupiterQuoteResponse = await swapService.getJupiterQuote({
          inputMint: overriddenParams.fromToken.contractAddress || WRAPPED_SOL_CONTRACT_ADDRESS,
          outputMint: overriddenParams.toToken.contractAddress || WRAPPED_SOL_CONTRACT_ADDRESS,
          amount: !isFromAmountEmpty
            ? new Amount(overriddenParams.fromAmount)
              .multiplyByDecimals(overriddenParams.fromToken.decimals)
              .format()
            : new Amount(overriddenParams.toAmount)
              .multiplyByDecimals(overriddenParams.toToken.decimals)
              .format(),
          slippageBps: new Amount(overriddenParams.slippagePercentage).times(100).toNumber(),
          userPublicKey: overriddenParams.fromAddress
        })
      } catch (e) {
        console.log(`Error getting Jupiter quote: ${e}`)
      }

      if (jupiterQuoteResponse?.response) {
        setQuote(jupiterQuoteResponse.response)
      }

      if (jupiterQuoteResponse?.errorResponse) {
        setError(jupiterQuoteResponse.errorResponse)
      }

      setLoading(false)
      return jupiterQuoteResponse?.response
    },
    [network.coin, params, reset, swapService]
  )

  const exchange = React.useCallback(
    async function (callback?: () => Promise<void>) {
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
      if (!account) {
        return
      }

      setLoading(true)
      let jupiterTransactionsPayloadResponse
      try {
        jupiterTransactionsPayloadResponse = await swapService.getJupiterTransactionsPayload({
          userPublicKey: account.address,
          route: selectedRoute || quote.routes[0],
          outputMint: params.toToken.contractAddress || WRAPPED_SOL_CONTRACT_ADDRESS
        })
      } catch (e) {
        console.log(`Error getting Jupiter swap transactions: ${e}`)
      }

      if (jupiterTransactionsPayloadResponse?.errorResponse) {
        setError(jupiterTransactionsPayloadResponse.errorResponse)
      }

      if (!jupiterTransactionsPayloadResponse?.response) {
        setLoading(false)
        return
      }

      const { swapTransaction } = jupiterTransactionsPayloadResponse.response

      try {
        await solWalletAdapter.sendTransaction({
          encodedTransaction: swapTransaction,
          from: account.address,
          sendOptions: {
            skipPreflight: true,
            maxRetries: 2
          }
        })

        await reset(callback)
      } catch (e) {
        // Bubble up error
        console.error(`Error creating Solana transaction: ${e}`)
        setLoading(false)
      }
    },
    [
      quote,
      network.coin,
      params.toToken,
      account,
      swapService,
      selectedRoute,
      solWalletAdapter,
      reset
    ]
  )

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
            // @ts-expect-error
            params.fromToken.decimals
          ),
          toAmount: new Amount(route.outAmount.toString()).divideByDecimals(
            // @ts-expect-error
            params.toToken.decimals
          ),
          // FIXME: disable displaying the minimumToAmount, since it is
          // applicable only for ExactIn swapMode. In case of ExactOut,
          // minimumToAmount is static and equal to the toAmount. The more
          // relevant thing to display would be maximumFromAmount.
          minimumToAmount: undefined,
          fromToken: params.fromToken,
          toToken: params.toToken,
          rate: new Amount(route.outAmount.toString())
            // @ts-expect-error
            .divideByDecimals(params.toToken.decimals)
            // @ts-expect-error
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
    reset,
    selectedRoute,
    setSelectedRoute,
    quoteOptions,
    networkFee
  }
}
