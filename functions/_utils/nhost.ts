import { NhostClient } from '@nhost/nhost-js'

console.log('initi with', process.env.NHOST_BACKEND_URL)

const nhost = new NhostClient({
  backendUrl: process.env.NHOST_BACKEND_URL
})

export { nhost }
