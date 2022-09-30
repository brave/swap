// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { NetworkInfo, CoinType, ChainID } from '~/constants/types'

// Icons
import {
  ETHIconUrl,
  BNBIconUrl,
  SOLIconUrl,
  MATICIconUrl,
  AVAXIconUrl,
  FTMIconUrl,
  CELOIconUrl,
  OPTIMISMIconUrl
} from '~/assets/asset-icons'

export const mockEthereumNetwork: NetworkInfo = {
  blockExplorerUrls: ['https://etherscan.io'],
  chainId: ChainID.ETHEREUM_MAINNET,
  chainName: 'Ethereum',
  coin: CoinType.Ethereum,
  decimals: 18,
  iconUrls: [ETHIconUrl],
  rpcUrls: [''],
  symbol: 'ETH',
  symbolName: 'Ethereum',
  isEIP1559: true
}

export const mockBinanceNetwork: NetworkInfo = {
  blockExplorerUrls: ['https://bscscan.com'],
  chainId: ChainID.BINANCE_SMART_CHAIN,
  chainName: 'Binance',
  coin: CoinType.Ethereum,
  decimals: 18,
  iconUrls: [BNBIconUrl],
  rpcUrls: [''],
  symbol: 'BNB',
  symbolName: 'Binance',
  isEIP1559: false
}

export const mockPolygonNetwork: NetworkInfo = {
  blockExplorerUrls: ['https://polygonscan.com'],
  chainId: ChainID.POLYGON,
  chainName: 'Polygon',
  coin: CoinType.Ethereum,
  decimals: 18,
  iconUrls: [MATICIconUrl],
  rpcUrls: [''],
  symbol: 'MATIC',
  symbolName: 'Polygon',
  isEIP1559: true
}

export const mockAvalancheNetwork: NetworkInfo = {
  blockExplorerUrls: ['https://snowtrace.io'],
  chainId: ChainID.AVALANCHE,
  chainName: 'Avalanche',
  coin: CoinType.Ethereum,
  decimals: 18,
  iconUrls: [AVAXIconUrl],
  rpcUrls: [''],
  symbol: 'AVAX',
  symbolName: 'Avalanche',
  isEIP1559: true
}

export const mockCeloNetwork: NetworkInfo = {
  blockExplorerUrls: ['https://explorer.celo.org'],
  chainId: ChainID.CELO,
  chainName: 'Celo',
  coin: CoinType.Ethereum,
  decimals: 18,
  iconUrls: [CELOIconUrl],
  rpcUrls: [''],
  symbol: 'CELO',
  symbolName: 'CELO',
  isEIP1559: false
}

export const mockFantomNetwork: NetworkInfo = {
  blockExplorerUrls: ['https://ftmscan.com'],
  chainId: ChainID.FANTOM,
  chainName: 'Fantom',
  coin: CoinType.Ethereum,
  decimals: 18,
  iconUrls: [FTMIconUrl],
  rpcUrls: [''],
  symbol: 'FTM',
  symbolName: 'Fantom',
  isEIP1559: true
}

export const mockOptimismNetwork: NetworkInfo = {
  blockExplorerUrls: ['https://optimistic.etherscan.io'],
  chainId: ChainID.OPTIMISM,
  chainName: 'Optimism',
  coin: CoinType.Ethereum,
  decimals: 18,
  iconUrls: [OPTIMISMIconUrl],
  rpcUrls: [''],
  symbol: 'ETH',
  symbolName: 'Ether',
  isEIP1559: false
}

export const mockSolanaNetwork: NetworkInfo = {
  blockExplorerUrls: ['https://explorer.solana.com/'],
  chainId: ChainID.SOLANA_MAINNET,
  chainName: 'Solana',
  coin: CoinType.Solana,
  decimals: 18,
  iconUrls: [SOLIconUrl],
  rpcUrls: [''],
  symbol: 'SOL',
  symbolName: 'Solana',
  isEIP1559: false
}

export const mockNetworks: NetworkInfo[] = [
  mockSolanaNetwork,
  mockEthereumNetwork,
  mockBinanceNetwork,
  mockPolygonNetwork,
  mockAvalancheNetwork,
  mockCeloNetwork,
  mockFantomNetwork,
  mockOptimismNetwork
]
