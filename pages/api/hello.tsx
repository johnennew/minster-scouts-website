export const config = { runtime: 'edge' };

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const example = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(process.env.NODE_ENV);
  res.status(200).json({ name: 'John Doe' })
}

export default example;
