// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { BlockchainToken } from '../../constants/types'

// Components
import { SwapSectionBox } from '../boxes'
import { SelectTokenOrNetworkButton, PresetButton } from '../buttons'
import { SwapInput } from '../inputs'

// Styled Components
import { Row, Column, HorizontalDivider, Text } from '../shared.styles'

interface Props {
  getLocale: (key: string) => string
  onClickSelectToken: () => void
  onInputChange: (value: string) => void
  inputValue: string
  hasInputError: boolean
  token: BlockchainToken | undefined
  tokenBalance: number | undefined
  fiatValue: string | undefined
}

export const FromSection = (props: Props) => {
  const {
    token,
    getLocale,
    onClickSelectToken,
    onInputChange,
    hasInputError,
    inputValue,
    tokenBalance,
    fiatValue
  } = props

  // methods
  const onClickHalfPreset = () => {
    const balance = tokenBalance ?? 0
    const value = balance / 2
    onInputChange(value.toString())
  }

  const onClickMaxPreset = () => {
    const value = tokenBalance ?? 0
    onInputChange(value.toString())
  }

  // render
  return (
    <SwapSectionBox boxType='primary'>
      <Row rowWidth='full'>
        <Row>
          <SelectTokenOrNetworkButton
            onClick={onClickSelectToken}
            getLocale={getLocale}
            icon={token?.logo}
            text={token?.symbol}
            buttonType='primary'
          />
          {token && (
            <Row>
              <HorizontalDivider height={28} marginLeft={8} marginRight={8} />
              <PresetButton
                buttonText={getLocale('braveSwapHalf')}
                onClick={onClickHalfPreset}
              />
              <PresetButton
                buttonText={getLocale('braveSwapMax')}
                onClick={onClickMaxPreset}
              />
            </Row>
          )}
        </Row>
        <Column horizontalAlign='flex-end'>
          {token && (
            <Text
              textSize='14px'
              textColor={hasInputError ? 'error' : 'text02'}
              maintainHeight={true}
            >
              {tokenBalance !== undefined
                ? `${getLocale('braveSwapBalance')} ${tokenBalance}`
                : ''}
            </Text>
          )}
          <SwapInput
            onChange={onInputChange}
            value={inputValue}
            hasError={hasInputError}
            autoFocus={true}
          />
          {/* Todo: Setup locale for currency symbol */}
          {token && (
            <Text textSize='14px' textColor='text03' maintainHeight={true}>
              {fiatValue ? `$${fiatValue}` : ''}
            </Text>
          )}
        </Column>
      </Row>
    </SwapSectionBox>
  )
}
