// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { QuoteOption } from '../../constants/types'

// Components
import { SelectQuoteOptionButton } from '../buttons'

// Context
import { useSwapContext } from '../../context/swap.context'

// Assets
import CaratDownIcon from '../../assets/carat-down-icon.svg'

// Styled Components
import { VerticalSpacer, Column, IconButton } from '../shared.styles'

interface Props {
  options: QuoteOption[]
  selectedQuoteOptionIndex: number
  onSelectQuoteOption: (index: number) => void
}

export const QuoteOptions = (props: Props) => {
  const { options, selectedQuoteOptionIndex, onSelectQuoteOption } = props

  // Context
  const { getTokenPrice } = useSwapContext()

  // State
  const [showAllOptions, setShowAllOptions] = React.useState<boolean>(false)
  const [spotPrice, setSpotPrice] = React.useState<number | undefined>(
    undefined
  )

  // Effects
  React.useEffect(() => {
    let ignore = false
    if (options[selectedQuoteOptionIndex] !== undefined) {
      getTokenPrice(options[selectedQuoteOptionIndex].toToken.contractAddress)
        .then((result) => {
          if (!ignore) {
            setSpotPrice(Number(result.price))
          }
        })
        .catch((error) => console.log(error))
      return () => {
        ignore = true
      }
    }
  }, [options, selectedQuoteOptionIndex, getTokenPrice])

  // Methods
  const onToggleShowAllOptions = React.useCallback(() => {
    setShowAllOptions((prev) => !prev)
  }, [])

  // Memos
  const filteredQuoteOptions: QuoteOption[] = React.useMemo(() => {
    if (showAllOptions) {
      return options
    }
    return options.slice(0, 2)
  }, [options, showAllOptions])

  return (
    <>
      <VerticalSpacer size={15} />
      <Column columnHeight='dynamic' columnWidth='full'>
        {filteredQuoteOptions.map((option: QuoteOption, index) => (
          <SelectQuoteOptionButton
            isBest={index === 0}
            isSelected={selectedQuoteOptionIndex === index}
            onClick={() => onSelectQuoteOption(index)}
            option={option}
            spotPrice={spotPrice}
            key={index}
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
