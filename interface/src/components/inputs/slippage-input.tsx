// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Styled Components
import { Text, StyledDiv, StyledInput } from '~/components/shared.styles'

interface Props {
  onChange: (value: string) => void
  value: string
}

export const SlippageInput = (props: Props) => {
  const { onChange, value } = props

  // Methods
  const onInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    },
    [onChange]
  )

  return (
    <InputWrapper>
      <CustomSlippageInput
        type='number'
        value={value}
        onChange={onInputChange}
        placeholder='0'
      />
      <Text textSize='14px' textColor='text03' isBold={true}>
        %
      </Text>
    </InputWrapper>
  )
}

const InputWrapper = styled(StyledDiv)`
  display: flex;
  width: 94px;
  height: 32px;
  background-color: ${(p) => p.theme.color.legacy.background01};
  border: 1px solid ${(p) => p.theme.color.legacy.interactive08};
  border-radius: 4px;
  flex-direction: row;
  padding: 0px 12px;
  justify-content: space-between;
  box-sizing: border-box;
  &:focus-within {
    border: 1px solid var(--slippage-input-border-selected);
  }
`

const CustomSlippageInput = styled(StyledInput)`
  width: 50px;
  border: none;
  font-weight: 400;
  ::placeholder {
    color: ${(p) => p.theme.color.legacy.text03};
    font-size: 14px;
    font-weight: 200;
  }
  :disabled {
    ::placeholder {
      color: ${(p) => p.theme.color.legacy.disabled};
    }
  }
`
