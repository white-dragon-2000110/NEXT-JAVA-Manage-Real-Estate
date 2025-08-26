'use client'

import { useState } from 'react'
import { AnuncianteSidebar } from './AnuncianteSidebar'
import { CriarAnuncio } from './CriarAnuncio'
import { GerenciarAnuncios } from './GerenciarAnuncios'
import { LeadsRecebidos } from './LeadsRecebidos'
import { AgendamentosVisitas } from './AgendamentosVisitas'
import { RelatoriosVisitas } from './RelatoriosVisitas'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

type DashboardSection = 'criar' | 'gerenciar' | 'leads' | 'agendamentos' | 'relatorios'

export function AnuncianteDashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('criar')
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <AnuncianteSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            onMobileClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-6">
            {renderContent()}
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  )
} 