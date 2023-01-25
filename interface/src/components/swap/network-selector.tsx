// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Context
import { useSwapContext } from '~/context/swap.context'

// Assets
import CloseIcon from '~/assets/close-icon.svg'

// Hooks
// import { useNetworkFees } from '~/hooks/useNetworkFees'

// Types
import { NetworkInfo } from '~/constants/types'

// Components
import { NetworkListButton } from '~/components/buttons'

// Styled Components
import {
  Text,
  Row,
  // VerticalDivider,
  VerticalSpacer,
  StyledDiv,
  IconButton
} from '~/components/shared.styles'

interface Props {
  onSelectNetwork: (network: NetworkInfo) => Promise<void>
  onClose?: () => void
  isHeader?: boolean
}

export const NetworkSelector = (props: Props) => {
  const { onSelectNetwork, onClose, isHeader } = props

  // Hooks
  // const { getNetworkFeeFiatEstimate } = useNetworkFees()

  // Context
  const {
    getLocale,
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
      <HeaderRow isHeader={isHeader} rowWidth='full' horizontalPadding={20} verticalPadding={12}>
        <Text textSize='20px' textColor='text01' isBold={true}>
          {getLocale('braveSwapChangeNetwork')}
        </Text>
        <IconButton icon={CloseIcon} onClick={onClose} size={20} />
      </HeaderRow>
      <VerticalSpacer size={4} />
      {supportedNetworks.map(network => (
        <NetworkListButton
          key={network.chainId}
          onClick={onSelectNetwork}
          network={network}
          isHeader={isHeader}
        />
      ))}
    </SelectorBox>
  )
}

const SelectorBox = styled(StyledDiv) <{
  isHeader?: boolean
}>`
  justify-content: flex-start;
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
  @media screen and (max-width: 570px) {
    position: ${p => (p.isHeader ? 'fixed' : 'absolute')};
    right: ${p => (p.isHeader ? '0px' : '-20px')};
    left: ${p => (p.isHeader ? '0px' : 'unset')};
    top: ${p => (p.isHeader ? '72px' : '40px')};
    bottom: ${p => (p.isHeader ? '0px' : 'unset')};
    width: ${p => (p.isHeader ? 'auto' : '90vw')};
    border-radius: ${p => (p.isHeader ? '16px 16px 0px 0px' : '4px')};
  }
`

const HeaderRow = styled(Row) <{
  isHeader?: boolean
}>`
  display: none;
  padding-top: 24px;
  @media screen and (max-width: 570px) {
    display: ${p => (p.isHeader ? 'flex' : 'none')};
  }
`
