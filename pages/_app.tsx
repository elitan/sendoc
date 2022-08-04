import type { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { NhostNextProvider } from '@nhost/nextjs'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from '@tanstack/react-query'

import { nhost } from '../utils/nhost'
import { queryClient } from '../utils/react-query'

import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </QueryClientProvider>
    </NhostNextProvider>
  )
}
