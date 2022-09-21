// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'

// Hooks
import { useWalletState } from '../state/wallet'

// Utils
import Amount from '../utils/amount'

// Types
import { NetworkInfo } from '../constants/types'

export const useNetworkFees = () => {
  // Wallet State
  const {
    state: { tokenSpotPrices, networkFeeEstimates, defaultBaseCurrency }
  } = useWalletState()

  const getNetworkFeeFiatEstimate = React.useCallback(
    (network: NetworkInfo) => {
      if (!networkFeeEstimates[network.chainId]) {
        return ''
      }
      return new Amount(tokenSpotPrices[network.symbol])
        .times(networkFeeEstimates[network.chainId].gasFee)
        .formatAsFiat(defaultBaseCurrency)
    },
    [tokenSpotPrices, networkFeeEstimates, defaultBaseCurrency]
  )

  return {
    getNetworkFeeFiatEstimate
  }
}
export default useNetworkFees
