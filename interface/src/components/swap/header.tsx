// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Constants
import { BRAVE_SWAP_DATA_THEME_KEY } from '../../constants/magics'

// Types
import { NetworkInfo, RefreshBlockchainStateParams } from '~/constants/types'

// Utils
import { reduceNetworkDisplayName } from '~/utils/reduce-network-name'

// Components
import { ThemeButton, SelectTokenOrNetworkButton, ConnectWalletButton } from '~/components/buttons'
import { NetworkSelector } from './network-selector'
import { AccountModal } from './account-modal/account-modal'

// Hooks
import { useSwapContext } from '~/context/swap.context'
import { useNetworkFees } from '~/hooks/useNetworkFees'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'

// Styled Components
import { Row, HorizontalSpacer, StyledDiv } from '~/components/shared.styles'

interface Props {
  refreshBlockchainState: (
    overrides: Partial<RefreshBlockchainStateParams>
  ) => Promise<void>
}

export const Header = (props: Props) => {
  const { refreshBlockchainState } = props

  // Wallet State
  const { network, supportedNetworks, isWalletConnected, connectWallet, switchNetwork } =
    useSwapContext()

  // State
  const [showNetworkSelector, setShowNetworkSelector] = React.useState<boolean>(false)
  const [showAccountModal, setShowAccountModal] = React.useState<boolean>(false)

  // Refs
  const networkSelectorRef = React.useRef<HTMLDivElement>(null)
  const accountModalRef = React.useRef<HTMLDivElement>(null)

  // Methods
  const onSelectNetwork = React.useCallback(async (payload: NetworkInfo) => {
    const account = await switchNetwork(payload)
    setShowNetworkSelector(false)
    await refreshBlockchainState({ network: payload, account })
  }, [switchNetwork, refreshBlockchainState])

  const toggleTheme = React.useCallback(() => {
    // Users local theme
    const userTheme = window.localStorage.getItem(BRAVE_SWAP_DATA_THEME_KEY)

    // The opposite of the browsers default theme
    const themeToChangeTo = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'light'
      : 'dark'

    // If the userTheme is null then the site will default the browsers pref,
    // so if user clicks the theme toggle, we set the userTheme for the first time.
    if (userTheme === null) {
      document.documentElement.setAttribute('data-theme', themeToChangeTo)
      window.localStorage.setItem(BRAVE_SWAP_DATA_THEME_KEY, themeToChangeTo)
      return
    }

    // If userTheme is light, change to dark
    if (userTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark')
      window.localStorage.setItem(BRAVE_SWAP_DATA_THEME_KEY, 'dark')
      return
    }

    // Default to light
    document.documentElement.setAttribute('data-theme', 'light')
    window.localStorage.setItem(BRAVE_SWAP_DATA_THEME_KEY, 'light')
    return
  }, [])

  // Hooks
  const { getNetworkFeeFiatEstimate } = useNetworkFees()

  // Click away for network selector
  useOnClickOutside(
    networkSelectorRef,
    () => setShowNetworkSelector(false),
    showNetworkSelector
  )

  // Click away for account modal
  useOnClickOutside(
    accountModalRef,
    () => setShowAccountModal(false),
    showAccountModal
  )

  const isNetworkSupported = React.useMemo(() => {
    return supportedNetworks.some(supportedNetwork => supportedNetwork.chainId === network.chainId)
  }, [network, supportedNetworks])

  const onClickConnectWalletButton = React.useCallback(async () => {
    if (!isWalletConnected && connectWallet) {
      await connectWallet()
      return
    }

    setShowAccountModal(prev => !prev)
  }, [isWalletConnected, connectWallet])

  return (
    <Wrapper>
      <BraveLogo />
      <Row>
        <ThemeButton onClick={toggleTheme} />
        <SelectorWrapper ref={networkSelectorRef}>
          <SelectTokenOrNetworkButton
            onClick={() => setShowNetworkSelector(prev => !prev)}
            text={reduceNetworkDisplayName(network.chainName)}
            network={network}
            buttonSize='medium'
            hasBackground={true}
            hasShadow={true}
            networkFeeFiatValue={getNetworkFeeFiatEstimate(network)}
            isHeader={true}
            networkNotSupported={!isNetworkSupported}
          />
          {showNetworkSelector && (
            <NetworkSelector isHeader={true} onSelectNetwork={onSelectNetwork} />
          )}
        </SelectorWrapper>
        <HorizontalSpacer size={15} />
        <SelectorWrapper ref={accountModalRef}>
          <ConnectWalletButton onClick={onClickConnectWalletButton} />
          {showAccountModal && (
            <AccountModal
              refreshBlockchainState={refreshBlockchainState}
              onHideModal={() => setShowAccountModal(false)}
            />
          )}
        </SelectorWrapper>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled(StyledDiv)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px 0px 32px;
  margin-bottom: 45px;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  z-index: 10;
`

const BraveLogo = styled(StyledDiv)`
  height: 30px;
  width: 100px;
  background-image: var(--header-icon);
  background-size: cover;
`

const SelectorWrapper = styled(StyledDiv)`
  display: flex;
  position: relative;
`
