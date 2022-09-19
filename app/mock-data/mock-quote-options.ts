// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import {
  JupiterQuote,
  JupiterSwapTransactions,
  QuoteOption,
  ZeroExQuoteResponse,
  ZeroExSwapResponse
} from '../src/constants/types'

export const mockQuoteOptions: QuoteOption[] = [
  {
    amount: '38.46354',
    id: '1',
    symbol: 'BAT',
    contractAddress: '0x1',
    rate: '0.0003481',
    impact: '0.01'
  },
  {
    amount: '38.03474',
    id: '2',
    symbol: 'BAT',
    contractAddress: '0x1',
    rate: '0.0003472',
    impact: '0.01'
  },
  {
    amount: '37.94258',
    id: '3',
    symbol: 'BAT',
    contractAddress: '0x1',
    rate: '0.0003464',
    impact: '0.01'
  },
  {
    amount: '37.37815',
    id: '4',
    symbol: 'BAT',
    contractAddress: '0x1',
    rate: '0.0003452',
    impact: '0.01'
  }
]

export const mockZeroExQuoteResponse: ZeroExQuoteResponse = {
  price: "0.80921",
  value: "100000000000000000",
  gas: "240000",
  estimatedGas: "240000",
  gasPrice: "61000000000",
  protocolFee: "0",
  minimumProtocolFee: "0",
  buyTokenAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  buyAmount: "80921",
  sellTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  sellAmount: "100000000000000000",
  allowanceTarget: "0x0000000000000000000000000000000000000000",
  sellTokenToEthRate: "1",
  buyTokenToEthRate: "0.812697"
}

export const mockZeroExSwapResponse: ZeroExSwapResponse = {
  ...mockZeroExQuoteResponse,
  guaranteedPrice: "0.80063",
  to: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  data: "0x415565b..."
}

export const mockJupiterQuote: JupiterQuote = {
  routes: [
    {
      inAmount: BigInt(10000),
      outAmount: BigInt(327),
      amount: BigInt(10000),
      otherAmountThreshold: BigInt(324),
      swapMode: "ExactIn",
      priceImpactPct: 6.7619243537819784e-12,
      marketInfos: [
        {
          id: "amgK1WE8Cvae4mVdj4AhXSsknWsjaGgo1coYicasBnM",
          label: "Lifinity",
          inputMint: "So11111111111111111111111111111111111111112",
          outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          inAmount: BigInt(10000),
          outAmount: BigInt(327),
          lpFee: {
            amount: BigInt(8),
            mint: "So11111111111111111111111111111111111111112",
            pct: 0.0008
          },
          platformFee: {
            amount: BigInt(0),
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            pct: 0
          },
          priceImpactPct: 6.761892447563105e-12,
          notEnoughLiquidity: false
        }
      ]
    }
  ]
}

export const mockJupiterSwapTransactions: JupiterSwapTransactions = {
  setupTransaction: "setup",
  swapTransaction: "swap",
  cleanupTransaction: "cleanup"
}
