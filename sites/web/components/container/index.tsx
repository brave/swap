import React from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useDisconnect, useAccount, useNetwork, useSwitchNetwork, Chain } from 'wagmi'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

import {
  Swap,
  WalletAccount,
  NetworkInfo,
  CoinType,
  BlockchainToken,
  ChainID
} from '@brave/swap-interface'
import '@brave/swap-interface/style.css'

import { getLocale } from '../../utils/locale'
import { networks, ethereum, solana } from '../../constants/networks'

// Runtime dependencies
import {
  getBalance,
  getTokenBalance,
  getTokenPrice,
  ethWalletAdapter,
  swapService,
  makeSolWalletAdapter
} from '../../runtime'
import { mockNetworkFeeEstimates } from '../../mock-data/mock-network-fee-estimates'

function getCurrentEthNetwork (chain: Chain) {
  return (
    networks.find(network => Number(network.chainId) === chain.id) ||
    ({
      chainId: chain.id.toString(16).toLowerCase(),
      chainName: chain.name,
      blockExplorerUrl: '',
      logo: '',
      symbol: chain.nativeCurrency.symbol,
      symbolName: chain.nativeCurrency.name,
      decimals: chain.nativeCurrency.decimals,
      coin: CoinType.Ethereum,
      isEIP1559: false
    } as NetworkInfo)
  )
}

interface StaticProps {
  assetsList: BlockchainToken[]
}

export default function SwapContainer (props: StaticProps) {
  const { openConnectModal: ethOpenConnectModal } = useConnectModal()
  const { disconnectAsync: ethDisconnectAsync } = useDisconnect()
  const { isConnected: ethIsConnected, address: ethAddress } = useAccount()
  const { chain: ethChain } = useNetwork()
  const { switchNetworkAsync: ethSwitchNetworkAsync } = useSwitchNetwork()

  const [isReady, setIsReady] = React.useState<boolean>(false)

  const { setVisible: solSetVisible } = useWalletModal()
  const {
    publicKey: solPublicKey,
    disconnect: solDisconnectAsync,
    connected: solIsConnected,
    sendTransaction: solSendTransaction
  } = useSolanaWallet()

  const [network, setNetwork] = React.useState<NetworkInfo>(
    (ethChain && getCurrentEthNetwork(ethChain)) || (solIsConnected && solana) || ethereum
  )

  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 2000)
  }, [])

  const getAccountForNetwork = React.useCallback(
    (payload: NetworkInfo) => {
      if (payload.coin === CoinType.Ethereum) {
        if (!ethAddress) {
          return
        }

        return {
          name: '',
          address: ethAddress,
          coin: CoinType.Ethereum
        } as WalletAccount
      }

      if (payload.coin === CoinType.Solana) {
        if (!solPublicKey) {
          return
        }

        return {
          name: '',
          address: solPublicKey.toBase58(),
          coin: CoinType.Solana
        } as WalletAccount
      }
    },
    [ethAddress, solPublicKey]
  )

  const account = React.useMemo(
    () => getAccountForNetwork(network),
    [network, getAccountForNetwork]
  )

  React.useEffect(() => {
    if (ethChain) {
      const result = getCurrentEthNetwork(ethChain)
      if (result) {
        setNetwork(result)
      }
    }
  }, [ethChain])

  return (
    <Swap
      assetsList={props.assetsList}
      account={account}
      network={network}
      supportedNetworks={networks}
      walletAccounts={account ? [account] : []}
      exchanges={[]}
      defaultBaseCurrency='USD'
      isWalletConnected={
        network.coin === CoinType.Ethereum
          ? ethIsConnected && !!account
          : network.coin === CoinType.Solana
            ? solIsConnected && !!account
            : false
      }
      connectWallet={async () => {
        if (network.coin === CoinType.Ethereum) {
          ethOpenConnectModal && ethOpenConnectModal()
        }

        if (network.coin === CoinType.Solana) {
          solSetVisible(true)
        }
      }}
      disconnectWallet={async () => {
        await ethDisconnectAsync()
        await solDisconnectAsync()
      }}
      switchAccount={async (account: WalletAccount) => {
        // setAccount(account)
      }}
      switchNetwork={async (payload: NetworkInfo) => {
        if (payload.coin === CoinType.Ethereum && ethSwitchNetworkAsync) {
          await ethSwitchNetworkAsync(Number(payload.chainId))

          if (ethChain?.id === Number(payload.chainId)) {
            setNetwork(payload)
          }
        } else {
          setNetwork(payload)
        }

        // The caller may use the WalletAccount corresponding to the network
        // being switched to, for refreshing the blockchain state.
        return getAccountForNetwork(payload)
      }}
      getLocale={getLocale}
      getBalance={getBalance}
      getTokenBalance={getTokenBalance}
      getTokenPrice={getTokenPrice}
      getNetworkFeeEstimate={async (chainId: string) => mockNetworkFeeEstimates[chainId]}
      routeBackToWallet={() => {}}
      ethWalletAdapter={ethWalletAdapter}
      solWalletAdapter={makeSolWalletAdapter(solSendTransaction)}
      swapService={swapService}
      isReady={isReady}
    />
  )
}
