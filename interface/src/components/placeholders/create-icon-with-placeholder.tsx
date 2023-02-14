// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import * as React from 'react'
import styled from 'styled-components'
import { background } from 'ethereum-blockies'

// Types
import { BlockchainToken, NetworkInfo } from '~/constants/types'

// Utils
import { isValidIconExtension } from '~/utils/string-utils'

// Styled Components
import { Text, StyledDiv } from '~/components/shared.styles'

interface Props {
  asset?: BlockchainToken
  network?: NetworkInfo
  size: number
  marginRight?: number
  isHeader?: boolean
}

export const CreateIconWithPlaceholder = (props: Props) => {
  const { size, marginRight, asset, network, isHeader } = props

  const needsPlaceholder = React.useMemo(() => {
    if (asset !== undefined) {
      return !isValidIconExtension(asset.logo)
    }
    if (network !== undefined) {
      return !isValidIconExtension(network.logo)
    }
    return true
  }, [network, asset])

  const bg = React.useMemo(() => {
    if (needsPlaceholder) {
      if (asset !== undefined) {
        return background({
          seed: asset.contractAddress
            ? asset.contractAddress.toLowerCase()
            : asset.name
        })
      }
      if (network !== undefined) {
        return background({
          seed: network.chainName
        })
      }
    }
    return ''
  }, [needsPlaceholder, asset, network])

  const placeholderText = React.useMemo(() => {
    if (needsPlaceholder) {
      if (asset !== undefined) {
        return asset.symbol.charAt(0)
      }
      if (network !== undefined) {
        return network.chainName.charAt(0)
      }
    }
    return ''
  }, [needsPlaceholder, asset, network])

  const logo = React.useMemo(() => {
    if (!needsPlaceholder) {
      if (asset !== undefined) {
        return asset.logo
      }
      if (network !== undefined) {
        return network.logo
      }
    }
    return ''
  }, [needsPlaceholder, asset, network])

  if (needsPlaceholder) {
    return (
      <IconWrapper size={size} panelBackground={bg} marginRight={marginRight}>
        <PlaceholderText>{placeholderText}</PlaceholderText>
      </IconWrapper>
    )
  }

  return <Icon isHeader={isHeader} size={size} src={logo} marginRight={marginRight} />
}

const IconWrapper = styled(StyledDiv) <{
  size: number
  panelBackground?: string
  marginRight?: number
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: ${(p) => p.size}px;
  width: ${(p) => p.size}px;
  border-radius: 100%;
  margin-right: ${(p) => (p.marginRight ? p.marginRight : 0)}px;
  background: ${(p) => (p.panelBackground ? p.panelBackground : 'none')};
`

const PlaceholderText = styled(Text)`
  color: ${(p) => p.theme.color.white};
`

const Icon = styled.img<{ size: number, marginRight?: number, isHeader?: boolean }>`
  height: ${(p) => p.size}px;
  width: ${(p) => p.size}px;
  margin-right: ${(p) => (p.marginRight ? p.marginRight : 0)}px;
  @media screen and (max-width: 570px) {
    height: ${(p) => p.isHeader ? 40 : p.size}px;
    width: ${(p) => p.isHeader ? 40 : p.size}px;
  }
`
