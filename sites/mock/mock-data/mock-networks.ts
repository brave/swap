// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { NetworkInfo, CoinType, ChainID } from '@brave/swap-interface'

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
} from '../src/assets/asset-icons'

export const mockEthereumNetwork: NetworkInfo = {
  blockExplorerUrl: 'https://etherscan.io',
  chainId: ChainID.ETHEREUM_MAINNET,
  chainName: 'Ethereum',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: ETHIconUrl,
  symbol: 'ETH',
  symbolName: 'Ethereum',
  isEIP1559: true
}

export const mockBinanceNetwork: NetworkInfo = {
  blockExplorerUrl: 'https://bscscan.com',
  chainId: ChainID.BINANCE_SMART_CHAIN,
  chainName: 'Binance',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: BNBIconUrl,
  symbol: 'BNB',
  symbolName: 'Binance',
  isEIP1559: false
}

export const mockPolygonNetwork: NetworkInfo = {
  blockExplorerUrl: 'https://polygonscan.com',
  chainId: ChainID.POLYGON,
  chainName: 'Polygon',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: MATICIconUrl,
  symbol: 'MATIC',
  symbolName: 'Polygon',
  isEIP1559: true
}

export const mockAvalancheNetwork: NetworkInfo = {
  blockExplorerUrl: 'https://snowtrace.io',
  chainId: ChainID.AVALANCHE,
  chainName: 'Avalanche',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: AVAXIconUrl,
  symbol: 'AVAX',
  symbolName: 'Avalanche',
  isEIP1559: true
}

export const mockCeloNetwork: NetworkInfo = {
  blockExplorerUrl: 'https://explorer.celo.org',
  chainId: ChainID.CELO,
  chainName: 'Celo',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: CELOIconUrl,
  symbol: 'CELO',
  symbolName: 'CELO',
  isEIP1559: false
}

export const mockFantomNetwork: NetworkInfo = {
  blockExplorerUrl: 'https://ftmscan.com',
  chainId: ChainID.FANTOM,
  chainName: 'Fantom',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: FTMIconUrl,
  symbol: 'FTM',
  symbolName: 'Fantom',
  isEIP1559: true
}

export const mockOptimismNetwork: NetworkInfo = {
  blockExplorerUrl: 'https://optimistic.etherscan.io',
  chainId: ChainID.OPTIMISM,
  chainName: 'Optimism',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: OPTIMISMIconUrl,
  symbol: 'ETH',
  symbolName: 'Ether',
  isEIP1559: false
}

export const mockSolanaNetwork: NetworkInfo = {
  blockExplorerUrl: 'https://explorer.solana.com/',
  chainId: ChainID.SOLANA_MAINNET,
  chainName: 'Solana',
  coin: CoinType.Solana,
  decimals: 18,
  logo: SOLIconUrl,
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
