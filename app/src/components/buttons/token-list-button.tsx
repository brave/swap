// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { BlockchainToken } from '../../constants/types'

// Styled Components
import { Text, Column, Row } from '../shared.styles'

interface Props {
  onClick: (token: BlockchainToken) => void
  token: BlockchainToken
  balance: string
  disabled: boolean
  isConnected: boolean
}

export const TokenListButton = (props: Props) => {
  const { onClick, token, balance, disabled, isConnected } = props

  const onSelectToken = React.useCallback(() => {
    onClick(token)
  }, [token, onClick])

  return (
    <Button onClick={onSelectToken} disabled={disabled}>
      <Row>
        <TokenIcon src={token.logo} />
        <Column horizontalAlign='flex-start'>
          <Text isBold={true} textColor='text01' textSize='14px'>
            {token.name}
          </Text>
          <Text textColor='text03' textSize='14px'>
            {token.symbol}
          </Text>
        </Column>
      </Row>
      {isConnected && (
        <Text isBold={true} textColor='text01' textSize='14px'>
          {balance} {token.symbol}
        </Text>
      )}
    </Button>
  )
}

const Button = styled.button`
  --button-shadow: 0px 0px 10px rgba(79, 79, 79, 0.1);
  @media (prefers-color-scheme: dark) {
    --button-shadow: 0px 0px 16px rgba(0, 0, 0, 0.36);
  }
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 8px;
  justify-content: space-between;
  padding: 16px 8px;
  white-space: nowrap;
  width: 100%;
  :disabled {
    opacity: 0.3;
  }
  &:hover:not([disabled]) {
    box-shadow: var(--button-shadow);
    z-index: 20px;
    position: relative;
  }
`

const TokenIcon = styled.img`
  margin-right: 12px;
  height: 40px;
  width: 40px;
`
