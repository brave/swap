// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// import './App.css'

import React from 'react'

// Context
import { useSwapContext } from '../context/swap.context'

// Hooks
import { useWalletState } from '../state/wallet'

// Types
import { BlockchainToken, QuoteOption } from '../constants/types'

// Components
import { StandardButton, FlipTokensButton } from '../components/buttons'
import {
  SwapContainer,
  FromSection,
  ToSection,
  SelectTokenModal,
  QuoteOptions,
  QuoteInfo
} from '../components/swap'
import { SwapSectionBox } from '../components/boxes'

// Assets
import AdvancedIcon from '../assets/advanced-icon.svg'

// Styled Components
import { Row, Text, IconButton } from '../components/shared.styles'

export const Swap = () => {
  // Context
  const { getLocale, getSwapQuotes } = useSwapContext()

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

  // Update on render
  if (fromToken === undefined && fromToken !== tokenList[0]) {
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

  const onSelectToToken = React.useCallback(
    (token: BlockchainToken) => {
      setToToken(token)
      hideSelectTokenModal()
    },
    [hideSelectTokenModal]
  )

  const onSelectFromToken = React.useCallback(
    (token: BlockchainToken) => {
      setFromToken(token)
      hideSelectTokenModal()
    },
    [hideSelectTokenModal]
  )

  const onSelectQuoteOption = React.useCallback((option: QuoteOption) => {
    setSelectedQuoteOption(option)
  }, [])

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
          <Text isBold={true}>{getLocale('braveSwap')}</Text>
          <IconButton icon={AdvancedIcon} onClick={onClickSettings} />
        </Row>
        <FromSection
          onInputChange={handleOnSetFromAmount}
          inputValue={fromAmount}
          onClickSelectToken={() => setSelectingFromOrTo('from')}
          token={fromToken}
          tokenBalance={fromTokenBalance}
          hasInputError={insufficientBalance}
          fiatValue={fiatValue}
        />
        <FlipTokensButton onClick={onClickFlipSwapTokens} />
        <SwapSectionBox boxType='secondary' maintainHeight={isFetchingQuote}>
          <ToSection
            onClickSelectToken={() => setSelectingFromOrTo('to')}
            token={toToken}
            inputValue={toAmount}
            onInputChange={handleOnSetToAmount}
            hasInputError={false}
            isLoading={isFetchingQuote}
            disabled={false} // Will need to disable for Solana in the future
          />
          {isFetchingQuote === false && (
            <QuoteOptions
              quoteOptions={quoteOptions}
              selectedQuoteOption={selectedQuoteOption}
              onSelectQuoteOption={onSelectQuoteOption}
            />
          )}
        </SwapSectionBox>
        {isFetchingQuote === false && (
          <QuoteInfo
            selectedQuoteOption={selectedQuoteOption}
            fromToken={fromToken}
          />
        )}
        <StandardButton
          onClick={onClickReviewOrder}
          buttonText={getLocale('braveSwapReviewOrder')}
          buttonType='primary'
          buttonWidth='full'
          verticalMargin={16}
          disabled={true}
        />
      </SwapContainer>
      {selectingFromOrTo && (
        <SelectTokenModal
          onClose={hideSelectTokenModal}
          onSelectToken={
            selectingFromOrTo === 'from' ? onSelectFromToken : onSelectToToken
          }
          disabledToken={selectingFromOrTo === 'from' ? toToken : fromToken}
          getTokenBalance={getTokenBalance}
          selectingFromOrTo={selectingFromOrTo}
        />
      )}
    </>
  )
}
