// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Types
import { CoinType, SwapParams, ZeroExErrorResponse, ZeroExQuoteResponse } from '../constants/types'

// Hooks
import { useSwapContext } from '../context/swap.context'
import { useWalletState } from '../state/wallet'
import { NATIVE_ASSET_CONTRACT_ADDRESS_0X } from '../constants/magics'

type Quote = {
  quote?: ZeroExQuoteResponse
  error?: ZeroExErrorResponse
}

export function useZeroEx (params: SwapParams) {
  const [quote, setQuote] = React.useState<ZeroExQuoteResponse | undefined>(undefined)
  const [error, setError] = React.useState<ZeroExErrorResponse | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(false)

  // Context
  const { swapService } = useSwapContext()

  // Wallet State
  const {
    state: { selectedNetwork }
  } = useWalletState()

  const refresh = React.useCallback(
    async function (overrides: Partial<SwapParams>): Promise<Quote> {
      const overriddenParams: SwapParams = {
        ...params,
        ...overrides
      }

      // Perform data validation and early-exit
      if (selectedNetwork?.coin !== CoinType.Ethereum) {
        return {}
      }
      if (!overriddenParams.fromToken || !overriddenParams.toToken) {
        return {}
      }
      if (!overriddenParams.fromAmount && !overriddenParams.toAmount) {
        return {}
      }
      if (!overriddenParams.takerAddress) {
        return {}
      }

      setLoading(true)
      try {
        const { success, response, errorResponse } = await swapService.getZeroExPriceQuote({
          takerAddress: overriddenParams.takerAddress,
          sellAmount: overriddenParams.fromAmount,
          buyAmount: overriddenParams.toAmount,
          buyToken: overriddenParams.toToken.contractAddress || NATIVE_ASSET_CONTRACT_ADDRESS_0X,
          sellToken: overriddenParams.fromToken.contractAddress || NATIVE_ASSET_CONTRACT_ADDRESS_0X,
          slippagePercentage: overriddenParams.slippagePercentage,
          gasPrice: ''
        })
        if (success && response) {
          setQuote(response)
          return { quote: response, error: undefined }
        } else if (errorResponse) {
          try {
            const err = JSON.parse(errorResponse) as ZeroExErrorResponse
            setError(err)
            return { quote: undefined, error: err }
          } catch (e) {
            console.error(`Error parsing 0x response: ${e}`)
          } finally {
            console.error(`Error calling getZeroExPriceQuote(): ${errorResponse}`)
          }
        }
      } catch (e) {
        console.error(`Error getting 0x quote: ${e}`)
      } finally {
        setLoading(false)
      }

      return {}
    },
    [selectedNetwork, params]
  )

  const exchange = React.useCallback(
    async function (overrides: Partial<SwapParams>) {
      const overriddenParams: SwapParams = {
        ...params,
        ...overrides
      }

      // Perform data validation and early-exit
      if (selectedNetwork?.coin !== CoinType.Ethereum) {
        return {}
      }
      if (!overriddenParams.fromToken || !overriddenParams.toToken) {
        return {}
      }
      if (!overriddenParams.fromAmount && !overriddenParams.toAmount) {
        return {}
      }
      if (!overriddenParams.takerAddress) {
        return {}
      }

      const { success, response, errorResponse } = await swapService.getZeroExTransactionPayload({
        takerAddress: overriddenParams.takerAddress,
        sellAmount: overriddenParams.fromAmount,
        buyAmount: overriddenParams.toAmount,
        buyToken: overriddenParams.toToken.contractAddress,
        sellToken: overriddenParams.fromToken.contractAddress,
        slippagePercentage: overriddenParams.slippagePercentage,
        gasPrice: ''
      })

      if (success && response) {
        const { data } = response

        // Sign and submit transaction with data
      } else if (errorResponse) {
        try {
          const err = JSON.parse(errorResponse) as ZeroExErrorResponse
          setError(err)
        } catch (e) {
          console.error(`Error parsing 0x response: ${e}`)
        } finally {
          console.error(`Error calling getZeroExTransactionPayload(): ${errorResponse}`)
        }
      }
    },
    [selectedNetwork, params]
  )

  return {
    quote,
    error,
    loading,
    exchange,
    refresh
  }
}
