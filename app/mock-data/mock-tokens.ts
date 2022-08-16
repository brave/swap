// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { BlockchainToken } from '../src/constants/types'

// Constants
import { NATIVE_ASSET_CONTRACT_ADDRESS_0X } from '../src/constants/magics'

// Icons
import {
  BATIconUrl,
  ETHIconUrl,
  BNBIconUrl,
  SOLIconUrl,
  USDCIconUrl,
  SUSHIIconUrl,
  MATICIconUrl,
  ONEINCHIconUrl,
  USDTIconUrl,
  ZEROXBTCIconUrl
} from '../src/assets/asset-icons'

export const mockEthereumToken = {
  contractAddress: NATIVE_ASSET_CONTRACT_ADDRESS_0X,
  name: 'Ethereum',
  symbol: 'ETH',
  logo: ETHIconUrl,
  isErc20: false,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mockBasicAttentionToken = {
  contractAddress: '0x1',
  name: 'Basic Attention Token',
  symbol: 'BAT',
  logo: BATIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mockWrappedBinanceCoinToken = {
  contractAddress: '0x2',
  name: 'Wrapped Binance Coin',
  symbol: 'BNB',
  logo: BNBIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mockWrappedSolanaToken = {
  contractAddress: '0x3',
  name: 'Wrapped Solana',
  symbol: 'SOL',
  logo: SOLIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mockUSDCToken = {
  contractAddress: '0x4',
  name: 'USD Coin',
  symbol: 'USDC',
  logo: USDCIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mockSUSHIToken = {
  contractAddress: '0x5',
  name: 'Sushi',
  symbol: 'SUSHI',
  logo: SUSHIIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mockUSDTToken = {
  contractAddress: '0x6',
  name: 'Tether USD',
  symbol: 'USDT',
  logo: USDTIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mockMATICToken = {
  contractAddress: '0x7',
  name: 'Polygon',
  symbol: 'MATIC',
  logo: MATICIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mock0XBTCToken = {
  contractAddress: '0x8',
  name: '0xBitcoin',
  symbol: '0xBTC',
  logo: ZEROXBTCIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mock1INCHToken = {
  contractAddress: '0x9',
  name: '1inch',
  symbol: '1INCH',
  logo: ONEINCHIconUrl,
  isErc20: true,
  isErc721: false,
  decimals: 18,
  visible: true,
  tokenId: '',
  coingeckoId: '',
  coin: 60,
  chainId: '0x1'
}

export const mockEthereumTokens: BlockchainToken[] = [
  mockEthereumToken,
  mockBasicAttentionToken,
  mockWrappedBinanceCoinToken,
  mockWrappedSolanaToken,
  mockUSDCToken,
  mockSUSHIToken,
  mockUSDTToken,
  mockMATICToken,
  mock0XBTCToken,
  mock1INCHToken
]
