// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

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

const Button = styled.button<StandardButtonStyleProps>`
  --button-background: ${(p) =>
    p.buttonStyle === 'square'
      ? p.theme.color.legacy.divider01
      : p.buttonType === 'secondary'
      ? 'transparent'
      : p.theme.color.legacy.interactive05};
  --button-background-hover: ${(p) =>
    p.buttonStyle === 'square'
      ? p.theme.color.legacy.interactive05
      : p.theme.color.legacy.interactive04};
  --button-color-disabled: ${(p) => p.theme.color.white};
  --vertical-margin: ${(p) => p.verticalMargin ?? 0}px;
  --horizontal-margin: ${(p) => p.horizontalMargin ?? 0}px;
  @media (prefers-color-scheme: dark) {
    // #677078 does not exist in design system
    --button-color-disabled: #677078;
  }

  background-color: var(--button-background);
  border-radius: ${(p) => (p.buttonStyle === 'square' ? '0px' : '48px')};
  border: ${(p) =>
    p.buttonType === 'secondary'
      ? `1px solid ${p.theme.color.legacy.interactive08}`
      : 'none'};
  color: ${(p) =>
    p.buttonType === 'secondary' || p.buttonStyle === 'square'
      ? p.theme.color.legacy.text02
      : p.theme.color.white};
  font-size: ${(p) => (p.buttonStyle === 'square' ? '14px' : '16px')};
  margin: var(--vertical-margin) var(--horizontal-margin);
  padding: 18px;
  width: ${(p) => (p.buttonWidth === 'dynamic' ? 'unset' : '100%')};
  &:hover:not([disabled]) {
    background-color: var(--button-background-hover);
    color: ${(p) => p.theme.color.white};
  }
  :disabled {
    background-color: ${(p) => p.theme.color.legacy.disabled};
    color: var(--button-color-disabled);
  }
`
