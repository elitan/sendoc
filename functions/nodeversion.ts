import { Request, Response } from 'express'

const handler = async (req: Request, res: Response) => {
  console.log(process.version)

  res.status(200).send(process.version)
}

export default handler
