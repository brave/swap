// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components';

interface Props {
  buttonText: string
  onClick: () => void
}

export const PresetButton = (props: Props) => {
  const {
    buttonText,
    onClick
  } = props

  return (
    <Button
      onClick={onClick}
    >
      {buttonText}
    </Button>
  )
}

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Button = styled.button`
  padding: 1px 6px;
  background-color: rgba(255, 255, 255, 0.6);;
  border-radius: 4px;
  font-size: 14px;
  text-transform: uppercase;
  margin-right: 8px;
  &:hover {
    background-color: rgba(218, 220, 232, 0.4);;
  }
`
