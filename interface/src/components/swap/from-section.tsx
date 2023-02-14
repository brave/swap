// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.
import React from 'react'

// Context
import { useSwapContext } from '~/context/swap.context'

// Types
import { BlockchainToken } from '~/constants/types'
import Amount from '~/utils/amount'

// Components
import { SwapSectionBox } from '~/components/boxes'
import { SelectTokenOrNetworkButton, PresetButton } from '~/components/buttons'
import { SwapInput } from '~/components/inputs'

// Styled Components
import { Row, Column, HorizontalDivider, Text, HiddenResponsiveRow } from '~/components/shared.styles'

interface Props {
  onClickSelectToken: () => void
  onInputChange: (value: string) => void
  inputValue: string
  hasInputError: boolean
  token: BlockchainToken | undefined
  tokenBalance: Amount
  fiatValue: string | undefined
}

export const FromSection = (props: Props) => {
  const {
    token,
    onClickSelectToken,
    onInputChange,
    hasInputError,
    inputValue,
    tokenBalance,
    fiatValue
  } = props

  // context
  const { getLocale, isWalletConnected, account } = useSwapContext()

  // methods
  const onClickHalfPreset = () => {
    if (!token) {
      return
    }
    onInputChange(tokenBalance.div(2).parseInteger().divideByDecimals(token.decimals).format(6))
  }

  const onClickMaxPreset = () => {
    if (!token) {
      return
    }
    onInputChange(tokenBalance.divideByDecimals(token.decimals).format())
  }

  // render
  return (
    <SwapSectionBox boxType='primary'>
      <Column columnWidth='full' columnHeight='full'>
        <Row rowWidth='full' horizontalAlign='flex-end'>
          {token && (
            <Text
              textSize='14px'
              textColor={hasInputError ? 'error' : 'text02'}
              maintainHeight={true}
            >
              {!tokenBalance.isUndefined() && isWalletConnected
                ? `${getLocale('braveSwapBalance')} ${tokenBalance
                  .divideByDecimals(token.decimals)
                  .format(6)}`
                : ''}
            </Text>
          )}
        </Row>
        <Row rowWidth='full' verticalAlign='center'>
          <Row>
            <SelectTokenOrNetworkButton
              onClick={onClickSelectToken}
              asset={token}
              text={token?.symbol}
              buttonType='primary'
            />
            {token && account !== undefined && (
              <Row>
                <HorizontalDivider height={28} marginLeft={8} marginLeftResponsive={6} marginRight={8} />
                <HiddenResponsiveRow maxWidth={570}>
                  <PresetButton buttonText={getLocale('braveSwapHalf')} onClick={onClickHalfPreset} />
                </HiddenResponsiveRow>
                <PresetButton buttonText={getLocale('braveSwapMax')} onClick={onClickMaxPreset} />
              </Row>
            )}
          </Row>
          <SwapInput
            onChange={onInputChange}
            value={inputValue}
            hasError={hasInputError}
            autoFocus={true}
          />
        </Row>
        <Row rowWidth='full' horizontalAlign='flex-end'>
          {/* Todo: Setup locale for currency symbol */}
          {token && (
            <Text textSize='14px' textColor='text03' maintainHeight={true}>
              {fiatValue}
            </Text>
          )}
        </Row>
      </Column>
    </SwapSectionBox>
  )
}
