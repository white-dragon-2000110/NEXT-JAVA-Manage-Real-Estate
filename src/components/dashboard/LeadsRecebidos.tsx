'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Users, Search, Filter, Eye, MessageSquare, Phone, Mail, Star, TrendingUp, User, MapPin, X } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  vehicleTitle: string
  score: number
  status: 'new' | 'contacted' | 'interested' | 'converted'
  source: 'website' | 'phone' | 'whatsapp' | 'email'
  createdAt: string
  location: string
  budget: number
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    vehicleTitle: 'Toyota Corolla 2022 XEi Automático',
    score: 85,
    status: 'new',
    source: 'website',
    createdAt: '2024-01-21T10:30:00',
    location: 'São Paulo, SP',
    budget: 90000
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(21) 88888-8888',
    vehicleTitle: 'Honda Civic 2021 EXL',
    score: 72,
    status: 'contacted',
    source: 'whatsapp',
    createdAt: '2024-01-20T15:45:00',
    location: 'Rio de Janeiro, RJ',
    budget: 80000
  }
]

export function LeadsRecebidos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Novo'
      case 'contacted': return 'Contactado'
      case 'interested': return 'Interessado'
      case 'converted': return 'Convertido'
      default: return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'default'
      case 'contacted': return 'secondary'
      case 'interested': return 'outline'
      case 'converted': return 'default'
      default: return 'outline'
    }
  }

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.vehicleTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads Recebidos</h1>
          <p className="text-foreground/60 mt-1">{filteredLeads.length} leads encontrados</p>
        </div>
        <Button variant="outline">
          <TrendingUp className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Buscar leads..."
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
                <SelectItem value="new">Novos</SelectItem>
                <SelectItem value="contacted">Contactados</SelectItem>
                <SelectItem value="interested">Interessados</SelectItem>
                <SelectItem value="converted">Convertidos</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterStatus('all') }} className="cursor-pointer">
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total de Leads</p>
                <p className="text-2xl font-bold text-blue-600">{mockLeads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Score Médio</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(mockLeads.reduce((acc, l) => acc + l.score, 0) / mockLeads.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredLeads.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum lead encontrado</h3>
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
                    <th className="text-left p-4 font-medium text-foreground/60">Lead</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Veículo</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Score</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Status</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Orçamento</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{lead.name}</div>
                            <div className="text-sm text-foreground/60">{lead.email}</div>
                            <div className="text-sm text-foreground/60">{lead.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="max-w-48">
                          <div className="font-medium text-foreground truncate">{lead.vehicleTitle}</div>
                          <div className="text-sm text-foreground/60 flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{lead.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={`text-lg font-bold ${lead.score >= 80 ? 'text-green-600' : lead.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {lead.score}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusVariant(lead.status)}>
                          {getStatusLabel(lead.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">
                          {formatPrice(lead.budget)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
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