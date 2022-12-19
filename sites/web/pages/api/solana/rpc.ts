import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`https://solana-api.syndica.io`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': `${process.env.SYNDICA_ACCESS_TOKEN}`
    },
    method: 'POST',
    body: JSON.stringify(req.body)
  })

  const responseBody = await response.json()
  res.status(response.status).json(responseBody)
}
