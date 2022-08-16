// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { Registry } from '../src/constants/types'

// Constants
import { NATIVE_ASSET_CONTRACT_ADDRESS_0X } from '../src/constants/magics'

export const mockSpotPrices: Registry = {
  [NATIVE_ASSET_CONTRACT_ADDRESS_0X]: '23122.20',
  '0x1': '0.4487',
  '0x2': '316.54',
  '0x3': '40.27',
  '0x4': '1.00',
  '0x5': '1.44',
  '0x6': '1.00',
  '0x7': '0.8827',
  '0x8': '0.3241',
  '0x9': '0.8039'
}
