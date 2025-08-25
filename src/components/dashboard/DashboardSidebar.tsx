'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Heart, 
  BarChart3, 
  History, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Building,
  ChevronRight
} from 'lucide-react'

interface DashboardSidebarProps {
  activeSection: 'favoritos' | 'comparacoes' | 'historico' | 'alertas'
  onSectionChange: (section: 'favoritos' | 'comparacoes' | 'historico' | 'alertas') => void
}

const navigationItems = [
  {
    id: 'favoritos',
    label: 'Favoritos',
    icon: Heart,
    description: 'Imóveis salvos',
    count: 8
  },
  {
    id: 'comparacoes',
    label: 'Comparações',
    icon: BarChart3,
    description: 'Compare imóveis',
    count: 2
  },
  {
    id: 'historico',
    label: 'Histórico de Buscas',
    icon: History,
    description: 'Suas pesquisas',
    count: 15
  },
  {
    id: 'alertas',
    label: 'Alertas Personalizados',
    icon: Bell,
    description: 'Notificações',
    count: 3
  }
]

export function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`fixed left-0 top-0 h-full bg-background border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-primary" />
              {!isCollapsed && (
                <span className="text-xl font-bold text-foreground">RealEstatePro</span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </Button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-border">
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      João Silva
                    </p>
                    <p className="text-xs text-foreground/60 truncate">
                      CLIENTE
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id as any)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-xs bg-foreground/20 px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      </div>
                      <p className={`text-xs ${
                        isActive ? 'text-primary-foreground/70' : 'text-foreground/60'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              {!isCollapsed && 'Configurações'}
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              {!isCollapsed && 'Sair'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 