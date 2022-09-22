// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import UniswapIcon from '../assets/lp-icons/uniswap.svg'
import SushiSwapIcon from '../assets/lp-icons/sushiswap.svg'
import CykuraIcon from '../assets/lp-icons/cykura.png'
import LifinityIcon from '../assets/lp-icons/lifinity.jpeg'
import MercurialIcon from '../assets/lp-icons/mercurial.svg'
import BalancerIcon from '../assets/lp-icons/balancer.svg'
import CurveIcon from '../assets/lp-icons/curve.svg'

type LPMetadataType = {
  [name: string]: string
}

const LPMetadata: LPMetadataType = {
  SushiSwap: SushiSwapIcon,
  Uniswap_V3: UniswapIcon,
  Uniswap_V2: UniswapIcon,
  Cykura: CykuraIcon,
  Lifinity: LifinityIcon,
  Mercurial: MercurialIcon,
  Balancer: BalancerIcon,
  Balancer_V2: BalancerIcon,
  Curve: CurveIcon,
  Curve_V2: CurveIcon
}

export default LPMetadata