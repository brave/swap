// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Components
import { Swap } from './views/swap'

// Types
import ITheme from './definitions/theme-interface'

// Providers
import { ThemeProvider } from 'styled-components'
import { SwapProvider, SwapProviderInterface } from './context/swap.context'
import { WalletStateProvider } from './state/wallet'

interface AppProps extends SwapProviderInterface {
  defaultTheme: ITheme
}

export const App = (props: AppProps) => {
  const {
    defaultTheme,
    getBalance,
    getERC20TokenBalance,
    getLocale,
    getAllTokens,
    getSelectedAccount,
    getSelectedNetwork,
    getTokenPrice,
    getSwapQuotes
  } = props

  return (
    <ThemeProvider theme={defaultTheme}>
      <SwapProvider
        getBalance={getBalance}
        getERC20TokenBalance={getERC20TokenBalance}
        getLocale={getLocale}
        getAllTokens={getAllTokens}
        getSelectedAccount={getSelectedAccount}
        getSelectedNetwork={getSelectedNetwork}
        getTokenPrice={getTokenPrice}
        getSwapQuotes={getSwapQuotes}
      >
        <WalletStateProvider>
          <Swap />
        </WalletStateProvider>
      </SwapProvider>
    </ThemeProvider>
  )
}

export default App
