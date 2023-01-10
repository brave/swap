import React, { FC, ReactNode } from 'react'

import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, optimism, polygon, bsc, avalanche, fantom, Chain } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme, cssStringFromTheme} from '@rainbow-me/rainbowkit'

const celo: Chain = {
  id: 42220,
  name: 'Celo Mainnet',
  network: 'Celo Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: {
      http: ['https://forno.celo.org']
    },
  },
  blockExplorers: {
    default: { name: 'Celo Explorer', url: 'https://explorer.celo.org/mainnet' },
    etherscan: { name: 'CeloScan', url: 'https://celoscan.io' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 13112599
    },
  },
  testnet: false,
}

const { chains, provider } = configureChains([mainnet, polygon, bsc, optimism, avalanche, fantom, celo], [publicProvider()])
const { connectors } = getDefaultWallets({
  appName: 'Brave Swap',
  chains
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize='compact' theme={null}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              ${cssStringFromTheme(lightTheme)}
            }
            @media (prefers-color-scheme: dark) {
              :root {
                ${cssStringFromTheme(darkTheme)}
              }
            }
            html[data-theme='light'] {
              ${cssStringFromTheme(lightTheme)}
            }
            html[data-theme='dark'] {
              ${cssStringFromTheme(darkTheme)}
            }
          `
        }}
      />
        {children}
        </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Context
