'use client'

import { useState, useEffect } from 'react'
import { RootLayout } from '@/layouts/RootLayout'
import { AnuncianteDashboard } from '@/components/dashboard/AnuncianteDashboard'

export default function AnuncianteDashboardPage() {
  return (
    <RootLayout>
      <AnuncianteDashboard />
    </RootLayout>
  )
} 