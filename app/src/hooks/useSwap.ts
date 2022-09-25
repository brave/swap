// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Options
import { SwapAndSendOptions } from '~/options/select-and-send-options'
import { gasFeeOptions } from '~/options/gas-fee-options'

// Hooks
import { useWalletState } from '~/state/wallet'
import { useJupiter } from './useJupiter'
import { useZeroEx } from './useZeroEx'

// Types and constants
import {
  BlockchainToken,
  QuoteOption,
  WalletAccount,
  GasFeeOption,
  GasEstimate,
  CoinType,
  SwapParams
} from '~/constants/types'

// Utils
import Amount from '~/utils/amount'

export const useSwap = () => {
  // Wallet State
  const {
    state: { tokenBalances, tokenList, selectedNetwork, selectedAccount, defaultBaseCurrency }
  } = useWalletState()

  // ToDo: Setup useSwap hook where all this kind of state will be handled.
  const price = 1519.28

  // State
  const [fromToken, setFromToken] = React.useState<BlockchainToken | undefined>(undefined)
  const [toToken, setToToken] = React.useState<BlockchainToken | undefined>(undefined)
  const [fromAmount, setFromAmount] = React.useState<string>('')
  const [toAmount, setToAmount] = React.useState<string>('')
  const [selectingFromOrTo, setSelectingFromOrTo] = React.useState<'from' | 'to' | undefined>(
    undefined
  )
  const [selectedQuoteOptionIndex, setSelectedQuoteOptionIndex] = React.useState<number>(0)
  const [selectedSwapAndSendOption, setSelectedSwapAndSendOption] = React.useState<string>(
    SwapAndSendOptions[0].name
  )
  const [swapAndSendSelected, setSwapAndSendSelected] = React.useState<boolean>(false)
  const [toAnotherAddress, setToAnotherAddress] = React.useState<string>('')
  const [userConfirmedAddress, setUserConfirmedAddress] = React.useState<boolean>(false)
  const [selectedSwapSendAccount, setSelectedSwapSendAccount] = React.useState<
    WalletAccount | undefined
  >(undefined)
  const [useDirectRoute, setUseDirectRoute] = React.useState<boolean>(false)
  const [useOptimizedFees, setUseOptimizedFees] = React.useState<boolean>(false)
  const [slippageTolerance, setSlippageTolerance] = React.useState<string>('0.5')
  const [selectedGasFeeOption, setSelectedGasFeeOption] = React.useState<GasFeeOption>(
    gasFeeOptions[1]
  )

  // Update on render
  if (fromToken === undefined && toToken === undefined && tokenList[0] !== undefined) {
    setFromToken(tokenList[0])
  }

  const jupiter = useJupiter({
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    slippagePercentage: new Amount(slippageTolerance).toNumber()
  })
  const zeroEx = useZeroEx({
    takerAddress: selectedSwapSendAccount?.address || selectedAccount || '',
    fromAmount,
    toAmount: '',
    fromToken,
    toToken,
    slippagePercentage: new Amount(slippageTolerance).div(100).toNumber()
  })

  React.useEffect(() => {
    const interval = setInterval(async () => {
      if (selectedNetwork?.coin === CoinType.Solana) {
        await jupiter.refresh()
      } else {
        await zeroEx.refresh()
      }
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [selectedNetwork, zeroEx.refresh, jupiter.refresh])

  const quoteOptions: QuoteOption[] = React.useMemo(() => {
    if (!fromToken || !toToken) {
      return []
    }

    if (selectedNetwork?.coin === CoinType.Solana) {
      if (jupiter.quote === undefined) {
        return []
      }

      return jupiter.quote.routes.map(
        route =>
          ({
            label: route.marketInfos.map(marketInfo => marketInfo.label).join(' x '),
            fromAmount: new Amount(route.inAmount.toString()).divideByDecimals(fromToken.decimals),
            toAmount: new Amount(route.outAmount.toString()).divideByDecimals(toToken.decimals),
            minimumToAmount: new Amount(route.otherAmountThreshold.toString()).divideByDecimals(
              toToken.decimals
            ),
            fromToken,
            toToken,
            rate: new Amount(route.otherAmountThreshold.toString())
              .divideByDecimals(toToken.decimals)
              .div(new Amount(route.inAmount.toString()).divideByDecimals(fromToken.decimals)),
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
            routing: route.marketInfos.length > 1 ? 'flow' : 'split'
          } as QuoteOption)
      )
    }

    if (zeroEx.quote === undefined) {
      return []
    }

    return [
      {
        label: '',
        fromAmount: new Amount(zeroEx.quote.sellAmount).divideByDecimals(fromToken.decimals),
        toAmount: new Amount(zeroEx.quote.buyAmount).divideByDecimals(toToken.decimals),
        minimumToAmount: new Amount(zeroEx.quote.buyAmount).divideByDecimals(toToken.decimals),
        fromToken,
        toToken,
        rate: new Amount(zeroEx.quote.buyAmount)
          .divideByDecimals(toToken.decimals)
          .div(new Amount(zeroEx.quote.sellAmount).divideByDecimals(fromToken.decimals)),
        impact: new Amount(zeroEx.quote.estimatedPriceImpact),
        sources: zeroEx.quote.sources
          .map(source => ({
            name: source.name,
            proportion: new Amount(source.proportion)
          }))
          .filter(source => source.proportion.gt(0)),
        routing: 'split' // 0x supports split routing only
      }
    ]
  }, [fromToken, toToken, selectedNetwork, jupiter.quote, zeroEx.quote])

  const onSelectQuoteOption = React.useCallback(
    (index: number) => {
      const option = quoteOptions[index]
      if (selectedNetwork?.coin === CoinType.Solana) {
        if (jupiter.quote && jupiter.quote.routes.length > index && toToken) {
          const route = jupiter.quote.routes[index]
          jupiter.setSelectedRoute(route)
          setToAmount(option.toAmount.format(6))
        }
      } else if (selectedNetwork?.coin === CoinType.Ethereum) {
        if (zeroEx.quote && toToken) {
          setToAmount(option.toAmount.format(6))
        }
      }

      setSelectedQuoteOptionIndex(index)
    },
    [quoteOptions, jupiter.quote, zeroEx.quote, selectedNetwork]
  )

  // Methods
  const handleJupiterQuoteRefresh = React.useCallback(
    async (overrides: Partial<SwapParams>) => {
      const { quote, error } = await jupiter.refresh(overrides)
      if (!quote || error || !toToken) {
        return
      }

      setToAmount(
        new Amount(quote.routes[0].outAmount.toString())
          .divideByDecimals(toToken.decimals)
          .format(6)
      )
    },
    [jupiter.refresh, toToken]
  )

  const handleZeroExQuoteRefresh = React.useCallback(
    async (overrides: Partial<SwapParams>) => {
      const { quote, error } = await zeroEx.refresh(overrides)
      if (!quote || error) {
        return
      }

      if (overrides.fromAmount === '') {
        const token = overrides.fromToken || fromToken
        if (token) {
          setFromAmount(new Amount(quote.sellAmount).divideByDecimals(token.decimals).format(6))
        }
      }

      if (overrides.toAmount === '') {
        const token = overrides.toToken || toToken
        if (token) {
          setToAmount(new Amount(quote.buyAmount).divideByDecimals(token.decimals).format(6))
        }
      }
    },
    [zeroEx.refresh, toToken, fromToken]
  )

  const handleOnSetFromAmount = React.useCallback(
    async (value: string) => {
      setFromAmount(value)
      if (!value) {
        setToAmount('')
      }

      if (selectedNetwork?.coin === CoinType.Solana) {
        await handleJupiterQuoteRefresh({
          fromAmount: value
        })
      } else {
        await handleZeroExQuoteRefresh({
          fromAmount: value,
          toAmount: ''
        })
      }
    },
    [selectedNetwork, handleJupiterQuoteRefresh, handleZeroExQuoteRefresh]
  )

  const handleOnSetToAmount = React.useCallback(
    async (value: string) => {
      // Setting to amount is not supported on Jupiter
      if (selectedNetwork?.coin !== CoinType.Ethereum) {
        return
      }

      setToAmount(value)
      await handleZeroExQuoteRefresh({
        fromAmount: '',
        toAmount: value
      })
    },
    [selectedNetwork, handleZeroExQuoteRefresh]
  )

  const getTokenBalance = React.useCallback(
    (token: BlockchainToken): string => {
      return tokenBalances
        ? new Amount(tokenBalances[token.contractAddress] ?? '0')
          .divideByDecimals(token.decimals)
          .format(6)
        : '0'
    },
    [tokenBalances]
  )

  const onClickFlipSwapTokens = React.useCallback(() => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount('')
    setToAmount('')
  }, [fromToken, toToken])

  const onSelectToToken = React.useCallback(
    async (token: BlockchainToken) => {
      setToToken(token)
      setSelectingFromOrTo(undefined)

      if (selectedNetwork?.coin === CoinType.Solana) {
        await handleJupiterQuoteRefresh({
          toToken: token
        })
      } else if (selectedNetwork?.coin === CoinType.Ethereum) {
        await handleZeroExQuoteRefresh({
          toToken: token,
          toAmount: ''
        })
      }
    },
    [selectedNetwork, handleJupiterQuoteRefresh, handleZeroExQuoteRefresh]
  )

  const onSelectFromToken = React.useCallback(
    async (token: BlockchainToken) => {
      setFromToken(token)
      setSelectingFromOrTo(undefined)

      if (selectedNetwork?.coin === CoinType.Solana) {
        await handleJupiterQuoteRefresh({
          fromToken: token
        })
      } else if (selectedNetwork?.coin === CoinType.Ethereum) {
        await handleZeroExQuoteRefresh({
          fromToken: token,
          fromAmount: ''
        })
      }
    },
    [selectedNetwork, handleZeroExQuoteRefresh, handleJupiterQuoteRefresh]
  )

  const onSetSelectedSwapAndSendOption = React.useCallback((value: string) => {
    if (value === 'to-account') {
      setToAnotherAddress('')
    }
    setSelectedSwapAndSendOption(value)
  }, [])

  const handleOnSetToAnotherAddress = React.useCallback((value: string) => {
    setToAnotherAddress(value)
  }, [])

  const onCheckUserConfirmedAddress = React.useCallback(
    (id: string, checked: boolean) => {
      setUserConfirmedAddress(checked)
    },
    [userConfirmedAddress]
  )

  // Memos
  const fromTokenBalance: number = React.useMemo(() => {
    if (fromToken) {
      return Number(getTokenBalance(fromToken))
    }
    return 0
  }, [fromToken, tokenBalances, getTokenBalance])

  const fiatValue: string | undefined = React.useMemo(() => {
    if (fromAmount && price) {
      return new Amount(fromAmount).times(price).formatAsFiat(defaultBaseCurrency)
    }
  }, [price, fromAmount, defaultBaseCurrency])

  const insufficientBalance: boolean = React.useMemo(() => {
    if (fromAmount && fromTokenBalance !== undefined) {
      return Number(fromAmount) > fromTokenBalance
    }
    return false
  }, [fromTokenBalance, fromAmount])

  const gasEstimates: GasEstimate = React.useMemo(() => {
    // ToDo: Setup getGasEstimate Methods
    return {
      gasFee: '0.0034',
      gasFeeGwei: '36',
      gasFeeFiat: '17.59',
      time: '1 min'
    }
  }, [])

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    fromTokenBalance,
    insufficientBalance,
    fiatValue,
    isFetchingQuote: zeroEx.loading || jupiter.loading,
    quoteOptions,
    selectedQuoteOptionIndex,
    selectingFromOrTo,
    swapAndSendSelected,
    selectedSwapAndSendOption,
    selectedSwapSendAccount,
    toAnotherAddress,
    userConfirmedAddress,
    selectedGasFeeOption,
    slippageTolerance,
    useDirectRoute,
    useOptimizedFees,
    gasEstimates,
    onSelectFromToken,
    onSelectToToken,
    getTokenBalance,
    onSelectQuoteOption,
    setSelectingFromOrTo,
    handleOnSetFromAmount,
    handleOnSetToAmount,
    onClickFlipSwapTokens,
    setSwapAndSendSelected,
    handleOnSetToAnotherAddress,
    onCheckUserConfirmedAddress,
    onSetSelectedSwapAndSendOption,
    setSelectedSwapSendAccount,
    setSelectedGasFeeOption,
    setSlippageTolerance,
    setUseDirectRoute,
    setUseOptimizedFees
  }
}
export default useSwap
