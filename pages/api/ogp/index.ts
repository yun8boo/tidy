import { NextApiRequest, NextApiResponse } from 'next'
import { getPageInfo } from '../../../utils/getPageInfo';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query
  const {site_name, title, description, image} = await getPageInfo(url as string)
  res.json({site_name, title, description, image})
}

export default handler