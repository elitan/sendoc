import { Request, Response } from 'express'
import fetch from 'node-fetch'
import { nhost } from './_utils/nhost'

const handler = async (req: Request, res: Response) => {
  // generate public URL
  const publicUrl = nhost.storage.getPublicUrl({ fileId: 'e6f69adb-c56e-4c90-be91-6bcce2fc9d9e' })

  // get file using public url with admin secret
  const response = await fetch(publicUrl, {
    headers: {
      'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET as string
    }
  })

  console.log({ response })

  // set admin secret to storage
  nhost.storage.setAdminSecret(process.env.NHOST_ADMIN_SECRET as string)
  const { presignedUrl } = await nhost.storage.getPresignedUrl({
    fileId: 'e6f69adb-c56e-4c90-be91-6bcce2fc9d9e'
  })

  console.log(presignedUrl)

  res.status(200).send({ response })
}

export default handler
