// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React, { createContext } from 'react'

// Types
import {
  BlockchainToken,
  NetworkInfo,
  WalletAccount,
  Exchange,
  GasEstimate,
  ZeroExSwapParams,
  ZeroExSwapResponse,
  JupiterSwapParams,
  JupiterQuoteResponse,
  JupiterQuoteParams,
  JupiterSwapResponse,
  ZeroExQuoteResponse,
  GasPrice1559,
  ETHSendTransactionParams,
  ApproveERC20Params,
  SOLSendTransactionParams
} from '~/constants/types'

interface SwapContextInterface {
  getLocale: (key: string) => string
  getBalance: (address: string, coin: number, chainId: string) => Promise<string>
  getTokenBalance: (
    contractAddress: string,
    address: string,
    coin: number,
    chainId: string
  ) => Promise<string>
  assetsList: BlockchainToken[]
  account: WalletAccount
  network: NetworkInfo
  supportedNetworks: NetworkInfo[]
  switchAccount: (account: WalletAccount) => Promise<void>
  switchNetwork: (network: NetworkInfo) => Promise<void>
  getTokenPrice: (token: BlockchainToken) => Promise<string>
  swapService: {
    getZeroExPriceQuote: (params: ZeroExSwapParams) => Promise<ZeroExQuoteResponse>
    getZeroExTransactionPayload: (params: ZeroExSwapParams) => Promise<ZeroExSwapResponse>
    getJupiterQuote: (params: JupiterQuoteParams) => Promise<JupiterQuoteResponse>
    getJupiterTransactionsPayload: (params: JupiterSwapParams) => Promise<JupiterSwapResponse>
    isSwapSupported: (chainId: string) => Promise<boolean>
  }
  walletAccounts: WalletAccount[]
  exchanges: Exchange[]
  getNetworkFeeEstimate: (chainId: string) => Promise<GasEstimate>
  defaultBaseCurrency: string
  routeBackToWallet?: () => void
  ethWalletAdapter: {
    getGasPrice: (chainId: string) => Promise<string>
    getGasPrice1559: (chainId: string) => Promise<GasPrice1559>
    sendTransaction: (params: ETHSendTransactionParams) => Promise<void>
    getERC20Allowance: (
      contractAddress: string,
      ownerAddress: string,
      spenderAddress: string
    ) => Promise<string>
    getERC20ApproveData: (params: ApproveERC20Params) => Promise<number[]>
  }
  solWalletAdapter: {
    sendTransaction: (params: SOLSendTransactionParams) => Promise<void>
  }
}

// Create Swap Context
const SwapContext = createContext<SwapContextInterface | undefined>(undefined)

export interface SwapProviderInterface extends SwapContextInterface {
  children?: React.ReactNode
}

// Swap Provder
const SwapProvider = (props: SwapProviderInterface) => {
  const {
    children,
    assetsList,
    network,
    account,
    supportedNetworks,
    exchanges,
    walletAccounts,
    defaultBaseCurrency,
    switchAccount,
    switchNetwork,
    getLocale,
    getBalance,
    getTokenBalance,
    getTokenPrice,
    getNetworkFeeEstimate,
    routeBackToWallet,
    ethWalletAdapter,
    solWalletAdapter,
    swapService
  } = props

  return (
    <SwapContext.Provider
      value={{
        assetsList,
        network,
        account,
        supportedNetworks,
        exchanges,
        walletAccounts,
        defaultBaseCurrency,
        switchAccount,
        switchNetwork,
        getLocale,
        getBalance,
        getTokenBalance,
        getTokenPrice,
        getNetworkFeeEstimate,
        routeBackToWallet,
        ethWalletAdapter,
        solWalletAdapter,
        swapService
      }}
    >
      {children}
    </SwapContext.Provider>
  )
}

const useSwapContext = () => {
  const context = React.useContext(SwapContext)
  if (context === undefined) {
    throw new Error('useSwap must be used within a SwapProvider')
  }
  return context
}

export { SwapContext, SwapProvider, useSwapContext }
