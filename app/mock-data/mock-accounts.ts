// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { WalletAccount } from '../src/constants/types'

export const mockAccount1: WalletAccount = {
  id: '1',
  name: 'Account 1',
  address: '0xDE5239345745F76d52f17E3C1D65F7862A6d6E28',
  coin: 60
}

export const mockAccount2: WalletAccount = {
  id: '2',
  name: 'Account 2',
  address: '0x2d7A319Ab2EE09543949514575c9f5723efda229',
  coin: 60
}

export const mockAccount3: WalletAccount = {
  id: '3',
  name: 'Account 3',
  address: '0xd450e4D874D6A8251254124A4Cb1e0c9394572Ba',
  coin: 60
}

export const mockAccounts: WalletAccount[] = [
  {
    id: '1',
    name: 'Account 1',
    address: '0xDE5239345745F76d52f17E3C1D65F7862A6d6E28',
    coin: 60
  },
  {
    id: '2',
    name: 'Account 2',
    address: '0x2d7A319Ab2EE09543949514575c9f5723efda229',
    coin: 60
  },
  {
    id: '3',
    name: 'Account 3',
    address: '0xd450e4D874D6A8251254124A4Cb1e0c9394572Ba',
    coin: 60
  }
]
