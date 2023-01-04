// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.
import { ethers } from 'ethers'
import axios from 'axios'
import * as web3 from '@solana/web3.js'
import { WalletAdapterProps } from '@solana/wallet-adapter-base'

import {
  ApproveERC20Params,
  BlockchainToken,
  CoinType,
  ETHSendTransactionParams,
  hexStrToNumberArray,
  JupiterQuoteParams,
  JupiterQuoteResponse,
  JupiterSwapParams,
  JupiterSwapResponse,
  SOLSendTransactionParams,
  SwapFee,
  ZeroExQuoteResponse,
  ZeroExSwapParams,
  ZeroExSwapResponse
} from '@brave/swap-interface'

// Constants
import erc20ABI from '../constants/abis/erc20.json'
import proxy from '../constants/abis/proxy.json'
import { ethereum, evmChainIDBaseAPIURLMapping, solana } from '../constants/networks'

import {
  SOLANA_FEE_PAYABLE_TOKENS,
  SOLANA_FEE_RECIPIENT,
  ZERO_EX_BUY_TOKEN_PERCENTAGE_FEE,
  ZERO_EX_FEE_RECIPIENT
} from '../constants/magics'

async function getEthProvider () {
  if (!window.ethereum) {
    return
  }

  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const accounts = await provider.send('eth_accounts', [])
  if (accounts.length > 0) {
    return provider
  }
}

async function getSolProvider () {
  return new web3.Connection(`${window.location.href}api/rpc/solana`, 'confirmed')
}

export const getBalance = async (address: string, coin: number, chainId: string) => {
  if (coin === ethereum.coin) {
    const provider = await getEthProvider()
    if (!provider) {
      throw new Error('Ethereum Provider not ready')
    }

    const balance = await provider.getBalance(address)
    return balance.toString()
  }

  if (coin === solana.coin) {
    const provider = await getSolProvider()
    if (!provider) {
      throw new Error('Solana Provider not ready')
    }

    const publicKey = new web3.PublicKey(address)
    const balance = await provider.getBalance(publicKey)
    return ethers.BigNumber.from(balance).toString()
  }

  throw new Error(`Coin type ${coin} is not supported`)
}

export const getTokenBalance = async (
  contract: string,
  address: string,
  coin: number,
  chainId: string
) => {
  if (coin === ethereum.coin) {
    const provider = await getEthProvider()
    if (!provider) {
      throw new Error('Ethereum Provider not ready')
    }

    try {
      const contractObj = new ethers.Contract(contract, erc20ABI, provider)
      const balance = await contractObj.balanceOf(address)
      return balance.toString()
    } catch (e) {
      // Try using EIP-897 DelegateProxy.
      const contractObj = new ethers.Contract(contract, proxy, provider)
      try {
        const balance = await contractObj.balanceOf(address)
        return balance.toString()
      } catch (ie) {
        return '0'
      }
    }
  }

  if (coin === solana.coin) {
    const provider = await getSolProvider()
    if (!provider) {
      throw new Error('Solana Provider not ready')
    }

    const mintAccount = new web3.PublicKey(contract)
    const account = new web3.PublicKey(address)

    try {
      const tokenAccount = await provider.getTokenAccountsByOwner(account, { mint: mintAccount })
      if (tokenAccount.value.length === 0) {
        return '0'
      }

      const balanceResponse = await provider.getTokenAccountBalance(tokenAccount.value[0].pubkey)
      return balanceResponse.value.amount
    } catch (e) {
      return '0'
    }
  }

  throw new Error(`Coin type ${coin} is not supported`)
}

function getTokenParam (token: BlockchainToken) {
  if (token.coingeckoId) {
    return token.coingeckoId
  }

  if (!token.isToken) {
    return token.symbol.toLowerCase()
  }

  if (token.chainId === ethereum.chainId) {
    return token.contractAddress.toLowerCase()
  }

  return token.symbol.toLowerCase()
}

