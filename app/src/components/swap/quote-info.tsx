// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { BlockchainToken, QuoteOption } from '../../constants/types'

// Context
import { useSwapContext } from '../../context/swap.context'

// Assets
import HorizontalArrowsIcon from '../../assets/horizontal-arrows-icon.svg'
import FuelTankIcon from '../../assets/fuel-tank-icon.svg'

// Styled Components
import {
  Column,
  Row,
  Text,
  VerticalSpacer,
  VerticalDivider,
  Icon
} from '../shared.styles'

interface Props {
  selectedQuoteOption: QuoteOption | undefined
  fromToken: BlockchainToken | undefined
}

export const QuoteInfo = (props: Props) => {
  const { selectedQuoteOption, fromToken } = props

  // Context
  const { getLocale } = useSwapContext()

  // ToDo: Setup a useSwap hook to handle all these values and memos
  // https://github.com/brave/brave-browser/issues/24756

  const gasFeeFiatValue = '15.13'

  // Memos
  const swapRate: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }
    return `1 ${selectedQuoteOption.symbol} ≈ ${selectedQuoteOption.rate} ${
      fromToken?.symbol ?? ''
    }`
  }, [selectedQuoteOption, fromToken])

  const swapImpact: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }
    return `< ${selectedQuoteOption.impact}%`
  }, [selectedQuoteOption])

  const minimumReceived: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }
    const calculatedMinimum =
      Number(selectedQuoteOption.amount) -
      Number(selectedQuoteOption.impact) * Number(selectedQuoteOption.amount)

    return `${calculatedMinimum} ${selectedQuoteOption.symbol}`
  }, [selectedQuoteOption])

  return (
    <Column columnHeight='dynamic' columnWidth='full'>
      <VerticalSpacer size={16} />
      <Row rowWidth='full' marginBottom={10} horizontalPadding={16}>
        <Text textSize='14px'>{getLocale('braveSwapRate')}</Text>
        <Row>
          <Text textSize='14px'>{swapRate}</Text>
          <HorizontalArrows icon={HorizontalArrowsIcon} size={12} />
        </Row>
      </Row>
      <Row rowWidth='full' marginBottom={10} horizontalPadding={16}>
        <Text textSize='14px'>{getLocale('braveSwapPriceImpact')}</Text>
        <Text textSize='14px'>{swapImpact}</Text>
      </Row>
      <Row rowWidth='full' marginBottom={8} horizontalPadding={16}>
        <Text textSize='14px'>
          {getLocale('braveSwapMinimumReceivedAfterSlippage')}
        </Text>
        <Text textSize='14px'>{minimumReceived}</Text>
      </Row>
      <Row rowWidth='full' marginBottom={16} horizontalPadding={16}>
        <Text textSize='14px'>{getLocale('braveSwapNetworkFee')}</Text>
        <GasBubble>
          <FuelTank icon={FuelTankIcon} size={12} />
          <Text textSize='14px'>${gasFeeFiatValue}</Text>
        </GasBubble>
      </Row>
      <VerticalDivider />
    </Column>
  )
}

const HorizontalArrows = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text03};
  margin-left: 8px;
`

const FuelTank = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text02};
  margin-right: 6px;
`

const GasBubble = styled(Row)`
  padding: 2px 8px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.color.secondary10};
  @media (prefers-color-scheme: dark) {
    /* #282B37 does not exist in design system */
    background-color: #282b37;
  }
`
