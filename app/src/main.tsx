// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { defaultTheme } from './theme/default-theme'
import './index.css'

// Mock Data
import {
  ethWalletAdapter,
  getBalance,
  getERC20TokenBalance,
  getAllTokens,
  getSelectedAccount,
  getSelectedNetwork,
  getTokenPrice,
  getSupportedNetworks,
  getBraveWalletAccounts,
  getExchanges,
  getNetworkFeeEstimate,
  getDefaultBaseCurrency,
  solWalletAdapter,
  swapService
} from '../mock-data/mock-apis'

// Utils
import { getLocale } from '~/utils/locale'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App
      defaultTheme={defaultTheme}
      getLocale={getLocale}
      getBalance={getBalance}
      getERC20TokenBalance={getERC20TokenBalance}
      getAllTokens={getAllTokens}
      getSelectedAccount={getSelectedAccount}
      getSelectedNetwork={getSelectedNetwork}
      getTokenPrice={getTokenPrice}
      getSupportedNetworks={getSupportedNetworks}
      getBraveWalletAccounts={getBraveWalletAccounts}
      getExchanges={getExchanges}
      getNetworkFeeEstimate={getNetworkFeeEstimate}
      getDefaultBaseCurrency={getDefaultBaseCurrency}
      ethWalletAdapter={ethWalletAdapter}
      solWalletAdapter={solWalletAdapter}
      swapService={swapService}
    />
  </React.StrictMode>
)
