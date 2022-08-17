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
import { useWalletDispatch } from '../../state/wallet'

// Types
import { NetworkInfo } from '../../constants/types'

// Components
import { SelectTokenOrNetworkButton, NetworkListButton } from '../buttons'
import { SearchInput } from '../inputs'

// Styled Components
import { HorizontalDivider } from '../shared.styles'

interface Props {
  onSearchChanged: (value: string) => void
  searchValue: string
  networkSelectorDisabled: boolean
}

export const SearchWithNetworkSelector = (props: Props) => {
  const { onSearchChanged, searchValue, networkSelectorDisabled } = props

  // Context
  const { getLocale } = useSwapContext()

  // Dispatch
  const { dispatch } = useWalletDispatch()

  // Wallet State
  const {
    state: { selectedNetwork, supportedNetworks }
  } = useWalletState()

  // State
  const [showNetworkSelector, setShowNetworkSelector] =
    React.useState<boolean>(false)

  const onSelectNetwork = React.useCallback(
    (network: NetworkInfo) => {
      dispatch({ type: 'updateSelectedNetwork', payload: network })
      setShowNetworkSelector(false)
    },
    [dispatch]
  )

  return (
    <Wrapper>
      <SearchInput
        placeholder={getLocale('braveSwapSearchToken')}
        autoFocus={true}
        onChange={onSearchChanged}
        value={searchValue}
      />
      <HorizontalDivider marginRight={8} height={24} />
      <SelectorWrapper>
        <SelectTokenOrNetworkButton
          icon={selectedNetwork.iconUrls[0]}
          onClick={() => setShowNetworkSelector(true)}
          text={selectedNetwork.chainName}
          buttonSize='small'
          disabled={networkSelectorDisabled}
        />
        {showNetworkSelector && (
          <SelectorBox>
            {supportedNetworks.map((network) => (
              <NetworkListButton
                key={network.chainId}
                onClick={onSelectNetwork}
                network={network}
              />
            ))}
          </SelectorBox>
        )}
      </SelectorWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.color.legacy.background01};
  border: 1px solid ${(p) => p.theme.color.legacy.disabled};
  border-radius: 4px;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  padding: 4px 8px 4px 12px;
  width: 100%;
`

const SelectorWrapper = styled.div`
  display: flex;
  position: relative;
`

const SelectorBox = styled.div`
  --shadow-color: rgba(99, 105, 110, 0.18);
  @media (prefers-color-scheme: dark) {
    --shadow-color: rgba(0, 0, 0, 0.36);
  }
  background-color: ${(p) => p.theme.color.legacy.background01};
  width: 158px;
  position: absolute;
  padding: 5px 0px;
  z-index: 10;
  top: 40px;
  right: -10px;
  box-shadow: 0px 0px 16px var(--shadow-color);
  border-radius: 4px;
`
