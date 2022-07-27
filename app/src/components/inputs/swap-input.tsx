// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import styled from 'styled-components';

export interface Props {
  onChange: (value: string) => void
  hasError: boolean
  value: string
  autoFocus?: boolean
  disabled?: boolean
}

export const SwapInput = (props: Props) => {
  const { onChange, value, autoFocus, hasError, disabled } = props

  const onInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }, [])

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

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Input = styled.input<{
  hasError: boolean
}>`
  width: 100%;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  text-align: right;
  color: ${(p) => p.hasError ? '#BD1531' : 'inherit'};
  ::placeholder {
    color: #7D7D7D;
  }
`
