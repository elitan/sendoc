import { Request, Response } from 'express'
import { nhost } from './_utils/nhost'

const handler = async (req: Request, res: Response) => {
  const FILES = `
  query {
    files {
      id
    }
  }
  `

  const gqlRes = await nhost.graphql.request(FILES)

  console.log({ gqlRes })

  res.status(200).send(`Hello ${req.query.name}!`)
}

export default handler
