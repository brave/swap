// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.
import React from 'react'

// Context
import { useSwapContext } from '~/context/swap.context'
import { useWalletState } from '~/state/wallet'

// Types
import { BlockchainToken } from '~/constants/types'
import Amount from '~/utils/amount'

// Components
import { SwapSectionBox } from '~/components/boxes'
import { SelectTokenOrNetworkButton, PresetButton } from '~/components/buttons'
import { SwapInput } from '~/components/inputs'

// Styled Components
import { Row, Column, HorizontalDivider, Text } from '~/components/shared.styles'

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
  const { getLocale } = useSwapContext()

  // Wallet State
  const {
    state: { isConnected }
  } = useWalletState()

  // methods
  const onClickHalfPreset = () => {
    if (!token) {
      return
    }
    onInputChange(tokenBalance.divideByDecimals(token.decimals).div(2).format())
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
      <Row rowWidth='full'>
        <Row>
          <SelectTokenOrNetworkButton
            onClick={onClickSelectToken}
            asset={token}
            text={token?.symbol}
            buttonType='primary'
          />
          {token && (
            <Row>
              <HorizontalDivider height={28} marginLeft={8} marginRight={8} />
              <PresetButton buttonText={getLocale('braveSwapHalf')} onClick={onClickHalfPreset} />
              <PresetButton buttonText={getLocale('braveSwapMax')} onClick={onClickMaxPreset} />
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
              {!tokenBalance.isUndefined() && isConnected
                ? `${getLocale('braveSwapBalance')} ${tokenBalance
                  .divideByDecimals(token.decimals)
                  .format(6)}`
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
              {fiatValue}
            </Text>
          )}
        </Column>
      </Row>
    </SwapSectionBox>
  )
}
