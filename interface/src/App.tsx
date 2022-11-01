// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Components
import { Swap } from './views/swap'

// Types
import ITheme from './definitions/theme-interface'
import { defaultTheme } from '~/theme/default-theme'

// Providers
import { ThemeProvider } from 'styled-components'
import { SwapProvider, SwapProviderInterface } from './context/swap.context'
import { WalletStateProvider } from './state/wallet'

import './index.css'

interface AppProps extends SwapProviderInterface {
  theme?: ITheme
}

const App = (props: AppProps) => {
  const {
    theme,
    assetsList,
    account,
    network,
    supportedNetworks,
    defaultBaseCurrency,
    exchanges,
    walletAccounts,
    isWalletConnected,
    isReady,
    connectWallet,
    disconnectWallet,
    switchAccount,
    switchNetwork,
    getBalance,
    getTokenBalance,
    getLocale,
    getTokenPrice,
    getNetworkFeeEstimate,
    routeBackToWallet,
    ethWalletAdapter,
    solWalletAdapter,
    swapService
  } = props

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <SwapProvider
        network={network}
        account={account}
        assetsList={assetsList}
        supportedNetworks={supportedNetworks}
        defaultBaseCurrency={defaultBaseCurrency}
        exchanges={exchanges}
        walletAccounts={walletAccounts}
        isWalletConnected={isWalletConnected}
        isReady={isReady}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        switchAccount={switchAccount}
        switchNetwork={switchNetwork}
        getBalance={getBalance}
        getTokenBalance={getTokenBalance}
        getLocale={getLocale}
        getTokenPrice={getTokenPrice}
        getNetworkFeeEstimate={getNetworkFeeEstimate}
        routeBackToWallet={routeBackToWallet}
        ethWalletAdapter={ethWalletAdapter}
        solWalletAdapter={solWalletAdapter}
        swapService={swapService}
      >
        <WalletStateProvider>
          <Swap />
        </WalletStateProvider>
      </SwapProvider>
    </ThemeProvider>
  )
}

export default App
