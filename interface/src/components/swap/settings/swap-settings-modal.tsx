// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { CoinType, GasEstimate, GasFeeOption } from '~/constants/types'

// Assets
import CloseIcon from '~/assets/close-icon.svg'

// Context
import { useSwapContext } from '~/context/swap.context'

// Hooks
import { useWalletState, useWalletDispatch } from '~/state/wallet'

// Options
import { gasFeeOptions } from '~/options/gas-fee-options'

// Components
import { ExpandSection } from './expand-section'
import { GasPresetButton } from './gas-preset-button'
import { StandardButton } from '~/components/buttons'
import { StandardCheckbox, ThemeSwitch } from '~/components/form-controls'
import { SlippageInput } from '~/components/inputs'

// Styled Components
import {
  Column,
  Row,
  Text,
  VerticalDivider,
  IconButton,
  VerticalSpacer,
  StyledDiv,
  HiddenResponsiveRow,
  ShownResponsiveRow
} from '~/components/shared.styles'

const slippagePresets = ['0.1', '0.5', '1.0']

interface Props {
  useDirectRoute: boolean
  slippageTolerance: string
  selectedGasFeeOption: GasFeeOption
  gasEstimates: GasEstimate
  setUseDirectRoute: (value: boolean) => void
  setSlippageTolerance: (value: string) => void
  setSelectedGasFeeOption: (value: GasFeeOption) => void
  onClose: () => void
}

export const SwapSettingsModal = (props: Props) => {
  const {
    selectedGasFeeOption,
    setSelectedGasFeeOption,
    setSlippageTolerance,
    // setUseDirectRoute,
    slippageTolerance,
    // useDirectRoute,
    gasEstimates,
    onClose
  } = props

  // Context
  const { getLocale, network, exchanges } = useSwapContext()

  // Dispatch
  const { dispatch } = useWalletDispatch()

  // Wallet State
  const {
    state: { userSelectedExchanges }
  } = useWalletState()

  // State
  const [showExchanges, setShowExchanges] = React.useState<boolean>(false)

  // Methods
  const handleCheckExchange = React.useCallback(
    (id: string, checked: boolean) => {
      const exchange = exchanges.find(e => e.id === id)
      if (checked && exchange !== undefined) {
        const addedList = [exchange, ...userSelectedExchanges]
        dispatch({ type: 'updateUserSelectedExchanges', payload: addedList })
        return
      }
      const removedList = userSelectedExchanges.filter(e => e.id !== id)
      dispatch({ type: 'updateUserSelectedExchanges', payload: removedList })
    },
    [userSelectedExchanges, exchanges, dispatch]
  )

  // Memos
  const customSlippageInputValue: string = React.useMemo(() => {
    return slippagePresets.includes(slippageTolerance) ? '' : slippageTolerance
  }, [slippageTolerance])

  const modalTitle: string = React.useMemo(() => {
    return showExchanges ? getLocale('braveSwapExchanges') : getLocale('braveSwapSettings')
  }, [getLocale, showExchanges])

  // render
  return (
    <Modal>
      {/* Modal Header */}
      <Row rowWidth='full' marginBottom={2}>
        <Text textColor='text01' textSize='16px' isBold={true}>
          {modalTitle}
        </Text>
        {showExchanges && (
          <IconButton icon={CloseIcon} onClick={() => setShowExchanges(false)} size={20} />
        )}
        {!showExchanges &&
          <ShownResponsiveRow maxWidth={570}>
            <IconButton icon={CloseIcon} onClick={onClose} size={20} />
          </ShownResponsiveRow>
        }
      </Row>

      <ShownResponsiveRow maxWidth={570}>
        <VerticalSpacer size={18} />
      </ShownResponsiveRow>

      {/* Exchanges List */}
      {showExchanges && (
        <>
          <VerticalSpacer size={24} />
          <ExchangesColumn>
            {exchanges.map(exchange => (
              <StandardCheckbox
                id={exchange.id}
                isChecked={userSelectedExchanges.some(e => e.id === exchange.id)}
                label={exchange.name}
                key={exchange.id}
                onChange={handleCheckExchange}
                labelSize='14px'
                isBold={true}
              />
            ))}
          </ExchangesColumn>
        </>
      )}

      {/* Settings */}
      {!showExchanges && (
        <>
          {/* Slippage Tolerance */}
          <ExpandSection
            label={getLocale('braveSwapSlippageTolerance')}
            value={`${slippageTolerance}%`}
          >
            <Row marginBottom={22} rowWidth='full'>
              <Row horizontalAlign='flex-start'>
                {slippagePresets.map(preset => (
                  <StandardButton
                    buttonText={`${preset}%`}
                    onClick={() => setSlippageTolerance(preset)}
                    buttonType='secondary'
                    buttonSize='small'
                    buttonWidth={64}
                    isSelected={slippageTolerance === preset}
                    marginRight={8}
                    key={preset}
                  />
                ))}
              </Row>
              <SlippageInput onChange={setSlippageTolerance} value={customSlippageInputValue} />
            </Row>
          </ExpandSection>

          <HiddenResponsiveRow maxWidth={570}>
            <VerticalDivider />
          </HiddenResponsiveRow>

          {/* Ethereum Only Settings */}
          {network.coin === CoinType.Ethereum && (
            <>
              {/* Exchanges disabled until supported */}
              {/* <ExpandSection
                label={getLocale('braveSwapExchanges')}
                value={userSelectedExchanges.length.toString()}
                onExpandOut={() => setShowExchanges(true)}
              />
              <VerticalDivider /> */}

              {/* Network Fee */}
              <ExpandSection
                label={getLocale('braveSwapNetworkFee')}
                value={`$${gasEstimates.gasFeeFiat}`}
                secondaryValue={`${gasEstimates.gasFee} ${network.symbol}`}
              >
                <Column columnWidth='full'>
                  {gasFeeOptions.map(option => (
                    <GasPresetButton
                      option={option}
                      isSelected={selectedGasFeeOption === option}
                      onClick={() => setSelectedGasFeeOption(option)}
                      gasEstimates={gasEstimates}
                      key={option.id}
                    />
                  ))}
                </Column>
              </ExpandSection>
            </>
          )}

          {/* Solana Only Settings */}
          {network.coin === CoinType.Solana && (
            <>
              {/* Direct Route Toggle is disabled until supported */}
              {/* <ToggleSection
                label={getLocale('braveSwapDirectRouteTitle')}
                description={getLocale('braveSwapDirectRouteDescription')}
                isChecked={useDirectRoute}
                setIsChecked={setUseDirectRoute}
              />
              <VerticalDivider /> */}
            </>
          )}
        </>
      )}
      <ShownResponsiveRow maxWidth={570}>
        <ThemeSwitch />
      </ShownResponsiveRow>
    </Modal>
  )
}

const Modal = styled(StyledDiv)`
  background-color: ${p => p.theme.color.legacy.background02};
  border-radius: 16px;
  border: 1px solid var(--swap-settings-modal-border-color);
  box-shadow: var(--swap-settings-modal-box-shadow);
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: absolute;
  padding: 20px 24px;
  width: 370px;
  min-height: 370px;
  z-index: 20;
  right: -16px;
  top: 28px;
  @media screen and (max-width: 570px) {
    position: fixed;
    right: 0;
    left: 0;
    top: 72px;
    bottom: 0;
    width: auto;
    border: none;
    border-radius: 16px 16px 0 0;
  }
`

const ExchangesColumn = styled(StyledDiv)`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`
