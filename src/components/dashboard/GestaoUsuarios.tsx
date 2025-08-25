'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Shield, 
  UserCheck, 
  UserX,
  Mail,
  Phone,
  Calendar,
  MapPin,
  TrendingUp
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'CLIENTE' | 'ANUNCIANTE' | 'ADMIN'
  status: 'active' | 'suspended' | 'pending'
  location: string
  createdAt: string
  lastLogin: string
  announcementsCount: number
  subscription: 'free' | 'basic' | 'premium' | 'enterprise'
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    role: 'CLIENTE',
    status: 'active',
    location: 'São Paulo, SP',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-21T10:30:00',
    announcementsCount: 0,
    subscription: 'free'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(21) 88888-8888',
    role: 'ANUNCIANTE',
    status: 'active',
    location: 'Rio de Janeiro, RJ',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-21T09:15:00',
    announcementsCount: 8,
    subscription: 'premium'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    phone: '(31) 77777-7777',
    role: 'CLIENTE',
    status: 'suspended',
    location: 'Belo Horizonte, MG',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-18T14:20:00',
    announcementsCount: 0,
    subscription: 'free'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(41) 66666-6666',
    role: 'ANUNCIANTE',
    status: 'pending',
    location: 'Curitiba, PR',
    createdAt: '2024-01-20',
    lastLogin: '2024-01-20T08:15:00',
    announcementsCount: 0,
    subscription: 'basic'
  }
]

export function GestaoUsuarios() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'CLIENTE': return 'Cliente'
      case 'ANUNCIANTE': return 'Anunciante'
      case 'ADMIN': return 'Administrador'
      default: return role
    }
  }

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'CLIENTE': return 'default'
      case 'ANUNCIANTE': return 'secondary'
      case 'ADMIN': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'suspended': return 'Suspenso'
      case 'pending': return 'Pendente'
      default: return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'suspended': return 'destructive'
      case 'pending': return 'secondary'
      default: return 'outline'
    }
  }

  const getSubscriptionLabel = (subscription: string) => {
    switch (subscription) {
      case 'free': return 'Gratuito'
      case 'basic': return 'Básico'
      case 'premium': return 'Premium'
      case 'enterprise': return 'Empresarial'
      default: return subscription
    }
  }

  const getSubscriptionVariant = (subscription: string) => {
    switch (subscription) {
      case 'free': return 'outline'
      case 'basic': return 'secondary'
      case 'premium': return 'default'
      case 'enterprise': return 'destructive'
      default: return 'outline'
    }
  }

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'lastLogin':
        return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime()
      case 'announcements':
        return b.announcementsCount - a.announcementsCount
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const suspendUser = (id: string) => {
    console.log('Suspending user:', id)
    // Implement suspend logic
  }

  const activateUser = (id: string) => {
    console.log('Activating user:', id)
    // Implement activate logic
  }

  const changeRole = (id: string, newRole: string) => {
    console.log('Changing role for user:', id, 'to:', newRole)
    // Implement role change logic
  }

  const getStats = () => {
    const totalUsers = mockUsers.length
    const activeUsers = mockUsers.filter(u => u.status === 'active').length
    const pendingUsers = mockUsers.filter(u => u.status === 'pending').length
    const suspendedUsers = mockUsers.filter(u => u.status === 'suspended').length

    return { totalUsers, activeUsers, pendingUsers, suspendedUsers }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Usuários</h1>
          <p className="text-foreground/60 mt-1">{filteredUsers.length} usuários encontrados</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total de Usuários</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Usuários Ativos</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Suspensos</p>
                <p className="text-2xl font-bold text-red-600">{stats.suspendedUsers}</p>
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
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger>
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as funções</SelectItem>
                <SelectItem value="CLIENTE">Clientes</SelectItem>
                <SelectItem value="ANUNCIANTE">Anunciantes</SelectItem>
                <SelectItem value="ADMIN">Administradores</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="suspended">Suspensos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="lastLogin">Último login</SelectItem>
                <SelectItem value="announcements">Mais anúncios</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterRole('all'); setFilterStatus('all'); setSortBy('recent') }}>
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      {sortedUsers.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum usuário encontrado</h3>
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
                    <th className="text-left p-4 font-medium text-foreground/60">Usuário</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Função</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Status</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Localização</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Assinatura</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Anúncios</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Último Login</th>
                    <th className="text-left p-4 font-medium text-foreground/60">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{user.name}</div>
                            <div className="text-sm text-foreground/60">{user.email}</div>
                            <div className="text-sm text-foreground/60">{user.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getRoleVariant(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusVariant(user.status)}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-foreground/60" />
                          <span className="text-sm">{user.location}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getSubscriptionVariant(user.subscription)}>
                          {getSubscriptionLabel(user.subscription)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-foreground">
                          {user.announcementsCount}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground/60">
                          {formatDate(user.lastLogin)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.status === 'active' ? (
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => suspendUser(user.id)}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="default" 
                              onClick={() => activateUser(user.id)}
                            >
                              <UserCheck className="h-4 w-4" />
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