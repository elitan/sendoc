import { Request, Response } from 'express'

const handler = async (req: Request, res: Response) => {
  console.log('testing logs 123')

  res.status(200).send(`log test`)
}

export default handler
