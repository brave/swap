// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { BlockchainToken, NetworkInfo } from '~/constants/types'

// Context
import { useSwapContext } from '~/context/swap.context'

// Assets
import CaratDownIcon from '~/assets/carat-down-icon.svg'
import FuelTankIcon from '~/assets/fuel-tank-icon.svg'

// Components
import { CreateIconWithPlaceholder } from '~/components/placeholders'

// Styled Components
import {
  Text,
  Icon,
  HorizontalSpacer,
  Row,
  HiddenResponsiveRow, 
  StyledButton
} from '~/components/shared.styles'

interface SelectTokenButtonStyleProps {
  buttonType?: 'primary' | 'secondary'
  buttonSize?: 'big' | 'medium' | 'small'
  moreRightPadding?: boolean
  hasBackground?: boolean
  hasShadow?: boolean
  networkNotSupported?: boolean
}

interface Props extends SelectTokenButtonStyleProps {
  onClick: () => void
  text: string | undefined
  disabled?: boolean
  networkFeeFiatValue?: string
  isHeader?: boolean
  asset?: BlockchainToken
  network?: NetworkInfo
}

export const SelectTokenOrNetworkButton = (props: Props) => {
  const {
    onClick,
    buttonType,
    buttonSize,
    text,
    disabled,
    hasBackground,
    hasShadow,
    networkFeeFiatValue,
    isHeader,
    networkNotSupported,
    asset,
    network
  } = props

  // Context
  const { getLocale } = useSwapContext()

  // Memos
  const needsMorePadding = React.useMemo((): boolean => {
    if (!text) {
      return true
    }
    return text.length > 3
  }, [text])

  return (
    <Button
      onClick={onClick}
      buttonType={buttonType}
      moreRightPadding={needsMorePadding}
      buttonSize={buttonSize}
      disabled={disabled}
      hasBackground={hasBackground}
      hasShadow={hasShadow}
      networkNotSupported={networkNotSupported}
    >
      {!networkNotSupported && (
        <>
          <Row>
            {text && (
              <CreateIconWithPlaceholder
                asset={asset}
                network={network}
                size={
                  buttonSize === 'small' || buttonSize === 'medium' ? 24 : 40
                }
                marginRight={8}
              />
            )}
            <HiddenResponsiveRow dontHide={!isHeader}>
              <Text
                isBold={text !== undefined}
                textColor={text ? 'text01' : 'text03'}
                textSize={
                  buttonSize === 'small' || buttonSize === 'medium'
                    ? '14px'
                    : '18px'
                }
              >
                {text ?? getLocale('braveSwapSelectToken')}
              </Text>
            </HiddenResponsiveRow>
          </Row>
          <HiddenResponsiveRow dontHide={!isHeader}>
            {networkFeeFiatValue && (
              <>
                <HorizontalSpacer size={8} />
                <GasBubble>
                  <FuelTank icon={FuelTankIcon} size={12} />
                  <Text textSize='14px' textColor='text01'>
                    {networkFeeFiatValue}
                  </Text>
                </GasBubble>
              </>
            )}
            {buttonSize !== 'small' && <HorizontalSpacer size={8} />}
          </HiddenResponsiveRow>
        </>
      )}
      {networkNotSupported && (
        <>
          <NotSupportedText isBold={true} textSize='14px'>
            {getLocale('braveSwapSwitchNetwork')}
          </NotSupportedText>
          <HorizontalSpacer size={8} />
        </>
      )}
      <ButtonIcon
        networkNotSupported={networkNotSupported}
        size={12}
        icon={CaratDownIcon}
      />
    </Button>
  )
}

const Button = styled(StyledButton)<SelectTokenButtonStyleProps>`
  /* Variables */
  --big-padding: 10px ${(p) => (p.moreRightPadding ? 12 : 10)}px 10px 12px;
  --medium-padding: 8px 16px;
  --small-padding: 4px 12px 4px 4px;

  /* Styles */
  background-color: ${(p) =>
    p.hasBackground
      ? p.networkNotSupported
        ? p.theme.color.red80
        : p.theme.color.legacy.background01
      : 'transparent'};
  border-radius: 100px;
  box-shadow: ${(p) =>
    p.hasShadow ? '0px 0px 10px rgba(0, 0, 0, 0.05)' : 'none'};
  justify-content: ${(p) =>
    p.buttonSize === 'small' ? 'space-between' : 'center'};
  padding: ${(p) =>
    p.buttonSize === 'small'
      ? 'var(--small-padding)'
      : p.buttonSize === 'medium'
      ? 'var(--medium-padding)'
      : 'var(--big-padding)'};
  white-space: nowrap;
  width: ${(p) => (p.buttonSize === 'small' ? '140px' : 'unset')};
  :disabled {
    opacity: 0.3;
  }
  &:hover:not([disabled]) {
    background-color: ${(p) =>
      p.networkNotSupported
        ? p.theme.color.red80
        : p.buttonType === 'secondary' || p.buttonSize === 'small'
        ? 'var(--token-or-network-button-background-hover-secondary)'
        : 'var(--token-or-network-button-background-hover-primary)'};
  }
`

const ButtonIcon = styled(Icon)<{ networkNotSupported?: boolean }>`
  background-color: ${(p) =>
    p.networkNotSupported ? p.theme.color.white : p.theme.color.legacy.text01};
`

const FuelTank = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text02};
  margin-right: 6px;
`

const GasBubble = styled(Row)`
  padding: 2px 8px;
  border-radius: 8px;
  background-color: var(--token-or-network-bubble-background);
`

const NotSupportedText = styled(Text)`
  color: ${(p) => p.theme.color.white};
`
