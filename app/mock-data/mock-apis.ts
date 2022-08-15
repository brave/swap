// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Mock Data
import { mockEVMNetworksData } from './mock-api-data'
import { mockEthereumNetwork } from './mock-networks'
import { mockEthereumTokens } from './mock-tokens'
import { mockAccount1 } from './mock-accounts'
import { mockSpotPrices } from './mock-spot-prices'
import { mockQuoteOptions } from './mock-quote-options'

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
  return mockAccount1
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

export const getSwapQuotes = async (
  fromAddress: string,
  fromAmount: string,
  toAddress: string
) => {
  return mockQuoteOptions
}
