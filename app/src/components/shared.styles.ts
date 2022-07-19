// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components';

export const Text = styled.span<{
  textSize?: '20px' | '18px' | '16px'
  isBold?: boolean
}>`
  font-size: ${(p) => p.textSize ? p.textSize : 'inherit'};
  font-weight: ${(p) => p.isBold ? 500 : 'inherit'};
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
