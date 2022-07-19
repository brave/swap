// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import styled from 'styled-components';

interface IconButtonStyleProps {
  size?: number
  icon: string
}

interface Props extends IconButtonStyleProps {
  onClick: () => void
}

export const IconButton = (props: Props) => {
  const {
    icon,
    onClick,
    size
  } = props

  return (
    <Button
      onClick={onClick}
      icon={icon}
      size={size}
    />
  )
}

// ToDo: Update hardcoded colors once new Brave-UI is installed.
const Button = styled.button<IconButtonStyleProps>`
  height: ${(p) => p.size ? p.size : '16px'};
  width: ${(p) => p.size ? p.size : '16px'};
  background-color: #495057;
  -webkit-mask-image: url(${(p) => p.icon});
  mask-image: url(${(p) => p.icon});
  mask-size: contain;
`
