// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Options
import { SwapAndSendOptions } from '../options/select-and-send-options'
import { gasFeeOptions } from '../options/gas-fee-options'

// Context
import { useSwapContext } from '../context/swap.context'

// Hooks
import { useWalletState } from '../state/wallet'

// Types
import {
  BlockchainToken,
  QuoteOption,
  WalletAccount,
  GasFeeOption,
  GasEstimate
} from '../constants/types'

export const useSwap = () => {
  // Context
  const { getSwapQuotes } = useSwapContext()

  // Wallet State
  const {
    state: { tokenBalances, tokenList }
  } = useWalletState()

  // ToDo: Setup useSwap hook where all this kind of state will be handled.
  const price = 1519.28
  const rate = 0.026

  // State
  const [fromToken, setFromToken] = React.useState<
    BlockchainToken | undefined
  >()
  const [toToken, setToToken] = React.useState<BlockchainToken | undefined>()
  const [fromAmount, setFromAmount] = React.useState<string>('')
  const [toAmount, setToAmount] = React.useState<string>('')
  const [isFetchingQuote, setIsFetchingQuote] = React.useState<
    boolean | undefined
  >(undefined)
  const [selectingFromOrTo, setSelectingFromOrTo] = React.useState<
    'from' | 'to' | undefined
  >(undefined)
  const [quoteOptions, setQuoteOptions] = React.useState<QuoteOption[]>([])
  const [selectedQuoteOption, setSelectedQuoteOption] = React.useState<
    QuoteOption | undefined
  >()
  const [selectedSwapAndSendOption, setSelectedSwapAndSendOption] =
    React.useState<string>(SwapAndSendOptions[0].name)
  const [swapAndSendSelected, setSwapAndSendSelected] =
    React.useState<boolean>(false)
  const [toAnotherAddress, setToAnotherAddress] = React.useState<string>('')
  const [userConfirmedAddress, setUserConfirmedAddress] =
    React.useState<boolean>(false)
  const [selectedSwapSendAccount, setSelectedSwapSendAccount] = React.useState<
    WalletAccount | undefined
  >(undefined)
  const [useDirectRoute, setUseDirectRoute] = React.useState<boolean>(false)
  const [useOptimizedFees, setUseOptimizedFees] = React.useState<boolean>(false)
  const [slippageTolerance, setSlippageTolerance] =
    React.useState<string>('0.5')
  const [selectedGasFeeOption, setSelectedGasFeeOption] =
    React.useState<GasFeeOption>(gasFeeOptions[1])

  // Update on render
  if (
    fromToken === undefined &&
    toToken === undefined &&
    tokenList[0] !== undefined
  ) {
    setFromToken(tokenList[0])
  }

  // Effects
  React.useEffect(() => {
    let ignore = false
    if (toToken && fromToken && fromAmount !== '') {
      setIsFetchingQuote(true)
      getSwapQuotes(
        fromToken.contractAddress,
        fromAmount,
        toToken.contractAddress
      )
        .then((result) => {
          if (!ignore) {
            setQuoteOptions(result)
            setSelectedQuoteOption(result[0])
            setToAmount((Number(fromAmount) / rate).toFixed(6).toString())
            setIsFetchingQuote(false)
          }
        })
        .catch((error) => console.log(error))
      return () => {
        ignore = true
      }
    }
  }, [toToken, fromToken, fromAmount, getSwapQuotes])

  // Methods
  const handleOnSetFromAmount = React.useCallback(
    (value: string) => {
      setFromAmount(value)
      if (toToken) {
        const updatedValue = (Number(value) / rate).toFixed(6).toString()
        setToAmount(updatedValue)
      }
    },
    [toToken, rate]
  )

  const handleOnSetToAmount = React.useCallback((value: string) => {
    setToAmount(value)
  }, [])

  const getTokenBalance = React.useCallback(
    (token: BlockchainToken): string => {
      return tokenBalances ? tokenBalances[token.contractAddress] ?? '0' : '0'
    },
    [tokenBalances]
  )

  const onClickFlipSwapTokens = React.useCallback(() => {
    setFromToken(toToken)
    setToToken(fromToken)
  }, [toToken, fromToken])

  const onSelectToToken = React.useCallback((token: BlockchainToken) => {
    setToToken(token)
    setSelectingFromOrTo(undefined)
  }, [])

  const onSelectFromToken = React.useCallback((token: BlockchainToken) => {
    setFromToken(token)
    setSelectingFromOrTo(undefined)
  }, [])

  const onSelectQuoteOption = React.useCallback((option: QuoteOption) => {
    setSelectedQuoteOption(option)
  }, [])

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
      return (price * Number(fromAmount)).toString()
    }
    return undefined
  }, [price, fromAmount])

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
    isFetchingQuote,
    quoteOptions,
    selectedQuoteOption,
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
