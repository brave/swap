// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Assets
import DisconnectIcon from '~/assets/disconnect-icon.svg'
import HelpIcon from '~/assets/info-icon.svg'
import CloseIcon from '~/assets/close-icon.svg'

// Hiding Portfolio Section until we support it.
// import PortfolioIcon from '~/assets/portfolio-icon.svg'

// Context
import { useSwapContext } from '~/context/swap.context'

// Types
import { RefreshBlockchainStateParams, WalletAccount } from '~/constants/types'

// Components
import { AccountListItemButton } from './account-list-item-button'
import { AccountModalButton } from './account-modal-button'

// Styled Components
import {
  Text,
  Row,
  Column,
  VerticalDivider,
  StyledDiv,
  IconButton,
  ShownResponsiveRow
} from '~/components/shared.styles'

interface Props {
  onHideModal: () => void
  refreshBlockchainState: (
    overrides: Partial<RefreshBlockchainStateParams>
  ) => Promise<void>
}

export const AccountModal = (props: Props) => {
  const { onHideModal, refreshBlockchainState } = props

  // Context
  const { getLocale, walletAccounts, network, switchAccount, disconnectWallet } =
    useSwapContext()

  // Memos
  const networkAccounts = React.useMemo(() => {
    return walletAccounts.filter(account => account.coin === network.coin)
  }, [walletAccounts, network])

  // Methods
  const onSelectAccount = React.useCallback(
    async (account: WalletAccount) => {
      await switchAccount(account)
      onHideModal()
      await refreshBlockchainState({ account })
    },
    [onHideModal, switchAccount, refreshBlockchainState]
  )
  const onDisconnect = React.useCallback(async () => {
    if (disconnectWallet) {
      await disconnectWallet()
    }

    await onHideModal()
  }, [disconnectWallet, onHideModal])

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
        <Row verticalPaddingResponsive={8} horizontalPadding={10} rowWidth='full' marginBottom={4}>
          <Row>
            <Title textSize='12px' responsiveTextSize='16px' textColor='text02' isBold={false}>
              {getLocale('braveSwapAccounts')}
            </Title>
          </Row>
          <ShownResponsiveRow maxWidth={570}>
            <IconButton icon={CloseIcon} onClick={onHideModal} size={20} />
          </ShownResponsiveRow>
        </Row>
        {networkAccounts.map((account) => (
          <AccountListItemButton
            key={account.address}
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
        {disconnectWallet && (
          <AccountModalButton
            text={getLocale('braveSwapDisconnectWallet')}
            icon={DisconnectIcon}
            onClick={onDisconnect}
          />
        )}
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
  min-width: 280px;
  position: absolute;
  padding-bottom: 4px;
  z-index: 10;
  top: 42px;
  box-shadow: 0px 0px 16px var(--network-selector-shadow-color);
  right: 0px;
  border-radius: 16px;
  white-space: nowrap;
  @media screen and (max-width: 570px) {
    position: fixed;
    right: 0px;
    left: 0px;
    bottom: 0px;
    top: unset;
    width: auto;
    height: auto;
    border-radius: 16px 16px 0px 0px;
  }
`

const Title = styled(Text)`
  @media screen and (max-width: 570px) {
    font-weight: 600;
  }
`
