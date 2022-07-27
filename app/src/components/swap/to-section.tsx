// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { BlockchainToken } from '../../constants/types'

// Components
import { SwapSectionBox } from '../boxes'
import { SelectTokenButton } from '../buttons'
import { SwapInput } from '../inputs'

// Styled Components
import { Row, Column, Text, Loader } from '../shared.styles'

interface Props {
  getLocale: (key: string) => string
  onClickSelectToken: () => void
  onInputChange: (value: string) => void
  isLoading: boolean
  inputValue: string
  hasInputError: boolean
  token: BlockchainToken | undefined
  disabled: boolean
}

export const ToSection = (props: Props) => {
  const {
    getLocale,
    onClickSelectToken,
    onInputChange,
    token,
    inputValue,
    hasInputError,
    isLoading,
    disabled
  } = props

  return (
    <SwapSectionBox
      boxType='secondary'
    >
      <Row
        rowWidth='full'
      >
        <SelectTokenButton
          getLocale={getLocale}
          onClick={onClickSelectToken}
          token={token}
          buttonType='secondary'
        />
        <Column
          horizontalAlign='flex-end'
          verticalAlign={isLoading ? 'flex-start' : 'center'}
          columnHeight={isLoading ? 'full' : 'dynamic'}
        >
          {isLoading &&
            <Row>
              <Loader />
              <Text
                textSize='12px'
                textColor={hasInputError ? 'error' : 'text03'}
                isBold={false}
              >
                {getLocale('braveSwapFindingPrice')}
              </Text>
            </Row>
          }
          {!isLoading &&
            <SwapInput
              hasError={hasInputError}
              onChange={onInputChange}
              value={inputValue}
              disabled={disabled}
            />
          }
        </Column>
      </Row>
    </SwapSectionBox>
  )
}
