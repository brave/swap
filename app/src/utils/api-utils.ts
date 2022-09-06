// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { BlockchainToken } from '../constants/types'

// ToDo: Set up default fait currency instead of having hardcoded usd
export const constructCoinGeckoRateURL = (
  fromToken: BlockchainToken,
  toToken: BlockchainToken
) => {
  return `https://api.coingecko.com/api/v3/simple/price?ids=${fromToken.coingeckoId},${toToken.coingeckoId}&vs_currencies=usd`
}
