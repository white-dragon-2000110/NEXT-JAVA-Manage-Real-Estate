'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  Users, 
  Car, 
  TrendingUp, 
  Brain, 
  Eye, 
  MessageSquare, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Shield,
  Building
} from 'lucide-react'

interface KPI {
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  icon: any
  color: string
}

const kpis: KPI[] = [
  {
    title: 'Usuários Ativos',
    value: '1,247',
    change: 12.5,
    changeType: 'increase',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Imóveis Ativos',
    value: '3,456',
    change: 8.2,
    changeType: 'increase',
    icon: Building,
    color: 'text-green-600'
  },
  {
    title: 'Taxa de Conversão',
    value: '12.4%',
    change: -2.1,
    changeType: 'decrease',
    icon: TrendingUp,
    color: 'text-orange-600'
  },
  {
    title: 'Uso da IA',
    value: '89.2%',
    change: 15.7,
    changeType: 'increase',
    icon: Brain,
    color: 'text-purple-600'
  }
]

const recentActivity = [
  {
    id: 1,
    type: 'user',
    action: 'Novo usuário registrado',
    details: 'João Silva (COMPRADOR)',
    time: '2 min atrás',
    status: 'success'
  },
  {
    id: 2,
    type: 'announcement',
    action: 'Anúncio aprovado',
    details: 'Casa em São Paulo - Jardins',
    time: '5 min atrás',
    status: 'success'
  },
  {
    id: 3,
    type: 'payment',
    action: 'Pagamento recebido',
    details: 'R$ 99,90 - Plano Premium',
    time: '12 min atrás',
    status: 'success'
  },
  {
    id: 4,
    type: 'ai',
    action: 'Nova conversa iniciada',
    details: 'Assistente IA - Busca imóvel',
    time: '18 min atrás',
    status: 'info'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': return 'text-green-600'
    case 'warning': return 'text-yellow-600'
    case 'error': return 'text-red-600'
    case 'info': return 'text-blue-600'
    default: return 'text-gray-600'
  }
}

const getStatusIcon = (type: string) => {
  switch (type) {
    case 'user': return Users
    case 'announcement': return Car
    case 'payment': return DollarSign
    case 'ai': return Brain
    default: return Activity
  }
}

export function DashboardGeral() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Geral</h1>
          <p className="text-foreground/60 mt-1">Visão geral do sistema e métricas principais</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24h</SelectItem>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground/60">{kpi.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      {kpi.changeType === 'increase' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ml-1 ${
                        kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.changeType === 'increase' ? '+' : ''}{kpi.change}%
                      </span>
                      <span className="text-sm text-foreground/60 ml-1">vs período anterior</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${kpi.color.replace('text-', 'bg-')} bg-opacity-20`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral do Tráfego</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-foreground/70">Visualizações de Páginas</span>
                </div>
                <span className="text-sm font-medium">45,231</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground/70">Usuários Únicos</span>
                </div>
                <span className="text-sm font-medium">12,847</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-foreground/70">Sessões</span>
                </div>
                <span className="text-sm font-medium">18,392</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-foreground/70">Tempo Médio na Página</span>
                </div>
                <span className="text-sm font-medium">2m 34s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Uso da Inteligência Artificial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-foreground/70">Buscas Inteligentes</span>
                </div>
                <span className="text-sm font-medium">8,947</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-foreground/70">Conversas com IA</span>
                </div>
                <span className="text-sm font-medium">2,341</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-foreground/70">Recomendações</span>
                </div>
                <span className="text-sm font-medium">15,672</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-foreground/70">Taxa de Satisfação</span>
                </div>
                <span className="text-sm font-medium">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getStatusIcon(activity.type)
              return (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon className="h-5 w-5 text-foreground/60" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-foreground/60">{activity.details}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground/60">{activity.time}</p>
                    <Badge variant="outline" className={`mt-1 ${getStatusColor(activity.status)}`}>
                      {activity.status === 'success' && 'Sucesso'}
                      {activity.status === 'warning' && 'Atenção'}
                      {activity.status === 'error' && 'Erro'}
                      {activity.status === 'info' && 'Info'}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span>Gerenciar Usuários</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              <span>Moderar Anúncios</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              <span>Ver Relatórios</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Brain className="h-6 w-6 mb-2" />
              <span>Configurar IA</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 