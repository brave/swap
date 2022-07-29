// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react';
import styled from 'styled-components';

// Types
import { BlockchainToken, NetworkInfo } from '../../constants/types'

// Assets
import CloseIcon from '../../assets/close-icon.svg'

// Components
import { StandardButton, TokenListButton, IconButton } from '../buttons'
import { SearchWithNetworkSelector } from './search-with-network-selector'
import { StandardModal } from '../modals'

// Styled Components
import { Column, Row, Text, VerticalDivider } from '../shared.styles'

interface Props {
  onClose: () => void
  onSelectToken: (token: BlockchainToken) => void
  getLocale: (key: string) => string
  getTokenBalance: (token: BlockchainToken) => string
  selectedNetwork: NetworkInfo
  selectedToken: BlockchainToken | undefined
  tokenList: BlockchainToken[]
  isConnected: boolean
  selectingFromOrTo: 'from' | 'to'
}

export const SelectTokenModal = (props: Props) => {
  const {
    onClose,
    onSelectToken,
    getLocale,
    getTokenBalance,
    selectedToken,
    tokenList,
    selectedNetwork,
    isConnected,
    selectingFromOrTo
  } = props

  // State
  const [hideTokensWithZeroBalances, setHideTokensWithZeroBalances] = React.useState<boolean>(true)
  const [searchValue, setSearchValue] = React.useState<string>('')

  // Effects
  React.useEffect(() => {
    if (selectingFromOrTo === 'to') {
      setHideTokensWithZeroBalances(false)
    }
  }, [selectingFromOrTo])

  // Methods
  const toggleHideTokensWithZerorBalances = React.useCallback(() => {
    setHideTokensWithZeroBalances(!hideTokensWithZeroBalances)
  }, [hideTokensWithZeroBalances])

  const handleOnSearchChanged = React.useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  // Memos
  const buttonText = React.useMemo((): string => {
    return hideTokensWithZeroBalances
      ? getLocale('braveSwapShowTokensWithZeroBalances')
      : getLocale('braveSwapHideTokensWithZeroBalances')
  }, [hideTokensWithZeroBalances])

  const filteredTokenListBySearch = React.useMemo((): BlockchainToken[] => {
    if (searchValue === '') {
      return tokenList
    }
    return tokenList.filter((token: BlockchainToken) =>
      token.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      token.symbol.toLowerCase().startsWith(searchValue.toLowerCase())
    )
  }, [tokenList, searchValue])

  const tokenListWithBalances = React.useMemo((): BlockchainToken[] => {
    return filteredTokenListBySearch.filter((token: BlockchainToken) => Number(getTokenBalance(token)) > 0)
  }, [filteredTokenListBySearch, hideTokensWithZeroBalances])

  const filteredTokenList = React.useMemo((): BlockchainToken[] => {
    if (tokenListWithBalances.length === 0 || !isConnected) {
      return filteredTokenListBySearch
    }
    if (hideTokensWithZeroBalances) {
      return tokenListWithBalances
    }
    return filteredTokenListBySearch
  }, [
    filteredTokenListBySearch,
    hideTokensWithZeroBalances,
    tokenListWithBalances,
    selectingFromOrTo,
    isConnected
  ])

  const showZeroBalanceButton = React.useMemo((): boolean => {
    return tokenListWithBalances.length !== 0 && isConnected
  }, [tokenListWithBalances, isConnected, selectingFromOrTo])

  return (
    <Modal
      modalHeight={hideTokensWithZeroBalances ? 'standard' : 'full'}
    >
      <Row
        rowWidth='full'
        horizontalPadding={24}
        verticalPadding={20}
      >
        <Text
          textSize='18px'
          isBold={true}
        >
          {getLocale('braveSwapSelectAToken')}
        </Text>
        <IconButton
          icon={CloseIcon}
          onClick={onClose}
          size={20}
        />
      </Row>
      <Row
        rowWidth='full'
        horizontalPadding={20}
        marginBottom={16}
      >
        <SearchWithNetworkSelector
          getLocale={getLocale}
          onSearchChanged={handleOnSearchChanged}
          searchValue={searchValue}
          selectedNetwork={selectedNetwork}
          networkSelectorDisabled={selectingFromOrTo === 'to'}
        />
      </Row>
      <VerticalDivider />
      <ScrollContainer
        columnWidth='full'
        horizontalPadding={12}
        verticalAlign='flex-start'
        verticalPadding={8}
      >
        {filteredTokenList.map((token) =>
          <TokenListButton
            key={token.contractAddress}
            onClick={onSelectToken}
            balance={getTokenBalance(token)}
            isConnected={isConnected}
            token={token}
            disabled={
              selectedToken ?
                selectedToken.contractAddress === token.contractAddress :
                false
            }
          />
        )}
      </ScrollContainer>
      {showZeroBalanceButton &&
        <Button
          buttonText={buttonText}
          onClick={toggleHideTokensWithZerorBalances}
          buttonStyle='square'
          buttonWidth='full'
          horizontalMargin={0}
          verticalMargin={0}
        />
      }
    </Modal>
  )
}

const Modal = styled(StandardModal)`
  min-height: 440px;
`

const Button = styled(StandardButton)`
  margin: auto;
  align-self: flex-end;
`

const ScrollContainer = styled(Column)`
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
`
