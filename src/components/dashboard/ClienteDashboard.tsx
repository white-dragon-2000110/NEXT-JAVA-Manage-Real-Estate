'use client'

import { useState } from 'react'
import { DashboardSidebar } from './DashboardSidebar'
import { Favoritos } from './Favoritos'
import { Comparacoes } from './Comparacoes'
import { HistoricoBuscas } from './HistoricoBuscas'
import { AlertasPersonalizados } from './AlertasPersonalizados'

type DashboardSection = 'favoritos' | 'comparacoes' | 'historico' | 'alertas'

export function ClienteDashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('favoritos')

  const renderContent = () => {
    switch (activeSection) {
      case 'favoritos':
        return <Favoritos />
      case 'comparacoes':
        return <Comparacoes />
      case 'historico':
        return <HistoricoBuscas />
      case 'alertas':
        return <AlertasPersonalizados />
      default:
        return <Favoritos />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
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