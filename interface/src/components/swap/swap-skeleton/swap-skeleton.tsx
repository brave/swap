// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

// Context
import { useSwapContext } from '~/context/swap.context'

// Components
import { SwapSectionBox } from '~/components/boxes'
import { Skeleton } from './skeleton'

// Styled Components
import {
  StyledDiv,
  Row,
  HorizontalDivider,
  HorizontalSpacer,
  Text,
  HiddenResponsiveRow,
  ShownResponsiveRow
} from '~/components/shared.styles'

export const SwapSkeleton = () => {
  // Context
  const { getLocale } = useSwapContext()

  return (
    <Wrapper>
      <Header>
        <Row rowHeight='full' verticalAlign='center'>
          <BraveLogo />
          <HiddenResponsiveRow maxWidth={570}>
            <HorizontalDivider height={22} marginRight={12} dividerTheme='darker' />
            <Text textSize='18px' textColor='text02' isBold={true}>
              {getLocale('braveSwap')}
            </Text>
          </HiddenResponsiveRow>
        </Row>
        <Row>
          <HiddenResponsiveRow maxWidth={570}>
            <Skeleton width={40} height={40} borderRadius={100} />
            <HorizontalSpacer size={16} />
            <Skeleton width={154} height={40} borderRadius={48} />
            <HorizontalSpacer size={16} />
            <Skeleton width={154} height={40} borderRadius={48} />
          </HiddenResponsiveRow>
          <ShownResponsiveRow>
            <Skeleton width={68} height={32} borderRadius={100} />
            <HorizontalSpacer size={16} />
            <Skeleton width={135} height={32} borderRadius={48} />
          </ShownResponsiveRow>
        </Row>
      </Header>
      <Container>
        <Row
          rowWidth='full'
          horizontalPadding={16}
          verticalPadding={6}
          marginBottom={18}
        >
          <Text isBold={true}>{getLocale('braveSwap')}</Text>
        </Row>
        <SwapSectionBox boxType='primary'>
          <Row rowWidth='full'>
            <Row>
              <Skeleton width={124} height={60} borderRadius={100} />
              <HorizontalDivider height={28} marginLeft={8} marginRight={8} />
              <HiddenResponsiveRow maxWidth={570}>
                <Skeleton width={46} height={24} borderRadius={4} />
              </HiddenResponsiveRow>
              <HorizontalSpacer size={8} />
              <Skeleton width={46} height={24} borderRadius={4} />
            </Row>
            <Skeleton width={100} height={42} borderRadius={5} />
          </Row>
        </SwapSectionBox>
        <FlipWrapper>
          <FlipBox>
            <Skeleton width={40} height={40} borderRadius={100} background='secondary' />
          </FlipBox>
        </FlipWrapper>
        <SwapSectionBox boxType='secondary'>
          <Row rowWidth='full'>
            <Skeleton width={160} height={40} borderRadius={100} background='secondary' />
            <Skeleton width={100} height={42} borderRadius={5} background='secondary' />
          </Row>
        </SwapSectionBox>
        <Row rowWidth='full' horizontalAlign='center' verticalPadding={16}>
          <Skeleton height={56} borderRadius={48} background='secondary' />
        </Row>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled(StyledDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 100px 0px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  position: absolute;
  background-color: ${(p) => p.theme.color.legacy.background01};
  @media (prefers-color-scheme: dark) {
    background-color: ${(p) => p.theme.color.legacy.background02};
    padding: 80px 0px;
  }
`

const Container = styled(StyledDiv)`
  background-color: ${(p) => p.theme.color.legacy.background01};
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  justify-content: flex-start;
  padding: 16px;
  width: 512px;
  position: relative;
  z-index: 9;
  @media screen and (max-width: 570px) {
    width: 92%;
    padding: 16px 8px;
  }
`

const Header = styled(StyledDiv)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 32px 0px 32px;
  margin-bottom: 45px;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  z-index: 10;
  @media screen and (max-width: 570px) {
    padding: 20px 16px 0px 16px;
  }
`

const BraveLogo = styled(StyledDiv)`
  height: 30px;
  width: 100px;
  background-image: var(--header-icon);
  background-size: cover;
  margin: 0px 12px 4px 0px;
  @media screen and (max-width: 570px) {
    margin: 0px 0px 4px 0px;
  }
`

const FlipWrapper = styled(StyledDiv)`
  height: 8px;
  width: 100%;
`

const FlipBox = styled(StyledDiv)`
  position: absolute;
  z-index: 10;
  border-radius: 100%;
  background-color: ${(p) => p.theme.color.legacy.background01};
`
