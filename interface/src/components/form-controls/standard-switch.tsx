// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

interface Props {
  isChecked: boolean
  onSetIsChecked: (isChecked: boolean) => void
}

export const StandardSwitch = (props: Props) => {
  const { isChecked, onSetIsChecked } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSetIsChecked(event.target.checked)

  return (
    <Label>
      <Input checked={isChecked} type='checkbox' onChange={handleChange} />
      <Switch />
    </Label>
  )
}

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Switch = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 48px;
  height: 24px;
  background: var(--standard-switch-unchecked-background);
  border-radius: 32px;
  padding: 2px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: ${(p) => p.theme.color.legacy.background01};
    transform: translate(0, -50%);
  }
`

const Input = styled.input`
  display: none;

  &:checked + ${Switch} {
    background: var(--standard-switch-checked-background);

    &:before {
      transform: translate(20px, -50%);
      background: var(--standard-switch-button-checked-background);
    }
  }
`
