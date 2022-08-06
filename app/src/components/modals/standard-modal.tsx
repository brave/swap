// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

interface Props {
  children?: React.ReactNode
  modalHeight?: 'standard' | 'full'
}

export const StandardModal = (props: Props) => {
  const { children, modalHeight } = props
  return (
    <Wrapper>
      <Modal modalHeight={modalHeight}>{children}</Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  // This RGBA value does not exist in the design system
  background-color: rgba(196, 196, 196, 0.3);
  bottom: 0%;
  left: 0%;
  position: absolute;
  right: 0%;
  top: 0%;
  z-index: 10;
  @media (prefers-color-scheme: dark) {
    // This RGBA value does not exist in the design system
    background-color: rgba(47, 47, 47, 0.46);
  }
`

const Modal = styled.div<{
  modalHeight?: 'standard' | 'full'
}>`
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 22px;
  box-shadow: 0px 0px 24px rgba(99, 105, 110, 0.36);
  box-sizing: border-box;
  flex-direction: column;
  height: ${(p) => (p.modalHeight === 'full' ? '85%' : `520px`)};
  justify-content: flex-start;
  overflow: hidden;
  position: absolute;
  width: 440px;
  z-index: 20;
  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.36);
  }
`
