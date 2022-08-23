// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

export interface Props {
  onChange: (value: string) => void
  value: string
  autoFocus?: boolean
  placeholder?: string
  disabled?: boolean
}

export const StandardInput = (props: Props) => {
  const { onChange, value, autoFocus, placeholder, disabled } = props

  const onInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    },
    [onChange]
  )

  return (
    <Input
      placeholder={placeholder}
      spellCheck={false}
      autoFocus={autoFocus}
      value={value}
      onChange={onInputChange}
      disabled={disabled}
    />
  )
}

const Input = styled.input`
  width: 100%;
  height: 32px;
  border: 1px solid ${(p) => p.theme.color.legacy.interactive08};
  border-radius: 4px;
  padding-left: 12px;
  font-weight: 200;
  ::placeholder {
    color: ${(p) => p.theme.color.legacy.text03};
    font-size: 14px;
    font-weight: 200;
  }
  :disabled {
    border: 1px solid ${(p) => p.theme.color.legacy.disabled};
    ::placeholder {
      color: ${(p) => p.theme.color.legacy.disabled};
    }
  }
`
