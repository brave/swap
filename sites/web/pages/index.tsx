import React from 'react'
import type { NextPage, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import { BlockchainToken, CoinType } from '@brave/swap-interface'

const SwapContainerDynamic = dynamic(() => import('../components/container'), { ssr: false })

interface IndexProps {
  assetsList: BlockchainToken[]
}

const Index: NextPage<IndexProps> = props => {
  return <SwapContainerDynamic {...props} />
}

interface ContractMap {
  [contractAddress: string]: {
    name: string
    erc20: boolean
    symbol: string
    decimals: number
    logo: string
    coingeckoId?: string
    chainId?: string
  }
}

function contractMapToAssetsList (
  contractMap: ContractMap,
  chainId: string,
  coin: number
): BlockchainToken[] {
  return Object.keys(contractMap).map(contractAddress => {
    const value = contractMap[contractAddress]
    return {
      contractAddress,
      name: value.name,
      isToken: true,
      symbol: value.symbol,
      decimals: value.decimals,
      coingeckoId: value.coingeckoId || '',
      chainId: value.chainId || chainId,
      logo: `/images/${value.logo}`,
      coin
    } as BlockchainToken
  })
}

export const getStaticProps: GetStaticProps = async context => {
  const evmContractMap = require('../node_modules/brave-wallet-lists/evm-contract-map.json')
  const evmAssets = contractMapToAssetsList(evmContractMap, '', 60)

  const ethContractMap = require('../node_modules/brave-wallet-lists/contract-map.json')
  // Remove malformed entry (StandardBounties) in Metamask's contract metadata.
  const {
    '0x2af47a65da8CD66729b4209C22017d6A5C2d2400': _,
    ...ethContractMapWithoutStandardBounties
  } = ethContractMap
  const ethAssets = contractMapToAssetsList(ethContractMapWithoutStandardBounties, '0x1', 60)

  const solContractMap = require('../node_modules/brave-wallet-lists/solana-contract-map.json')
  const solAssets = contractMapToAssetsList(solContractMap, '0x65', 501)

  return {
    props: {
      assetsList: [...ethAssets, ...evmAssets, ...solAssets]
    }
  }
}

export default Index
