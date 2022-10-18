// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Styled Components
import { StyledInput } from '~/components/shared.styles'

interface Props {
  onChange: (value: string) => void
  hasError: boolean
  value: string
  autoFocus?: boolean
  disabled?: boolean
}

export const SwapInput = (props: Props) => {
  const { onChange, value, autoFocus, hasError, disabled } = props

  const onInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    },
    [onChange]
  )

  return (
    <Input
      placeholder='0.0'
      type='number'
      spellCheck={false}
      autoFocus={autoFocus}
      value={value}
      hasError={hasError}
      onChange={onInputChange}
      disabled={disabled ?? false}
    />
  )
}

const Input = styled(StyledInput)<{
  hasError: boolean
}>`
  color: ${(p) => (p.hasError ? p.theme.color.red80 : 'inherit')};
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  text-align: right;
  width: 100%;
  ::placeholder {
    color: ${(p) => p.theme.color.legacy.text03};
  }
`
