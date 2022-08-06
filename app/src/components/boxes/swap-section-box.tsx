// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

interface BoxStyleProps {
  boxType: 'primary' | 'secondary'
}

interface Props extends BoxStyleProps {
  children?: React.ReactNode
}

export const SwapSectionBox = (props: Props) => {
  const { boxType, children } = props

  return <Wrapper boxType={boxType}>{children}</Wrapper>
}

const Wrapper = styled.div<BoxStyleProps>`
  --box-background: ${(p) =>
    p.boxType === 'secondary'
      ? p.theme.color.legacy.background01
      : p.theme.color.secondary10};
  @media (prefers-color-scheme: dark) {
    --box-background: ${(p) =>
      p.boxType === 'secondary'
        ? p.theme.color.legacy.background01
        : p.theme.color.legacy.background02};
  }
  background-color: var(--box-background);
  box-sizing: border-box;
  border-radius: 16px;
  border: ${(p) =>
    p.boxType === 'secondary'
      ? `1px solid ${p.theme.color.legacy.divider01}`
      : 'none'};
  height: ${(p) => (p.boxType === 'secondary' ? '88px' : '114px')};
  padding: 14px 24px 14px 12px;
  width: 100%;
`
