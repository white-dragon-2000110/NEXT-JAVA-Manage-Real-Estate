'use client'

import { useState } from 'react'
import { AnuncianteSidebar } from './AnuncianteSidebar'
import { CriarAnuncio } from './CriarAnuncio'
import { GerenciarAnuncios } from './GerenciarAnuncios'
import { LeadsRecebidos } from './LeadsRecebidos'
import { AgendamentosVisitas } from './AgendamentosVisitas'
import { RelatoriosVisitas } from './RelatoriosVisitas'

type DashboardSection = 'criar' | 'gerenciar' | 'leads' | 'agendamentos' | 'relatorios'

export function AnuncianteDashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('criar')

  const renderContent = () => {
    switch (activeSection) {
      case 'criar':
        return <CriarAnuncio />
      case 'gerenciar':
        return <GerenciarAnuncios />
      case 'leads':
        return <LeadsRecebidos />
      case 'agendamentos':
        return <AgendamentosVisitas />
      case 'relatorios':
        return <RelatoriosVisitas />
      default:
        return <CriarAnuncio />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <AnuncianteSidebar 
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