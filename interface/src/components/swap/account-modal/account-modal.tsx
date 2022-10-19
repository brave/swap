// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Assets
import DisconnectIcon from '~/assets/disconnect-icon.svg'
import HelpIcon from '~/assets/info-icon.svg'

// Hiding Porfolio Section until we support it.
// import PortfolioIcon from '~/assets/portfolio-icon.svg'

// Context
import { useSwapContext } from '~/context/swap.context'

// Types
import { WalletAccount } from '~/constants/types'

// Components
import { AccountListItemButton } from './account-list-item-button'
import { AccountModalButton } from './account-modal-button'

// Styled Components
import {
  Text,
  Row,
  Column,
  VerticalDivider,
  HorizontalSpacer,
  StyledDiv
} from '~/components/shared.styles'

interface Props {
  onHideModal: () => void
}

export const AccountModal = (props: Props) => {
  const { onHideModal } = props

  // Context
  const { getLocale, routeBackToWallet, walletAccounts, switchAccount } = useSwapContext()

  // Methods
  const onSelectAccount = React.useCallback(
    async (account: WalletAccount) => {
      await switchAccount(account)
      onHideModal()
    },
    [onHideModal, switchAccount]
  )

  const onRouteBackToWallet = React.useCallback(() => {
    if (routeBackToWallet) {
      routeBackToWallet()
      return
    }
    // ToDo: For the dotcom site we need a way to link out to brave://wallet
  }, [routeBackToWallet])

  const onClickHelpCenter = React.useCallback(() => {
    window.open(
      'https://support.brave.com/hc/en-us/articles/8155407080845-Brave-Swaps-FAQ'
    )
  }, [])

  return (
    <ModalBox>
      {/* Hiding Porfolio Section until we support it */}
      {/* <Column
        columnWidth='full'
        verticalPadding={16}
        horizontalPadding={16}
        horizontalAlign='flex-start'
        verticalAlign='flex-start'
      >
        <Text textSize='12px' textColor='text02' isBold={false}>
          {getLocale('braveSwapPortfolioBalance')}
        </Text>
        <VerticalSpacer size={10} />
        <Text textSize='16px' textColor='text01' isBold={true}>
          $10,731.32
        </Text>
      </Column>
      <VerticalDivider /> */}
      <Column
        columnWidth='full'
        verticalPadding={12}
        horizontalPadding={6}
        horizontalAlign='flex-start'
        verticalAlign='flex-start'
      >
        <Row rowWidth='full' horizontalAlign='flex-start' marginBottom={4}>
          <HorizontalSpacer size={10} />
          <Text textSize='12px' textColor='text02' isBold={false}>
            {getLocale('braveSwapAccounts')}
          </Text>
        </Row>
        {walletAccounts.map((account) => (
          <AccountListItemButton
            key={account.id}
            address={account.address}
            name={account.name}
            onClick={() => onSelectAccount(account)}
          />
        ))}
      </Column>
      <VerticalDivider />
      <Column
        columnWidth='full'
        verticalPadding={4}
        horizontalPadding={16}
        horizontalAlign='flex-start'
        verticalAlign='flex-start'
      >
        {/* Hiding Porfolio Section until we support it */}
        {/* <AccountModalButton
          text={getLocale('braveSwapMyPortfolio')}
          icon={PortfolioIcon}
          onClick={onClickViewPortfolio}
        /> */}
        <AccountModalButton
          text={getLocale('braveSwapWallet')}
          icon={DisconnectIcon}
          onClick={onRouteBackToWallet}
        />
        <AccountModalButton
          text={getLocale('braveSwapHelpCenter')}
          icon={HelpIcon}
          onClick={onClickHelpCenter}
        />
      </Column>
    </ModalBox>
  )
}

const ModalBox = styled(StyledDiv)`
  background-color: ${(p) => p.theme.color.legacy.background01};
  width: 280px;
  position: absolute;
  padding-bottom: 4px;
  z-index: 10;
  top: 42px;
  box-shadow: 0px 0px 16px var(--network-selector-shadow-color);
  right: 0px;
  border-radius: 16px;
`
