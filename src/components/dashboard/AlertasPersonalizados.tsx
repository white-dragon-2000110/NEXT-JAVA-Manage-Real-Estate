'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  Pause, 
  Play,
  MapPin, 
  Calendar, 
  Building,
  Zap
} from 'lucide-react'

interface Alert {
  id: string
  name: string
  description: string
  isActive: boolean
  filters: {
    tipo?: string
    quartos?: number
    banheiros?: number
    areaMin?: number
    areaMax?: number
    precoMin?: number
    precoMax?: number
    localizacao?: string
    bairro?: string
  }
  frequency: 'immediate' | 'daily' | 'weekly'
  lastTriggered?: string
  matchesCount: number
  createdAt: string
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    name: 'Apartamentos 2-3 quartos Jardins',
    description: 'Novos anúncios de apartamentos com 2-3 quartos na região dos Jardins',
    isActive: true,
    filters: {
      tipo: 'apartment',
      quartos: 3,
      banheiros: 2,
      areaMin: 80,
      areaMax: 150,
      precoMax: 1000000,
      localizacao: 'São Paulo',
      bairro: 'Jardins'
    },
    frequency: 'daily',
    lastTriggered: '2024-01-20T08:00:00',
    matchesCount: 3,
    createdAt: '2024-01-15T10:00:00'
  },
  {
    id: '2',
    name: 'Casas até 800k',
    description: 'Casas com preço até R$ 800.000',
    isActive: true,
    filters: {
      tipo: 'house',
      precoMax: 800000,
      localizacao: 'Rio de Janeiro'
    },
    frequency: 'immediate',
    lastTriggered: '2024-01-20T14:30:00',
    matchesCount: 12,
    createdAt: '2024-01-10T15:00:00'
  }
]

export function AlertasPersonalizados() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'immediate':
        return 'Imediato'
      case 'daily':
        return 'Diário'
      case 'weekly':
        return 'Semanal'
      default:
        return frequency
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && alert.isActive) ||
                         (filterStatus === 'inactive' && !alert.isActive)
    
    return matchesSearch && matchesStatus
  })

  const toggleAlertStatus = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ))
  }

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alertas Personalizados</h1>
          <p className="text-foreground/60 mt-1">
            {filteredAlerts.length} alertas configurados para imóveis
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Criar Alerta
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Buscar alertas de imóveis..."
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
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum alerta encontrado
            </h3>
            <p className="text-foreground/60 mb-4">
              Crie seu primeiro alerta para receber notificações sobre novos imóveis
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Alerta
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="group hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {alert.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant={alert.isActive ? "default" : "secondary"}>
                          {alert.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                        <Badge variant="outline">
                          {getFrequencyLabel(alert.frequency)}
                        </Badge>
                        {alert.matchesCount > 0 && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Zap className="h-3 w-3 mr-1" />
                            {alert.matchesCount} novos
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-foreground/70 mb-4">{alert.description}</p>

                    <div className="flex items-center space-x-4 text-xs text-foreground/60">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>Criado em {formatDate(alert.createdAt)}</span>
                      </div>
                      {alert.lastTriggered && (
                        <div className="flex items-center space-x-2">
                          <Zap className="h-3 w-3" />
                          <span>Último disparo: {formatDate(alert.lastTriggered)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button 
                      size="sm" 
                      variant={alert.isActive ? "outline" : "default"}
                      onClick={() => toggleAlertStatus(alert.id)}
                      className="w-full"
                    >
                      {alert.isActive ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Ativar
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>

                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => deleteAlert(alert.id)}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 