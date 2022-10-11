import React from 'react'
import * as ReactDOM from 'react-dom'

import { Swap } from '@brave/swap-interface'
import '@brave/swap-interface/style.css'

import { getLocale } from './utils/locale'
import {
  ethWalletAdapter,
  getAllTokens,
  getBalance,
  getBraveWalletAccounts,
  getDefaultBaseCurrency,
  getTokenBalance,
  getExchanges,
  getNetworkFeeEstimate,
  getSelectedAccount,
  getSelectedNetwork,
  getSupportedNetworks,
  getTokenPrice,
  solWalletAdapter,
  swapService
} from '../mock-data/mock-apis'

ReactDOM.render(
  <React.StrictMode>
    <Swap
      getLocale={getLocale}
      getBalance={getBalance}
      getTokenBalance={getTokenBalance}
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
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)
