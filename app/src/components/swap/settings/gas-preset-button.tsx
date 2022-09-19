// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Types
import { GasFeeOption, GasEstimate } from '../../../constants/types'

// Context
import { useSwapContext } from '../../../context/swap.context'
import { useWalletState } from '../../../state/wallet'

// Styles
import { Column, Row, Text, Icon } from '../../shared.styles'

interface Props {
  isSelected: boolean
  option: GasFeeOption
  gasEstimates: GasEstimate
  onClick: () => void
}

export const GasPresetButton = (props: Props) => {
  const { onClick, isSelected, option, gasEstimates } = props

  // Context
  const { getLocale } = useSwapContext()

  // Wallet State
  const { state } = useWalletState()
  const { selectedNetwork } = state

  return (
    <Button onClick={onClick} isSelected={isSelected}>
      <Row>
        <IconWrapper>
          <ButtonIcon size={16} icon={option.icon} />
        </IconWrapper>
        <Column horizontalAlign='flex-start' columnHeight='full'>
          <Text textColor='text02' textSize='14px' isBold={true}>
            {getLocale(option.name)}
          </Text>
          <Text textColor='text03' textSize='12px' isBold={false}>
            {`<`} {gasEstimates.time}
          </Text>
        </Column>
      </Row>
      <Column horizontalAlign='flex-end' columnHeight='full'>
        <Text textColor='text02' textSize='14px' isBold={true}>
          {gasEstimates.gasFeeGwei} {getLocale('braveSwapGwei')}
        </Text>
        <Text textColor='text03' textSize='12px' isBold={false}>
          {gasEstimates.gasFee} {selectedNetwork?.symbol}
        </Text>
      </Column>
    </Button>
  )
}

const Button = styled.button<{
  isSelected: boolean
}>`
  --border-selected: ${(p) => p.theme.color.legacy.interactive05};
  @media (prefers-color-scheme: dark) {
    --border-selected: ${(p) => p.theme.color.legacy.focusBorder};
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 8px;
  border: 1px solid
    ${(p) =>
      p.isSelected ? 'var(--border-selected)' : p.theme.color.legacy.divider01};
  padding: 12px 16px;
  margin-bottom: 8px;
  &:hover {
    border: 1px solid var(--border-selected);
  }
`

const IconWrapper = styled.div`
  /* rgb(225, 226, 246) does not exist in design system */
  --background: rgba(225, 226, 246, 0.25);
  @media (prefers-color-scheme: dark) {
    /* rgb(118, 121, 177) does not exist in design system */
    --background: rgba(118, 121, 177, 0.25);
  }
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: var(--background);
  margin-right: 12px;
`

const ButtonIcon = styled(Icon)`
  --icon-color: ${(p) => p.theme.color.legacy.interactive05};
  @media (prefers-color-scheme: dark) {
    --icon-color: ${(p) => p.theme.color.legacy.interactive06};
  }
  background-color: var(--icon-color);
`