export const getTokenPrice = async (token: BlockchainToken) => {
  const param = getTokenParam(token)
  const response = await axios.get(`/api/price/${param}`)
  if (response.status === 200) {
    const { price } = response.data
    return price
  }

  throw new Error(`Failed to fetch price: ${token.symbol}`)
}

export const swapService = {
  getZeroExPriceQuote: async (params: ZeroExSwapParams) => {
    const swapBaseAPIURL: string | undefined = evmChainIDBaseAPIURLMapping[params.chainId]
    if (!swapBaseAPIURL) {
      throw new Error(`Unsupported chainId: ${params.chainId}`)
    }

    const response = await axios.get(`${swapBaseAPIURL}/swap/v1/price`, {
      params: {
        takerAddress: params.takerAddress || undefined,
        sellAmount: params.sellAmount || undefined,
        buyAmount: params.buyAmount || undefined,
        buyToken: params.buyToken,
        sellToken: params.sellToken,
        buyTokenPercentageFee: ZERO_EX_BUY_TOKEN_PERCENTAGE_FEE,
        slippagePercentage: params.slippagePercentage.toFixed(6),
        feeRecipient: ZERO_EX_FEE_RECIPIENT,
        affiliateAddress: ZERO_EX_FEE_RECIPIENT,
        gasPrice: params.gasPrice || undefined
      }
    })

    return { response: response.data as ZeroExQuoteResponse }
  },

  getZeroExTransactionPayload: async (params: ZeroExSwapParams) => {
    const swapBaseAPIURL: string | undefined = evmChainIDBaseAPIURLMapping[params.chainId]
    if (!swapBaseAPIURL) {
      throw new Error(`Unsupported chainId: ${params.chainId}`)
    }

    const response = await axios.get(`${swapBaseAPIURL}/swap/v1/quote`, {
      params: {
        takerAddress: params.takerAddress || undefined,
        sellAmount: params.sellAmount || undefined,
        buyAmount: params.buyAmount || undefined,
        buyToken: params.buyToken,
        sellToken: params.sellToken,
        buyTokenPercentageFee: ZERO_EX_BUY_TOKEN_PERCENTAGE_FEE,
        slippagePercentage: params.slippagePercentage.toFixed(6),
        feeRecipient: ZERO_EX_FEE_RECIPIENT,
        affiliateAddress: ZERO_EX_FEE_RECIPIENT,
        gasPrice: params.gasPrice || undefined
      }
    })

    return { response: response.data as ZeroExSwapResponse }
  },

  isSwapSupported: async (chainId: string) => {
    return Object.keys(evmChainIDBaseAPIURLMapping).includes(chainId) || chainId === '0x65' // Solana
  },

  getBraveFeeForAsset: async (asset: BlockchainToken) => {
    if (asset.coin === CoinType.Ethereum) {
      return {
        fee: '0.875',
        discount: '0'
      } as SwapFee
    }

    return {
      fee: '0.85',
      discount: SOLANA_FEE_PAYABLE_TOKENS.includes(asset.contractAddress) ? '0' : '100'
    } as SwapFee
  },
  getJupiterQuote: async (params: JupiterQuoteParams) => {
    const response = await axios.get('https://quote-api.jup.ag/v1/quote', {
      params: {
        inputMint: params.inputMint,
        outputMint: params.outputMint,
        amount: params.amount,
        feeBps: SOLANA_FEE_PAYABLE_TOKENS.includes(params.outputMint) ? '85' : undefined,
        slippage: params.slippagePercentage.toFixed(6),
        onlyDirectRoutes: true
      }
    })

    return {
      response: {
        routes: response.data.data
      } as JupiterQuoteResponse
    }
  },
  getJupiterTransactionsPayload: async (params: JupiterSwapParams) => {
    const provider = await getSolProvider()
    if (!provider) {
      throw new Error('Solana Provider not ready')
    }

    const mintAccount = new web3.PublicKey(params.outputMint)
    const feeAccount = new web3.PublicKey(SOLANA_FEE_RECIPIENT)
    const feeTokenAccount = await provider.getTokenAccountsByOwner(feeAccount, {
      mint: mintAccount
    })
    if (feeTokenAccount.value.length === 0) {
      throw new Error(`ATA fee account not found for mint: ${params.outputMint}`)
    }

    const response = await axios.post('https://quote-api.jup.ag/v1/swap', {
      route: params.route,
      userPublicKey: params.userPublicKey,
      feeAccount: SOLANA_FEE_PAYABLE_TOKENS.includes(params.outputMint)
        ? feeTokenAccount.value[0].pubkey.toBase58()
        : undefined
    })

    return { response: response.data as JupiterSwapResponse }
  }
}

