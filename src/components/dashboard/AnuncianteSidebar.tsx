'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Plus, 
  List, 
  Users, 
  Calendar, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Car,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  ChevronLeft
} from 'lucide-react'

interface AnuncianteSidebarProps {
  activeSection: 'criar' | 'gerenciar' | 'leads' | 'agendamentos' | 'relatorios'
  onSectionChange: (section: 'criar' | 'gerenciar' | 'leads' | 'agendamentos' | 'relatorios') => void
  onMobileClose?: () => void
}

const navigationItems = [
  {
    id: 'criar',
    label: 'Criar Anúncio',
    icon: Plus,
    description: 'Novo anúncio',
    count: null
  },
  {
    id: 'gerenciar',
    label: 'Gerenciar Anúncios',
    icon: List,
    description: 'Seus anúncios',
    count: 8
  },
  {
    id: 'leads',
    label: 'Leads Recebidos',
    icon: Users,
    description: 'Interessados',
    count: 24
  },
  {
    id: 'agendamentos',
    label: 'Agendamentos',
    icon: Calendar,
    description: 'Visitas marcadas',
    count: 5
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: BarChart3,
    description: 'Métricas e dados',
    count: null
  }
]

export function AnuncianteSidebar({ activeSection, onSectionChange, onMobileClose }: AnuncianteSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`lg:fixed lg:left-0 lg:top-0 h-full bg-background border-r border-border transition-all duration-300 z-50 ${
      isCollapsed ? 'w-16' : 'w-full lg:w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <Link href="/properties" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              {!isCollapsed && (
                <span className="text-xl font-bold text-foreground">VehicleMarket</span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background cursor-pointer"
            >
              <ChevronLeft className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
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
                      Auto Center São Paulo
                    </p>
                    <p className="text-xs text-foreground/60 truncate">
                      ANUNCIANTE
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id as any)
                  onMobileClose?.()
                }}
                className={`w-full group relative transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                } rounded-lg`}
              >
                <div className="flex items-center p-3">
                  <Icon className={`h-5 w-5 ${
                    isActive ? 'text-primary-foreground' : 'text-foreground/60'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <div className="ml-3 flex-1 text-left">
                        <div className="font-medium">{item.label}</div>
                        <div className={`text-xs ${
                          isActive ? 'text-primary-foreground/80' : 'text-foreground/60'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      {item.count !== null && (
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isActive 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-muted text-foreground/60'
                        }`}>
                          {item.count}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </button>
            )
          })}
        </nav>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Anúncios Ativos</span>
                <span className="font-semibold text-green-600">6</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Leads Hoje</span>
                <span className="font-semibold text-blue-600">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Visitas Esta Semana</span>
                <span className="font-semibold text-orange-600">3</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/profile">
              <Settings className="h-4 w-4 mr-2" />
              {!isCollapsed && 'Configurações'}
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            {!isCollapsed && 'Sair'}
          </Button>
        </div>
      </div>
    </div>
  )
} 