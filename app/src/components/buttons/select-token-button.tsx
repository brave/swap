// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components';

// Types
import { BlockchainToken } from '../../constants/types'

// Assets
import CaratDownIcon from '../../assets/carat-down-icon.svg'

// Styled Components
import { Text, Icon, HorizontalSpacer } from '../shared.styles'

interface SelectTokenButtonStyleProps {
  buttonType?: 'primary' | 'secondary'
  moreRightPadding?: boolean
}

interface Props extends SelectTokenButtonStyleProps {
  onClick: () => void
  getLocale: (key: string) => string
  token: BlockchainToken | undefined
}

export const SelectTokenButton = (props: Props) => {
  const {
    onClick,
    getLocale,
    buttonType,
    token
  } = props

  const needsMorePadding = React.useMemo((): boolean => {
    if (!token) {
      return true
    }
    return token.symbol.length > 3
  }, [token])

  return (
    <Button
      onClick={onClick}
      buttonType={buttonType}
      moreRightPadding={needsMorePadding}
    >
      {token &&
        <TokenIcon src={token.logo} />
      }
      <Text
        isBold={token !== undefined}
        textColor={token ? 'text01' : 'text03'}
      >
        {token?.symbol ?? getLocale('braveSwapSelectToken')}
      </Text>
      <HorizontalSpacer size={8} />
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
  padding: 18px;
  background-color: transparent;
  border-radius: 100px;
  padding: 10px ${(p) => p.moreRightPadding ? 12 : 10}px 10px 12px;
  &:hover {
    background-color: ${(p) => p.buttonType === 'secondary' ? '#F5F6FC' : 'rgba(255, 255, 255, 0.6)'};
  }
`

const ButtonIcon = styled(Icon)`
  background-color: #212529;
`

const TokenIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`
