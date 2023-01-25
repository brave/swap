// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Context
import { useSwapContext } from '~/context/swap.context'

// Types
import {BlockchainToken, NetworkInfo, RefreshBlockchainStateParams} from '~/constants/types'
import Amount from '~/utils/amount'

// Assets
import CloseIcon from '~/assets/close-icon.svg'

// Components
import { StandardButton } from '~/components/buttons'
import { SearchWithNetworkSelector } from './search-with-network-selector'
import { StandardModal } from '~/components/modals'
import { VirtualizedTokenList } from './virtualized-tokens-list'

// Styled Components
import { Column, Row, Text, VerticalDivider, IconButton, HiddenResponsiveRow } from '~/components/shared.styles'

interface Props {
  onClose: () => void
  onSelectToken: (token: BlockchainToken) => void
  getCachedAssetBalance: (token: BlockchainToken) => Amount
  disabledToken: BlockchainToken | undefined
  selectingFromOrTo: 'from' | 'to'
  refreshBlockchainState: (overrides: Partial<RefreshBlockchainStateParams>) => Promise<void>
  getNetworkAssetsList: (network: NetworkInfo) => BlockchainToken[]
}

export const SelectTokenModal = React.forwardRef<HTMLDivElement, Props>(
  (props: Props, forwardedRef) => {
    const { onClose, onSelectToken, getCachedAssetBalance, refreshBlockchainState, getNetworkAssetsList, disabledToken, selectingFromOrTo } = props

    // Context
    const { getLocale, network, isWalletConnected } = useSwapContext()

    // State
    const [hideTokensWithZeroBalances, setHideTokensWithZeroBalances] =
      React.useState<boolean>(true)
    const [searchValue, setSearchValue] = React.useState<string>('')

    // Methods
    const toggleHideTokensWithZeroBalances = React.useCallback(() => {
      setHideTokensWithZeroBalances(prev => !prev)
    }, [])

    const handleOnSearchChanged = React.useCallback((value: string) => {
      setSearchValue(value)
    }, [])

    // Memos
    const networkAssetsList = React.useMemo(() => {
      return getNetworkAssetsList(network)
    }, [getNetworkAssetsList, network])

    const buttonText: string = React.useMemo(() => {
      return hideTokensWithZeroBalances
        ? getLocale('braveSwapShowTokensWithZeroBalances')
        : getLocale('braveSwapHideTokensWithZeroBalances')
    }, [hideTokensWithZeroBalances])

    const filteredTokenListBySearch: BlockchainToken[] = React.useMemo(() => {
      if (searchValue === '') {
        return networkAssetsList
      }
      return networkAssetsList.filter(
        (token: BlockchainToken) =>
          token.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          token.symbol.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    }, [networkAssetsList, searchValue])

    const tokenListWithBalances: BlockchainToken[] = React.useMemo(() => {
      return filteredTokenListBySearch.filter((token: BlockchainToken) =>
        getCachedAssetBalance(token).gt(0)
      )
    }, [filteredTokenListBySearch, getCachedAssetBalance])

    const filteredTokenList: BlockchainToken[] = React.useMemo(() => {
      if (tokenListWithBalances.length === 0 || !isWalletConnected) {
        return filteredTokenListBySearch
      }
      if (hideTokensWithZeroBalances) {
        return tokenListWithBalances
      }
      return filteredTokenListBySearch
    }, [filteredTokenListBySearch, hideTokensWithZeroBalances, tokenListWithBalances, isWalletConnected])

    const showZeroBalanceButton: boolean = React.useMemo(() => {
      return tokenListWithBalances.length !== 0 && isWalletConnected
    }, [tokenListWithBalances, isWalletConnected])

    // Effects
    React.useEffect(() => {
      if (selectingFromOrTo === 'to') {
        setHideTokensWithZeroBalances(false)
      }
    }, [selectingFromOrTo])

    // render
    return (
      <StandardModal ref={forwardedRef} modalHeight={hideTokensWithZeroBalances ? 'standard' : 'full'}>
        <Row rowWidth='full' horizontalPadding={24} verticalPadding={20}>
          <Text textSize='18px' responsiveTextSize='20px' isBold={true}>
            {getLocale('braveSwapSelectAToken')}
          </Text>
          <IconButton icon={CloseIcon} onClick={onClose} size={20} />
        </Row>
        <Row rowWidth='full' horizontalPadding={20} marginBottom={16}>
          <SearchWithNetworkSelector
            onSearchChanged={handleOnSearchChanged}
            searchValue={searchValue}
            networkSelectorDisabled={selectingFromOrTo === 'to'}
            refreshBlockchainState={refreshBlockchainState}
          />
        </Row>
        <HiddenResponsiveRow maxWidth={570}>
        <VerticalDivider />
        </HiddenResponsiveRow>
        <ScrollContainer
          columnWidth='full'
          verticalAlign='flex-start'
          verticalPadding={8}
        >
          {filteredTokenList.length !== 0 && (
            <VirtualizedTokenList
              disabledToken={disabledToken}
              getCachedAssetBalance={getCachedAssetBalance}
              isWalletConnected={isWalletConnected}
              onSelectToken={onSelectToken}
              tokenList={filteredTokenList}
            />
          )}
        </ScrollContainer>
        {showZeroBalanceButton && (
          <Button
            buttonText={buttonText}
            onClick={toggleHideTokensWithZeroBalances}
            buttonStyle='square'
            buttonWidth='full'
            horizontalMargin={0}
            verticalMargin={0}
          />
        )}
      </StandardModal>
    )
  }
)

const Button = styled(StandardButton)`
  align-self: flex-end;
  margin: auto;
`

const ScrollContainer = styled(Column)`
  flex: 1;
  overflow: hidden;
  @media screen and (max-width: 570px) {
    padding: 0px;
  }
`
