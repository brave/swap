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
  SwapParams
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

  // Context
  const { swapService, solWalletAdapter, account, network } = useSwapContext()

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

      setLoading(true)
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

  return {
    quote,
    error,
    loading,
    exchange,
    refresh,
    selectedRoute,
    setSelectedRoute
  }
}
