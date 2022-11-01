// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React, { useReducer, useContext, createContext } from 'react'

// Types
import { WalletState, Dispatch, WalletActions } from './types'
import { Registry, GasEstimate } from '~/constants/types'

// Context
import { useSwapContext } from '~/context/swap.context'

// Utils
import Amount from '~/utils/amount'
import { useNativeAsset } from '~/hooks/useNativeAsset'

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

  // Swap Methods
  const { assetsList, network, account, getBalance, getTokenPrice, getTokenBalance } =
    useSwapContext()

  // Wallet State
  const [state, dispatch] = useReducer(WalletReducer, initialState)
  const nativeAsset = useNativeAsset()

  React.useEffect(() => {
    // Fetch spot price for native asset, and update the state. During
    // initialisation, the default asset is always the native one.
    getTokenPrice(nativeAsset).then(result => {
      dispatch({
        type: 'updateSpotPrices',
        payload: {
          nativeAsset: Amount.normalize(result),
          makerAsset: Amount.normalize(result)
        }
      })
    })

    const balancesPromise = Promise.all(
      assetsList.map(async asset => {
        try {
          const result = asset.isToken
            ? await getTokenBalance(
              asset.contractAddress,
              account.address,
              account.coin,
              asset.chainId
            )
            : await getBalance(account.address, network.coin, network.chainId)

          return {
            key: asset.contractAddress.toLowerCase(),
            value: Amount.normalize(result)
          }
        } catch (e) {
          console.error(`Error querying balance: error=${e} asset=`, JSON.stringify(asset))
          return {
            key: asset.contractAddress.toLowerCase(),
            value: ''
          }
        }
      })
    )

    ;(async () => {
      const balances = await balancesPromise

      // In the following code block, we're doing the following transformation:
      // {key: string, value: string}[] => { [key]: value }
      //
      // The balances array can be quite big, and copying the accumulated object
      // for each .reduce() pass can result in an overheard. We're therefore using
      // a mutable accumulator object, instead of Object.assign() or spread syntax.
      //
      // We also return a comma expression, which evaluates the expression
      // before the comma and returns the expression after the comma. This prevents
      // unnecessary assignments and object copy.
      //
      // We also filter out balance results from the array that could not be
      // fetched.
      const payload = balances
        .filter(item => item.value !== '')
        .reduce((obj, item) => (((obj as any)[item.key] = item.value), obj), {})

      await dispatch({
        type: 'updateTokenBalances',
        payload
      })
    })()
  }, [
    assetsList,
    account,
    network.coin,
    network.chainId,
    nativeAsset,
    getTokenPrice,
    getBalance,
    getTokenBalance,
    dispatch
  ])

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
