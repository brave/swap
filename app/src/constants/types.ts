// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

export type BlockchainToken = {
  contractAddress: string
  name: string
  logo: string
  isErc20: boolean
  isErc721: boolean
  visible: boolean
  decimals: number
  symbol: string
  tokenId: string
  coingeckoId: string
  chainId: string
  coin: number
}

export type NetworkInfo = {
  chainId: string
  chainName: string
  blockExplorerUrls: string[]
  iconUrls: string[]
  rpcUrls: string[]
  symbol: string
  symbolName: string
  decimals: number
  coin: number
}

export type QuoteOption = {
  id: string
  amount: string
  symbol: string
  contractAddress: string
  rate: string
  impact: string
}

export type Registry = Record<string, string>

export type WalletAccount = {
  id: string
  name: string
  address: string
  coin: number
}

export type SwapAndSend = {
  label: string
  name: string
}

export enum CoinType {
  Solana = 501,
  Ethereum = 60
}

export enum ChainID {
  ETHEREUM_MAINNET = '0x1',
  BINANCE_SMART_CHAIN = '0x38',
  POLYGON = '0x89',
  AVALANCHE = '0xa86a',
  CELO = '0xa4ec',
  FANTOM = '0xfa',
  OPTIMISM = '0xa',
  SOLANA_MAINNET = '0x65'
}
