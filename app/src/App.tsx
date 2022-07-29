// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import './App.css'

import React from 'react'

// Mock Data
import { mockEthereumToken, mockEthereumTokens } from '../mock-data/mock-tokens'
import { mockEthereumNetwork } from '../mock-data/mock-networks'
import { mockTokenBalances } from '../mock-data/mock-token-balances'

// Types
import { BlockchainToken } from './constants/types'

// Components
import { StandardButton, IconButton, FlipTokensButton } from './components/buttons'
import { SwapContainer, FromSection, ToSection, SelectTokenModal } from './components/swap'

// Assets
import AdvancedIcon from './assets/advanced-icon.svg'

// Utils
import { getLocale } from './utils/locale'

// Styled Components
import { Row, Text } from './components/shared.styles'

function App () {

  // These values are just for testing components
  const price = 1519.28
  const rate = 0.026
  const isConnected = true

  // State
  const [fromToken, setFromToken] = React.useState<BlockchainToken | undefined>(mockEthereumToken)
  const [toToken, setToToken] = React.useState<BlockchainToken | undefined>(undefined)
  const [fromAmount, setFromAmount] = React.useState<string>('')
  const [toAmount, setToAmount] = React.useState<string>('')
  const [isFetchingQuote, setIsFetchingQuote] = React.useState<boolean>(false)
  const [selectingFromOrTo, setSelectingFromOrTo] = React.useState<'from' | 'to' | undefined>(undefined)

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

  const getTokenBalance = React.useCallback((token: BlockchainToken): string => {
    return mockTokenBalances[token.contractAddress] ?? '0'
  }, [mockTokenBalances])

  const onClickFlipSwapTokens = React.useCallback(() => {
    setFromToken(toToken)
    setToToken(fromToken)
  }, [toToken, fromToken])

  const onClickSettings = React.useCallback(() => {
    // Todo: Add logic here to open settings view
    return
  }, [])

  const onClickReviewOrder = React.useCallback(() => {
    // Todo: Add logic here to review order
  }, [])

  const hideSelectTokenModal = React.useCallback(() => {
    setSelectingFromOrTo(undefined) // hide modal
  }, [])

  const onSelectToToken = React.useCallback((token: BlockchainToken) => {
    setToToken(token)
    hideSelectTokenModal()
  }, [hideSelectTokenModal])

  const onSelectFromToken = React.useCallback((token: BlockchainToken) => {
    setFromToken(token)
    hideSelectTokenModal()
  }, [hideSelectTokenModal])

  // Memos
  const fromTokenBalance: number = React.useMemo(() => {
    if (fromToken) {
      return Number(getTokenBalance(fromToken))
    }
    return 0
  }, [fromToken])
  
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

  // Effects
  React.useEffect(() => {
    if (toToken && fromToken && fromAmount !== '') {
      setIsFetchingQuote(true)
      setTimeout(() => {
        const value = (Number(fromAmount) / rate).toFixed(6).toString()
        setToAmount(value)
        setIsFetchingQuote(false)
      }, 1000)
      return
    }
    setToAmount('')
  }, [toToken, fromToken, fromAmount, rate])

  // render
  return (
    <>
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
          onInputChange={handleOnSetFromAmount}
          inputValue={fromAmount}
          onClickSelectToken={() => setSelectingFromOrTo('from')}
          token={fromToken}
          tokenBalance={fromTokenBalance}
          hasInputError={insufficientBalance}
          fiatValue={fiatValue}
        />
        <FlipTokensButton onClick={onClickFlipSwapTokens} />
        <ToSection
          getLocale={getLocale}
          onClickSelectToken={() => setSelectingFromOrTo('to')}
          token={toToken}
          inputValue={toAmount}
          onInputChange={handleOnSetToAmount}
          hasInputError={false}
          isLoading={isFetchingQuote}
          disabled={false} // Will need to disable for Solana in the future
        />
        <StandardButton
          onClick={onClickReviewOrder}
          buttonText={getLocale('braveSwapReviewOrder')}
          buttonType="primary"
          buttonWidth="full"
          verticalMargin={16}
          disabled={true}
        />
      </SwapContainer>
      {selectingFromOrTo &&
        <SelectTokenModal
          onClose={hideSelectTokenModal}
          onSelectToken={selectingFromOrTo === 'from'
            ? onSelectFromToken
            : onSelectToToken
          }
          disabledToken={selectingFromOrTo === 'from'
            ? toToken 
            : fromToken
          }
          tokenList={mockEthereumTokens}
          selectedNetwork={mockEthereumNetwork}
          getLocale={getLocale}
          getTokenBalance={getTokenBalance}
          isConnected={isConnected}
          selectingFromOrTo={selectingFromOrTo}
        />
      }
    </>
  )
}

export default App
