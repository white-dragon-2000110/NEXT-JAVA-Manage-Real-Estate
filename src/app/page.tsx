'use client';

import { RootLayout } from '@/layouts/RootLayout'
import { Hero } from '@/components/Hero'
import { FeaturedProperties } from '@/components/FeaturedVehicles'
import { PlatformBenefits } from '@/components/PlatformBenefits'
import { FinalCTA } from '@/components/FinalCTA'

export default function HomePage() {
  return (
    <RootLayout>
      <Hero />
      <FeaturedProperties />
      <PlatformBenefits />
      <FinalCTA />
    </RootLayout>
  )
}
