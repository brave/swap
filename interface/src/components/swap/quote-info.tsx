// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { BlockchainToken, QuoteOption } from '~/constants/types'

// Constants
import LPMetadata from '~/constants/lpMetadata'

// Hooks
import { useNetworkFees } from '~/hooks/useNetworkFees'

// Context
import { useSwapContext } from '~/context/swap.context'
import { useWalletState } from '~/state/wallet'

// Utils
import { constructCoinGeckoRateURL } from '~/utils/api-utils'

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
  VerticalDivider,
  HorizontalSpacer,
  Icon,
  StyledDiv,
  StyledButton
} from '~/components/shared.styles'

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
  const { getLocale, network } = useSwapContext()

  // Wallet State
  const { state } = useWalletState()
  const { spotPrices } = state

  // State
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false)

  // Memos
  const swapRate: string = React.useMemo(() => {
    if (selectedQuoteOption === undefined) {
      return ''
    }

    return `1 ${selectedQuoteOption.fromToken.symbol} ≈ ${selectedQuoteOption.rate.format(6)} ${
      selectedQuoteOption.toToken.symbol
    }`
  }, [selectedQuoteOption])

  const coinGeckoImpact: string = React.useMemo(() => {
    if (
      fromToken !== undefined &&
      toToken !== undefined &&
      spotPrices.makerAsset &&
      spotPrices.takerAsset &&
      selectedQuoteOption !== undefined
    ) {
      const fromTokenPrice = spotPrices.makerAsset
      const toTokenPrice = spotPrices.takerAsset
      const coinGeckoRate = Number(toTokenPrice) / Number(fromTokenPrice)
      const coinGeckoMinimumReceived = Number(toAmount) * coinGeckoRate
      const impact = selectedQuoteOption.toAmount.toNumber() / coinGeckoMinimumReceived
      return impact.toFixed(2)
    }
    return ''
  }, [spotPrices, fromToken, toToken, selectedQuoteOption, toAmount])

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

    return selectedQuoteOption.minimumToAmount.formatAsAsset(6, selectedQuoteOption.toToken.symbol)
  }, [selectedQuoteOption])

  // Methods
  const coinGeckoAPIURL = React.useMemo(() => {
    if (fromToken && toToken) {
      return constructCoinGeckoRateURL(fromToken, toToken)
    }
    return ''
  }, [fromToken, toToken])

  const toggleShowAdvanced = React.useCallback(() => {
    setShowAdvanced(prev => !prev)
  }, [])

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
      {showAdvanced && (
        <>
          <Row rowWidth='full' marginBottom={10} horizontalPadding={16}>
            <HorizontalSpacer size={1} />
            <Row>
              <Text textSize='14px' textColor={coinGeckoImpact > swapImpact ? 'error' : 'text01'}>
                {`< ${coinGeckoImpact}%`} {getLocale('braveSwapCoinGecko')}
              </Text>
              <HorizontalSpacer size={4} />
              <Link rel='noopener noreferrer' target='_blank' href={coinGeckoAPIURL}>
                {getLocale('braveSwapAPI')} {`>`}
              </Link>
            </Row>
          </Row>

          <Row rowWidth='full' marginBottom={10} horizontalPadding={16}>
            <Text textSize='14px'>{getLocale('braveSwapPriceImpact')}</Text>
            <Text textSize='14px'>
              {swapImpact === '0' ? `${swapImpact}%` : `< ${swapImpact}%`}
            </Text>
          </Row>
          <Row rowWidth='full' marginBottom={8} horizontalPadding={16}>
            <Text textSize='14px' textAlign='left'>
              {getLocale('braveSwapMinimumReceivedAfterSlippage')}
            </Text>
            <Text textSize='14px' textAlign='right'>
              {minimumReceived}
            </Text>
          </Row>
          {selectedQuoteOption && selectedQuoteOption.sources.length > 0 && (
            <Row rowWidth='full' marginBottom={8} horizontalPadding={16}>
              <Text textSize='14px'>{getLocale('braveSwapLiquidityProvider')}</Text>
              <Row>
                {selectedQuoteOption.sources.map((source, idx) => (
                  <>
                    <Bubble>
                      <Text textSize='14px'>{source.name.split('_').join(' ')}</Text>
                      {LPMetadata[source.name] ? (
                        <LPIcon icon={LPMetadata[source.name]} size={16} />
                      ) : null}
                    </Bubble>

                    {idx !== selectedQuoteOption.sources.length - 1 && (
                      <LPSeparator textSize='14px'>
                        {selectedQuoteOption.routing === 'split' ? '+' : '×'}
                      </LPSeparator>
                    )}
                  </>
                ))}
              </Row>
            </Row>
          )}
        </>
      )}
      <Row rowWidth='full' marginBottom={16} horizontalPadding={16}>
        <Text textSize='14px'>{getLocale('braveSwapNetworkFee')}</Text>
        <Bubble>
          <FuelTank icon={FuelTankIcon} size={12} />
          <Text textSize='14px'>{getNetworkFeeFiatEstimate(network)}</Text>
        </Bubble>
      </Row>
      <VerticalDivider />
      <Row rowWidth='full' horizontalAlign='center' verticalPadding={7} horizontalPadding={16}>
        <AdvancedButton onClick={toggleShowAdvanced}>
          <Text textSize='14px' textColor='text03'>
            {getLocale('braveSwapAdvanced')}
          </Text>
          <HorizontalSpacer size={8} />
          <Arrow icon={CaratDownIcon} isSelected={showAdvanced} size={12} />
        </AdvancedButton>
      </Row>
      <VerticalDivider />
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

const AdvancedButton = styled(StyledButton)`
  padding: 0px;
`

const Arrow = styled(Icon)<{ isSelected: boolean }>`
  background-color: ${p => p.theme.color.legacy.text03};
  transform: ${p => (p.isSelected ? 'rotate(180deg)' : 'unset')};
  transition: transform 300ms ease;
`

const Bubble = styled(Row)`
  padding: 2px 8px;
  border-radius: 8px;
  background-color: var(--token-or-network-bubble-background);
`

const Link = styled.a`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--quote-info-link-color);
  text-decoration: none;
  display: block;
  :hover {
    color: #535bf2;
  }
`

const LPIcon = styled(StyledDiv)<{ icon: string; size: number }>`
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
