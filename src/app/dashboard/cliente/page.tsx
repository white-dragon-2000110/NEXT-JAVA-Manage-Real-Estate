'use client'

import { useState, useEffect } from 'react'
import { RootLayout } from '@/layouts/RootLayout'
import { ClienteDashboard } from '@/components/dashboard/ClienteDashboard'

export default function ClienteDashboardPage() {
  return (
    <RootLayout>
      <ClienteDashboard />
    </RootLayout>
  )
} 