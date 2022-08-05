import Link from 'next/link'
import type { ReactElement } from 'react'
import { DocsList } from '../../components/DocsList'
import { AppLayout } from '../../components/layouts/AppLayout'
import type { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <div className="my-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Documents
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link href="/docs/new" type="button">
              <a className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Document
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <DocsList />
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Page
