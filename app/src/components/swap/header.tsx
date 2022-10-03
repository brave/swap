// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Types
import { NetworkInfo } from '~/constants/types'

// Components
import {
  ThemeButton,
  SelectTokenOrNetworkButton,
  ConnectWalletButton
} from '~/components/buttons'
import { NetworkSelector } from './network-selector'

// Hooks
import { useWalletState, useWalletDispatch } from '~/state/wallet'
import { useNetworkFees } from '~/hooks/useNetworkFees'
import { useOnClickOutside } from '~/hooks/useOnClickOutside'

// Styled Components
import { Row, HorizontalSpacer } from '~/components/shared.styles'

export const Header = () => {
  // Wallet State
  const { state } = useWalletState()
  const { selectedNetwork } = state

  // Dispatch
  const { dispatch } = useWalletDispatch()

  // State
  const [showNetworkSelector, setShowNetworkSelector] =
    React.useState<boolean>(false)

  // Refs
  const networkSelectorRef = React.useRef<HTMLDivElement>(null)

  // Methods
  const onSelectNetwork = React.useCallback(
    (network: NetworkInfo) => {
      dispatch({ type: 'updateSelectedNetwork', payload: network })
      setShowNetworkSelector(false)
    },
    [dispatch]
  )

  const toggleTheme = React.useCallback(() => {
    // Sites local theme
    // ToDo: Store this value in localStorage per wallet address
    const localTheme = document.documentElement.getAttribute('data-theme')

    // The opposite of the browsers default theme
    const themeToChangeTo = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'light'
      : 'dark'

    // If the localTheme is null then the site will default the browsers pref,
    // so if user clicks the theme toggle, we set the localTheme for the first time.
    if (localTheme === null) {
      document.documentElement.setAttribute('data-theme', themeToChangeTo)
      return
    }

    // If localTheme is light, change to dark
    if (localTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark')
      return
    }

    // Default to light
    document.documentElement.setAttribute('data-theme', 'light')
    return
  }, [])

  const connectWallet = React.useCallback(() => {
    // ToDo: Add logic here to connect a wallet.
    dispatch({ type: 'setIsConnected', payload: true })
  }, [dispatch])

  // Hooks
  const { getNetworkFeeFiatEstimate } = useNetworkFees()
  useOnClickOutside(
    networkSelectorRef,
    () => setShowNetworkSelector(false),
    showNetworkSelector
  )

  return (
    <Wrapper>
      <BraveLogo />
      {selectedNetwork !== undefined && (
        <Row>
          <ThemeButton onClick={toggleTheme} />
          <SelectorWrapper ref={networkSelectorRef}>
            <SelectTokenOrNetworkButton
              onClick={() => setShowNetworkSelector((prev) => !prev)}
              text={selectedNetwork.chainName}
              icon={selectedNetwork.iconUrls[0]}
              buttonSize='medium'
              hasBackground={true}
              hasShadow={true}
              networkFeeFiatValue={getNetworkFeeFiatEstimate(selectedNetwork)}
              isHeader={true}
            />
            {showNetworkSelector && (
              <NetworkSelector
                isHeader={true}
                onSelectNetwork={onSelectNetwork}
              />
            )}
          </SelectorWrapper>
          <HorizontalSpacer size={15} />
          <ConnectWalletButton onClick={connectWallet} />
        </Row>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

const BraveLogo = styled.div`
  height: 30px;
  width: 100px;
  background-image: var(--header-icon);
  background-size: cover;
`

const SelectorWrapper = styled.div`
  display: flex;
  position: relative;
`
