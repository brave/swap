// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components';

// Assets
import ArrowIcon from '../../assets/arrow-icon.svg'

// Styled Components
import { Icon } from '../shared.styles'

interface Props {
  onClick: () => void
}

export const FlipTokensButton = (props: Props) => {
  const {
    onClick
  } = props

  return (
    <Wrapper>
      <Button onClick={onClick}>
        <ButtonIcon
          icon={ArrowIcon}
          size={24}
        />
      </Button>
    </Wrapper>
  )
}

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Wrapper = styled.div`
  width: 100%;
  height: 8px;
`

const Button = styled.button`
  width: 40px;
  height: 40px;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 10px rgba(99, 105, 110, 0.2);
  border-radius: 100%;
  position: absolute;
  z-index: 10;
  --icon-color: #495057;
  &:hover {
    --icon-color: #4C54D2;
  }
`

const ButtonIcon = styled(Icon)`
  background-color: var(--icon-color);
`
