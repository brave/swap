// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Styled Components
import { StyledButton } from '~/components/shared.styles'

interface Props {
  buttonText: string
  onClick: () => void
}

export const PresetButton = (props: Props) => {
  const { buttonText, onClick } = props

  return <Button onClick={onClick}>{buttonText}</Button>
}

const Button = styled(StyledButton)`
  background-color: var(--preset-button-background);
  border-radius: 4px;
  font-size: 14px;
  margin-right: 8px;
  padding: 1px 6px;
  text-transform: uppercase;
  &:hover:not([disabled]) {
    background-color: var(--preset-button-background-hover);
  }
`
