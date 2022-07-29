// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode
  modalHeight?: 'standard' | 'full'
}

export const StandardModal = (props: Props) => {
  const { children, modalHeight } = props
  return (
    <Wrapper>
      <Modal
        modalHeight={modalHeight}
      >
        {children}
      </Modal>
    </Wrapper>
  )
}

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Wrapper = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: rgba(196, 196, 196, 0.3);
  z-index: 10;
`

const Modal = styled.div<{
  modalHeight?: 'standard' | 'full'
}>`
  box-sizing: border-box;
  justify-content: flex-start;
  background-color: #FFFFFF; 
  width: 440px;
  height: ${(p) => p.modalHeight === 'full' ? '85%' : `520px`};
  box-shadow: 0px 0px 24px rgba(99, 105, 110, 0.36);
  border-radius: 22px;
  overflow: hidden;
  flex-direction: column;
  position: absolute;
  z-index: 20;
`
