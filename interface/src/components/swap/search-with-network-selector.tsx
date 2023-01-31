// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Utils
import { reduceNetworkDisplayName } from '~/utils/reduce-network-name'

// Context
import { useSwapContext } from '~/context/swap.context'

// Types
import { NetworkInfo, RefreshBlockchainStateParams } from '~/constants/types'

// Components
import { SelectTokenOrNetworkButton } from '~/components/buttons'
import { SearchInput } from '~/components/inputs'
import { NetworkSelector } from './network-selector'

// Styled Components
import { HorizontalDivider, StyledDiv, HiddenResponsiveRow } from '~/components/shared.styles'

interface Props {
  onSearchChanged: (value: string) => void
  searchValue: string
  networkSelectorDisabled: boolean
  refreshBlockchainState: (overrides: Partial<RefreshBlockchainStateParams>) => Promise<void>
}

export const SearchWithNetworkSelector = (props: Props) => {
  const { onSearchChanged, refreshBlockchainState, searchValue, networkSelectorDisabled } = props

  // Context
  const { getLocale, network, switchNetwork } = useSwapContext()

  // State
  const [showNetworkSelector, setShowNetworkSelector] = React.useState<boolean>(false)

  const onSelectNetwork = React.useCallback(
    async (payload: NetworkInfo) => {
      const account = await switchNetwork(payload)
      setShowNetworkSelector(false)
      await refreshBlockchainState({ network: payload, account })
    },
    [switchNetwork, refreshBlockchainState]
  )

  return (
    <Wrapper>
      <SearchInput
        placeholder={getLocale('braveSwapSearchToken')}
        autoFocus={false}
        onChange={onSearchChanged}
        value={searchValue}
      />
      <HiddenResponsiveRow maxWidth={570}>
      <HorizontalDivider marginRight={8} height={24} />
      <SelectorWrapper>
        <SelectTokenOrNetworkButton
          network={network}
          onClick={() => setShowNetworkSelector(prev => !prev)}
          text={reduceNetworkDisplayName(network.chainName)}
          buttonSize='small'
          disabled={networkSelectorDisabled}
        />
        {showNetworkSelector && <NetworkSelector onSelectNetwork={onSelectNetwork} />}
      </SelectorWrapper>
      </HiddenResponsiveRow>
    </Wrapper>
  )
}

const Wrapper = styled(StyledDiv)`
  background-color: ${p => p.theme.color.legacy.background01};
  border: 1px solid ${p => p.theme.color.legacy.disabled};
  border-radius: 4px;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  padding: 4px 8px 4px 12px;
  width: 100%;
  min-height: 40px;
`

const SelectorWrapper = styled(StyledDiv)`
  display: flex;
  position: relative;
`
