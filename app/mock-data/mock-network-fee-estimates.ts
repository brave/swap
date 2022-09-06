// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { GasEstimate, ChainID } from '../src/constants/types'

export const mockNetworkFeeEstimates: Record<string, GasEstimate> = {
  [ChainID.ETHEREUM_MAINNET]: {
    gasFee: '0.0056',
    gasFeeGwei: '64',
    time: '1 min'
  },
  [ChainID.BINANCE_SMART_CHAIN]: {
    gasFee: '0.0038',
    gasFeeGwei: '36',
    time: '1 min'
  },
  [ChainID.AVALANCHE]: {
    gasFee: '0.0034',
    gasFeeGwei: '36',
    time: '1 min'
  },
  [ChainID.POLYGON]: {
    gasFee: '0.0030',
    gasFeeGwei: '36',
    time: '1 min'
  },
  [ChainID.CELO]: {
    gasFee: '0.0057',
    gasFeeGwei: '36',
    time: '1 min'
  },
  [ChainID.FANTOM]: {
    gasFee: '0.0071',
    gasFeeGwei: '36',
    time: '1 min'
  },
  [ChainID.OPTIMISM]: {
    gasFee: '0.0072',
    gasFeeGwei: '36',
    time: '1 min'
  },
  [ChainID.SOLANA_MAINNET]: {
    gasFee: '0.0034'
  }
}
