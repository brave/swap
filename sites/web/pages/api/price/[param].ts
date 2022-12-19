import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  price: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  const { param } = req.query
  const response = await fetch(
    `https://ratios.rewards.brave.com/v2/relative/provider/coingecko/${param}/usd/1d`
  )

  if (!param || Array.isArray(param)) {
    res.status(400)
    return
  }

  const { payload } = await response.json()
  if (!payload) {
    console.log(`Failed to query price for param: ${param}`)
    res.status(200).json({ price: '0' })
    return
  }

  const price = payload[param]?.usd
  if (price) {
    res.status(200).json({ price: price.toFixed() })
    return
  }

  console.log(`Failed to parse price for token: ${JSON.stringify(payload)}`)
  res.status(200).json({ price: '0' })
}
