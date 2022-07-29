// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components';

// Assets
import CaratDownIcon from '../../assets/carat-down-icon.svg'

// Styled Components
import { Text, Icon, HorizontalSpacer, Row } from '../shared.styles'

interface SelectTokenButtonStyleProps {
  buttonType?: 'primary' | 'secondary'
  buttonSize?: 'big' | 'small'
  moreRightPadding?: boolean
}

interface Props extends SelectTokenButtonStyleProps {
  onClick: () => void
  getLocale: (key: string) => string
  icon: string | undefined
  text: string | undefined
  disabled?: boolean
}

export const SelectTokenOrNetworkButton = (props: Props) => {
  const {
    onClick,
    getLocale,
    buttonType,
    buttonSize,
    icon,
    text,
    disabled
  } = props

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
    >
      <Row>
        {text && icon &&
          <ButtonImage
            src={icon}
            buttonSize={buttonSize}
          />
        }
        <Text
          isBold={text !== undefined}
          textColor={text ? 'text01' : 'text03'}
          textSize={buttonSize === 'small' ? '14px' : '18px'}
        >
          {text ?? getLocale('braveSwapSelectToken')}
        </Text>
      </Row>
      {buttonSize !== 'small' &&
        <HorizontalSpacer size={8} />
      }
      <ButtonIcon
        size={12}
        icon={CaratDownIcon}
      />
    </Button>
  )
}

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Button = styled.button<SelectTokenButtonStyleProps>`
  white-space: nowrap;
  --big-padding: 10px ${(p) => p.moreRightPadding ? 12 : 10}px 10px 12px;
  --small-padding: 4px 12px 4px 4px;
  background-color: transparent;
  border-radius: 100px;
  width :${(p) => p.buttonSize === 'small' ? '140px' : 'unset'};
  justify-content: ${(p) => p.buttonSize === 'small' ? 'space-between' : 'center'};
  padding: ${(p) => p.buttonSize === 'small' ? 'var(--small-padding)' : 'var(--big-padding)'};
  :disabled {
    opacity: 0.3;
  }
  &:hover:not([disabled]) {
    background-color: ${(p) => p.buttonType === 'secondary' || p.buttonSize === 'small' ? '#F5F6FC' : 'rgba(255, 255, 255, 0.6)'};
  }
`

const ButtonIcon = styled(Icon)`
  background-color: #212529;
`

const ButtonImage = styled.img<SelectTokenButtonStyleProps>`
  width: ${(p) => p.buttonSize === 'small' ? 24 : 40}px;
  height: ${(p) => p.buttonSize === 'small' ? 24 : 40}px;
  margin-right: 8px;
`
