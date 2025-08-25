'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Users, 
  CreditCard,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react'

interface Subscription {
  id: string
  user: string
  userEmail: string
  plan: 'free' | 'basic' | 'premium' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired' | 'pending'
  amount: number
  currency: string
  startDate: string
  endDate: string
  autoRenew: boolean
  paymentMethod: string
}

interface Payment {
  id: string
  user: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  paymentMethod: string
  date: string
  description: string
}

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    user: 'Maria Santos',
    userEmail: 'maria.santos@email.com',
    plan: 'premium',
    status: 'active',
    amount: 99.90,
    currency: 'BRL',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    autoRenew: true,
    paymentMethod: 'Cartão de Crédito'
  },
  {
    id: '2',
    user: 'João Silva',
    userEmail: 'joao.silva@email.com',
    plan: 'basic',
    status: 'active',
    amount: 49.90,
    currency: 'BRL',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    autoRenew: true,
    paymentMethod: 'PIX'
  },
  {
    id: '3',
    user: 'Carlos Oliveira',
    userEmail: 'carlos.oliveira@email.com',
    plan: 'enterprise',
    status: 'cancelled',
    amount: 299.90,
    currency: 'BRL',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    autoRenew: false,
    paymentMethod: 'Boleto'
  }
]

const mockPayments: Payment[] = [
  {
    id: '1',
    user: 'Maria Santos',
    subscriptionId: '1',
    amount: 99.90,
    currency: 'BRL',
    status: 'completed',
    paymentMethod: 'Cartão de Crédito',
    date: '2024-01-01T10:00:00',
    description: 'Assinatura Premium - Janeiro 2024'
  },
  {
    id: '2',
    user: 'João Silva',
    subscriptionId: '2',
    amount: 49.90,
    currency: 'BRL',
    status: 'completed',
    paymentMethod: 'PIX',
    date: '2024-01-15T14:30:00',
    description: 'Assinatura Básica - Janeiro 2024'
  },
  {
    id: '3',
    user: 'Ana Costa',
    subscriptionId: '4',
    amount: 99.90,
    currency: 'BRL',
    status: 'pending',
    paymentMethod: 'Cartão de Crédito',
    date: '2024-01-20T09:15:00',
    description: 'Assinatura Premium - Janeiro 2024'
  }
]

export function RelatoriosFinanceiros() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlan, setFilterPlan] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [timeRange, setTimeRange] = useState('30d')

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'free': return 'Gratuito'
      case 'basic': return 'Básico'
      case 'premium': return 'Premium'
      case 'enterprise': return 'Empresarial'
      default: return plan
    }
  }

  const getPlanVariant = (plan: string) => {
    switch (plan) {
      case 'free': return 'outline'
      case 'basic': return 'secondary'
      case 'premium': return 'default'
      case 'enterprise': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'cancelled': return 'Cancelado'
      case 'expired': return 'Expirado'
      case 'pending': return 'Pendente'
      default: return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'cancelled': return 'destructive'
      case 'expired': return 'secondary'
      case 'pending': return 'outline'
      default: return 'outline'
    }
  }

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído'
      case 'pending': return 'Pendente'
      case 'failed': return 'Falhou'
      case 'refunded': return 'Reembolsado'
      default: return status
    }
  }

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'failed': return 'destructive'
      case 'refunded': return 'outline'
      default: return 'outline'
    }
  }

  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesSearch = subscription.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = filterPlan === 'all' || subscription.plan === filterPlan
    const matchesStatus = filterStatus === 'all' || subscription.status === filterStatus
    
    return matchesSearch && matchesPlan && matchesStatus
  })

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getStats = () => {
    const totalRevenue = mockPayments
      .filter(p => p.status === 'completed')
      .reduce((acc, p) => acc + p.amount, 0)
    
    const activeSubscriptions = mockSubscriptions.filter(s => s.status === 'active').length
    const monthlyRecurring = mockSubscriptions
      .filter(s => s.status === 'active' && s.autoRenew)
      .reduce((acc, s) => acc + s.amount, 0)
    
    const conversionRate = ((activeSubscriptions / mockSubscriptions.length) * 100).toFixed(1)

    return { totalRevenue, activeSubscriptions, monthlyRecurring, conversionRate }
  }

  const stats = getStats()

  const exportReport = () => {
    console.log('Exporting financial report...')
    // Implement export logic
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios Financeiros</h1>
          <p className="text-foreground/60 mt-1">Assinaturas, pagamentos e métricas financeiras</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Receita Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(stats.totalRevenue, 'BRL')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Assinaturas Ativas</p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeSubscriptions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">MRR Mensal</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatPrice(stats.monthlyRecurring, 'BRL')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CreditCard className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Taxa Conversão</p>
                <p className="text-2xl font-bold text-orange-600">{stats.conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger>
                <SelectValue placeholder="Plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os planos</SelectItem>
                <SelectItem value="free">Gratuito</SelectItem>
                <SelectItem value="basic">Básico</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Empresarial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
                <SelectItem value="expired">Expirado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterPlan('all'); setFilterStatus('all') }}>
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assinaturas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredSubscriptions.length === 0 ? (
            <div className="p-12 text-center">
              <CreditCard className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma assinatura encontrada</h3>
              <p className="text-foreground/60">Tente ajustar os filtros de busca</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-foreground/60">Usuário</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Plano</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Valor</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Status</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Período</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Renovação</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-foreground">{subscription.user}</div>
                          <div className="text-sm text-foreground/60">{subscription.userEmail}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getPlanVariant(subscription.plan)}>
                          {getPlanLabel(subscription.plan)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">
                          {formatPrice(subscription.amount, subscription.currency)}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusVariant(subscription.status)}>
                          {getStatusLabel(subscription.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground/60">
                          {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={subscription.autoRenew ? "default" : "secondary"}>
                          {subscription.autoRenew ? 'Automática' : 'Manual'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPayments.length === 0 ? (
            <div className="p-12 text-center">
              <DollarSign className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum pagamento encontrado</h3>
              <p className="text-foreground/60">Tente ajustar os filtros de busca</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-foreground/60">Usuário</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Valor</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Status</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Método</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Data</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Descrição</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="font-medium text-foreground">{payment.user}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">
                          {formatPrice(payment.amount, payment.currency)}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getPaymentStatusVariant(payment.status)}>
                          {getPaymentStatusLabel(payment.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground/60">{payment.paymentMethod}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground/60">
                          {formatDate(payment.date)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground/60 max-w-48 truncate">
                          {payment.description}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {payment.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              <Clock className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 