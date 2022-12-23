import type { AppProps } from 'next/app'
import type { FC } from 'react'
import React from 'react'

// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css')
require('@rainbow-me/rainbowkit/styles.css')
require('../styles/globals.css')
require('@brave/swap-interface/style.css')

import SolanaWalletProviderContext from '../contexts/solana'
import EthereumWalletProviderContext from '../contexts/ethereum'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <EthereumWalletProviderContext>
      <SolanaWalletProviderContext>
        <Component {...pageProps} />
      </SolanaWalletProviderContext>
    </EthereumWalletProviderContext>
  )
}

export default App
