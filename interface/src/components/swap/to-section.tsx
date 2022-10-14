// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Context
import { useSwapContext } from '~/context/swap.context'

// Types
import { BlockchainToken } from '~/constants/types'

// Components
import { SelectTokenOrNetworkButton } from '~/components/buttons'
import { SwapInput } from '~/components/inputs'

// Styled Components
import { Row, Column, Text, Loader, VerticalSpacer } from '~/components/shared.styles'

interface Props {
  onClickSelectToken: () => void
  onInputChange: (value: string) => void
  isLoading: boolean | undefined
  inputValue: string
  hasInputError: boolean
  token: BlockchainToken | undefined
  disabled: boolean
}

export const ToSection = (props: Props) => {
  const {
    onClickSelectToken,
    onInputChange,
    token,
    inputValue,
    hasInputError,
    isLoading,
    disabled
  } = props

  // context
  const { getLocale } = useSwapContext()

  return (
    <Column columnWidth='full'>
      <LoadingRow rowWidth='full' horizontalAlign='flex-end'>
        {isLoading && (
          <>
            <Loader />
            <Text
              textSize='12px'
              textColor={hasInputError ? 'error' : 'text03'}
              isBold={false}
            >
              {getLocale('braveSwapFindingPrice')}
            </Text>
          </>
        )}
      </LoadingRow>

      <Row rowWidth='full'>
        <SelectTokenOrNetworkButton
          onClick={onClickSelectToken}
          asset={token}
          text={token?.symbol}
          buttonType='secondary'
        />
        <SwapInput
          hasError={hasInputError}
          onChange={onInputChange}
          value={inputValue}
          disabled={disabled}
        />
      </Row>
      <VerticalSpacer size={6} />
    </Column>
  )
}

const LoadingRow = styled(Row)`
  margin-top: 2px;
  height: 4px;
`
