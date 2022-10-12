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
  tokenList: [],
  selectedAccount: undefined,
  selectedNetwork: undefined,
  // ToDo: Add logic to updated if wallet is connected
  isConnected: false,
  supportedNetworks: [],
  braveWalletAccounts: [],
  supportedExchanges: [],
  // ToDo: Set up local storage for userSelectedExchanges
  // and other user prefs
  userSelectedExchanges: [],
  networkFeeEstimates: {} as Record<string, GasEstimate>,
  defaultBaseCurrency: '',
  isNetworkSupported: true
}

// Wallet State Reducer
const WalletReducer = (state: WalletState, action: WalletActions): WalletState => {
  switch (action.type) {
    case 'updateTokenBalances':
      return { ...state, tokenBalances: { ...state.tokenBalances, ...action.payload } }
    case 'updateSpotPrices':
      return { ...state, spotPrices: { ...state.spotPrices, ...action.payload } }
    case 'updateTokenList':
      return { ...state, tokenList: action.payload }
    case 'updateSelectedNetwork':
      return { ...state, selectedNetwork: action.payload }
    case 'updateSupportedNetworks':
      return { ...state, supportedNetworks: action.payload }
    case 'updateIsNetworkSupported':
      return { ...state, isNetworkSupported: action.payload }
    case 'updateSelectedAccount':
      return { ...state, selectedAccount: action.payload }
    case 'updateBraveWalletAccounts':
      return { ...state, braveWalletAccounts: action.payload }
    case 'updateSupportedExchanges':
      return { ...state, supportedExchanges: action.payload }
    case 'updateUserSelectedExchanges':
      return { ...state, userSelectedExchanges: action.payload }
    case 'updateDefaultBaseCurrency':
      return { ...state, defaultBaseCurrency: action.payload }
    case 'setIsConnected':
      return { ...state, isConnected: action.payload }
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
  const {
    getAllTokens,
    getBalance,
    getTokenPrice,
    getTokenBalance,
    getSelectedNetwork,
    getSelectedAccount,
    getSupportedNetworks,
    getBraveWalletAccounts,
    getExchanges,
    getDefaultBaseCurrency
  } = useSwapContext()

  // Wallet State
  const [state, dispatch] = useReducer(WalletReducer, initialState)
  const { tokenList, selectedAccount, selectedNetwork, supportedNetworks } = state

  React.useEffect(() => {
    // Gets Selected Network and then sets to state
    getSelectedNetwork()
      .then(result => dispatch({ type: 'updateSelectedNetwork', payload: result }))
      .catch(error => console.log(error))

    // Get Supported Swap Networks and then sets to state
    getSupportedNetworks()
      .then(result => dispatch({ type: 'updateSupportedNetworks', payload: result }))
      .catch(error => console.log(error))

    // Gets Selected Account and then sets to state
    getSelectedAccount()
      .then(result => dispatch({ type: 'updateSelectedAccount', payload: result }))
      .catch(error => console.log(error))

    // Gets a list of Brave Wallet Accounts and sets to state
    if (getBraveWalletAccounts) {
      getBraveWalletAccounts()
        .then(result => dispatch({ type: 'updateBraveWalletAccounts', payload: result }))
        .catch(error => console.log(error))
    }

    if (getDefaultBaseCurrency) {
      getDefaultBaseCurrency()
        .then(result =>
          dispatch({
            type: 'updateDefaultBaseCurrency',
            payload: result
          })
        )
        .catch(error => console.log(error))
    }

    getExchanges()
      .then(result => dispatch({ type: 'updateSupportedExchanges', payload: result }))
      .catch(error => console.log(error))
  }, [
    getSelectedNetwork,
    getSupportedNetworks,
    getSelectedAccount,
    getBraveWalletAccounts,
    getDefaultBaseCurrency,
    getExchanges
  ])

  React.useEffect(() => {
    // Gets all tokens and then sets to state
    if (tokenList.length === 0 && selectedNetwork !== undefined) {
      getAllTokens(selectedNetwork.chainId, selectedNetwork?.coin)
        .then(result => dispatch({ type: 'updateTokenList', payload: result }))
        .catch(error => console.log(error))
    }

    // Fetch spot price for native asset, and update the state. During
    // initialisation, the default asset is always the native one.
    if (selectedNetwork !== undefined) {
      getTokenPrice(selectedNetwork.symbol).then(result => {
        dispatch({
          type: 'updateSpotPrices',
          payload: {
            nativeAsset: Amount.normalize(result),
            makerAsset: Amount.normalize(result)
          }
        })
      })
    }

    if (selectedNetwork !== undefined && selectedAccount !== undefined) {
      tokenList.map(async token => {
        try {
          const result = token.isToken
            ? await getTokenBalance(
              token.contractAddress,
              selectedAccount.address,
              selectedAccount.coin,
              token.chainId
            )
            : await getBalance(
              selectedAccount.address,
              selectedNetwork.coin,
              selectedNetwork.chainId
            )

          dispatch({
            type: 'updateTokenBalances',
            payload: { [token.contractAddress.toLowerCase()]: Amount.normalize(result) }
          })
        } catch (e) {
          console.log(e)
        }
      })
    }
  }, [
    tokenList,
    selectedAccount,
    selectedNetwork,
    supportedNetworks,
    getTokenPrice,
    getAllTokens,
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
