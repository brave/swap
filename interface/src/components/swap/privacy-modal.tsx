// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Context
import { useSwapContext } from '~/context/swap.context'

// Assets
import CloseIcon from '~/assets/close-icon.svg'

// Components
import { StandardModal } from '~/components/modals'

// Styled Components
import {
  Row,
  Column,
  Text,
  IconButton,
  VerticalSpacer
} from '~/components/shared.styles'

interface Props {
  onClose: () => void
}

export const PrivacyModal = React.forwardRef<HTMLDivElement, Props>(
  (props: Props, forwardedRef) => {
    const { onClose } = props

    // Context
    const { getLocale } = useSwapContext()

    return (
      <StandardModal
        ref={forwardedRef}
        modalHeight='dynamic'
        modalBackground='background02'
      >
        <Row rowWidth='full' horizontalPadding={24} verticalPadding={20}>
          <Text textSize='18px' isBold={true}>
            {getLocale('braveSwapPrivacyPolicy')}
          </Text>
          <IconButton icon={CloseIcon} onClick={onClose} size={20} />
        </Row>
        <Column
          columnWidth='full'
          columnHeight='full'
          horizontalPadding={20}
          horizontalAlign='flex-start'
        >
          <Text
            textSize='16px'
            textColor='text02'
            textAlign='left'
            isBold={true}
          >
            {getLocale('braveSwapPrivacyDescription')}
          </Text>
          <VerticalSpacer size={10} />
          <Section
            columnWidth='full'
            horizontalAlign='flex-start'
            verticalPadding={10}
            horizontalPadding={10}
          >
            <Link
              rel='noopener noreferrer'
              target='_blank'
              href='https://www.0x.org/'
            >
              0x
            </Link>
            <Text
              textSize='14px'
              textColor='text03'
              textAlign='left'
              isBold={true}
            >
              {getLocale('braveSwapZeroXDisclaimer')}
            </Text>
            <Link
              rel='noopener noreferrer'
              target='_blank'
              href='https://www.0x.org/privacy'
            >
              {getLocale('braveSwapZeroXPrivacy')}
            </Link>
          </Section>
          <VerticalSpacer size={20} />
          <Section
            columnWidth='full'
            horizontalAlign='flex-start'
            verticalPadding={10}
            horizontalPadding={10}
          >
            <Link
              rel='noopener noreferrer'
              target='_blank'
              href='https://jup.ag/'
            >
              Jupiter
            </Link>
            <Text
              textSize='14px'
              textColor='text03'
              textAlign='left'
              isBold={true}
            >
              {getLocale('braveSwapJupiterDisclaimer')}
            </Text>
            <Link
              rel='noopener noreferrer'
              target='_blank'
              href='https://docs.jup.ag/legal/privacy-policy'
            >
              {getLocale('braveSwapJupiterPrivacy')}
            </Link>
          </Section>
          <VerticalSpacer size={20} />
        </Column>
      </StandardModal>
    )
  }
)

const Section = styled(Column)`
  background-color: ${(p) => p.theme.color.legacy.background01};
  border: 1px solid ${(p) => p.theme.color.legacy.divider01};
  border-radius: 8px;
`

export const Link = styled.a`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.color.legacy.interactive05};
  text-decoration: none;
  display: block;
  cursor: pointer;
  @media (prefers-color-scheme: dark) {
    color: ${(p) => p.theme.color.legacy.interactive06};
  }
`
