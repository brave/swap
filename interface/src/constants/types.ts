// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import Amount from '~/utils/amount'

export type BlockchainToken = {
  contractAddress: string
  name: string
  logo: string
  isToken: boolean
  visible: boolean
  decimals: number
  symbol: string
  coingeckoId: string
  chainId: string
  coin: number
}

export type NetworkInfo = {
  chainId: string
  chainName: string
  blockExplorerUrl: string
  logo: string
  symbol: string
  symbolName: string
  decimals: number
  coin: number
  isEIP1559: boolean // only for ETH coin type
}

type LiquiditySource = {
  name: string
  proportion: Amount
}

export type QuoteOption = {
  label: string
  fromAmount: Amount
  toAmount: Amount
  minimumToAmount: Amount | undefined
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

  networkFee: string

  braveFee: SwapFee | undefined
}

export type Registry = Record<string, string>

export type SpotPrices = {
  nativeAsset: string
  makerAsset: string
  takerAsset: string
}

export type WalletAccount = {
  name: string
  address: string
  coin: number
}

export type SwapAndSend = {
  label: string
  name: string
}

export type RefreshBlockchainStateParams = {
  network: NetworkInfo
  account: WalletAccount
}

export type RefreshPricesParams = {
  nativeAsset: BlockchainToken
  fromAsset: BlockchainToken | undefined
  toAsset: BlockchainToken | undefined
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

export type SwapFee = {
  fee: string
  discount: string
}

export type AmountValidationErrorType = 'fromAmountDecimalsOverflow' | 'toAmountDecimalsOverflow'

export type SwapValidationErrorType =
  | AmountValidationErrorType
  | 'insufficientBalance'
  | 'insufficientFundsForGas'
  | 'insufficientAllowance'
  | 'insufficientLiquidity'
  | 'unknownError'

export type SwapParams = {
  fromToken?: BlockchainToken
  toToken?: BlockchainToken
  fromAmount: string
  toAmount: string
  slippagePercentage: number
  fromAddress?: string
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

interface ZeroExValidationError {
  field: string
  code: number
  reason: string
}

export interface ZeroExErrorResponse {
  code: number
  reason: string
  validationErrors?: ZeroExValidationError[]
  isInsufficientLiquidity: boolean
}

export interface ZeroExQuoteResponseWithError {
  response?: ZeroExQuoteResponse
  errorResponse?: ZeroExErrorResponse
}

export interface ZeroExSwapResponseWithError {
  response?: ZeroExSwapResponse
  errorResponse?: ZeroExErrorResponse
}

export type JupiterQuoteParams = {
  inputMint: string
  outputMint: string
  amount: string
  slippageBps: number
  userPublicKey: string
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
  slippageBps: number
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
  swapTransaction: string
}

export interface JupiterErrorResponse {
  statusCode: string
  error: string
  message: string
  isInsufficientLiquidity: boolean
}

export interface JupiterSwapResponseWithError {
  response?: JupiterSwapResponse
  errorResponse?: JupiterErrorResponse
}

export interface JupiterQuoteResponseWithError {
  response?: JupiterQuoteResponse
  errorResponse?: JupiterErrorResponse
}

// ETH Wallet Adapter
export type GasPrice1559 = {
  slowMaxPriorityFeePerGas: string
  slowMaxFeePerGas: string
  avgMaxPriorityFeePerGas: string
  avgMaxFeePerGas: string
  fastMaxPriorityFeePerGas: string
  fastMaxFeePerGas: string
  baseFeePerGas: string
}
export type ETHSendTransactionParams = {
  from: string
  to: string
  value: string
  data: number[]

  gas?: string

  // Legacy gas pricing
  gasPrice?: string

  // EIP-1559 gas pricing
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
}
export type ApproveERC20Params = {
  contractAddress: string
  spenderAddress: string
  allowance: string
}

// SOL Wallet Adapter
export type SOLSendTransactionParams = {
  encodedTransaction: string
  from: string
  sendOptions?: {
    maxRetries?: number
    preflightCommitment?: string
    skipPreflight?: boolean
  }
}
