// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'
import { create } from 'ethereum-blockies'

// Assets
import CaratDownIcon from '~/assets/carat-down-icon.svg'

// Utils
import { reduceAddress } from '~/utils/reduce-address'

// Hooks
import { useSwapContext } from '~/context/swap.context'

// Styled Components
import { Text, HorizontalSpacer, HiddenResponsiveRow, StyledDiv, StyledButton, Icon } from '~/components/shared.styles'

interface Props {
  onClick: () => void
}

export const ConnectWalletButton = (props: Props) => {
  const { onClick } = props

  // context
  const { getLocale, account } = useSwapContext()

  // Memos
  const accountOrb: string | undefined = React.useMemo(() => {
    if (!account) {
      return
    }

    return create({
      seed: account.address.toLowerCase() || '',
      size: 8,
      scale: 16
    }).toDataURL()
  }, [account])

  return (
    <Button onClick={onClick} isConnected={account !== undefined}>
      {account ? (
        <>
          {accountOrb && <AccountCircle orb={accountOrb} />}{' '}
          <HiddenResponsiveRow>
            <Text textSize='14px' textColor='text01' isBold={true}>
              {account.name}
            </Text>
            <HorizontalSpacer size={4} />
          </HiddenResponsiveRow>
          <Text
            textSize='14px'
            textColor='text02'
            isBold={true}
            responsiveTextSize='12px'
          >
            {reduceAddress(account.address)}
          </Text>
          <HorizontalSpacer size={7} />
          <ButtonIcon
            size={12}
            icon={CaratDownIcon}
          />
        </>
      ) : (
        getLocale('braveSwapConnectWallet')
      )}
    </Button>
  )
}

const Button = styled(StyledButton) <{ isConnected: boolean }>`
  background-color: ${p =>
    p.isConnected
      ? 'var(--connect-wallet-button-background-connected)'
      : 'var(--connect-wallet-button-background-disconnected)'};
  border-radius: 48px;
  color: ${p => (p.isConnected ? p.theme.color.legacy.text01 : p.theme.color.white)};
  font-size: 14px;
  padding: ${p => (p.isConnected ? '8px 16px' : '10px 22px')};
  box-shadow: ${p => (p.isConnected ? '0px 0px 10px rgba(0, 0, 0, 0.05)' : 'none')};
  @media screen and (max-width: 570px) {
    font-size: 12px;
    padding: ${p => (p.isConnected ? '4px 8px' : '6px 16px')};
  }
`

const AccountCircle = styled(StyledDiv) <{ orb: string }>`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-image: url(${p => p.orb});
  background-size: cover;
  margin-right: 8px;
`

const ButtonIcon = styled(Icon)`
  display: none;
  background-color: ${(p) => p.theme.color.legacy.text01};
  @media screen and (max-width: 570px) {
    display: block;
  }
`
