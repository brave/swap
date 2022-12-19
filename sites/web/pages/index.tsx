import React from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const SwapContainerDynamic = dynamic(() => import('../components/container'), { ssr: false })

const Index: NextPage = () => {
  return <SwapContainerDynamic />
}

export default Index
