// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { BlockchainToken } from '../src/constants/types'

// Icons
import { BATIconUrl, ETHIconUrl, BNBIconUrl, SOLIconUrl } from '../src/assets/asset-icons'

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
    coingeckoId: '',
    coin: 60,
    chainId: '0x1'
  },
  {
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
  },
  {
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
  },
  {
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
]

export const mockEthereumToken = mockEthereumTokens[0]
export const mockBasicAttentionToken = mockEthereumTokens[1]
export const mockWrappedBinanceCoinToken = mockEthereumTokens[2]
export const mockWrappedSolanaToken = mockEthereumTokens[3]
