// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Assets
import ArrowIcon from '~/assets/arrow-icon.svg'

// Styled Components
import { Icon } from '~/components/shared.styles'

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
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 100%;
  box-shadow: var(--flip-tokens-button-shadow);
  height: 40px;
  position: absolute;
  width: 40px;
  z-index: 10;
  &:hover {
    --icon-color: var(--flip-tokens-button-icon-color-hover);
    background-color: var(--flip-tokens-button-background-hover);
  }
`

const ButtonIcon = styled(Icon)`
  background-color: var(--icon-color);
`
