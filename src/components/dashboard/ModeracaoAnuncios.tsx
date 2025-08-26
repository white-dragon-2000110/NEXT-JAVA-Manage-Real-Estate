'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Shield, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Pause,
  Car,
  User,
  MapPin,
  Calendar,
  AlertTriangle,
  Clock,
  Check,
  X
} from 'lucide-react'

interface Announcement {
  id: string
  title: string
  price: number
  status: 'pending' | 'approved' | 'rejected' | 'paused'
  user: string
  userEmail: string
  location: string
  createdAt: string
  submittedAt: string
  reason?: string
  priority: 'low' | 'medium' | 'high'
  category: 'casa' | 'apartamento' | 'terreno' | 'comercial' | 'rural'
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Casa Moderna com Piscina - Jardins',
    price: 850000,
    status: 'pending',
    user: 'Maria Santos',
    userEmail: 'maria.santos@email.com',
    location: 'São Paulo, SP',
    createdAt: '2024-01-21T10:30:00',
    submittedAt: '2024-01-21T10:30:00',
    priority: 'medium',
    category: 'casa'
  },
  {
    id: '2',
    title: 'Apartamento de Luxo - Leblon',
    price: 1200000,
    status: 'pending',
    user: 'João Silva',
    userEmail: 'joao.silva@email.com',
    location: 'Rio de Janeiro, RJ',
    createdAt: '2024-01-21T09:15:00',
    submittedAt: '2024-01-21T09:15:00',
    priority: 'high',
    category: 'apartamento'
  },
  {
    id: '3',
    title: 'Cobertura Duplex - Savassi',
    price: 2500000,
    status: 'rejected',
    user: 'Carlos Oliveira',
    userEmail: 'carlos.oliveira@email.com',
    location: 'Belo Horizonte, MG',
    createdAt: '2024-01-20T16:30:00',
    submittedAt: '2024-01-20T16:30:00',
    reason: 'Fotos de baixa qualidade',
    priority: 'low',
    category: 'apartamento'
  },
  {
    id: '4',
    title: 'Casa de Campo - Nova Campinas',
    price: 650000,
    status: 'approved',
    user: 'Ana Costa',
    userEmail: 'ana.costa@email.com',
    location: 'Campinas, SP',
    createdAt: '2024-01-19T14:20:00',
    submittedAt: '2024-01-19T14:20:00',
    priority: 'medium',
    category: 'casa'
  }
]

export function ModeracaoAnuncios() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Agora mesmo'
    if (diffInHours < 24) return `${diffInHours}h atrás`
    if (diffInHours < 48) return 'Ontem'

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'approved': return 'Aprovado'
      case 'rejected': return 'Rejeitado'
      case 'paused': return 'Pausado'
      default: return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary'
      case 'approved': return 'default'
      case 'rejected': return 'destructive'
      case 'paused': return 'outline'
      default: return 'outline'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return 'Baixa'
      case 'medium': return 'Média'
      case 'high': return 'Alta'
      default: return priority
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'low': return 'secondary'
      case 'medium': return 'outline'
      case 'high': return 'destructive'
      default: return 'outline'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'casa': return 'Casa'
      case 'apartamento': return 'Apartamento'
      case 'terreno': return 'Terreno'
      case 'comercial': return 'Comercial'
      case 'rural': return 'Rural'
      default: return category
    }
  }

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus
    const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority
    const matchesCategory = filterCategory === 'all' || announcement.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    // Sort by priority first, then by submission time
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    
    if (priorityDiff !== 0) return priorityDiff
    
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  })

  const approveAnnouncement = (id: string) => {
    console.log('Approving announcement:', id)
    // Implement approval logic
  }

  const rejectAnnouncement = (id: string) => {
    console.log('Rejecting announcement:', id)
    // Implement rejection logic
  }

  const pauseAnnouncement = (id: string) => {
    console.log('Pausing announcement:', id)
    // Implement pause logic
  }

  const getStats = () => {
    const total = mockAnnouncements.length
    const pending = mockAnnouncements.filter(a => a.status === 'pending').length
    const approved = mockAnnouncements.filter(a => a.status === 'approved').length
    const rejected = mockAnnouncements.filter(a => a.status === 'rejected').length

    return { total, pending, approved, rejected }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Moderação de Anúncios</h1>
          <p className="text-foreground/60 mt-1">{filteredAnnouncements.length} anúncios encontrados</p>
        </div>
        <Button variant="outline">
          <Shield className="h-4 w-4 mr-2" />
          Configurações de Moderação
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total de Anúncios</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Aprovados</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Rejeitados</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="rejected">Rejeitados</SelectItem>
                <SelectItem value="paused">Pausados</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as prioridades</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterStatus('all'); setFilterPriority('all'); setFilterCategory('all') }} className="cursor-pointer">
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Announcements Table */}
      {sortedAnnouncements.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum anúncio encontrado</h3>
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
                    <th className="text-left p-4 font-medium text-foreground/60">Anúncio</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Usuário</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Preço</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Categoria</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Prioridade</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Status</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Enviado</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAnnouncements.map((announcement) => (
                    <tr key={announcement.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="max-w-48">
                          <div className="font-medium text-foreground truncate">{announcement.title}</div>
                          <div className="text-sm text-foreground/60 flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{announcement.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-foreground">{announcement.user}</div>
                          <div className="text-sm text-foreground/60">{announcement.userEmail}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">
                          {formatPrice(announcement.price)}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">
                          {getCategoryLabel(announcement.category)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={getPriorityVariant(announcement.priority)}>
                          {getPriorityLabel(announcement.priority)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusVariant(announcement.status)}>
                          {getStatusLabel(announcement.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground/60">
                          {formatDate(announcement.submittedAt)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {announcement.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="default" 
                                onClick={() => approveAnnouncement(announcement.id)}
                                className="cursor-pointer"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => rejectAnnouncement(announcement.id)}
                                className="text-red-600 hover:text-red-700 cursor-pointer"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                onClick={() => pauseAnnouncement(announcement.id)}
                                className="text-yellow-600 hover:text-yellow-700 cursor-pointer"
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {announcement.status === 'approved' && (
                            <Button 
                              size="sm" 
                              variant="secondary" 
                              onClick={() => pauseAnnouncement(announcement.id)}
                            >
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          {announcement.status === 'paused' && (
                            <Button 
                              size="sm" 
                              variant="default" 
                              onClick={() => approveAnnouncement(announcement.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
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