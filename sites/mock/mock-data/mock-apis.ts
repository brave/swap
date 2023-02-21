// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Mock Data
import { mockEVMNetworksData } from './mock-api-data'
import { mockEthereumNetwork } from './mock-networks'
import { mockSpotPrices } from './mock-spot-prices'
import {
  mockJupiterQuote,
  mockJupiterSwapTransactions,
  mockZeroExQuoteResponse,
  mockZeroExSwapResponse
} from './mock-quote-options'
import { mockNetworkFeeEstimates } from './mock-network-fee-estimates'
import {
  ApproveERC20Params,
  BlockchainToken,
  ETHSendTransactionParams,
  JupiterQuoteParams,
  JupiterSwapParams,
  SOLSendTransactionParams,
  ZeroExSwapParams,
  CoinType,
  SwapFee
} from '@brave/swap-interface'

const delay = (time: number) => new Promise(res => setTimeout(res, time))

export const getBalance = async (address: string, coin: number, chainId: string) => {
  if (coin === mockEthereumNetwork.coin) {
    const balance = mockEVMNetworksData[address][chainId].nativeBalance
    return balance ?? '0'
  }

  throw new Error(`Coin type ${coin} is not supported`)
}

export const getTokenBalance = async (
  contract: string,
  address: string,
  coin: number,
  chainId: string
) => {
  const balance = mockEVMNetworksData[address][chainId].erc20Balances[contract]
  return balance ?? '0'
}

export const getTokenBalances = async (
    contract: string[],
    address: string,
    coin: number,
    chainId: string
) => {
  return mockEVMNetworksData[address][chainId].erc20Balances
}

export const getTokenPrice = async (token: BlockchainToken) => {
  const price = mockSpotPrices[token.contractAddress]
  if (!price) {
    throw new Error('Contract address not found')
  }

  return price
}

export const getNetworkFeeEstimate = async (chainId: string) => {
  return mockNetworkFeeEstimates[chainId]
}

export const swapService = {
  getZeroExPriceQuote: async (params: ZeroExSwapParams) => {
    await delay(2000)
    return { response: mockZeroExQuoteResponse }
  },
  getZeroExTransactionPayload: async (params: ZeroExSwapParams) => {
    return { response: mockZeroExSwapResponse }
  },
  getJupiterQuote: async (params: JupiterQuoteParams) => {
    await delay(2000)
    return { response: mockJupiterQuote }
  },
  getJupiterTransactionsPayload: async (params: JupiterSwapParams) => {
    return { response: mockJupiterSwapTransactions }
  },
  isSwapSupported: async (chainId: string) => {
    return true
  },
  getBraveFeeForAsset: async (asset: BlockchainToken) => {
    if (asset.coin === CoinType.Ethereum) {
      return {
        fee: '0.875',
        discount: '0'
      } as SwapFee
    }

    return {
      fee: '0.85',
      discount: ['USDC', 'USDT', 'SOL'].includes(asset.symbol) ? '0' : '100'
    } as SwapFee
  }
}

export const ethWalletAdapter = {
  getGasPrice: async (chainId: string) => '0x0001' as string,
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
  getERC20Allowance: async (
    contractAddress: string,
    ownerAddress: string,
    spenderAddress: string
  ) => {
    await delay(1000)
    return '0x0' as string
  }
}

export const solWalletAdapter = {
  sendTransaction: async (params: SOLSendTransactionParams) => {
    await delay(2000)
  }
}
