import { Request, Response } from 'express'

const handler = (req: Request, res: Response) => {
  console.log('env vars:')
  console.log(process.env)

  res.status(200).send(`MY_TEST: ${process.env.MY_TEST}`)
}

export default handler
