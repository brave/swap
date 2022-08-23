// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

interface Props {
  label: string
  id: string
  isChecked: boolean
  onSetIsChecked: (value: string) => void
}

export const StandardRadio = (props: Props) => {
  const { label, id, onSetIsChecked, isChecked } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetIsChecked(event.target.value)
  }

  return (
    <Wrapper>
      <Radio
        type='radio'
        name='radio'
        id={id}
        value={id}
        onChange={(event) => handleChange(event)}
        checked={isChecked}
      />
      <Label isChecked={isChecked} htmlFor={id}>
        {label}
      </Label>
    </Wrapper>
  )
}

export const Radio = styled.input`
  --checked-color: ${(p) => p.theme.color.legacy.interactive05};
  @media (prefers-color-scheme: dark) {
    --checked-color: ${(p) => p.theme.color.legacy.interactive06};
  }
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  border: 2px solid ${(p) => p.theme.color.legacy.interactive08};
  cursor: pointer;
  border-radius: 100%;
  ::after {
    content: '';
    display: block;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    margin: 3px;
  }
  :checked {
    border: 2px solid var(--checked-color);
    ::after {
      background-color: var(--checked-color);
    }
  }
`

const Wrapper = styled.div`
  flex-direction: row;
  gap: 12px;
`

const Label = styled.label<{ isChecked: boolean }>`
  cursor: pointer;
  color: ${(p) =>
    p.isChecked ? p.theme.color.legacy.text01 : p.theme.color.legacy.text03};
`
