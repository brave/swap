// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import {
  BlockchainToken,
  Registry,
  NetworkInfo,
  WalletAccount,
  Exchange,
  GasEstimate
} from '~/constants/types'

export type WalletState = {
  tokenBalances: Registry
  tokenSpotPrices: Registry
  tokenList: BlockchainToken[]
  selectedAccount: WalletAccount | undefined
  selectedNetwork: NetworkInfo | undefined
  supportedNetworks: NetworkInfo[]
  isConnected: boolean
  initialized: boolean
  braveWalletAccounts: WalletAccount[]
  supportedExchanges: Exchange[]
  userSelectedExchanges: Exchange[]
  networkFeeEstimates: Record<string, GasEstimate>
  defaultBaseCurrency: string
}

type UpdateTokenBalances = {
  type: 'updateTokenBalances'
  payload: Registry
}

type UpdateTokenSpotPrices = {
  type: 'updateTokenSpotPrices'
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
  payload: WalletAccount
}

type UpdateBraveWalletAccounts = {
  type: 'updateBraveWalletAccounts'
  payload: WalletAccount[]
}

type UpdateSupportedExchanges = {
  type: 'updateSupportedExchanges'
  payload: Exchange[]
}

type UpdateUserSelectedExchanges = {
  type: 'updateUserSelectedExchanges'
  payload: Exchange[]
}

type UpdateNetworkFeeEstimates = {
  type: 'updateNetworkFeeEstimates'
  payload: Record<string, GasEstimate>
}

type UpdateDefaultBaseCurrency = {
  type: 'updateDefaultBaseCurrency'
  payload: string
}

type SetIsConnected = {
  type: 'setIsConnected'
  payload: boolean
}

type SetInitialized = {
  type: 'setInitialized'
}

export type WalletActions =
  | UpdateTokenBalances
  | UpdateTokenSpotPrices
  | UpdateTokenList
  | UpdateSelectedNetwork
  | UpdateSelectedAccount
  | UpdateBraveWalletAccounts
  | SetInitialized
  | UpdateSupportedNetworks
  | UpdateSupportedExchanges
  | UpdateUserSelectedExchanges
  | UpdateNetworkFeeEstimates
  | SetIsConnected
  | UpdateDefaultBaseCurrency

export type Dispatch = (action: WalletActions) => void
