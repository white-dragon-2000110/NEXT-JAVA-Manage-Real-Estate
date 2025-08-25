'use client'

import { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { DashboardGeral } from './DashboardGeral'
import { GestaoUsuarios } from './GestaoUsuarios'
import { ModeracaoAnuncios } from './ModeracaoAnuncios'
import { RelatoriosFinanceiros } from './RelatoriosFinanceiros'
import { EstatisticasIA } from './EstatisticasIA'

type DashboardSection = 'geral' | 'usuarios' | 'moderacao' | 'financeiro' | 'ia'

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('geral')

  const renderContent = () => {
    switch (activeSection) {
      case 'geral':
        return <DashboardGeral />
      case 'usuarios':
        return <GestaoUsuarios />
      case 'moderacao':
        return <ModeracaoAnuncios />
      case 'financeiro':
        return <RelatoriosFinanceiros />
      case 'ia':
        return <EstatisticasIA />
      default:
        return <DashboardGeral />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
} 