// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import Amount from "~/utils/amount";

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

type LiquiditySource = {
  name: string
  proportion: Amount
}

export type QuoteOption = {
  label: string
  fromAmount: Amount
  toAmount: Amount
  minimumToAmount: Amount
  fromToken: BlockchainToken
  toToken: BlockchainToken
  rate: Amount
  impact: Amount
  sources: LiquiditySource[]

  // Indicates the kind of routing followed by the order.
  // split -> indicates that the order was fulfilled from two separate LPs
  //
  // flow  -> indicates that the order was fulfilled through an intermediate
  //          asset between two separate LPs.
  routing: 'split' | 'flow'
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

export type GasFeeOption = {
  id: string
  name: string
  icon: string
}

export type Exchange = {
  id: string
  name: string
}

export type GasEstimate = {
  gasFee: string
  gasFeeGwei?: string
  gasFeeFiat?: string
  time?: string
}

export type SwapParams = {
  fromToken?: BlockchainToken
  toToken?: BlockchainToken
  fromAmount: string
  toAmount: string
  slippagePercentage: number
  takerAddress?: string
}

export type ZeroExSwapParams = {
  takerAddress: string
  sellAmount: string
  buyAmount: string
  buyToken: string
  sellToken: string
  slippagePercentage: number
  gasPrice: string
}

type ZeroExSource = {
  name: string
  proportion: string
}

export interface ZeroExQuoteResponse {
  price: string
  value: string
  gas: string
  estimatedGas: string
  gasPrice: string
  protocolFee: string
  minimumProtocolFee: string
  buyTokenAddress: string
  sellTokenAddress: string
  buyAmount: string
  sellAmount: string
  allowanceTarget: string
  sellTokenToEthRate: string
  buyTokenToEthRate: string
  estimatedPriceImpact: string
  sources: ZeroExSource[]
}

export interface ZeroExSwapResponse extends ZeroExQuoteResponse {
  guaranteedPrice: string
  to: string
  data: string
}

export interface ZeroExErrorResponse {
  code: number
  reason: string
  validationErrors?: Array<{ field: string, code: number, reason: string }>
}

export type JupiterQuoteParams = {
  inputMint: string
  outputMint: string
  amount: string
  slippagePercentage: number
}

export type JupiterFee = {
  amount: bigint
  mint: string
  pct: number
}

export type JupiterMarketInfo = {
  id: string
  label: string
  inputMint: string
  outputMint: string
  notEnoughLiquidity: boolean
  inAmount: bigint
  outAmount: bigint
  priceImpactPct: number
  lpFee: JupiterFee
  platformFee: JupiterFee
}

export type JupiterRoute = {
  inAmount: bigint
  outAmount: bigint
  amount: bigint
  otherAmountThreshold: bigint
  swapMode: string
  priceImpactPct: number
  marketInfos: JupiterMarketInfo[]
}

export type JupiterQuoteResponse = {
  routes: JupiterRoute[]
}

export type JupiterSwapParams = {
  route: JupiterRoute
  userPublicKey: string
  outputMint: string
}

export type JupiterSwapResponse = {
  setupTransaction: string
  swapTransaction: string
  cleanupTransaction: string
}

export interface JupiterErrorResponse {
  statusCode: string
  error: string
  message: string
}