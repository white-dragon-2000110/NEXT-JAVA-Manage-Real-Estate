'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart3, Search, Filter, Download, TrendingUp, Eye, Users, Calendar, MapPin, Car, MessageSquare, X } from 'lucide-react'

interface ReportData {
  id: string
  vehicleTitle: string
  views: number
  leads: number
  appointments: number
  conversions: number
  location: string
  status: 'active' | 'paused' | 'expired'
}

const mockReportData: ReportData[] = [
  {
    id: '1',
    vehicleTitle: 'Toyota Corolla 2022 XEi Automático',
    views: 1247,
    leads: 18,
    appointments: 5,
    conversions: 2,
    location: 'São Paulo, SP',
    status: 'active'
  },
  {
    id: '2',
    vehicleTitle: 'Honda Civic 2021 EXL',
    views: 892,
    leads: 12,
    appointments: 3,
    conversions: 1,
    location: 'Rio de Janeiro, RJ',
    status: 'active'
  }
]

export function RelatoriosVisitas() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num)
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'paused': return 'Pausado'
      case 'expired': return 'Expirado'
      default: return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'paused': return 'secondary'
      case 'expired': return 'destructive'
      default: return 'outline'
    }
  }

  const getConversionRate = (views: number, conversions: number) => {
    if (views === 0) return 0
    return ((conversions / views) * 100).toFixed(2)
  }

  const filteredData = mockReportData.filter(item => {
    const matchesSearch = item.vehicleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalViews: mockReportData.reduce((acc, item) => acc + item.views, 0),
    totalLeads: mockReportData.reduce((acc, item) => acc + item.leads, 0),
    totalAppointments: mockReportData.reduce((acc, item) => acc + item.appointments, 0),
    totalConversions: mockReportData.reduce((acc, item) => acc + item.conversions, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios de Visualizações e Contatos</h1>
          <p className="text-foreground/60 mt-1">Análise detalhada do desempenho dos anúncios</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total Visualizações</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(stats.totalViews)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total Leads</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(stats.totalLeads)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total Agendamentos</p>
                <p className="text-2xl font-bold text-orange-600">{formatNumber(stats.totalAppointments)}</p>
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
                <p className="text-sm text-foreground/60">Total Conversões</p>
                <p className="text-2xl font-bold text-purple-600">{formatNumber(stats.totalConversions)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Buscar imóveis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="paused">Pausados</SelectItem>
                <SelectItem value="expired">Expirados</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterStatus('all') }} className="cursor-pointer">
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredData.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart3 className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum dado encontrado</h3>
            <p className="text-foreground/60">Tente ajustar os filtros de busca</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-foreground/60">Veículo</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Localização</th>
                    <th className="text-center p-4 font-medium text-foreground/60">Visualizações</th>
                    <th className="text-center p-4 font-medium text-foreground/60">Leads</th>
                    <th className="text-center p-4 font-medium text-foreground/60">Agendamentos</th>
                    <th className="text-center p-4 font-medium text-foreground/60">Conversões</th>
                    <th className="text-center p-4 font-medium text-foreground/60">Taxa Conversão</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Status</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="max-w-48">
                          <div className="font-medium text-foreground truncate">{item.vehicleTitle}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-foreground/60" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium text-foreground">{formatNumber(item.views)}</div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium text-foreground">{formatNumber(item.leads)}</div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium text-foreground">{formatNumber(item.appointments)}</div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium text-foreground">{formatNumber(item.conversions)}</div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium text-foreground">
                          {getConversionRate(item.views, item.conversions)}%
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusVariant(item.status)}>
                          {getStatusLabel(item.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Detalhes
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contatos
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 