// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'
import { create } from 'ethereum-blockies'

// Utils
import { reduceAddress } from '../../utils/reduce-address'

// Hooks
import { useWalletState } from '../../state/wallet'

// Styles
import { Text, HorizontalSpacer } from '../shared.styles'

interface Props {
  onClick: () => void
}

export const ConnectWalletButton = (props: Props) => {
  const { onClick } = props

  // Wallet State
  const { state } = useWalletState()
  const { selectedAccount, isConnected, braveWalletAccounts } = state

  // Memos
  const accountOrb: string = React.useMemo(() => {
    return create({
      seed: selectedAccount.toLowerCase(),
      size: 8,
      scale: 16
    }).toDataURL()
  }, [selectedAccount])

  const accountName: string = React.useMemo(() => {
    return (
      braveWalletAccounts.find((account) => account.address === selectedAccount)
        ?.name ?? ''
    )
  }, [selectedAccount, braveWalletAccounts])

  return (
    <Button onClick={onClick} isConnected={isConnected}>
      {isConnected ? (
        <>
          <AccountCircle orb={accountOrb} />{' '}
          <Text textSize='14px' textColor='text01' isBold={true}>
            {accountName}
          </Text>
          <HorizontalSpacer size={4} />
          <Text textSize='14px' textColor='text03' isBold={true}>
            {reduceAddress(selectedAccount)}
          </Text>
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  )
}

const Button = styled.button<{ isConnected: boolean }>`
  --button-background: ${(p) =>
    p.isConnected
      ? p.theme.color.legacy.background01
      : p.theme.color.legacy.interactive04};
  @media (prefers-color-scheme: dark) {
    --button-background: ${(p) =>
      p.isConnected
        ? p.theme.color.legacy.background01
        : p.theme.color.legacy.interactive05};
  }
  background-color: var(--button-background);
  border-radius: 48px;
  color: ${(p) =>
    p.isConnected ? p.theme.color.legacy.text01 : p.theme.color.white};
  font-size: 14px;
  padding: ${(p) => (p.isConnected ? '8px 16px' : `10px 22px`)};
  box-shadow: ${(p) =>
    p.isConnected ? '0px 0px 10px rgba(0, 0, 0, 0.05)' : 'none'};
`

const AccountCircle = styled.div<{ orb: string }>`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-image: url(${(p) => p.orb});
  background-size: cover;
  margin-right: 8px;
`
