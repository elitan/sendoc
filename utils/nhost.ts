import { NhostClient } from '@nhost/nextjs'

const params = {
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION
}

const nhost = new NhostClient(params)

export { nhost }
