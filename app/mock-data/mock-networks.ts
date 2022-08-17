// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { NetworkInfo } from '../src/constants/types'

// Icons
import {
  ETHIconUrl,
  BNBIconUrl,
  SOLIconUrl,
  MATICIconUrl,
  AVAXIconUrl
} from '../src/assets/asset-icons'

export const mockEthereumNetwork = {
  blockExplorerUrls: ['https://etherscan.io'],
  chainId: '0x1',
  chainName: 'Ethereum',
  coin: 60,
  decimals: 18,
  iconUrls: [ETHIconUrl],
  rpcUrls: [''],
  symbol: 'ETH',
  symbolName: 'Ethereum'
}

export const mockBinanceNetwork = {
  blockExplorerUrls: ['https://bscscan.com'],
  chainId: '0x38',
  chainName: 'Binance',
  coin: 60,
  decimals: 18,
  iconUrls: [BNBIconUrl],
  rpcUrls: [''],
  symbol: 'BNB',
  symbolName: 'Binance'
}

export const mockPolygonNetwork = {
  blockExplorerUrls: ['https://polygonscan.com'],
  chainId: '0x89',
  chainName: 'Polygon',
  coin: 60,
  decimals: 18,
  iconUrls: [MATICIconUrl],
  rpcUrls: [''],
  symbol: 'MATIC',
  symbolName: 'Polygon'
}

export const mockAvalancheNetwork = {
  blockExplorerUrls: ['https://snowtrace.io'],
  chainId: '0xa86a',
  chainName: 'Avalanche',
  coin: 60,
  decimals: 18,
  iconUrls: [AVAXIconUrl],
  rpcUrls: [''],
  symbol: 'AVAX',
  symbolName: 'Avalanche'
}

export const mockSolanaNetwork = {
  blockExplorerUrls: ['https://explorer.solana.com/'],
  chainId: '0x65',
  chainName: 'Solana',
  coin: 501,
  decimals: 18,
  iconUrls: [SOLIconUrl],
  rpcUrls: [''],
  symbol: 'SOL',
  symbolName: 'Solana'
}

export const mockNetworks: NetworkInfo[] = [
  mockEthereumNetwork,
  mockBinanceNetwork,
  mockPolygonNetwork,
  mockAvalancheNetwork,
  mockSolanaNetwork
]
