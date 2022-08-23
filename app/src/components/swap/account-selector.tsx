// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Context
import { useSwapContext } from '../../context/swap.context'

// Hooks
import { useWalletState } from '../../state/wallet'

// Types
import { WalletAccount } from '../../constants/types'

// Assets
import CaratDownIcon from '../../assets/carat-down-icon.svg'

// Components
import { AccountListButton } from '../buttons'

// Styled Components
import { Text, Icon } from '../shared.styles'

interface Props {
  disabled?: boolean
  selectedAccount: WalletAccount | undefined
  onSelectAccount: (account: WalletAccount) => void
}

export const AccountSelector = (props: Props) => {
  const { disabled, onSelectAccount, selectedAccount } = props

  // Context
  const { getLocale } = useSwapContext()

  // Wallet State
  const {
    state: { braveWalletAccounts }
  } = useWalletState()

  // State
  const [showAccountSelector, setShowAccountSelector] =
    React.useState<boolean>(false)

  // Methods
  const onToggleShowAccountSelector = React.useCallback(() => {
    setShowAccountSelector((prev) => !prev)
  }, [])

  const onClickSelectAccount = React.useCallback(
    (account: WalletAccount) => {
      onSelectAccount(account)
      setShowAccountSelector(false)
    },
    [onSelectAccount]
  )

  return (
    <SelectorWrapper>
      <SelectButton onClick={onToggleShowAccountSelector} disabled={disabled}>
        <Text textSize='12px' textColor='text02'>
          {selectedAccount
            ? selectedAccount.name
            : getLocale('braveSwapSelectAccount')}
        </Text>
        <StyledCaratDownIcon size={16} icon={CaratDownIcon} />
      </SelectButton>
      {showAccountSelector && (
        <SelectorBox>
          {braveWalletAccounts.map((account) => (
            <AccountListButton
              account={account}
              onClick={onClickSelectAccount}
              key={account.id}
            />
          ))}
        </SelectorBox>
      )}
    </SelectorWrapper>
  )
}

const SelectButton = styled.button`
  background-color: ${(p) => p.theme.color.legacy.background01};
  border: 1px solid ${(p) => p.theme.color.legacy.interactive08};
  border-radius: 4px;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px 12px;
  width: 200px;
  :disabled {
    opacity: 0.3;
  }
`

const SelectorWrapper = styled.div`
  display: flex;
  position: relative;
`

const SelectorBox = styled.div`
  --shadow-color: rgba(99, 105, 110, 0.36);
  @media (prefers-color-scheme: dark) {
    --shadow-color: rgba(0, 0, 0, 0.56);
  }
  background-color: ${(p) => p.theme.color.legacy.background01};
  width: 200px;
  position: absolute;
  z-index: 10;
  top: 36px;
  left: 0px;
  padding: 6px 4px 4px 4px;
  box-shadow: 0px 0px 24px var(--shadow-color);
  border-radius: 8px;
  box-sizing: border-box;
`

const StyledCaratDownIcon = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text01};
`
