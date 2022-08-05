import { useState } from 'react'
import type { ReactElement } from 'react'
import { toast } from 'react-toastify'

import { nhost } from '../../utils/nhost'
import { useInsertDocMutation } from '../../utils/__generated__/graphql'
import type { NextPageWithLayout } from '../_app'
import { AppLayout } from '../../components/layouts/AppLayout'
import { useRouter } from 'next/router'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [file, setFile] = useState<null | File>(null)

  const mutation = useInsertDocMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      return alert('no file selected')
    }

    const { fileMetadata, error } = await nhost.storage.upload({
      file,
      bucketId: 'documents'
    })

    if (error) {
      return alert(error.message)
    }

    if (!fileMetadata) {
      return alert('failed to get file metadata')
    }

    await mutation.mutate({
      doc: {
        name: fileMetadata.name,
        fileId: fileMetadata.id
      }
    })

    const insertedId = mutation.data?.insertDoc?.id
    console.log({ insertedId })

    toast.success('Document uploaded')
    router.push(`/docs/${insertedId}`)
  }

  if (mutation.isSuccess) {
    router.push(`/docs/${mutation.data.insertDoc?.id}`)
  }

  console.log(file)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              New Document
            </h2>
          </div>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          {file ? (
            <div className="flex space-x-3">
              <div>{file.name}</div>
              <div
                onClick={() => {
                  setFile(null)
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                <label className="block text-sm font-medium text-gray-700">Document</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-400 transition-all duration-400 ">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 ">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="application/pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setFile(e.target.files[0])
                            }
                          }}
                        />
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          )}

          <div className="py-6 flex">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-200"
              disabled={!file}
            >
              Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Page
