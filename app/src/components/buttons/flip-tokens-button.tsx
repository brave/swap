// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Assets
import ArrowIcon from '../../assets/arrow-icon.svg'

// Styled Components
import { Icon } from '../shared.styles'

interface Props {
  onClick: () => void
}

export const FlipTokensButton = (props: Props) => {
  const { onClick } = props

  return (
    <Wrapper>
      <Button onClick={onClick}>
        <ButtonIcon icon={ArrowIcon} size={24} />
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 8px;
  width: 100%;
`

const Button = styled.button`
  --icon-color: ${(p) => p.theme.color.legacy.text02};
  --icon-color-hover: ${(p) => p.theme.color.legacy.interactive05};
  // #f0f1fc does not exist in the design system
  --button-background-hover: #f0f1fc;
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 100%;
  box-shadow: 0px 0px 10px rgba(99, 105, 110, 0.2);
  height: 40px;
  position: absolute;
  width: 40px;
  z-index: 10;
  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.36);
    // #484b67 does not exist in the design system
    --button-background-hover: #484b67;
    --icon-color-hover: ${(p) => p.theme.color.legacy.focusBorder};
  }
  &:hover {
    --icon-color: var(--icon-color-hover);
    background-color: var(--button-background-hover);
  }
`

const ButtonIcon = styled(Icon)`
  background-color: var(--icon-color);
`
