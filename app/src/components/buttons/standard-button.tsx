// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components';

interface StandardButtonStyleProps {
  buttonStyle?: 'round' | 'square'
  buttonType?: 'primary' | 'secondary'
  buttonWidth?: 'dynamic' | 'full'
  disabled?: boolean
  horizontalMargin?: number
  verticalMargin?: number
}

interface Props extends StandardButtonStyleProps {
  buttonText: string
  onClick: () => void
}

export const StandardButton = (props: Props) => {
  const {
    buttonStyle,
    buttonText,
    buttonType,
    buttonWidth,
    disabled,
    horizontalMargin,
    onClick,
    verticalMargin
  } = props

  return (
    <Button
      buttonStyle={buttonStyle}
      buttonType={buttonType}
      buttonWidth={buttonWidth}
      disabled={disabled}
      horizontalMargin={horizontalMargin}
      onClick={onClick}
      verticalMargin={verticalMargin}
    >
      {buttonText}
    </Button>
  )
}

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Button = styled.button<StandardButtonStyleProps>`
  --vertical-margin: ${(p) => p.verticalMargin ?? 0}px;
  --horizontal-margin: ${(p) => p.horizontalMargin ?? 0}px;
  width: ${(p) => p.buttonWidth === 'dynamic' ? 'unset' : '100%'};
  padding: 18px;
  background-color: ${(p) => p.buttonType === 'secondary' ? 'transparent' : p.disabled ? '#DADCE8' : '#4C54D2'};
  border-radius: ${(p) => p.buttonStyle === 'square' ? '0px' : '48px'};
  color: ${(p) => p.buttonType === 'secondary' ? '#212529' : '#FFFFFF'};
  margin: var(--vertical-margin) var(--horizontal-margin);
  border: ${(p) => p.buttonType === 'secondary' ? '1px solid #AEB1C2' : 'none'};
`
