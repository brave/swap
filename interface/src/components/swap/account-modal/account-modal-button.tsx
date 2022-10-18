// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Styled Components
import { Icon, StyledButton } from '~/components/shared.styles'

interface Props {
  icon: string
  text: string
  onClick: () => void
}

export const AccountModalButton = (props: Props) => {
  const { onClick, icon, text } = props

  return (
    <Button onClick={onClick}>
      <ButtonIcon size={16} icon={icon} />
      {text}
    </Button>
  )
}

const Button = styled(StyledButton)`
  display: flex;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 14px;
  color: ${(p) => p.theme.color.legacy.text02};
  width: 100%;
  margin: 0px;
  margin-right: 16px;
  padding: 12px 4px;
`

const ButtonIcon = styled(Icon)`
  background-color: ${(p) => p.theme.color.legacy.text02};
  margin-right: 10px;
`
