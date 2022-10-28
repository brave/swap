// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.
import React from 'react'

import { useSwapContext } from '~/context/swap.context'
import { makeNetworkAsset } from '~/utils/assets'

// This hook prevents recreating the native asset when the network
// reference changes, but there's no actual change in its fields.
export const useNativeAsset = () => {
  const { network } = useSwapContext()
  return React.useMemo(
    () => makeNetworkAsset(network),
    [
      network.chainId,
      network.coin,
      network.symbol,
      network.symbolName,
      network.logo,
      network.decimals
    ]
  )
}
