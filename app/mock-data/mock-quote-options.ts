// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import {
  JupiterQuoteResponse,
  JupiterSwapResponse,
  ZeroExQuoteResponse,
  ZeroExSwapResponse
} from '../src/constants/types'

// 0x quote for 1 WETH -> USDC
export const mockZeroExQuoteResponse: ZeroExQuoteResponse = {
  price: "1342.773331",
  value: "1000000000000000000",
  estimatedPriceImpact: "0.0024",
  gasPrice: "24185000000",
  gas: "111000",
  estimatedGas: "111000",
  protocolFee: "0",
  minimumProtocolFee: "0",
  buyTokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  buyAmount: "1342156523",
  sellTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  sellAmount: "1000000000000000000",
  allowanceTarget: "0x0000000000000000000000000000000000000000",
  sellTokenToEthRate: "1",
  buyTokenToEthRate: "1342.18862",
}

export const mockZeroExSwapResponse: ZeroExSwapResponse = {
  ...mockZeroExQuoteResponse,
  guaranteedPrice: "0.80063",
  to: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  data: "0x415565b..."
}

// Jupiter quote for 1 SOL -> USDC
export const mockJupiterQuote: JupiterQuoteResponse = {
  routes: [
    {
      inAmount: BigInt(1000000000),
      outAmount: BigInt(32086161),
      amount: BigInt(1000000000),
      otherAmountThreshold: BigInt(31765300),
      swapMode: "ExactIn",
      priceImpactPct: 0.00017511962460359243,
      marketInfos: [
        {
          id: "EqLZKF1bwUWUzU5F21jDQMoK4HRx8wQpLt57jhP8LbKm",
          label: "Cykura",
          inputMint: "So11111111111111111111111111111111111111112",
          outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          inAmount: BigInt(1000000000),
          outAmount: BigInt(32086161),
          lpFee: {
            amount: BigInt(80000),
            mint: "So11111111111111111111111111111111111111112",
            pct: 0.00008
          },
          platformFee: {
            amount: BigInt(0),
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            pct: 0
          },
          notEnoughLiquidity: false,
          priceImpactPct: 0.00017511962460364133
        }
      ]
    },
    {
      inAmount: BigInt(1000000000),
      outAmount: BigInt(32085623),
      amount: BigInt(1000000000),
      otherAmountThreshold: BigInt(31764767),
      swapMode: "ExactIn",
      priceImpactPct: 0.0001580489786574546,
      marketInfos: [
        {
          id: "EqLZKF1bwUWUzU5F21jDQMoK4HRx8wQpLt57jhP8LbKm-amgK1WE8Cvae4mVdj4AhXSsknWsjaGgo1coYicasBnM",
          label: "Cykura (95%) + Lifinity (5%)",
          inputMint: "So11111111111111111111111111111111111111112",
          outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          inAmount: BigInt(1000000000),
          outAmount: BigInt(32085623),
          lpFee: {
            amount: BigInt(116000),
            mint: "So11111111111111111111111111111111111111112",
            pct: 0.00011600000000000001
          },
          platformFee: {
            amount: BigInt(0),
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            pct: 0
          },
          notEnoughLiquidity: false,
          priceImpactPct: 0.00015804897865749325
        }
      ]
    },
    {
      inAmount: BigInt(1000000000),
      outAmount: BigInt(32070445),
      amount: BigInt(1000000000),
      otherAmountThreshold: BigInt(31749741),
      swapMode: "ExactIn",
      priceImpactPct: 0.00001841372567978894,
      marketInfos: [
        {
          id: "2x8Bmv9wj2a4LxADBWKiLyGRgAosr8yJXuZyvS8adirK",
          label: "Lifinity",
          inputMint: "So11111111111111111111111111111111111111112",
          outputMint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          inAmount: BigInt(1000000000),
          outAmount: BigInt(32071235),
          lpFee: {
            amount: BigInt(800000),
            mint: "So11111111111111111111111111111111111111112",
            pct: 0.0008
          },
          platformFee: {
            amount: BigInt(0),
            mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
            pct: 0
          },
          notEnoughLiquidity: false,
          priceImpactPct: 0.000004164107848570535
        },
        {
          id: "SWABtvDnJwWwAb9CbSA3nv7nTnrtYjrACAVtuP3gyBB",
          label: "Mercurial",
          inputMint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          inAmount: BigInt(32071235),
          outAmount: BigInt(32070445),
          lpFee: {
            amount: BigInt(320),
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            pct: 0.00001
          },
          platformFee: {
            amount: BigInt(0),
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            pct: 0
          },
          notEnoughLiquidity: false,
          priceImpactPct: 0.000014249677168418899
        }
      ]
    },
  ]
}

export const mockJupiterSwapTransactions: JupiterSwapResponse = {
  setupTransaction: "setup",
  swapTransaction: "swap",
  cleanupTransaction: "cleanup"
}
