'use client'

import { useState, useEffect } from 'react'
import { RootLayout } from '@/layouts/RootLayout'
import { AdminDashboard } from '@/components/dashboard/AdminDashboard'

export default function AdminDashboardPage() {
  return (
    <RootLayout>
      <AdminDashboard />
    </RootLayout>
  )
} 