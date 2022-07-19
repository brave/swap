// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import styled from 'styled-components';

interface BoxStyleProps {
  boxType: 'primary' | 'secondary'
}

interface Props extends BoxStyleProps {
  children?: React.ReactNode
}

export const Box = (props: Props) => {
  const { boxType, children } = props
  return (
    <Wrapper
      boxType={boxType}
    >
      {children}
    </Wrapper>
  )
}

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Wrapper = styled.div<BoxStyleProps>`
  box-sizing: border-box;
  background-color: ${(p) => p.boxType === 'secondary' ? '#FFFFFF' : '#F5F6FC'}; 
  width: 100%;
  border-radius: 16px;
  padding: 14px 24px;
  margin-bottom: ${(p) => p.boxType === 'secondary' ? '0px' : '8px'};
  border: ${(p) => p.boxType === 'secondary' ? '1px solid #E9E9F4' : 'none'};
  min-height: ${(p) => p.boxType === 'secondary' ? '88px' : '114px'};
`
