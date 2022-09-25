// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { NetworkInfo } from '~/constants/types'

// Hooks
import { useNetworkFees } from '~/hooks/useNetworkFees'

// Styled Components
import { Text, Row } from '~/components/shared.styles'

interface Props {
  onClick: (network: NetworkInfo) => void
  network: NetworkInfo
}

export const NetworkListButton = (props: Props) => {
  const { network, onClick } = props

  // Hooks
  const { getNetworkFeeFiatEstimate } = useNetworkFees()

  // Methods
  const onSelectNetwork = React.useCallback(() => {
    onClick(network)
  }, [network, onClick])

  return (
    <Button onClick={onSelectNetwork}>
      <Row>
        <ButtonImage src={network.iconUrls[0]} />
        <Text isBold={true} textSize='14px'>
          {network.chainName}
        </Text>
      </Row>
      <Text textSize='14px'>{getNetworkFeeFiatEstimate(network)}</Text>
    </Button>
  )
}

const Button = styled.button`
  justify-content: space-between;
  padding: 8px 12px;
  white-space: nowrap;
  width: 100%;
  color: ${(p) => p.theme.color.legacy.text03};
  &:hover {
    color: ${(p) => p.theme.color.legacy.text01};
  }
`

const ButtonImage = styled.img`
  height: 24px;
  margin-right: 8px;
  width: 24px;
`
