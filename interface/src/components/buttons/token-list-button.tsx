// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { BlockchainToken } from '~/constants/types'
import Amount from '~/utils/amount'

// Components
import { CreateIconWithPlaceholder } from '~/components/placeholders'

// Styled Components
import { Text, Column, Row, StyledButton } from '~/components/shared.styles'

interface Props {
  onClick: (token: BlockchainToken) => void
  token: BlockchainToken
  balance: Amount
  disabled: boolean
  isWalletConnected: boolean
}

export const TokenListButton = (props: Props) => {
  const { onClick, token, balance, disabled, isWalletConnected } = props

  const onSelectToken = React.useCallback(() => {
    onClick(token)
  }, [token, onClick])

  return (
    <Button onClick={onSelectToken} disabled={disabled}>
      <Row>
        <CreateIconWithPlaceholder asset={token} size={40} marginRight={12} />
        <Column horizontalAlign='flex-start'>
          <Text isBold={true} textColor='text01' textSize='14px'>
            {token.name}
          </Text>
          <Text textColor='text03' textSize='14px'>
            {token.symbol}
          </Text>
        </Column>
      </Row>
      {isWalletConnected && (
        <Text isBold={true} textColor='text01' textSize='14px'>
          {balance.divideByDecimals(token.decimals).formatAsAsset(6, token.symbol)}
        </Text>
      )}
    </Button>
  )
}

const Button = styled(StyledButton)`
  background-color: none;
  border-radius: 8px;
  justify-content: space-between;
  padding: 16px 8px;
  white-space: nowrap;
  width: calc(100% - 24px);
  margin-left: 12px;
  :disabled {
    opacity: 0.3;
  }
  &:hover:not([disabled]) {
    box-shadow: var(--token-list-button-shadow);
    background-color: ${(p) => p.theme.color.legacy.background01};
  }
`
