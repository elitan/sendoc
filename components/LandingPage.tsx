import Head from 'next/head'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
// import { Faqs } from '@/components/Faqs'
// import { Footer } from '@/components/Footer'

// import { CallToAction } from '@/components/CallToAction'
// import { Pricing } from '@/components/Pricing'
// import { PrimaryFeatures } from '@/components/PrimaryFeatures'
// import { SecondaryFeatures } from '@/components/SecondaryFeatures'
// import { Testimonials } from '@/components/Testimonials'

export function LandingPage() {
  return (
    <>
      <Head>
        <title>Sendoc</title>
        <meta
          name="description"
          content="Sendoc is a platform for sending documents to anyone, anywhere in the world."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        {/* <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing /> */}
        {/* <Faqs /> */}
      </main>
      {/* <Footer /> */}
    </>
  )
}
