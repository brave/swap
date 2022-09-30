// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Mock Data
import { mockEVMNetworksData } from './mock-api-data'
import { mockEthereumNetwork, mockNetworks } from './mock-networks'
import { mockEthereumTokens } from './mock-tokens'
import { mockAccount1, mockAccounts } from './mock-accounts'
import { mockSpotPrices } from './mock-spot-prices'
import {
  mockJupiterQuote,
  mockJupiterSwapTransactions,
  mockZeroExQuoteResponse,
  mockZeroExSwapResponse
} from './mock-quote-options'
import { mockExchanges } from './mock-exchanges'
import { mockNetworkFeeEstimates } from './mock-network-fee-estimates'
import {
  ApproveERC20Params,
  ETHSendTransactionParams,
  JupiterQuoteParams,
  JupiterSwapParams,
  SOLSendTransactionParams,
  ZeroExSwapParams
} from '~/constants/types'

const delay = (time: number) =>
  new Promise(res => setTimeout(res, time))

export const getBalance = async (
  address: string,
  coin: number,
  chainId: string
) => {
  if (coin === mockEthereumNetwork.coin) {
    const balance = mockEVMNetworksData[address][chainId].nativeBalance
    return { balance: balance ?? '0', error: 0, errorMessage: '' }
  }
  return {
    balance: '0',
    error: 1,
    errorMessage: `Cointype ${coin} is not supported`
  }
}

export const getERC20TokenBalance = async (
  contractAddress: string,
  address: string,
  chainId: string
) => {
  const balance =
    mockEVMNetworksData[address][chainId].erc721Balances[contractAddress]
  return { balance: balance ?? '0', error: 0, errorMessage: '' }
}

export const getAllTokens = async (chainId: string, coin: number) => {
  if (
    coin === mockEthereumNetwork.coin &&
    chainId === mockEthereumNetwork.chainId
  ) {
    return { tokens: mockEthereumTokens }
  }
  return { tokens: [] }
}

export const getSelectedAccount = async () => {
  return mockAccount1.address
}

export const getBraveWalletAccounts = async () => {
  return mockAccounts
}

export const getSelectedNetwork = async () => {
  return mockEthereumNetwork
}

export const getTokenPrice = async (contractAddress: string) => {
  const price = mockSpotPrices[contractAddress]
  if (!price) {
    return { price: '0', error: 1, errorMessage: 'Contract Address not found.' }
  }
  return { price: price, error: 0, errorMessage: '' }
}

export const getSupportedNetworks = async () => {
  return mockNetworks
}

export const getExchanges = async () => {
  return mockExchanges
}

export const getNetworkFeeEstimate = async (chainId: string) => {
  return mockNetworkFeeEstimates[chainId]
}

export const swapService = {
  getZeroExPriceQuote: async (params: ZeroExSwapParams) => {
    await delay(2000)
    return {
      success: true,
      response: mockZeroExQuoteResponse,
      errorResponse: ''
    }
  },
  getZeroExTransactionPayload: async (params: ZeroExSwapParams) => {
    return {
      success: true,
      response: mockZeroExSwapResponse,
      errorResponse: ''
    }
  },
  getJupiterQuote: async (params: JupiterQuoteParams) => {
    await delay(2000)
    return {
      success: true,
      response: mockJupiterQuote,
      errorResponse: ''
    }
  },
  getJupiterTransactionsPayload: async (params: JupiterSwapParams) => {
    return {
      success: true,
      response: mockJupiterSwapTransactions,
      errorResponse: ''
    }
  },
  isSwapSupported: async (chainId: string) => {
    return { result: true }
  }
}

export const getDefaultBaseCurrency = async () => {
  return { currency: 'USD' }
}

export const ethWalletAdapter = ({
  getGasPrice: async (chainId: string) => "0x0001" as string,
  getGasPrice1559: async (chainId: string) => ({
    slowMaxPriorityFeePerGas: '0x1',
    slowMaxFeePerGas: '0x1',
    avgMaxPriorityFeePerGas: '0x1',
    avgMaxFeePerGas: '0x1',
    fastMaxPriorityFeePerGas: '0x1',
    fastMaxFeePerGas: '0x1',
    baseFeePerGas: '0x0'
  }),
  sendTransaction: async (params: ETHSendTransactionParams) => {
    await delay(2000)
  },
  getERC20ApproveData: async (params: ApproveERC20Params) => {
    await delay(1000)
    return [1, 2, 3] as number[]
  },
  getERC20Allowance: async (contractAddress: string, ownerAddress: string, spenderAddress: string) => {
    await delay(1000)
    return "0x0" as string
  }
})

export const solWalletAdapter = {
  sendTransaction: async (params: SOLSendTransactionParams) => {
    await delay(2000)
  }
}
