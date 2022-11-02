// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React, { useReducer, useContext, createContext } from 'react'

// Types
import { WalletState, Dispatch, WalletActions } from './types'
import { Registry, GasEstimate } from '~/constants/types'

// Create Wallet State Context
const WalletStateContext = createContext<{ state: WalletState } | undefined>(undefined)

// Create Wallet State Dispatch Context
const WalletStateDispatchContext = createContext<{ dispatch: Dispatch } | undefined>(undefined)

// Wallet Initial State
const initialState: WalletState = {
  tokenBalances: {} as Registry,
  spotPrices: {
    makerAsset: '',
    takerAsset: '',
    nativeAsset: ''
  },
  // ToDo: Set up local storage for userSelectedExchanges
  // and other user prefs
  userSelectedExchanges: [],
  networkFeeEstimates: {} as Record<string, GasEstimate>
}

// Wallet State Reducer
const WalletReducer = (state: WalletState, action: WalletActions): WalletState => {
  switch (action.type) {
    case 'updateTokenBalances':
      return { ...state, tokenBalances: { ...state.tokenBalances, ...action.payload } }
    case 'updateSpotPrices':
      return { ...state, spotPrices: { ...state.spotPrices, ...action.payload } }
    case 'updateUserSelectedExchanges':
      return { ...state, userSelectedExchanges: action.payload }
    default:
      return state
  }
}

interface WalletStateProviderInterface {
  children?: React.ReactNode
}

// Wallet State Provider
const WalletStateProvider = (props: WalletStateProviderInterface) => {
  const { children } = props

  // Wallet State
  const [state, dispatch] = useReducer(WalletReducer, initialState)

  return (
    <WalletStateContext.Provider value={{ state }}>
      <WalletStateDispatchContext.Provider value={{ dispatch }}>
        {children}
      </WalletStateDispatchContext.Provider>
    </WalletStateContext.Provider>
  )
}

const useWalletState = () => {
  const context = useContext(WalletStateContext)
  if (context === undefined) {
    throw new Error('useWalletState must be used within a WalletStateProvider')
  }
  return context
}

const useWalletDispatch = () => {
  const context = useContext(WalletStateDispatchContext)
  if (context === undefined) {
    throw new Error('useWalletDispatch must be used within a WalletStateDispatchProvider')
  }
  return context
}

export { WalletStateProvider, useWalletState, useWalletDispatch }
