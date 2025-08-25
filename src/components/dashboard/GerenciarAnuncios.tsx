'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  List, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Pause, 
  Play,
  Trash2,
  MoreHorizontal,
  Calendar,
  Eye as EyeIcon,
  MessageSquare,
  Star,
  TrendingUp
} from 'lucide-react'

interface Announcement {
  id: string
  title: string
  price: number
  status: 'active' | 'paused' | 'draft' | 'expired'
  views: number
  leads: number
  createdAt: string
  lastUpdated: string
  expiresAt: string
  image: string
  marca: string
  modelo: string
  ano: number
  localizacao: string
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Toyota Corolla 2022 XEi Automático',
    price: 85000,
    status: 'active',
    views: 1247,
    leads: 18,
    createdAt: '2024-01-15',
    lastUpdated: '2024-01-20',
    expiresAt: '2024-02-15',
    image: '/api/placeholder/200/150',
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2022,
    localizacao: 'São Paulo, SP'
  },
  {
    id: '2',
    title: 'Honda Civic 2021 EXL',
    price: 78000,
    status: 'active',
    views: 892,
    leads: 12,
    createdAt: '2024-01-10',
    lastUpdated: '2024-01-18',
    expiresAt: '2024-02-10',
    image: '/api/placeholder/200/150',
    marca: 'Honda',
    modelo: 'Civic',
    ano: 2021,
    localizacao: 'Rio de Janeiro, RJ'
  },
  {
    id: '3',
    title: 'Volkswagen Golf GTI 2023',
    price: 95000,
    status: 'paused',
    views: 567,
    leads: 8,
    createdAt: '2024-01-05',
    lastUpdated: '2024-01-15',
    expiresAt: '2024-02-05',
    image: '/api/placeholder/200/150',
    marca: 'Volkswagen',
    modelo: 'Golf GTI',
    ano: 2023,
    localizacao: 'Belo Horizonte, MG'
  },
  {
    id: '4',
    title: 'Ford Ranger 2020 XLT',
    price: 120000,
    status: 'active',
    views: 445,
    leads: 6,
    createdAt: '2024-01-01',
    lastUpdated: '2024-01-12',
    expiresAt: '2024-02-01',
    image: '/api/placeholder/200/150',
    marca: 'Ford',
    modelo: 'Ranger',
    ano: 2020,
    localizacao: 'Curitiba, PR'
  }
]

export function GerenciarAnuncios() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'paused':
        return 'Pausado'
      case 'draft':
        return 'Rascunho'
      case 'expired':
        return 'Expirado'
      default:
        return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'paused':
        return 'secondary'
      case 'draft':
        return 'outline'
      case 'expired':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views
      case 'leads':
        return b.leads - a.leads
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    }
  })

  const toggleStatus = (id: string) => {
    console.log('Toggling status for:', id)
    // Implement status toggle logic
  }

  const deleteAnnouncement = (id: string) => {
    console.log('Deleting announcement:', id)
    // Implement delete logic
  }

  const getDaysUntilExpiry = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Anúncios</h1>
          <p className="text-foreground/60 mt-1">
            {filteredAnnouncements.length} anúncios encontrados
          </p>
        </div>
        <Button>
          <List className="h-4 w-4 mr-2" />
          Criar Novo Anúncio
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Buscar anúncios..."
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
                <SelectItem value="draft">Rascunhos</SelectItem>
                <SelectItem value="expired">Expirados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="views">Mais visualizações</SelectItem>
                <SelectItem value="leads">Mais leads</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="oldest">Mais antigos</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
                setSortBy('recent')
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Anúncios Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockAnnouncements.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <EyeIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total Visualizações</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockAnnouncements.reduce((acc, a) => acc + a.views, 0).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total Leads</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockAnnouncements.reduce((acc, a) => acc + a.leads, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Taxa Conversão</p>
                <p className="text-2xl font-bold text-purple-600">
                  {((mockAnnouncements.reduce((acc, a) => acc + a.leads, 0) / 
                     mockAnnouncements.reduce((acc, a) => acc + a.views, 0)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      {sortedAnnouncements.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <List className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum anúncio encontrado
            </h3>
            <p className="text-foreground/60 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Crie seu primeiro anúncio para começar'
              }
            </p>
            <Button>
              <List className="h-4 w-4 mr-2" />
              Criar Anúncio
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement) => {
            const daysUntilExpiry = getDaysUntilExpiry(announcement.expiresAt)
            
            return (
              <Card key={announcement.id} className="group hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Image */}
                    <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-foreground/40 text-xs">Imagem</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground truncate">
                            {announcement.title}
                          </h3>
                          <p className="text-sm text-foreground/60">
                            {announcement.marca} {announcement.modelo} • {announcement.ano} • {announcement.localizacao}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant={getStatusVariant(announcement.status)}>
                            {getStatusLabel(announcement.status)}
                          </Badge>
                          {daysUntilExpiry <= 7 && daysUntilExpiry > 0 && (
                            <Badge variant="destructive">
                              Expira em {daysUntilExpiry} dias
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-2xl font-bold text-primary mb-3">
                        {formatPrice(announcement.price)}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-sm text-foreground/70">
                        <div className="flex items-center space-x-2">
                          <EyeIcon className="h-4 w-4" />
                          <span>{announcement.views.toLocaleString('pt-BR')} visualizações</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{announcement.leads} leads</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Criado em {formatDate(announcement.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                      
                      <Button size="sm" variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>

                      <Button 
                        size="sm" 
                        variant={announcement.status === 'active' ? 'outline' : 'default'}
                        onClick={() => toggleStatus(announcement.id)}
                        className="w-full"
                      >
                        {announcement.status === 'active' ? (
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
                        variant="destructive" 
                        onClick={() => deleteAnnouncement(announcement.id)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
} 