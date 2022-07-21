// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode
}

export const SwapContainer = (props: Props) => {
  const { children } = props
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Wrapper = styled.div`
  box-sizing: border-box;
  justify-content: flex-start;
  background-color: #FFFFFF; 
  width: 512px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 16px;
`
