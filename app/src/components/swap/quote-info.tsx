// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { BlockchainToken, QuoteOption } from '../../constants/types'

// Hooks
import { useNetworkFees } from '../../hooks/useNetworkFees'

// Context
import { useSwapContext } from '../../context/swap.context'
import { useWalletState } from '../../state/wallet'

// Utils
import { constructCoinGeckoRateURL } from '../../utils/api-utils'

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
  HorizontalSpacer,
  Icon
} from '../shared.styles'

interface Props {
  selectedQuoteOption: QuoteOption | undefined
  fromToken: BlockchainToken | undefined
  toToken: BlockchainToken | undefined
  toAmount: string
}

export const QuoteInfo = (props: Props) => {
  const { selectedQuoteOption, fromToken, toToken, toAmount } = props

  // Hooks
  const { getNetworkFeeFiatEstimate } = useNetworkFees()

  // Context
  const { getLocale } = useSwapContext()

  // Wallet State
  const { state } = useWalletState()
  const { tokenSpotPrices, selectedNetwork } = state

  // Memos
  const swapRate: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }

    return `1 ${selectedQuoteOption.fromToken.symbol} ≈ ${selectedQuoteOption.rate.format(6)} ${selectedQuoteOption.toToken.symbol}`
  }, [selectedQuoteOption])

  const coinGeckoImpact: string = React.useMemo(() => {
    if (
      fromToken !== undefined &&
      toToken !== undefined &&
      tokenSpotPrices &&
      selectedQuoteOption !== undefined
    ) {
      const fromTokenPrice = tokenSpotPrices[fromToken.contractAddress]
      const toTokenPrice = tokenSpotPrices[toToken.contractAddress]
      const coinGeckoRate = Number(toTokenPrice) / Number(fromTokenPrice)
      const coinGeckoMinimumReceived = Number(toAmount) * coinGeckoRate
      const impact =
        selectedQuoteOption.toAmount.toNumber() / coinGeckoMinimumReceived
      return impact.toFixed(2)
    }
    return ''
  }, [tokenSpotPrices, fromToken, toToken, selectedQuoteOption, toAmount])

  const swapImpact: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }
    return selectedQuoteOption.impact.format(6)
  }, [selectedQuoteOption])

  const minimumReceived: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }

    return selectedQuoteOption
      .minimumToAmount
      .formatAsAsset(6, selectedQuoteOption.toToken.symbol)
  }, [selectedQuoteOption])

  // Methods
  const coinGeckoAPIURL = React.useMemo(() => {
    if (fromToken && toToken) {
      return constructCoinGeckoRateURL(fromToken, toToken)
    }
    return ''
  }, [fromToken, toToken])

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
        <HorizontalSpacer size={1} />
        <Row>
          <Text
            textSize='14px'
            textColor={coinGeckoImpact > swapImpact ? 'error' : 'text01'}
          >
            {`< ${coinGeckoImpact}%`} {getLocale('braveSwapCoinGecko')}
          </Text>
          <HorizontalSpacer size={4} />
          <Link
            rel='noopener noreferrer'
            target='_blank'
            href={coinGeckoAPIURL}
          >
            {getLocale('braveSwapAPI')} {`>`}
          </Link>
        </Row>
      </Row>
      <Row rowWidth='full' marginBottom={10} horizontalPadding={16}>
        <Text textSize='14px'>{getLocale('braveSwapPriceImpact')}</Text>
        <Text textSize='14px'>
          {swapImpact === '0' ? `${swapImpact}%`: `< ${swapImpact}%`}
        </Text>
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
          <Text textSize='14px'>
            {selectedNetwork ? getNetworkFeeFiatEstimate(selectedNetwork) : ''}
          </Text>
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

export const Link = styled.a`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.color.legacy.interactive05};
  text-decoration: none;
  display: block;
  @media (prefers-color-scheme: dark) {
    color: ${(p) => p.theme.color.legacy.interactive06};
  }
`
