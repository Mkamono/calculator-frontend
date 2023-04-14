// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  formula: string
  units: [string]
  all_units: [string]
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body);
  const respose = await fetch('http://kamono.pythonanywhere.com/');
  console.log(respose);
  const data = await respose.json();
  res.status(200).json({ data })
}
