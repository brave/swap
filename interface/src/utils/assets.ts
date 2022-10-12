import { BlockchainToken, NetworkInfo } from '~/constants/types'

export const makeNetworkAsset = (network: NetworkInfo): BlockchainToken => {
  return {
    contractAddress: '',
    name: network.symbolName,
    symbol: network.symbol,
    logo: '', // Currently, we don't need logo for use-cases of makeNetworkAsset()
    isToken: false,
    decimals: network.decimals,
    visible: true,
    coingeckoId: '',
    chainId: network.chainId,
    coin: network.coin
  }
}
