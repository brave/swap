// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React, { useReducer, useContext, createContext, useEffect } from 'react'

// Types
import { WalletState, Dispatch, WalletActions } from './types'
import { Registry, GasEstimate } from '../constants/types'

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
  tokenSpotPrices: {} as Registry,
  tokenList: [],
  selectedAccount: '',
  selectedNetwork: undefined,
  // ToDo: Add logic to updated if wallet is connected
  isConnected: false,
  initialized: false,
  supportedNetworks: [],
  braveWalletAccounts: [],
  supportedExchanges: [],
  // ToDo: Set up local storage for userSelectedExchanges
  // and other user prefs
  userSelectedExchanges: [],
  networkFeeEstimates: {} as Record<string, GasEstimate>,
  defaultBaseCurrency: ''
}

// Wallet State Reducer
const WalletReducer = (
  state: WalletState,
  action: WalletActions
): WalletState => {
  switch (action.type) {
    case 'updateTokenBalances':
      return { ...state, tokenBalances: action.payload }
    case 'updateTokenSpotPrices':
      return { ...state, tokenBalances: action.payload }
    case 'updateTokenList':
      return { ...state, tokenList: action.payload }
    case 'updateSelectedNetwork':
      return { ...state, selectedNetwork: action.payload }
    case 'updateSupportedNetworks':
      return { ...state, supportedNetworks: action.payload }
    case 'updateSelectedAccount':
      return { ...state, selectedAccount: action.payload }
    case 'updateBraveWalletAccounts':
      return { ...state, braveWalletAccounts: action.payload }
    case 'updateSupportedExchanges':
      return { ...state, supportedExchanges: action.payload }
    case 'updateUserSelectedExchanges':
      return { ...state, userSelectedExchanges: action.payload }
    case 'updateNetworkFeeEstimates':
      return { ...state, networkFeeEstimates: action.payload }
    case 'updateDefaultBaseCurrency':
      return { ...state, defaultBaseCurrency: action.payload }
    case 'setIsConnected':
      return { ...state, isConnected: action.payload }
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
    getTokenPrice,
    getERC20TokenBalance,
    getSelectedNetwork,
    getSelectedAccount,
    getSupportedNetworks,
    getBraveWalletAccounts,
    getExchanges,
    getNetworkFeeEstimate,
    getDefaultBaseCurrency
  } = useSwapContext()

  // Wallet State
  const [state, dispatch] = useReducer(WalletReducer, initialState)
  const {
    tokenList,
    selectedAccount,
    selectedNetwork,
    tokenBalances,
    initialized,
    supportedNetworks,
    braveWalletAccounts,
    supportedExchanges,
    tokenSpotPrices,
    networkFeeEstimates,
    defaultBaseCurrency
  } = state

  React.useEffect(() => {
    if (!initialized) {
      // Gets Selected Network and then sets to state
      if (selectedNetwork?.chainId === undefined) {
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

      // Gets a list of Brave Wallet Accounts and sets to state
      if (getBraveWalletAccounts && braveWalletAccounts.length === 0) {
        getBraveWalletAccounts()
          .then((result) =>
            dispatch({ type: 'updateBraveWalletAccounts', payload: result })
          )
          .catch((error) => console.log(error))
      }

      // Gets all tokens and then sets to state
      if (tokenList.length === 0 && selectedNetwork !== undefined) {
        getAllTokens(selectedNetwork.chainId, selectedNetwork?.coin)
          .then((result) =>
            dispatch({ type: 'updateTokenList', payload: result.tokens })
          )
          .catch((error) => console.log(error))
      }

      // Gets all token spot prices and then sets to state
      if (
        tokenList.length !== 0 &&
        !tokenSpotPrices[NATIVE_ASSET_CONTRACT_ADDRESS_0X] &&
        supportedNetworks.length !== 0
      ) {
        let prices = tokenSpotPrices
        Promise.all(
          tokenList.map(async (token) => {
            getTokenPrice(token.contractAddress)
              .then((result) => {
                prices[token.contractAddress] = result.price
                dispatch({ type: 'updateTokenSpotPrices', payload: prices })
              })
              .catch((error) => console.log(error))
          })
        )

        // Gets all native asset spot prices for supported networks and sets to state
        Promise.all(
          supportedNetworks.map(async (network) => {
            getTokenPrice(network.symbol)
              .then((result) => {
                prices[network.symbol] = result.price
                dispatch({ type: 'updateTokenSpotPrices', payload: prices })
              })
              .catch((error) => console.log(error))
          })
        )
      }

      // Gets all supported network fee estimates and then sets to state
      if (supportedNetworks.length !== 0) {
        let estimates = networkFeeEstimates
        Promise.all(
          supportedNetworks.map(async (network) => {
            getNetworkFeeEstimate(network.chainId)
              .then((result) => {
                estimates[network.chainId] = result
                dispatch({
                  type: 'updateNetworkFeeEstimates',
                  payload: estimates
                })
              })
              .catch((error) => console.log(error))
          })
        )
      }

      // Gets all exchanges then sets to state
      if (supportedExchanges.length === 0) {
        getExchanges()
          .then((result) =>
            dispatch({ type: 'updateSupportedExchanges', payload: result })
          )
          .catch((error) => console.log(error))
      }

      // Gets all balances and sets to state
      if (
        !tokenBalances[NATIVE_ASSET_CONTRACT_ADDRESS_0X] &&
        selectedNetwork !== undefined
      ) {
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

      // Gets users Default Base Currency then sets to state
      if (defaultBaseCurrency === '' && getDefaultBaseCurrency) {
        getDefaultBaseCurrency()
          .then((result) =>
            dispatch({
              type: 'updateDefaultBaseCurrency',
              payload: result.currency
            })
          )
          .catch((error) => console.log(error))
      }
    }
  }, [
    tokenList,
    selectedAccount,
    selectedNetwork,
    tokenBalances,
    initialized,
    supportedNetworks,
    braveWalletAccounts,
    supportedExchanges,
    tokenSpotPrices,
    networkFeeEstimates,
    defaultBaseCurrency,
    getDefaultBaseCurrency,
    getNetworkFeeEstimate,
    getTokenPrice,
    getBraveWalletAccounts,
    getAllTokens,
    getBalance,
    getERC20TokenBalance,
    getSelectedNetwork,
    getSelectedAccount,
    getSupportedNetworks,
    getExchanges,
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
