// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import { Registry, Exchange, GasEstimate, SpotPrices } from '~/constants/types'

export type WalletState = {
  tokenBalances: Registry
  spotPrices: SpotPrices
  isConnected: boolean
  userSelectedExchanges: Exchange[]
  networkFeeEstimates: Record<string, GasEstimate>
}

type UpdateTokenBalances = {
  type: 'updateTokenBalances'
  payload: Registry
}

type UpdateSpotPrices = {
  type: 'updateSpotPrices'
  payload: Partial<SpotPrices>
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
  | UpdateUserSelectedExchanges
  | SetIsConnected
  | UpdateDefaultBaseCurrency

export type Dispatch = (action: WalletActions) => void
