import React from 'react'
import ReactDOM from 'react-dom/client'

import { Swap } from '@brave/swap-interface'
import '@brave/swap-interface/style.css'

import { getLocale } from './utils/locale'
import {
  ethWalletAdapter,
  getAllTokens,
  getBalance,
  getBraveWalletAccounts,
  getDefaultBaseCurrency,
  getERC20TokenBalance,
  getExchanges,
  getNetworkFeeEstimate,
  getSelectedAccount,
  getSelectedNetwork,
  getSupportedNetworks,
  getTokenPrice,
  solWalletAdapter,
  swapService
} from '../mock-data/mock-apis'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Swap
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
