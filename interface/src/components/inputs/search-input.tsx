// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Assets
import SearchIcon from '~/assets/search-icon.svg'

// Styled Components
import { Icon, StyledInput } from '~/components/shared.styles'

interface Props {
  onChange: (value: string) => void
  value: string
  autoFocus?: boolean
  placeholder?: string
}

export const SearchInput = (props: Props) => {
  const { onChange, value, autoFocus, placeholder } = props

  const onInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    },
    [onChange]
  )

  return (
    <>
      <SearchIconStyle icon={SearchIcon} size={18} />
      <Input
        placeholder={placeholder}
        spellCheck={false}
        autoFocus={autoFocus}
        value={value}
        onChange={onInputChange}
      />
    </>
  )
}

const Input = styled(StyledInput)`
  flex: 1;
  ::placeholder {
    color: ${(p) => p.theme.color.legacy.text03};
  }
`

const SearchIconStyle = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text03};
  margin-right: 10px;
`
