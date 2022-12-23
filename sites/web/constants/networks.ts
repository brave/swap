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
} from '../assets/asset-icons'

// Utils
import { getImageURL } from '../utils/img-utils'

export const ethereum: NetworkInfo = {
  blockExplorerUrl: 'https://etherscan.io',
  chainId: ChainID.ETHEREUM_MAINNET,
  chainName: 'Ethereum',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: getImageURL(ETHIconUrl),
  symbol: 'ETH',
  symbolName: 'Ethereum',
  isEIP1559: true
}

export const bsc: NetworkInfo = {
  blockExplorerUrl: 'https://bscscan.com',
  chainId: ChainID.BINANCE_SMART_CHAIN,
  chainName: 'Binance',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: getImageURL(BNBIconUrl),
  symbol: 'BNB',
  symbolName: 'Binance',
  isEIP1559: false
}

export const polygon: NetworkInfo = {
  blockExplorerUrl: 'https://polygonscan.com',
  chainId: ChainID.POLYGON,
  chainName: 'Polygon',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: getImageURL(MATICIconUrl),
  symbol: 'MATIC',
  symbolName: 'Polygon',
  isEIP1559: true
}

export const avalanche: NetworkInfo = {
  blockExplorerUrl: 'https://snowtrace.io',
  chainId: ChainID.AVALANCHE,
  chainName: 'Avalanche',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: getImageURL(AVAXIconUrl),
  symbol: 'AVAX',
  symbolName: 'Avalanche',
  isEIP1559: true
}

export const celo: NetworkInfo = {
  blockExplorerUrl: 'https://explorer.celo.org',
  chainId: ChainID.CELO,
  chainName: 'Celo',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: getImageURL(CELOIconUrl),
  symbol: 'CELO',
  symbolName: 'CELO',
  isEIP1559: false
}

export const fantom: NetworkInfo = {
  blockExplorerUrl: 'https://ftmscan.com',
  chainId: ChainID.FANTOM,
  chainName: 'Fantom',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: getImageURL(FTMIconUrl),
  symbol: 'FTM',
  symbolName: 'Fantom',
  isEIP1559: true
}

export const optimism: NetworkInfo = {
  blockExplorerUrl: 'https://optimistic.etherscan.io',
  chainId: ChainID.OPTIMISM,
  chainName: 'Optimism',
  coin: CoinType.Ethereum,
  decimals: 18,
  logo: getImageURL(OPTIMISMIconUrl),
  symbol: 'ETH',
  symbolName: 'Ether',
  isEIP1559: false
}

export const solana: NetworkInfo = {
  blockExplorerUrl: 'https://explorer.solana.com/',
  chainId: ChainID.SOLANA_MAINNET,
  chainName: 'Solana',
  coin: CoinType.Solana,
  decimals: 9,
  logo: getImageURL(SOLIconUrl),
  symbol: 'SOL',
  symbolName: 'Solana',
  isEIP1559: false
}

export const evmChainIDBaseAPIURLMapping: Record<string, string> = {
  '0x1': 'https://api.0x.org', // Ethereum
  '0x89': 'https://polygon.api.0x.org', // Polygon
  '0x38': 'https://bsc.api.0x.org', // BSC
  '0xa86a': 'https://avalanche.api.0x.org', // Avalanche C-Chain
  '0xfa': 'https://fantom.api.0x.org', // Fantom Opera
  '0xa4ec': 'https://celo.api.0x.org', // Celo
  '0xa': 'https://optimism.api.0x.org', // Optimism
  '0xa4b1': 'https://arbitrum.api.0x.org' // Arbitrum
}

export const networks: NetworkInfo[] = [
  ethereum,
  polygon,
  bsc,
  optimism,
  avalanche,
  fantom,
  celo,
  solana
]
