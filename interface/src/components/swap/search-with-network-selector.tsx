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
import { NetworkInfo } from '~/constants/types'

// Components
import { SelectTokenOrNetworkButton } from '~/components/buttons'
import { SearchInput } from '~/components/inputs'
import { NetworkSelector } from './network-selector'

// Styled Components
import { HorizontalDivider, StyledDiv } from '~/components/shared.styles'

interface Props {
  onSearchChanged: (value: string) => void
  searchValue: string
  networkSelectorDisabled: boolean
}

export const SearchWithNetworkSelector = (props: Props) => {
  const { onSearchChanged, searchValue, networkSelectorDisabled } = props

  // Context
  const { getLocale, network, switchNetwork } = useSwapContext()

  // State
  const [showNetworkSelector, setShowNetworkSelector] = React.useState<boolean>(false)

  const onSelectNetwork = React.useCallback(
    async (network: NetworkInfo) => {
      await switchNetwork(network)
      setShowNetworkSelector(false)
    },
    [switchNetwork]
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
          network={network}
          onClick={() => setShowNetworkSelector(prev => !prev)}
          text={reduceNetworkDisplayName(network.chainName)}
          buttonSize='small'
          disabled={networkSelectorDisabled}
        />
        {showNetworkSelector && <NetworkSelector onSelectNetwork={onSelectNetwork} />}
      </SelectorWrapper>
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
`

const SelectorWrapper = styled(StyledDiv)`
  display: flex;
  position: relative;
`
