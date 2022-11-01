// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

interface Props {
  width?: number
  height?: number
  borderRadius?: number
  background?: 'primary' | 'secondary'
}

export const Skeleton = (props: Props) => {
  const { width, height, borderRadius, background } = props

  return (
    <Wrapper width={width} height={height} borderRadius={borderRadius} background={background}>
      <SkeletonBox width={width}>
        <SkeletonIndicator />
      </SkeletonBox>
    </Wrapper>
  )
}

const Wrapper = styled.div<Props>`
  display: block;
  box-sizing: border-box;
  width: ${(p) => (p.width ? `${p.width}px` : '100%')};
  height: ${(p) => (p.height ? `${p.height}px` : '100%')};
  border-radius: ${(p) => (p.borderRadius ? `${p.borderRadius}px` : 'none')};
  background-color: var(--token-or-network-button-background-hover-${(p) => p.background ? p.background : 'primary'});
  overflow: hidden;
`

const SkeletonBox = styled.div<{ width?: number }>`
  height: 100%;
  transform: translate(400%);
  --start-distance: ${(p) =>
    p.width ? (p.width < 60 ? '-1000%' : '-300%') : '-300%'};
  --end-distance: ${(p) =>
    p.width ? (p.width < 60 ? '1000%' : '300%') : '300%'};
  @keyframes identifier {
    0% {
      transform: translate(var(--start-distance));
    }
    100% {
      transform: translate(0%);
    }
    100% {
      transform: translate(var(--end-distance));
    }
  }
  animation: 3s identifier infinite linear;
`

const SkeletonIndicator = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${(p) => p.theme.color.legacy.divider01};
  box-shadow: 0 0 100px 100px ${(p) => p.theme.color.legacy.divider01};
`
