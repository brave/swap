// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.
import './App.css'

// Components
import { SwapContainer } from './components/swap-container/swap-container'
import { StandardButton } from './components/buttons/standard-button'
import { IconButton } from './components/buttons/icon-button'
import { Box } from './components/box/box'

// Assets
import AdvancedIcon from './assets/advanced-icon.svg'

// Utils
import { getLocale } from './utils/locale'

// Styled Components
import { Row, Text } from './components/shared.styles'

function App () {
  return (
    <SwapContainer>
      <Row
        rowWidth='full'
        horizontalPadding={16}
        verticalPadding={6}
        marginBottom={18}
      >
        <Text
          isBold={true}
        >
          {getLocale('braveSwap')}
        </Text>
        <IconButton
          icon={AdvancedIcon}
          onClick={() => { }}
        />
      </Row>
      <Box
        boxType='primary'
      />
      <Box
        boxType='secondary'
      />
      <StandardButton
        onClick={() => { }}
        buttonText={getLocale('braveSwapReviewOrder')}
        buttonType="primary"
        buttonWidth="full"
        verticalMargin={16}
        disabled={true}
      />
    </SwapContainer>
  )
}

export default App
