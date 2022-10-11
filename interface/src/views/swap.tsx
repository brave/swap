// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { CoinType } from '~/constants/types'

// Context
import { useSwapContext } from '~/context/swap.context'
import { useWalletState } from '~/state/wallet'

// Hooks
import { useSwap } from '~/hooks/useSwap'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'

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
    setUseOptimizedFees,
    onSubmit,
    submitButtonText,
    isSubmitButtonDisabled
  } = swap

  // Wallet State
  const {
    state: { selectedNetwork }
  } = useWalletState()

  // Context
  const { getLocale } = useSwapContext()

  // State
  const [showSwapSettings, setShowSwapSettings] = React.useState<boolean>(false)

  // Refs
  const selectTokenModalRef = React.useRef<HTMLDivElement>(null)
  const swapSettingsModalRef = React.useRef<HTMLDivElement>(null)

  const onToggleShowSwapSettings = React.useCallback(() => {
    setShowSwapSettings((prev) => !prev)
    if (slippageTolerance === '') {
      setSlippageTolerance('0.5')
    }
  }, [slippageTolerance])

  // Hooks
  useOnClickOutside(
    selectTokenModalRef,
    () => setSelectingFromOrTo(undefined),
    selectingFromOrTo !== undefined
  )
  useOnClickOutside(
    swapSettingsModalRef,
    onToggleShowSwapSettings,
    showSwapSettings
  )

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
          <SettingsWrapper ref={swapSettingsModalRef}>
            <IconButton
              icon={AdvancedIcon}
              onClick={onToggleShowSwapSettings}
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
          </SettingsWrapper>
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
          onClick={onSubmit}
          buttonText={submitButtonText}
          buttonType='primary'
          buttonWidth='full'
          verticalMargin={16}
          disabled={isSubmitButtonDisabled}
        />
      </SwapContainer>
      {selectingFromOrTo && (
        <SelectTokenModal
          ref={selectTokenModalRef}
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

const SettingsWrapper = styled.div`
  display: flex;
  position: relative;
`