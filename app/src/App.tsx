// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import './App.css'

import React from 'react'

import { mockEthereumToken, mockWrappedSolanaToken } from '../mock-data/mock-tokens'

// Types
import { BlockchainToken } from './constants/types'

// Components
import { StandardButton, IconButton, FlipTokensButton } from './components/buttons'
import { SwapContainer, FromSection, ToSection } from './components/swap'

// Assets
import AdvancedIcon from './assets/advanced-icon.svg'

// Utils
import { getLocale } from './utils/locale'

// Styled Components
import { Row, Text } from './components/shared.styles'

function App () {

  // These values are just for testing components
  const balance = 1.568
  const price = 1519.28
  const rate = 0.026

  // State
  const [fromToken, setFromToken] = React.useState<BlockchainToken | undefined>(undefined)
  const [toToken, setToToken] = React.useState<BlockchainToken | undefined>(undefined)
  const [fromAmount, setFromAmount] = React.useState<string>('')
  const [toAmount, setToAmount] = React.useState<string>('')
  const [isFetchingQuote, setIsFetchingQuote] = React.useState<boolean>(false)

  // Effects
  React.useEffect(() => {
    if (toToken && fromToken && fromAmount !== '') {
      setIsFetchingQuote(true)
      setTimeout(() => {
        const value = (Number(fromAmount) / rate).toFixed(6).toString()
        setToAmount(value)
        setIsFetchingQuote(false)
      }, 1000)
    }
  }, [toToken, fromToken, fromAmount, rate])

  // Memos
  const fiatValue = React.useMemo((): string | undefined => {
    if (fromAmount && price) {
      return (price * Number(fromAmount)).toString()
    }
    return undefined
  }, [price, fromAmount])

  const insufficientBalance = React.useMemo((): boolean => {
    if (fromAmount && balance) {
      return Number(fromAmount) > balance
    }
    return false
  }, [balance, fromAmount])

  // Methods
  const handleOnSetFromAmount = React.useCallback((value: string) => {
    setFromAmount(value)
    if (toToken) {
      const updatedValue = (Number(value) / rate).toFixed(6).toString()
      setToAmount(updatedValue)
    }
  }, [toToken, rate])

  const handleOnSetToAmount = React.useCallback((value: string) => {
    setToAmount(value)
  }, [])

  const onClickPresetAmount = React.useCallback((key: 'half' | 'max') => {
    const value = key === 'half' ? balance / 2 : balance
    setFromAmount(value.toString())
  }, [balance])

  const onClickFlipSwapTokens = React.useCallback(() => {
    setFromToken(toToken)
    setToToken(fromToken)
  }, [toToken, fromToken])

  const onClickSettings = React.useCallback(() => {
    // Logic here to open settings view
    return
  }, [])

  const onOpenSelectToken = React.useCallback((id: 'to' | 'from') => () => {
    if (id === 'from') {
      setFromToken(mockEthereumToken)
      return
    }
    setToToken(mockWrappedSolanaToken)
  }, [])

  return (
    <SwapContainer>
      <Row
        rowWidth='full'
        horizontalPadding={16}
        verticalPadding={6}
        marginBottom={18}
      >
        <Text
          isBold={true}
        >
          {getLocale('braveSwap')}
        </Text>
        <IconButton
          icon={AdvancedIcon}
          onClick={onClickSettings}
        />
      </Row>
      <FromSection
        getLocale={getLocale}
        onClickPresetAmount={onClickPresetAmount}
        onInputChange={handleOnSetFromAmount}
        inputValue={fromAmount}
        onClickSelectToken={onOpenSelectToken('from')}
        token={fromToken}
        tokenBalance={balance}
        hasInputError={insufficientBalance}
        fiatValue={fiatValue}
      />
      <FlipTokensButton onClick={onClickFlipSwapTokens} />
      <ToSection
        getLocale={getLocale}
        onClickSelectToken={onOpenSelectToken('to')}
        token={toToken}
        inputValue={toAmount}
        onInputChange={handleOnSetToAmount}
        hasInputError={false}
        isLoading={isFetchingQuote}
        disabled={false} // Will need to disable for Solana in the future
      />
      <StandardButton
        onClick={() => { }}
        buttonText={getLocale('braveSwapReviewOrder')}
        buttonType="primary"
        buttonWidth="full"
        verticalMargin={16}
        disabled={true}
      />
    </SwapContainer>
  )
}

export default App
