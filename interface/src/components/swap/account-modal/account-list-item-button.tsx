// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'
import { create } from 'ethereum-blockies'

// Utils
import { reduceAddress } from '~/utils/reduce-address'

// Styled Components
import {
  Text,
  HorizontalSpacer,
  StyledDiv,
  StyledButton
} from '~/components/shared.styles'

interface Props {
  name: string
  address: string
  onClick: () => void
}

export const AccountListItemButton = (props: Props) => {
  const { onClick, address, name } = props

  // Memos
  const accountOrb: string = React.useMemo(() => {
    return create({
      seed: address.toLowerCase() || '',
      size: 8,
      scale: 16
    }).toDataURL()
  }, [address])

  return (
    <Button onClick={onClick}>
      <AccountCircle orb={accountOrb} />{' '}
      <AccountText textSize='14px' isBold={true}>
        {name}
      </AccountText>
      <HorizontalSpacer size={4} />
      <Text textSize='14px' textColor='text03' isBold={false}>
        {reduceAddress(address)}
      </Text>
    </Button>
  )
}

const Button = styled(StyledButton)`
  --account-text-color: ${(p) => p.theme.color.legacy.text02};
  display: flex;
  justify-content: flex-start;
  background-color: ${(p) => p.theme.color.legacy.background01};
  padding: 8px 10px;
  width: 100%;
  &:hover {
    --account-text-color: ${(p) => p.theme.color.legacy.text01};
  }
`

const AccountCircle = styled(StyledDiv) <{ orb: string }>`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-image: url(${(p) => p.orb});
  background-size: cover;
  margin-right: 8px;
  @media screen and (max-width: 570px) {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
`

const AccountText = styled(Text)`
  color: var(--account-text-color);
`
