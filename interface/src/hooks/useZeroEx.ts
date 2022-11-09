// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Types / constants
import {
  CoinType,
  QuoteOption,
  SwapParams,
  ZeroExErrorResponse,
  ZeroExQuoteResponse
} from '~/constants/types'
import { MAX_UINT256, NATIVE_ASSET_CONTRACT_ADDRESS_0X } from '~/constants/magics'

// Hooks
import { useSwapContext } from '~/context/swap.context'
import { useWalletState } from '~/state/wallet'

// Utils
import Amount from '~/utils/amount'
import { hexStrToNumberArray } from '~/utils/hex-utils'

export function useZeroEx (params: SwapParams) {
  const [quote, setQuote] = React.useState<ZeroExQuoteResponse | undefined>(undefined)
  const [error, setError] = React.useState<ZeroExErrorResponse | undefined>(undefined)
  const [hasAllowance, setHasAllowance] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  // Context
  const { swapService, ethWalletAdapter, account, network, defaultBaseCurrency } = useSwapContext()

  // State
  const {
    state: { spotPrices }
  } = useWalletState()

  const refresh = React.useCallback(
    async function (overrides: Partial<SwapParams> = {}): Promise<ZeroExQuoteResponse | undefined> {
      const overriddenParams: SwapParams = {
        ...params,
        ...overrides
      }

      // Perform data validation and early-exit
      if (network.coin !== CoinType.Ethereum) {
        return
      }
      if (!overriddenParams.fromToken || !overriddenParams.toToken) {
        return
      }
      if (!overriddenParams.fromAmount && !overriddenParams.toAmount) {
        setQuote(undefined)
        setError(undefined)
        return
      }
      const fromAmountWrapped = new Amount(overriddenParams.fromAmount)
      const toAmountWrapped = new Amount(overriddenParams.toAmount)
      if (
        (fromAmountWrapped.isZero() ||
          fromAmountWrapped.isNaN() ||
          fromAmountWrapped.isUndefined()) &&
        (toAmountWrapped.isZero() || toAmountWrapped.isNaN() || toAmountWrapped.isUndefined())
      ) {
        setQuote(undefined)
        setError(undefined)
        return
      }
      if (!overriddenParams.takerAddress) {
        return
      }

      setLoading(true)
      let response
      try {
        response = await swapService.getZeroExPriceQuote({
          takerAddress: overriddenParams.takerAddress,
          sellAmount:
            overriddenParams.fromAmount &&
            new Amount(overriddenParams.fromAmount)
              .multiplyByDecimals(overriddenParams.fromToken.decimals)
              .format(),
          sellToken: overriddenParams.fromToken.contractAddress || NATIVE_ASSET_CONTRACT_ADDRESS_0X,
          buyAmount:
            overriddenParams.toAmount &&
            new Amount(overriddenParams.toAmount)
              .multiplyByDecimals(overriddenParams.toToken.decimals)
              .format(),
          buyToken: overriddenParams.toToken.contractAddress || NATIVE_ASSET_CONTRACT_ADDRESS_0X,
          slippagePercentage: overriddenParams.slippagePercentage,
          gasPrice: ''
        })
        setQuote(response)
      } catch (e) {
        console.log(`Error getting 0x quote: ${e}`)
        try {
          const err = JSON.parse((e as Error).message) as ZeroExErrorResponse
          setError(err)
        } catch (e) {
          console.error(`Error parsing 0x response: ${e}`)
        }
      }

      let hasAllowanceResult = false

      // Native asset does not have allowance requirements, so we always
      // default to true.
      if (!overriddenParams.fromToken.isToken) {
        hasAllowanceResult = true
      }

      if (response && overriddenParams.fromToken.isToken) {
        try {
          const allowance = await ethWalletAdapter.getERC20Allowance(
            response.sellTokenAddress,
            account.address,
            response.allowanceTarget
          )
          hasAllowanceResult = new Amount(allowance).gte(response.sellAmount)
        } catch (e) {
          // bubble up error
          console.log(`Error getting ERC20 allowance: ${e}`)
        }
      }

      setHasAllowance(hasAllowanceResult)
      setLoading(false)
      return response
    },
    [network, account, params]
  )

  const exchange = React.useCallback(
    async function (overrides: Partial<SwapParams> = {}): Promise<void> {
      const overriddenParams: SwapParams = {
        ...params,
        ...overrides
      }

      // Perform data validation and early-exit
      if (network.coin !== CoinType.Ethereum) {
        return
      }
      if (!overriddenParams.fromToken || !overriddenParams.toToken) {
        return
      }
      if (!overriddenParams.fromAmount && !overriddenParams.toAmount) {
        return
      }
      if (!overriddenParams.takerAddress) {
        return
      }

      const fromAmountWrapped = new Amount(overriddenParams.fromAmount)
      const toAmountWrapped = new Amount(overriddenParams.toAmount)
      if (
        (fromAmountWrapped.isZero() || fromAmountWrapped.isNaN()) &&
        (toAmountWrapped.isZero() || toAmountWrapped.isNaN())
      ) {
        return
      }

      setLoading(true)
      let response
      try {
        response = await swapService.getZeroExTransactionPayload({
          takerAddress: overriddenParams.takerAddress,
          sellAmount: new Amount(overriddenParams.fromAmount)
            .multiplyByDecimals(overriddenParams.fromToken.decimals)
            .format(),
          sellToken: overriddenParams.fromToken.contractAddress || NATIVE_ASSET_CONTRACT_ADDRESS_0X,
          buyAmount: new Amount(overriddenParams.toAmount)
            .multiplyByDecimals(overriddenParams.toToken.decimals)
            .format(),
          buyToken: overriddenParams.toToken.contractAddress || NATIVE_ASSET_CONTRACT_ADDRESS_0X,
          slippagePercentage: overriddenParams.slippagePercentage,
          gasPrice: ''
        })
      } catch (e) {
        console.log(`Error getting 0x swap quote: ${e}`)
        try {
          const err = JSON.parse((e as Error).message) as ZeroExErrorResponse
          setError(err)
        } catch (e) {
          console.error(`Error parsing 0x response: ${e}`)
        }
      }

      if (!response) {
        setLoading(false)
        return
      }

      const { data, to, value, estimatedGas } = response

      try {
        await ethWalletAdapter.sendTransaction({
          from: account.address,
          to,
          value: new Amount(value).toHex(),
          gas: new Amount(estimatedGas).toHex(),
          data: hexStrToNumberArray(data)
        })

        setQuote(undefined)
      } catch (e) {
        // bubble up error
        console.error(`Error creating 0x transaction: ${e}`)
      }
    },
    [network, account, params]
  )

  const approve = React.useCallback(async () => {
    if (!quote || hasAllowance) {
      return
    }

    const { allowanceTarget, sellTokenAddress } = quote
    try {
      const data = await ethWalletAdapter.getERC20ApproveData({
        contractAddress: sellTokenAddress,
        spenderAddress: allowanceTarget,
        allowance: new Amount(MAX_UINT256).toHex()
      })
      await ethWalletAdapter.sendTransaction({
        from: account.address,
        to: sellTokenAddress,
        value: '0x0',
        data
      })
    } catch (e) {
      // bubble up error
      console.error(`Error creating ERC20 approve transaction: ${e}`)
    }
  }, [account, quote, hasAllowance])

  const networkFee = React.useMemo(() => {
    if (!quote) {
      return Amount.empty()
    }

    return new Amount(quote.gasPrice).times(quote.gas).divideByDecimals(network.decimals)
  }, [quote, network.decimals])

  const quoteOptions: QuoteOption[] = React.useMemo(() => {
    if (!params.fromToken || !params.toToken) {
      return []
    }

    if (quote === undefined) {
      return []
    }

    return [
      {
        label: '',
        fromAmount: new Amount(quote.sellAmount).divideByDecimals(params.fromToken.decimals),
        toAmount: new Amount(quote.buyAmount).divideByDecimals(params.toToken.decimals),
        minimumToAmount: undefined,
        fromToken: params.fromToken,
        toToken: params.toToken,
        rate: new Amount(quote.buyAmount)
          .divideByDecimals(params.toToken.decimals)
          .div(new Amount(quote.sellAmount).divideByDecimals(params.fromToken.decimals)),
        impact: new Amount(quote.estimatedPriceImpact),
        sources: quote.sources
          .map(source => ({
            name: source.name,
            proportion: new Amount(source.proportion)
          }))
          .filter(source => source.proportion.gt(0)),
        routing: 'split', // 0x supports split routing only
        networkFee: networkFee.isUndefined()
          ? ''
          : networkFee.times(spotPrices.nativeAsset).formatAsFiat(defaultBaseCurrency)
      }
    ]
  }, [
    params.fromToken,
    params.toToken,
    quote,
    defaultBaseCurrency,
    networkFee,
    spotPrices.nativeAsset
  ])

  return {
    quote,
    error,
    hasAllowance,
    loading,
    exchange,
    refresh,
    approve,
    quoteOptions,
    networkFee
  }
}
