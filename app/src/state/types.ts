// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import { BlockchainToken, Registry, NetworkInfo } from '../constants/types'

export type WalletState = {
  tokenBalances: Registry
  tokenList: BlockchainToken[]
  selectedAccount: string
  selectedNetwork: NetworkInfo
  supportedNetworks: NetworkInfo[]
  isConnected: boolean
  initialized: boolean
}

type UpdateTokenBalances = {
  type: 'updateTokenBalances'
  payload: Registry
}

type UpdateTokenList = {
  type: 'updateTokenList'
  payload: BlockchainToken[]
}

type UpdateSelectedNetwork = {
  type: 'updateSelectedNetwork'
  payload: NetworkInfo
}

type UpdateSupportedNetworks = {
  type: 'updateSupportedNetworks'
  payload: NetworkInfo[]
}

type UpdateSelectedAccount = {
  type: 'updateSelectedAccount'
  payload: string
}

type SetInitialized = {
  type: 'setInitialized'
}

export type WalletActions =
  | UpdateTokenBalances
  | UpdateTokenList
  | UpdateSelectedNetwork
  | UpdateSelectedAccount
  | SetInitialized
  | UpdateSupportedNetworks

export type Dispatch = (action: WalletActions) => void
