// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

interface Props {
  children?: React.ReactNode
}

export const SwapContainer = (props: Props) => {
  const { children } = props
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  justify-content: flex-start;
  padding: 16px;
  width: 512px;
`