export const ethWalletAdapter = {
  getGasPrice: async (chainId: string) => {
    const provider = await getEthProvider()
    if (!provider) {
      throw new Error('Ethereum Provider not ready')
    }

    const { gasPrice } = await provider.getFeeData()
    if (!gasPrice) {
      throw new Error('Failed to fetch gasPrice')
    }

    return gasPrice.toString()
  },
  getGasPrice1559: async (chainId: string) => {
    const provider = await getEthProvider()
    if (!provider) {
      throw new Error('Ethereum Provider not ready')
    }

    const { lastBaseFeePerGas, maxPriorityFeePerGas, maxFeePerGas } = await provider.getFeeData()
    if (!lastBaseFeePerGas || !maxPriorityFeePerGas || !maxFeePerGas) {
      throw new Error('Failed to fetch EIP-1559 fee data')
    }

    return {
      slowMaxPriorityFeePerGas: maxPriorityFeePerGas.toHexString(),
      slowMaxFeePerGas: maxFeePerGas.mul(0.8).toHexString(),
      avgMaxPriorityFeePerGas: maxPriorityFeePerGas.toHexString(),
      avgMaxFeePerGas: maxFeePerGas.toHexString(),
      fastMaxPriorityFeePerGas: maxPriorityFeePerGas.toHexString(),
      fastMaxFeePerGas: maxFeePerGas.mul(1.2).toHexString(),
      baseFeePerGas: lastBaseFeePerGas.toHexString()
    }
  },
  sendTransaction: async (params: ETHSendTransactionParams) => {
    const provider = await getEthProvider()
    if (!provider) {
      throw new Error('Ethereum Provider not ready')
    }

    const signer = provider.getSigner()
    await signer.sendTransaction({
      from: params.from,
      to: params.to,
      value: params.value,
      data: params.data,
      gasLimit: params.gas,
      gasPrice: params.gasPrice,
      maxPriorityFeePerGas: params.maxPriorityFeePerGas,
      maxFeePerGas: params.maxFeePerGas
    })
  },
  getERC20ApproveData: async (params: ApproveERC20Params) => {
    const erc20Interface = new ethers.utils.Interface(erc20ABI)
    const data = erc20Interface.encodeFunctionData('approve', [
      params.spenderAddress,
      params.allowance
    ])
    return hexStrToNumberArray(data)
  },
  getERC20Allowance: async (
    contractAddress: string,
    ownerAddress: string,
    spenderAddress: string
  ) => {
    const provider = await getEthProvider()
    if (!provider) {
      throw new Error('Ethereum Provider not ready')
    }

    const contractObj = new ethers.Contract(contractAddress, erc20ABI, provider)
    const allowance = await contractObj.allowance(ownerAddress, spenderAddress)
    return allowance.toString()
  }
}

export function makeSolWalletAdapter (sendTransaction: WalletAdapterProps['sendTransaction']) {
  return {
    sendTransaction: async (params: SOLSendTransactionParams) => {
      const provider = await getSolProvider()
      if (!provider) {
        throw new Error('Solana Provider not ready')
      }

      const transaction = web3.Transaction.from(Buffer.from(params.encodedTransaction, 'base64'))
      await sendTransaction(transaction, provider, {
        skipPreflight: params.sendOptions?.skipPreflight,
        maxRetries: params.sendOptions?.maxRetries,
        preflightCommitment: params.sendOptions?.preflightCommitment
          ? (params.sendOptions.preflightCommitment as web3.Commitment)
          : undefined
      })
    }
  }
}
