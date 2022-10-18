// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Styled Components
import { StyledDiv, StyledButton } from '~/components/shared.styles'

interface Props {
  onClick: () => void
}

export const ThemeButton = (props: Props) => {
  const { onClick } = props

  return (
    <Button onClick={onClick}>
      <ButtonIcon />
    </Button>
  )
}

const Button = styled(StyledButton)`
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 100%;
  box-shadow: var(--theme-button-box-shadow);
  height: 40px;
  width: 40px;
  margin-right: 16px;
  &:hover {
    background-color: var(--theme-button-background-hover);
  }
`

const ButtonIcon = styled(StyledDiv)`
  height: 20px;
  width: 20px;
  background-image: var(--theme-button-icon);
  background-size: cover;
`
