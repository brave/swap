// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { BlockchainToken, CoinType } from '../src/constants/types'

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

export const mockEthereumTokens: BlockchainToken[] = [
  {
    contractAddress: '',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: ETHIconUrl,
    isErc20: false,
    isErc721: false,
    decimals: 18,
    visible: true,
    tokenId: '',
    coingeckoId: 'ethereum',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
    name: 'Basic Attention Token',
    symbol: 'BAT',
    logo: BATIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 18,
    visible: true,
    tokenId: '',
    coingeckoId: 'basic-attention-token',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    name: 'Wrapped Binance Coin',
    symbol: 'BNB',
    logo: BNBIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 18,
    visible: true,
    tokenId: '',
    coingeckoId: 'bnb',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0xD31a59c85aE9D8edEFeC411D448f90841571b89c',
    name: 'Wrapped Solana',
    symbol: 'SOL',
    logo: SOLIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 9,
    visible: true,
    tokenId: '',
    coingeckoId: 'solana',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USD Coin',
    symbol: 'USDC',
    logo: USDCIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 6,
    visible: true,
    tokenId: '',
    coingeckoId: 'usd-coin',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    name: 'Sushi',
    symbol: 'SUSHI',
    logo: SUSHIIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 18,
    visible: true,
    tokenId: '',
    coingeckoId: 'sushi',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'Tether USD',
    symbol: 'USDT',
    logo: USDTIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 6,
    visible: true,
    tokenId: '',
    coingeckoId: 'tether',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    name: 'Polygon',
    symbol: 'MATIC',
    logo: MATICIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 18,
    visible: true,
    tokenId: '',
    coingeckoId: 'polygon',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0xB6eD7644C69416d67B522e20bC294A9a9B405B31',
    name: '0xBitcoin',
    symbol: '0xBTC',
    logo: ZEROXBTCIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 18,
    visible: true,
    tokenId: '',
    coingeckoId: '0xbitcoin',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  },
  {
    contractAddress: '0x111111111117dc0aa78b770fa6a738034120c302',
    name: '1inch',
    symbol: '1INCH',
    logo: ONEINCHIconUrl,
    isErc20: true,
    isErc721: false,
    decimals: 18,
    visible: true,
    tokenId: '',
    coingeckoId: '1inch',
    coin: CoinType.Ethereum,
    chainId: '0x1'
  }
]
