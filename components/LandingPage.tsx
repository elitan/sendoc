import Link from 'next/link'

export function LandingPage() {
  return (
    <div>
      <h1 className="text-red-600">Good looking landing page with SSG</h1>
      <div>
        <Link href="/sign-in">
          <a>Sign In</a>
        </Link>
      </div>
    </div>
  )
  return
}
