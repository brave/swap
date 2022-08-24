// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Types
import { CoinType } from '../constants/types'

// Context
import { useSwapContext } from '../context/swap.context'
import { useWalletState } from '../state/wallet'

// Hooks
import { useSwap } from '../hooks/useSwap'

// Components
import { StandardButton, FlipTokensButton } from '../components/buttons'
import {
  SwapContainer,
  FromSection,
  ToSection,
  SelectTokenModal,
  QuoteOptions,
  QuoteInfo,
  SwapAndSend
} from '../components/swap'
import { SwapSectionBox } from '../components/boxes'

// Assets
import AdvancedIcon from '../assets/advanced-icon.svg'

// Styled Components
import { Row, Text, IconButton } from '../components/shared.styles'

export const Swap = () => {
  // Hooks
  const swap = useSwap()
  const {
    fromAmount,
    toAmount,
    fromToken,
    toToken,
    insufficientBalance,
    isFetchingQuote,
    quoteOptions,
    selectedQuoteOption,
    selectingFromOrTo,
    fromTokenBalance,
    fiatValue,
    swapAndSendSelected,
    toAnotherAddress,
    userConfirmedAddress,
    selectedSwapSendAccount,
    selectedSwapAndSendOption,
    getTokenBalance,
    onSelectFromToken,
    onSelectToToken,
    onSelectQuoteOption,
    onClickFlipSwapTokens,
    setSelectingFromOrTo,
    handleOnSetFromAmount,
    handleOnSetToAmount,
    handleOnSetToAnotherAddress,
    onCheckUserConfirmedAddress,
    onSetSelectedSwapAndSendOption,
    setSelectedSwapSendAccount,
    setSwapAndSendSelected
  } = swap

  // Wallet State
  const {
    state: { selectedNetwork }
  } = useWalletState()

  // Context
  const { getLocale } = useSwapContext()

  const onClickSettings = React.useCallback(() => {
    // Todo: Add logic here to open settings view
    return
  }, [])

  const onClickReviewOrder = React.useCallback(() => {
    // Todo: Add logic here to review order
  }, [])

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
          {isFetchingQuote === false &&
            selectedNetwork.coin === CoinType.Solana && (
              <QuoteOptions
                quoteOptions={quoteOptions}
                selectedQuoteOption={selectedQuoteOption}
                onSelectQuoteOption={onSelectQuoteOption}
              />
            )}
        </SwapSectionBox>
        {isFetchingQuote === false && (
          <>
            <QuoteInfo
              selectedQuoteOption={selectedQuoteOption}
              fromToken={fromToken}
            />
            <SwapAndSend
              onChangeSwapAndSendSelected={setSwapAndSendSelected}
              handleOnSetToAnotherAddress={handleOnSetToAnotherAddress}
              onCheckUserConfirmedAddress={onCheckUserConfirmedAddress}
              onSelectSwapAndSendOption={onSetSelectedSwapAndSendOption}
              onSelectSwapSendAccount={setSelectedSwapSendAccount}
              swapAndSendSelected={swapAndSendSelected}
              selectedSwapAndSendOption={selectedSwapAndSendOption}
              selectedSwapSendAccount={selectedSwapSendAccount}
              toAnotherAddress={toAnotherAddress}
              userConfirmedAddress={userConfirmedAddress}
            />
          </>
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
          onClose={() => setSelectingFromOrTo(undefined)}
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
