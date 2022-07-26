// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components';

export const Text = styled.span<{
  textSize?: '20px' | '18px' | '16px' | '14px' | '12px'
  isBold?: boolean
  textColor?: 'text01' | 'text02' | 'text03' | 'error'
  maintainHeight?: boolean
}>`
  --text01: #212529;
  --text02: #495057;
  --text03: #868E96;
  --error: #BD1531;
  font-size: ${(p) => p.textSize ? p.textSize : '18px'};
  font-weight: ${(p) => p.isBold ? 500 : 400};
  line-height: ${(p) => p.textSize === '12px' ? '18px' : 'inherit'};
  letter-spacing: 0.02em;
  color: ${(p) => p.textColor ? `var(--${p.textColor})` : 'inherit'};
  height: ${(p) => p.maintainHeight ? '20px' : 'unset'};
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
  width: ${(p) => p.rowWidth === 'full' ? '100%' : 'unset'};
  padding: var(--vertical-padding) var(--horizontal-padding);
  margin-bottom: ${(p) => p.marginBottom ?? 0}px;
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
  box-sizing: border-box;
  justify-content: ${(p) => p.verticalAlign ?? 'center'};
  align-items: ${(p) => p.horizontalAlign ?? 'center'};
  width: ${(p) => p.columnWidth === 'full' ? '100%' : 'unset'};
  height: ${(p) => p.columnHeight === 'full' ? '100%' : 'unset'};
  padding: var(--vertical-padding) var(--horizontal-padding);
  margin-bottom: ${(p) => p.marginBottom ?? 0}px;
`

export const HorizontalSpacer = styled.div<{
  size: number
}>`
  width: ${(p) => p.size}px;
  height: 100%;
`

export const HorizontalDivider = styled.div<{
  height?: number
  marginLeft?: number
  marginRight?: number
}>`
  width: 2px;
  background-color: #E9E9F4;
  height: ${(p) => p.height ? `${p.height}px` : '100%'};
  margin-left: ${(p) => p.marginLeft ?? 0}px;
  margin-right: ${(p) => p.marginRight ?? 0}px;
`

export const Icon = styled.div<{
  size: number
  icon: string
}>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  -webkit-mask-image: url(${(p) => p.icon});
  mask-image: url(${(p) => p.icon});
  mask-size: contain;
`

export const Loader = styled.div`
  border: 2px solid transparent;
  border-top: 2px solid #868E96;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 0.75s linear infinite;
  margin-right: 6px;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
