import { BlockchainToken, NetworkInfo } from '~/constants/types'

export const makeNetworkAsset = (network: NetworkInfo): BlockchainToken => {
  return {
    contractAddress: '',
    name: network.symbolName,
    symbol: network.symbol,
    logo: network.logo,
    isToken: false,
    decimals: network.decimals,
    visible: true,
    coingeckoId: '',
    chainId: network.chainId,
    coin: network.coin
  }
}

export const getBalanceRegistryKey = (asset: BlockchainToken) => {
  return `${asset.coin}-${asset.chainId}-${asset.contractAddress.toLowerCase()}`
}
