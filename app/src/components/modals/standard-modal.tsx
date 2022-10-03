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

export const StandardModal = React.forwardRef<HTMLDivElement, Props>(
  (props: Props, forwardedRef) => {
    const { children, modalHeight } = props
    return (
      <Wrapper>
        <Modal ref={forwardedRef} modalHeight={modalHeight}>
          {children}
        </Modal>
      </Wrapper>
    )
  }
)

const Wrapper = styled.div`
  background-color: var(--standard-modal-background-color);
  bottom: 0%;
  left: 0%;
  position: absolute;
  right: 0%;
  top: 0%;
  z-index: 10;
`

const Modal = styled.div<{
  modalHeight?: 'standard' | 'full'
}>`
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 22px;
  box-shadow: var(--standard-modal-box-shadow);
  box-sizing: border-box;
  flex-direction: column;
  height: ${(p) => (p.modalHeight === 'full' ? '85%' : `520px`)};
  justify-content: flex-start;
  overflow: hidden;
  position: absolute;
  width: 440px;
  z-index: 20;
  @media screen and (max-width: 570px) {
    width: 90%;
  }
`
