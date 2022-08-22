// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { WalletAccount } from '../../constants/types'

// Utils
import { reduceAddress } from '../../utils/reduce-address'

// Styled Components
import { Text, Row, HorizontalSpacer } from '../shared.styles'

interface Props {
  onClick: (network: WalletAccount) => void
  account: WalletAccount
}

export const AccountListButton = (props: Props) => {
  const { account, onClick } = props

  const onSelectAccount = React.useCallback(() => {
    onClick(account)
  }, [account, onClick])

  return (
    <Button onClick={onSelectAccount}>
      <Row>
        <Text isBold={true} textSize='14px' textColor='text01'>
          {account.name}
        </Text>
        <HorizontalSpacer size={15} />
        <Text isBold={false} textSize='12px' textColor='text03'>
          {reduceAddress(account.address)}
        </Text>
      </Row>
    </Button>
  )
}

const Button = styled.button`
  --button-hover-background: ${(p) => p.theme.color.secondary10};
  @media (prefers-color-scheme: dark) {
    --button-hover-background: ${(p) => p.theme.color.legacy.background02};
  }
  border-radius: 4px;
  justify-content: space-between;
  padding: 5px 18px;
  white-space: nowrap;
  width: 100%;
  background-color: none;
  margin-bottom: 2px;
  &:hover {
    background-color: var(--button-hover-background);
  }
`
