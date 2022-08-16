// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React, { useReducer, useContext, createContext, useEffect } from 'react'

// Types
import { WalletState, Dispatch, WalletActions } from './types'
import { NetworkInfo, Registry } from '../constants/types'

// Context
import { useSwapContext } from '../context/swap.context'

// Constants
import { NATIVE_ASSET_CONTRACT_ADDRESS_0X } from '../constants/magics'

// Create Wallet State Context
const WalletStateContext = createContext<{ state: WalletState } | undefined>(
  undefined
)

// Create Wallet State Dispatch Context
const WalletStateDispatchContext = createContext<
  { dispatch: Dispatch } | undefined
>(undefined)

// Wallet Initial State
const initialState: WalletState = {
  tokenBalances: {} as Registry,
  tokenList: [],
  selectedAccount: '',
  selectedNetwork: {} as NetworkInfo,
  // ToDo: Add logic to updated if wallet is connected
  isConnected: true,
  initialized: false,
  supportedNetworks: []
}

// Wallet State Reducer
const WalletReducer = (
  state: WalletState,
  action: WalletActions
): WalletState => {
  switch (action.type) {
    case 'updateTokenBalances':
      return { ...state, tokenBalances: action.payload }
    case 'updateTokenList':
      return { ...state, tokenList: action.payload }
    case 'updateSelectedNetwork':
      return { ...state, selectedNetwork: action.payload }
    case 'updateSupportedNetworks':
      return { ...state, supportedNetworks: action.payload }
    case 'updateSelectedAccount':
      return { ...state, selectedAccount: action.payload }
    case 'setInitialized':
      return { ...state, initialized: true }
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
    getERC20TokenBalance,
    getSelectedNetwork,
    getSelectedAccount,
    getSupportedNetworks
  } = useSwapContext()

  // Wallet State
  const [state, dispatch] = useReducer(WalletReducer, initialState)
  const {
    tokenList,
    selectedAccount,
    selectedNetwork,
    tokenBalances,
    initialized,
    supportedNetworks
  } = state

  React.useEffect(() => {
    if (!initialized) {
      // Gets Selected Network and then sets to state
      if (selectedNetwork.chainId === undefined) {
        getSelectedNetwork()
          .then((result) =>
            dispatch({ type: 'updateSelectedNetwork', payload: result })
          )
          .catch((error) => console.log(error))
      }

      // Get Supported Swap Networks and then sets to state
      if (supportedNetworks.length === 0) {
        getSupportedNetworks()
          .then((result) =>
            dispatch({ type: 'updateSupportedNetworks', payload: result })
          )
          .catch((error) => console.log(error))
      }

      // Gets Selected Account and then sets to state
      if (selectedAccount === '') {
        getSelectedAccount()
          .then((result) =>
            dispatch({ type: 'updateSelectedAccount', payload: result })
          )
          .catch((error) => console.log(error))
      }

      // Gets all tokens and then sets to state
      if (tokenList.length === 0) {
        getAllTokens(selectedNetwork.chainId, selectedNetwork.coin)
          .then((result) =>
            dispatch({ type: 'updateTokenList', payload: result.tokens })
          )
          .catch((error) => console.log(error))
      }

      // Gets all balances and sets to state
      if (!tokenBalances[NATIVE_ASSET_CONTRACT_ADDRESS_0X]) {
        let balances = tokenBalances
        Promise.all(
          tokenList.map(async (token) => {
            if (token.contractAddress === NATIVE_ASSET_CONTRACT_ADDRESS_0X) {
              // Get Native Token Balance
              await getBalance(
                selectedAccount,
                selectedNetwork.coin,
                selectedNetwork.chainId
              )
                .then((result) => {
                  balances[NATIVE_ASSET_CONTRACT_ADDRESS_0X] = result.balance
                  dispatch({ type: 'updateTokenBalances', payload: balances })
                })
                .catch((error) => console.log(error))
              return
            }
            // Get ERC721 Token Balances
            await getERC20TokenBalance(
              token.contractAddress,
              selectedAccount,
              token.chainId
            )
              .then((result) => {
                balances[token.contractAddress] = result.balance
                dispatch({ type: 'updateTokenBalances', payload: balances })
                dispatch({ type: 'setInitialized' })
              })
              .catch((error) => console.log(error))
          })
        )
      }
    }
  }, [
    tokenList,
    selectedAccount,
    selectedNetwork,
    tokenBalances,
    initialized,
    supportedNetworks,
    getAllTokens,
    getBalance,
    getERC20TokenBalance,
    getSelectedNetwork,
    getSelectedAccount,
    getSupportedNetworks,
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
    throw new Error(
      'useWalletDispatch must be used within a WalletStateDispatchProvider'
    )
  }
  return context
}

export { WalletStateProvider, useWalletState, useWalletDispatch }
