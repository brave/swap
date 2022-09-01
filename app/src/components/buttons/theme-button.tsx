// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Assets
import DayIcon from '../../assets/day-icon.svg'
import NightIcon from '../../assets/night-icon.svg'

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

const Button = styled.button`
  // #f0f1fc does not exist in the design system
  --button-background-hover: #f0f1fc;
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  height: 40px;
  width: 40px;
  margin-right: 16px;
  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.36);
    // #484b67 does not exist in the design system
    --button-background-hover: #484b67;
  }
  &:hover {
    background-color: var(--button-background-hover);
  }
`

const ButtonIcon = styled.div`
  height: 20px;
  width: 20px;
  background-image: url(${DayIcon});
  background-size: cover;
  @media (prefers-color-scheme: dark) {
    background: url(${NightIcon});
  }
`
