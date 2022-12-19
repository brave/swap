import React, { FC, ReactNode } from 'react'

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { BraveWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider, useLocalStorage } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

const wallets = [new BraveWalletAdapter(), new PhantomWalletAdapter()]

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect()

  return (
    <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Mainnet)}>
      <WalletProvider wallets={wallets} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

interface AutoConnectContextState {
  autoConnect: boolean
  setAutoConnect(autoConnect: boolean): void
}

const AutoConnectContext = React.createContext<AutoConnectContextState>(
  {} as AutoConnectContextState
)

function useAutoConnect (): AutoConnectContextState {
  return React.useContext(AutoConnectContext)
}

const AutoConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', true)

  return (
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  )
}

const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AutoConnectProvider>
      <WalletContextProvider>{children}</WalletContextProvider>
    </AutoConnectProvider>
  )
}

export default ContextProvider
