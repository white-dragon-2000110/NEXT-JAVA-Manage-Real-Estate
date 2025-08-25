'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { VehicleDetail } from '@/components/VehicleDetail'
import { useParams } from 'next/navigation'

export default function VehicleDetailPage() {
  const params = useParams()
  const vehicleId = params.id as string

  return (
    <RootLayout>
      <VehicleDetail vehicleId={vehicleId} />
    </RootLayout>
  )
} 