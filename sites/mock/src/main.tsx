import React from 'react'
import * as ReactDOM from 'react-dom'

import { Swap, WalletAccount, NetworkInfo } from '@brave/swap-interface'
import '@brave/swap-interface/style.css'
import './index.css'

import { getLocale } from './utils/locale'
import {
  ethWalletAdapter,
  getBalance,
  getTokenBalance,
  getNetworkFeeEstimate,
  getTokenPrice,
  solWalletAdapter,
  swapService
} from '../mock-data/mock-apis'
import { mockTokens } from '../mock-data/mock-tokens'
import { mockEthereumNetwork, mockNetworks } from '../mock-data/mock-networks'
import { mockAccount1, mockAccounts } from '../mock-data/mock-accounts'
import { mockExchanges } from '../mock-data/mock-exchanges'

ReactDOM.render(
  <React.StrictMode>
    <SwapContainer />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)

function SwapContainer() {
  const [account, setAccount] = React.useState<WalletAccount>(mockAccount1)
  const [network, setNetwork] = React.useState<NetworkInfo>(mockEthereumNetwork)
  const [isReady, setIsReady] = React.useState<boolean>(false)
  const [isWalletConnected, setIsWalletConnected] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 2000)
  }, [])

  return (
    <Swap
      assetsList={mockTokens}
      account={account}
      network={network}
      supportedNetworks={mockNetworks}
      walletAccounts={mockAccounts}
      exchanges={mockExchanges}
      defaultBaseCurrency='USD'
      isWalletConnected={isWalletConnected}
      connectWallet={async () => setIsWalletConnected(true)}
      disconnectWallet={async () => setIsWalletConnected(false)}
      switchAccount={async (account: WalletAccount) => {
        setAccount(account)
      }}
      switchNetwork={async (network: NetworkInfo) => {
        setNetwork(network)
        return account
      }}
      getLocale={getLocale}
      getBalance={getBalance}
      getTokenBalance={getTokenBalance}
      getTokenPrice={getTokenPrice}
      getNetworkFeeEstimate={getNetworkFeeEstimate}
      ethWalletAdapter={ethWalletAdapter}
      solWalletAdapter={solWalletAdapter}
      swapService={swapService}
      isReady={isReady}
    />
  )
}
