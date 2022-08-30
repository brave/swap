// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Styled Components
import { Icon, Row } from '../shared.styles'

// Assets
import CheckIcon from '../../assets/check-icon.svg'

interface Props {
  label: string
  id: string
  isChecked: boolean
  labelSize?: '12px' | '14px'
  isBold?: boolean
  onChange: (id: string, checked: boolean) => void
}

export const StandardCheckbox = (props: Props) => {
  const { label, id, onChange, isChecked, labelSize, isBold } = props

  // Methods
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.id, event.target.checked)
  }

  return (
    <Row>
      <HiddenCheckBox
        type='checkbox'
        name='checkbox'
        id={id}
        onChange={handleChange}
        checked={isChecked}
      />
      <Label
        isChecked={isChecked}
        htmlFor={id}
        labelSize={labelSize}
        isBold={isBold}
      >
        <StyledCheckbox isChecked={isChecked}>
          {isChecked && <StyledIcon size={13} icon={CheckIcon} />}
        </StyledCheckbox>
        {label}
      </Label>
    </Row>
  )
}

export const HiddenCheckBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledIcon = styled(Icon)`
  background-color: ${(p) => p.theme.color.white};
`

const StyledCheckbox = styled.div<{ isChecked: boolean }>`
  width: 20px;
  height: 20px;
  background: ${(p) =>
    p.isChecked
      ? p.theme.color.legacy.interactive05
      : p.theme.color.legacy.background01};
  border-radius: 4px;
  box-shadow: ${(p) =>
    p.isChecked
      ? 'none'
      : `inset 0px 0px 0px 1px ${p.theme.color.legacy.interactive08}`};
`

const Label = styled.label<{
  isChecked: boolean
  labelSize?: '12px' | '14px'
  isBold?: boolean
}>`
  display: flex;
  flex-direction: row;
  gap: 12px;
  cursor: pointer;
  font-weight: ${(p) => (p.isBold ? 400 : 200)};
  font-size: ${(p) => (p.labelSize ? p.labelSize : '12px')};
  color: ${(p) => p.theme.color.legacy.text02};
`
