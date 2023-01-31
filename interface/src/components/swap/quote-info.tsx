// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { BlockchainToken, QuoteOption, SwapFee } from '~/constants/types'

// Constants
import LPMetadata from '~/constants/lpMetadata'

// Context
import { useSwapContext } from '~/context/swap.context'
import { useWalletState } from '~/state/wallet'

// Utils
import Amount from '~/utils/amount'

// Assets
import HorizontalArrowsIcon from '~/assets/horizontal-arrows-icon.svg'
import FuelTankIcon from '~/assets/fuel-tank-icon.svg'
import CaratDownIcon from '~/assets/carat-down-icon.svg'

// Styled Components
import {
  Column,
  Row,
  Text,
  VerticalSpacer,
  HorizontalSpacer,
  Icon,
  StyledDiv,
  IconButton
} from '~/components/shared.styles'

interface Props {
  selectedQuoteOption: QuoteOption | undefined
  fromToken: BlockchainToken | undefined
  toToken: BlockchainToken | undefined
  toAmount: string
}

export const QuoteInfo = (props: Props) => {
  const { selectedQuoteOption, fromToken, toToken } = props

  // Context
  const { getLocale } = useSwapContext()

  // State
  const [showProviders, setShowProviders] = React.useState<boolean>(false)

  // Wallet State
  const { state } = useWalletState()
  const { spotPrices } = state

  // Memos
  const swapRate: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }

    return `1 ${selectedQuoteOption.fromToken.symbol} ≈ ${selectedQuoteOption.rate.format(6)} ${selectedQuoteOption.toToken.symbol
      }`
  }, [selectedQuoteOption])

  const coinGeckoDelta: Amount = React.useMemo(() => {
    if (
      fromToken !== undefined &&
      toToken !== undefined &&
      spotPrices.makerAsset &&
      spotPrices.takerAsset &&
      selectedQuoteOption !== undefined
    ) {
      // Exchange rate is the value <R> in the following equation:
      // 1 FROM = <R> TO

      // CoinGecko rate computation:
      //   1 FROM = <R> TO
      //   1 FROM/USD = <R> TO/USD
      //   => <R> = (FROM/USD) / (TO/USD)
      const coinGeckoRate = new Amount(spotPrices.makerAsset).div(spotPrices.takerAsset)

      // Quote rate computation:
      //   <X> FROM = <Y> TO
      //   1 FROM = <R> TO
      //   => <R> = <Y>/<X>
      const quoteRate = selectedQuoteOption.rate

      // The trade is profitable if quoteRate > coinGeckoRate.
      return quoteRate.minus(coinGeckoRate).div(quoteRate).times(100)
    }

    return Amount.zero()
  }, [spotPrices, fromToken, toToken, selectedQuoteOption])

  const coinGeckoDeltaText: string = React.useMemo(() => {
    if (coinGeckoDelta.gte(0)) {
      return getLocale('braveSwapCoinGeckoCheaper').replace('$1', coinGeckoDelta.format(2))
    }

    if (coinGeckoDelta.gte(-1)) {
      return getLocale('braveSwapCoinGeckoWithin').replace('$1', coinGeckoDelta.times(-1).format(2))
    }

    return getLocale('braveSwapCoinGeckoExpensive').replace(
      '$1',
      coinGeckoDelta.times(-1).format(2)
    )
  }, [coinGeckoDelta])

  const coinGeckoDeltaColor = React.useMemo(() => {
    if (coinGeckoDelta.gte(-1)) {
      return 'success'
    }

    if (coinGeckoDelta.gte(-5)) {
      return 'warning'
    }

    return 'error'
  }, [coinGeckoDelta])

  const swapImpact: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }
    return selectedQuoteOption.impact.format(6)
  }, [selectedQuoteOption])

  const minimumReceived: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined || selectedQuoteOption.minimumToAmount === undefined) {
      return ''
    }

    return selectedQuoteOption.minimumToAmount.formatAsAsset(6, selectedQuoteOption.toToken.symbol)
  }, [selectedQuoteOption])

  const realBraveFee = React.useMemo(() => {
    if (!selectedQuoteOption) {
      return
    }

    const { braveFee } = selectedQuoteOption
    if (!braveFee) {
      return
    }

    return new Amount(100).minus(braveFee.discount).div(100).times(braveFee.fee)
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
        <HorizontalSpacer size={1} />
        <Row>
          <Text textSize='14px' textColor={coinGeckoDeltaColor}>
            {coinGeckoDeltaText}
          </Text>
        </Row>
      </Row>
      <Row rowWidth='full' marginBottom={10} horizontalPadding={16}>
        <Text textSize='14px'>{getLocale('braveSwapPriceImpact')}</Text>
        <Text textSize='14px'>{swapImpact === '0' ? `${swapImpact}%` : `~ ${swapImpact}%`}</Text>
      </Row>
      {minimumReceived !== '' && (
        <Row rowWidth='full' marginBottom={8} horizontalPadding={16}>
          <Text textSize='14px' textAlign='left'>
            {getLocale('braveSwapMinimumReceivedAfterSlippage')}
          </Text>
          <Text textSize='14px' textAlign='right'>
            {minimumReceived}
          </Text>
        </Row>
      )}
      {selectedQuoteOption && selectedQuoteOption.sources.length > 0 && (
        <Column columnWidth='full' marginBottom={8} horizontalPadding={16}>
          <Row rowWidth='full' marginBottom={8}>
            <Text textSize='14px' textAlign='left'>
              {getLocale('braveSwapLiquidityProvider')}
            </Text>
            <Row>
              <Text textSize='14px'>
                {selectedQuoteOption.sources.length}
              </Text>
              <HorizontalSpacer size={8} />
              <ExpandButton
                size={10}
                icon={CaratDownIcon}
                isExpanded={showProviders}
                onClick={() => setShowProviders(prev => !prev)}
              />
            </Row>
          </Row>
          {showProviders &&
            <Row rowWidth='full' horizontalAlign='flex-start' verticalPadding={6}>
              {selectedQuoteOption.sources.map((source, idx) => (
                <Row key={idx}>
                  <Bubble>
                    <Text textSize='12px'>{source.name.split('_').join(' ')}</Text>
                    {LPMetadata[source.name] ? (
                      <LPIcon icon={LPMetadata[source.name]} size={12} />
                    ) : null}
                  </Bubble>

                  {idx !== selectedQuoteOption.sources.length - 1 && (
                    <LPSeparator textSize='14px'>
                      {selectedQuoteOption.routing === 'split' ? '+' : '×'}
                    </LPSeparator>
                  )}
                </Row>
              ))}
            </Row>
          }
        </Column>
      )}
      {selectedQuoteOption && (
        <Row rowWidth='full' marginBottom={8} horizontalPadding={16}>
          <Text textSize='14px'>{getLocale('braveSwapNetworkFee')}</Text>
          <Bubble>
            <FuelTank icon={FuelTankIcon} size={12} />
            <Text textSize='14px'>{selectedQuoteOption.networkFee}</Text>
          </Bubble>
        </Row>
      )}
      {selectedQuoteOption?.braveFee && realBraveFee && (
        <Row rowWidth='full' marginBottom={16} horizontalPadding={16}>
          <Text textSize='14px'>{getLocale('braveSwapBraveFee')}</Text>
          <Text textSize='14px'>
            <BraveFeeContainer>
              {realBraveFee.isZero() && (
                <Text textSize='14px' textColor='success' isBold={true}>
                  {getLocale('braveSwapFree')}
                </Text>
              )}
              {realBraveFee.isZero() ? (
                <BraveFeeDiscounted textSize='14px' textColor='text03'>
                  {`${selectedQuoteOption.braveFee.fee}%`}
                </BraveFeeDiscounted>
              ) : (
                <Text textSize='14px'>{`${realBraveFee.format()}%`}</Text>
              )}
            </BraveFeeContainer>
          </Text>
        </Row>
      )}
    </Column>
  )
}

const HorizontalArrows = styled(Icon)`
  background-color: ${p => p.theme.color.legacy.text03};
  margin-left: 8px;
`

const FuelTank = styled(Icon)`
  background-color: ${p => p.theme.color.legacy.text02};
  margin-right: 6px;
`

const Bubble = styled(Row)`
  padding: 2px 8px;
  border-radius: 8px;
  background-color: var(--token-or-network-bubble-background);
`

const LPIcon = styled(StyledDiv) <{ icon: string; size: number }>`
  background-image: url(${p => p.icon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: ${p => p.size}px;
  width: ${p => p.size}px;
  margin-left: 6px;
  border-radius: 50px;
`

const LPSeparator = styled(Text)`
  padding: 0 6px;
`

const BraveFeeContainer = styled(Row)`
  gap: 4px;
`

const BraveFeeDiscounted = styled(Text)`
  text-decoration: line-through;
`

const ExpandButton = styled(IconButton) <{
  isExpanded: boolean
}>`
  transform: ${(p) => p.isExpanded ? 'rotate(180deg)' : 'unset'};
  transition: transform 300ms ease;
`
