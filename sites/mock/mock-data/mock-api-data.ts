// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { Registry } from '@brave/swap-interface'

// Mock Data
import { mockEthereumNetwork } from './mock-networks'
import { mockNativeTokenBalance, mockERC20TokenBalances } from './mock-token-balances'
import { mockAccount1 } from './mock-accounts'

export const mockEVMNetworksData: Record<
  string,
  Record<string, { nativeBalance: string; erc20Balances: Registry }>
> = {
  [mockAccount1.address]: {
    [mockEthereumNetwork.chainId]: {
      nativeBalance: mockNativeTokenBalance,
      erc20Balances: mockERC20TokenBalances
    }
  }
}
