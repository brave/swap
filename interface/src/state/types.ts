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
  GasEstimate,
  SpotPrices
} from '~/constants/types'

export type WalletState = {
  tokenBalances: Registry
  spotPrices: SpotPrices
  tokenList: BlockchainToken[]
  selectedAccount: WalletAccount | undefined
  selectedNetwork: NetworkInfo | undefined
  supportedNetworks: NetworkInfo[]
  isConnected: boolean
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

type UpdateSpotPrices = {
  type: 'updateSpotPrices'
  payload: Partial<SpotPrices>
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

type UpdateDefaultBaseCurrency = {
  type: 'updateDefaultBaseCurrency'
  payload: string
}

type SetIsConnected = {
  type: 'setIsConnected'
  payload: boolean
}

export type WalletActions =
  | UpdateTokenBalances
  | UpdateSpotPrices
  | UpdateTokenList
  | UpdateSelectedNetwork
  | UpdateSelectedAccount
  | UpdateBraveWalletAccounts
  | UpdateSupportedNetworks
  | UpdateSupportedExchanges
  | UpdateUserSelectedExchanges
  | SetIsConnected
  | UpdateDefaultBaseCurrency

export type Dispatch = (action: WalletActions) => void
