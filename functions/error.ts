import { Request, Response } from 'express'

const handler = async (req: Request, res: Response) => {
  throw new Error('testing error')
}

export default handler
