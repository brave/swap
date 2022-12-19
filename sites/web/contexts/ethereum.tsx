import React, { FC, ReactNode } from 'react'

import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, optimism, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'

const { chains, provider } = configureChains([mainnet, polygon, optimism], [publicProvider()])
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
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Context
