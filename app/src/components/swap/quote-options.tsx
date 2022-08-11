// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { BlockchainToken, QuoteOption } from '../../constants/types'

// Components
import { SelectQuoteOptionButton } from '../buttons'

// Assets
import CaratDownIcon from '../../assets/carat-down-icon.svg'

// Styled Components
import { VerticalSpacer, Column, IconButton } from '../shared.styles'

interface Props {
  quoteOptions: QuoteOption[]
  selectedQuoteOption: QuoteOption
  getTokenSpotPrice: (contractAddress: string) => string
  onSelectQuoteOption: (option: QuoteOption) => void
  getLocale: (key: string) => string
}

export const QuoteOptions = (props: Props) => {
  const {
    quoteOptions,
    selectedQuoteOption,
    onSelectQuoteOption,
    getLocale,
    getTokenSpotPrice
  } = props

  const [showAllOptions, setShowAllOptions] = React.useState<boolean>(false)

  // Methods
  const onToggleShowAllOptions = React.useCallback(() => {
    setShowAllOptions((prev) => !prev)
  }, [])

  // Memos
  const filteredQuoteOptions: QuoteOption[] = React.useMemo(() => {
    if (showAllOptions) {
      return quoteOptions
    }
    return quoteOptions.slice(0, 2)
  }, [quoteOptions, showAllOptions])

  return (
    <>
      <VerticalSpacer size={15} />
      <Column columnHeight='dynamic' columnWidth='full'>
        {filteredQuoteOptions.map((option: QuoteOption, index) => (
          <SelectQuoteOptionButton
            getLocale={getLocale}
            isBest={index === 0}
            isSelected={selectedQuoteOption.id === option.id}
            onClick={() => onSelectQuoteOption(option)}
            option={option}
            getTokenSpotPrice={getTokenSpotPrice}
            key={option.id}
          />
        ))}
      </Column>
      <MoreOptionsButton
        isSelected={showAllOptions}
        icon={CaratDownIcon}
        onClick={onToggleShowAllOptions}
      />
    </>
  )
}

const MoreOptionsButton = styled(IconButton)<{
  isSelected: boolean
}>`
  transform: ${(p) => (p.isSelected ? 'rotate(180deg)' : 'unset')};
`
