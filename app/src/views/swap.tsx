// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Types
import { CoinType } from '~/constants/types'

// Context
import { useSwapContext } from '~/context/swap.context'
import { useWalletState } from '~/state/wallet'

// Hooks
import { useSwap } from '~/hooks/useSwap'

// Components
import { StandardButton, FlipTokensButton } from '~/components/buttons'
import {
  SwapContainer,
  FromSection,
  ToSection,
  SelectTokenModal,
  QuoteOptions,
  QuoteInfo,
  SwapAndSend,
  SwapSettingsModal
} from '~/components/swap'
import { SwapSectionBox } from '~/components/boxes'

// Assets
import AdvancedIcon from '~/assets/advanced-icon.svg'

// Styled Components
import { Row, Text, IconButton } from '~/components/shared.styles'

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
    selectedQuoteOptionIndex,
    selectingFromOrTo,
    fromTokenBalance,
    fiatValue,
    swapAndSendSelected,
    toAnotherAddress,
    userConfirmedAddress,
    selectedSwapSendAccount,
    selectedSwapAndSendOption,
    selectedGasFeeOption,
    slippageTolerance,
    useDirectRoute,
    useOptimizedFees,
    gasEstimates,
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
    setSwapAndSendSelected,
    setSelectedGasFeeOption,
    setSlippageTolerance,
    setUseDirectRoute,
    setUseOptimizedFees
  } = swap

  // Wallet State
  const {
    state: { selectedNetwork }
  } = useWalletState()

  // Context
  const { getLocale } = useSwapContext()

  // State
  const [showSwapSettings, setShowSwapSettings] = React.useState<boolean>(false)

  const onToggleShowSwapSettings = React.useCallback(() => {
    setShowSwapSettings((prev) => !prev)
    if (slippageTolerance === '') {
      setSlippageTolerance('0.5')
    }
  }, [slippageTolerance])

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
          <IconButton icon={AdvancedIcon} onClick={onToggleShowSwapSettings} />
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
        <SwapSectionBox boxType='secondary'>
          <ToSection
            onClickSelectToken={() => setSelectingFromOrTo('to')}
            token={toToken}
            inputValue={toAmount}
            onInputChange={handleOnSetToAmount}
            hasInputError={false}
            isLoading={isFetchingQuote}
            disabled={selectedNetwork?.coin === CoinType.Solana}
          />
          {selectedNetwork?.coin === CoinType.Solana &&
            quoteOptions.length > 0 && (
              <QuoteOptions
                options={quoteOptions}
                selectedQuoteOptionIndex={selectedQuoteOptionIndex}
                onSelectQuoteOption={onSelectQuoteOption}
              />
            )}
        </SwapSectionBox>
        {quoteOptions.length > 0 && (
          <>
            <QuoteInfo
              selectedQuoteOption={quoteOptions[selectedQuoteOptionIndex]}
              fromToken={fromToken}
              toToken={toToken}
              toAmount={toAmount}
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
        {showSwapSettings && (
          <SwapSettingsModal
            selectedGasFeeOption={selectedGasFeeOption}
            slippageTolerance={slippageTolerance}
            useDirectRoute={useDirectRoute}
            useOptimizedFees={useOptimizedFees}
            setSelectedGasFeeOption={setSelectedGasFeeOption}
            setSlippageTolerance={setSlippageTolerance}
            setUseDirectRoute={setUseDirectRoute}
            setUseOptimizedFees={setUseOptimizedFees}
            gasEstimates={gasEstimates}
          />
        )}
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
