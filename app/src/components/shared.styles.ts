// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

export const Text = styled.span<{
  textSize?: '20px' | '18px' | '16px' | '14px' | '12px'
  isBold?: boolean
  textColor?: 'text01' | 'text02' | 'text03' | 'error'
  maintainHeight?: boolean
}>`
  --text01: ${(p) => p.theme.color.legacy.text01};
  --text02: ${(p) => p.theme.color.legacy.text02};
  --text03: ${(p) => p.theme.color.legacy.text03};
  --error: ${(p) => p.theme.color.red80};
  color: ${(p) => (p.textColor ? `var(--${p.textColor})` : 'inherit')};
  font-size: ${(p) => (p.textSize ? p.textSize : '18px')};
  font-weight: ${(p) => (p.isBold ? 500 : 400)};
  height: ${(p) => (p.maintainHeight ? '20px' : 'unset')};
  line-height: ${(p) => (p.textSize === '12px' ? '18px' : 'inherit')};
  letter-spacing: 0.02em;
`

export const Row = styled.div<{
  rowWidth?: 'dynamic' | 'full'
  marginBottom?: number
  horizontalPadding?: number
  verticalPadding?: number
}>`
  --vertical-padding: ${(p) => p.verticalPadding ?? 0}px;
  --horizontal-padding: ${(p) => p.horizontalPadding ?? 0}px;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(p) => p.marginBottom ?? 0}px;
  padding: var(--vertical-padding) var(--horizontal-padding);
  width: ${(p) => (p.rowWidth === 'full' ? '100%' : 'unset')};
`

export const Column = styled.div<{
  columnWidth?: 'dynamic' | 'full'
  columnHeight?: 'dynamic' | 'full'
  horizontalAlign?: 'flex-start' | 'center' | 'flex-end'
  verticalAlign?: 'flex-start' | 'center' | 'flex-end'
  marginBottom?: number
  horizontalPadding?: number
  verticalPadding?: number
}>`
  --vertical-padding: ${(p) => p.verticalPadding ?? 0}px;
  --horizontal-padding: ${(p) => p.horizontalPadding ?? 0}px;
  align-items: ${(p) => p.horizontalAlign ?? 'center'};
  box-sizing: border-box;
  height: ${(p) => (p.columnHeight === 'full' ? '100%' : 'unset')};
  justify-content: ${(p) => p.verticalAlign ?? 'center'};
  margin-bottom: ${(p) => p.marginBottom ?? 0}px;
  padding: var(--vertical-padding) var(--horizontal-padding);
  width: ${(p) => (p.columnWidth === 'full' ? '100%' : 'unset')};
`

export const HorizontalSpacer = styled.div<{
  size: number
}>`
  height: 100%;
  width: ${(p) => p.size}px;
`

export const HorizontalDivider = styled.div<{
  height?: number
  marginLeft?: number
  marginRight?: number
}>`
  background-color: ${(p) => p.theme.color.legacy.divider01};
  height: ${(p) => (p.height ? `${p.height}px` : '100%')};
  margin-left: ${(p) => p.marginLeft ?? 0}px;
  margin-right: ${(p) => p.marginRight ?? 0}px;
  width: 2px;
`

export const VerticalDivider = styled.div<{
  width?: number
  marginTop?: number
  marginBottom?: number
}>`
  background-color: ${(p) => p.theme.color.legacy.divider01};
  height: 2px;
  margin-top: ${(p) => p.marginTop ?? 0}px;
  margin-bottom: ${(p) => p.marginBottom ?? 0}px;
  width: ${(p) => (p.width ? `${p.width}px` : '100%')};
`

export const Icon = styled.div<{
  size: number
  icon: string
}>`
  -webkit-mask-image: url(${(p) => p.icon});
  height: ${(p) => p.size}px;
  mask-image: url(${(p) => p.icon});
  mask-size: contain;
  width: ${(p) => p.size}px;
`

export const Loader = styled.div`
  animation: spin 0.75s linear infinite;
  border: 2px solid transparent;
  border-top: 2px solid ${(p) => p.theme.color.legacy.text03};
  border-radius: 50%;
  height: 10px;
  margin-right: 6px;
  width: 10px;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
