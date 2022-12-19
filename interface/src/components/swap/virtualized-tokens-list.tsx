// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

// Types
import { BlockchainToken } from '~/constants/types'

// Components
import { TokenListButton } from '~/components/buttons'
import Amount from '~/utils/amount'

interface VirtualizedTokensListProps {
  tokenList: BlockchainToken[]
  onSelectToken: (token: BlockchainToken) => void
  getCachedAssetBalance: (token: BlockchainToken) => Amount
  disabledToken: BlockchainToken | undefined
  isWalletConnected: boolean
}

interface ListItemProps extends Omit<VirtualizedTokensListProps, 'tokenList'> {
  index: number
  data: BlockchainToken[]
  style: React.CSSProperties
}

const itemSize = 72

const getListItemKey = (index: number, tokenList: BlockchainToken[]) => {
  const token = tokenList[index]
  return `${token.contractAddress}-${token.symbol}-${token.chainId}`
}

const ListItem = (props: ListItemProps) => {
  const {
    index,
    data,
    getCachedAssetBalance,
    disabledToken,
    isWalletConnected,
    onSelectToken,
    style
  } = props
  const token = data[index]

  return (
    <div style={style}>
      <TokenListButton
        onClick={onSelectToken}
        balance={getCachedAssetBalance(token)}
        isWalletConnected={isWalletConnected}
        token={token}
        disabled={
          disabledToken
            ? disabledToken.contractAddress === token.contractAddress
            : false
        }
      />
    </div>
  )
}

export const VirtualizedTokenList = (props: VirtualizedTokensListProps) => {
  const {
    tokenList,
    disabledToken,
    getCachedAssetBalance,
    isWalletConnected,
    onSelectToken
  } = props

  return (
    <AutoSizer
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      {function ({ height, width }) {
        return (
          <List
            width={width}
            height={height}
            itemData={tokenList}
            itemSize={(index: number) => itemSize}
            estimatedItemSize={itemSize}
            itemCount={tokenList.length}
            overscanCount={2}
            itemKey={getListItemKey}
            children={(itemProps) => (
              <ListItem
                {...itemProps}
                getCachedAssetBalance={getCachedAssetBalance}
                disabledToken={disabledToken}
                isWalletConnected={isWalletConnected}
                onSelectToken={onSelectToken}
              />
            )}
          />
        )
      }}
    </AutoSizer>
  )
}
