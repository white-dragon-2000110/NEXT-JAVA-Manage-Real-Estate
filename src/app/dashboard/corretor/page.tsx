'use client'

import { useState, useEffect } from 'react'
import { RootLayout } from '@/layouts/RootLayout'
import { DashboardGeral } from '@/components/dashboard/DashboardGeral'

export default function CorretorDashboardPage() {
  return (
    <RootLayout>
      <DashboardGeral />
    </RootLayout>
  )
} 