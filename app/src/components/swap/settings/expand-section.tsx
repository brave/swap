// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Assets
import CaratDownIcon from '../../../assets/carat-down-icon.svg'

// Styled Components
import {
  Row,
  Column,
  Text,
  HorizontalSpacer,
  IconButton
} from '../../shared.styles'

interface Props {
  label: string
  value: string
  secondaryValue?: string
  onExpandOut?: () => void
  children?: React.ReactNode
}

export const ExpandSection = (props: Props) => {
  const { label, value, secondaryValue, children, onExpandOut } = props

  // State
  const [expanded, setExpanded] = React.useState<boolean>(false)

  // Methods
  const toggleExpanded = React.useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  // render
  return (
    <Column columnWidth='full'>
      <Row rowWidth='full' verticalPadding={16}>
        <Text textColor='text02' textSize='14px' isBold={true}>
          {label}
        </Text>
        <Row>
          <Text textColor='text01' textSize='14px' isBold={true}>
            {value}
          </Text>
          {secondaryValue && (
            <>
              <HorizontalSpacer size={4} />
              <Text textColor='text03' textSize='14px' isBold={true}>
                {secondaryValue}
              </Text>
            </>
          )}
          <HorizontalSpacer size={16} />
          <MoreButton
            size={16}
            icon={CaratDownIcon}
            isSelected={expanded}
            expandOut={onExpandOut !== undefined}
            onClick={onExpandOut ?? toggleExpanded}
          />
        </Row>
      </Row>
      {expanded && children}
    </Column>
  )
}

const MoreButton = styled(IconButton)<{
  isSelected: boolean
  expandOut?: boolean
}>`
  transform: ${(p) =>
    p.expandOut ? 'rotate(270deg)' : p.isSelected ? 'rotate(180deg)' : 'unset'};
  transition: transform 300ms ease;
`
