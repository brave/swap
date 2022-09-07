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
import { SelectTokenOrNetworkButton } from '../buttons'
import { SearchInput } from '../inputs'
import { NetworkSelector } from './network-selector'

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
    state: { selectedNetwork }
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
          icon={selectedNetwork?.iconUrls[0]}
          onClick={() => setShowNetworkSelector((prev) => !prev)}
          text={selectedNetwork?.chainName}
          buttonSize='small'
          disabled={networkSelectorDisabled}
        />
        {showNetworkSelector && (
          <NetworkSelector onSelectNetwork={onSelectNetwork} />
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
