// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

interface Props {
  buttonText: string
  onClick: () => void
}

export const PresetButton = (props: Props) => {
  const { buttonText, onClick } = props

  return <Button onClick={onClick}>{buttonText}</Button>
}

const Button = styled.button`
  // These RGBA values do not exist in the design system
  --button-background: rgba(255, 255, 255, 0.6);
  --button-background-hover: rgba(218, 220, 232, 0.4);
  @media (prefers-color-scheme: dark) {
    --button-background: rgba(52, 58, 64, 0.6);
    --button-background-hover: rgba(66, 69, 82, 0.8);
  }
  background-color: var(--button-background);
  border-radius: 4px;
  font-size: 14px;
  margin-right: 8px;
  padding: 1px 6px;
  text-transform: uppercase;
  &:hover:not([disabled]) {
    background-color: var(--button-background-hover);
  }
`
