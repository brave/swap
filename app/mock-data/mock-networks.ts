// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Types
import { NetworkInfo } from '../src/constants/types'

// Icons
import { ETHIconUrl, BNBIconUrl, SOLIconUrl } from '../src/assets/asset-icons'

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
  mockSolanaNetwork
]
