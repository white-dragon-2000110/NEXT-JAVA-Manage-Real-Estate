'use client'

import { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { DashboardGeral } from './DashboardGeral'
import { GestaoUsuarios } from './GestaoUsuarios'
import { ModeracaoAnuncios } from './ModeracaoAnuncios'
import { RelatoriosFinanceiros } from './RelatoriosFinanceiros'
import { EstatisticasIA } from './EstatisticasIA'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

type DashboardSection = 'geral' | 'usuarios' | 'moderacao' | 'financeiro' | 'ia'

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('geral')
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <AdminSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onMobileClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
} 