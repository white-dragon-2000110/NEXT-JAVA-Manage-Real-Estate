'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  BarChart3,
  Users,
  Shield,
  DollarSign,
  Brain,
  User,
  Settings,
  LogOut,
  Building,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface AdminSidebarProps {
  activeSection: 'geral' | 'usuarios' | 'moderacao' | 'financeiro' | 'ia'
  onSectionChange: (section: 'geral' | 'usuarios' | 'moderacao' | 'financeiro' | 'ia') => void
}

const navigationItems = [
  {
    id: 'geral',
    label: 'Dashboard Geral',
    icon: BarChart3,
    description: 'Visão geral do sistema',
    count: null
  },
  {
    id: 'usuarios',
    label: 'Gestão de Usuários',
    icon: Users,
    description: 'Gerenciar usuários',
    count: 1247
  },
  {
    id: 'moderacao',
    label: 'Moderação de Imóveis',
    icon: Shield,
    description: 'Aprovar/rejeitar anúncios de imóveis',
    count: 23
  },
  {
    id: 'financeiro',
    label: 'Relatórios Financeiros',
    icon: DollarSign,
    description: 'Assinaturas e pagamentos',
    count: null
  },
  {
    id: 'ia',
    label: 'Estatísticas de IA',
    icon: Brain,
    description: 'Buscas e conversas sobre imóveis',
    count: null
  }
]

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
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
                <span className="text-xl font-bold text-foreground">RealEstatePro Admin</span>
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
                      Admin Master
                    </p>
                    <p className="text-xs text-foreground/60 truncate">
                      ADMINISTRADOR
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
                onClick={() => onSectionChange(item.id as any)}
                className={`w-full group relative transition-all duration-200 ${
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
                <span className="text-foreground/60">Usuários Ativos</span>
                <span className="font-semibold text-green-600">1,247</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Anúncios Pendentes</span>
                <span className="font-semibold text-orange-600">23</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Taxa Conversão</span>
                <span className="font-semibold text-blue-600">12.4%</span>
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