// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { QuoteOption } from '../../constants/types'

// Styled Components
import { Text, Column } from '../shared.styles'

interface Props {
  onClick: (option: QuoteOption) => void
  getLocale: (key: string) => string
  getTokenSpotPrice: (contractAddress: string) => string
  option: QuoteOption
  isSelected: boolean
  isBest: boolean
}

export const SelectQuoteOptionButton = (props: Props) => {
  const { onClick, getLocale, getTokenSpotPrice, option, isSelected, isBest } =
    props

  // Methods
  const onSelectToken = React.useCallback(() => {
    onClick(option)
  }, [option, onClick])

  const quoteFiatValue = React.useMemo(() => {
    const spotPrice = getTokenSpotPrice(option.contractAddress)
    return Number(spotPrice) * Number(option.amount)
  }, [getTokenSpotPrice, option])

  return (
    <Button onClick={onSelectToken} isSelected={isSelected}>
      {isBest && (
        <BestOptionBadge isSelected={isSelected}>Best</BestOptionBadge>
      )}
      <Text isBold={true} textColor='text01' textSize='16px'>
        {getLocale('braveSwapOption')} {option.id}
      </Text>
      <Column horizontalAlign='flex-end'>
        <Text isBold={true} textColor='text01' textSize='16px'>
          {option.amount} {option.symbol}
        </Text>
        <Text textColor='text03' textSize='14px'>
          ~${quoteFiatValue.toFixed(2)}
        </Text>
      </Column>
    </Button>
  )
}

const Button = styled.button<{
  isSelected: boolean
}>`
  --button-background: #f9faff;
  --best-background: ${(p) =>
    p.isSelected
      ? p.theme.color.legacy.interactive05
      : p.theme.color.legacy.focusBorder};
  @media (prefers-color-scheme: dark) {
    --button-background: #222530;
  }
  background-color: var(--button-background);
  border-radius: 8px;
  justify-content: space-between;
  padding: 12px 24px;
  width: 100%;
  margin: 0px 0px 10px 10px;
  position: relative;
  box-sizing: border-box;
  box-shadow: ${(p) =>
    p.isSelected
      ? `0px 0px 0px 1px ${p.theme.color.legacy.interactive05} inset`
      : 'none'};
  &:hover {
    --best-background: ${(p) => p.theme.color.legacy.interactive05};
    box-shadow: 0px 0px 0px 1px ${(p) => p.theme.color.legacy.interactive05}
      inset;
  }
`

const BestOptionBadge = styled.div<{
  isSelected: boolean
}>`
  font-size: 12px;
  line-height: 20px;
  color: ${(p) => p.theme.color.white};
  border-radius: 7px 7px 7px 0px;
  background-color: var(--best-background);
  padding: 0px 16px;
  position: absolute;
  z-index: 5;
  top: -9px;
  left: 0px;
`
