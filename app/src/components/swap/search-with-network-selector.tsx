// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { NetworkInfo } from '../../constants/types'

// Components
import { SelectTokenOrNetworkButton } from '../buttons'
import { SearchInput } from '../inputs'

// Styled Components
import { HorizontalDivider } from '../shared.styles'

interface Props {
  getLocale: (key: string) => string
  onSearchChanged: (value: string) => void
  searchValue: string
  selectedNetwork: NetworkInfo
  networkSelectorDisabled: boolean
}

export const SearchWithNetworkSelector = (props: Props) => {
  const {
    getLocale,
    onSearchChanged,
    searchValue,
    selectedNetwork,
    networkSelectorDisabled
  } = props

  const onOpenNetworkSelector = React.useCallback(() => {
    // Todo: Add logic here to display network selector.
  }, [])

  return (
    <Wrapper>
      <SearchInput
        placeholder={getLocale('braveSwapSearchToken')}
        autoFocus={true}
        onChange={onSearchChanged}
        value={searchValue}
      />
      <HorizontalDivider marginRight={8} height={24} />
      <SelectTokenOrNetworkButton
        icon={selectedNetwork.iconUrls[0]}
        getLocale={getLocale}
        onClick={onOpenNetworkSelector}
        text={selectedNetwork.chainName}
        buttonSize='small'
        disabled={networkSelectorDisabled}
      />
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
