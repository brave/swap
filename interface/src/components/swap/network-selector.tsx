// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Context
import { useSwapContext } from '~/context/swap.context'

// Hooks
// import { useNetworkFees } from '~/hooks/useNetworkFees'

// Types
import { NetworkInfo } from '~/constants/types'

// Components
import { NetworkListButton } from '~/components/buttons'

// Styled Components
import {
  // Text,
  // Row,
  // VerticalDivider,
  VerticalSpacer,
  StyledDiv
} from '~/components/shared.styles'

interface Props {
  onSelectNetwork: (network: NetworkInfo) => void
  isHeader?: boolean
}

export const NetworkSelector = (props: Props) => {
  const { onSelectNetwork, isHeader } = props

  // Hooks
  // const { getNetworkFeeFiatEstimate } = useNetworkFees()

  // Context
  const {
    // getLocale,
    supportedNetworks
  } = useSwapContext()

  return (
    <SelectorBox isHeader={isHeader}>

      {/* Disabling this until we support fee estimates */}

      {/* <VerticalSpacer size={12} />
      <Row horizontalPadding={12} rowWidth='full'>
        <Text textSize='12px' textColor='text03' isBold={false}>
          {getLocale('braveSwapName')}
        </Text>
        <Text textSize='12px' textColor='text03' isBold={false}>
          {getLocale('braveSwapNetworkFee')}
        </Text>
      </Row>
      <VerticalSpacer size={8} />
      <VerticalDivider /> */}
      <VerticalSpacer size={4} />
      {supportedNetworks.map(network => (
        <NetworkListButton key={network.chainId} onClick={onSelectNetwork} network={network} />
      ))}
    </SelectorBox>
  )
}

const SelectorBox = styled(StyledDiv)<{
  isHeader?: boolean
}>`
  background-color: ${p => p.theme.color.legacy.background01};
  min-width: 222px;
  position: absolute;
  padding-bottom: 4px;
  z-index: 10;
  top: ${p => (p.isHeader ? 42 : 40)}px;
  box-shadow: 0px 0px 16px var(--network-selector-shadow-color);
  right: ${p => (p.isHeader ? 'unset' : '-10px')};
  border-radius: ${p => (p.isHeader ? 16 : 4)}px;
  @media screen and (max-width: 800px) {
    right: ${p => (p.isHeader ? '0px' : 'unset')};
  }
`
