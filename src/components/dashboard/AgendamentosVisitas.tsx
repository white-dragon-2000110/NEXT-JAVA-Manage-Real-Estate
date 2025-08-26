'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Search, Filter, Eye, MessageSquare, Phone, MapPin, Clock, User, Car, X, Check } from 'lucide-react'

interface Appointment {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  vehicleTitle: string
  vehicleId: string
  date: string
  time: string
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  location: string
  notes: string
  source: 'website' | 'phone' | 'whatsapp'
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerName: 'João Silva',
    customerPhone: '(11) 99999-9999',
    customerEmail: 'joao.silva@email.com',
    vehicleTitle: 'Toyota Corolla 2022 XEi Automático',
    vehicleId: '1',
    date: '2024-01-25',
    time: '14:00',
    status: 'confirmed',
    location: 'São Paulo, SP',
    notes: 'Cliente interessado em financiamento',
    source: 'website'
  },
  {
    id: '2',
    customerName: 'Maria Santos',
    customerPhone: '(21) 88888-8888',
    customerEmail: 'maria.santos@email.com',
    vehicleTitle: 'Honda Civic 2021 EXL',
    vehicleId: '2',
    date: '2024-01-26',
    time: '10:00',
    status: 'scheduled',
    location: 'Rio de Janeiro, RJ',
    notes: 'Primeira visita, mostrar todas as opções',
    source: 'whatsapp'
  },
  {
    id: '3',
    customerName: 'Carlos Oliveira',
    customerPhone: '(31) 77777-7777',
    customerEmail: 'carlos.oliveira@email.com',
    vehicleTitle: 'Volkswagen Golf GTI 2023',
    vehicleId: '3',
    date: '2024-01-24',
    time: '16:00',
    status: 'completed',
    location: 'Belo Horizonte, MG',
    notes: 'Visita realizada, cliente muito interessado',
    source: 'phone'
  }
]

export function AgendamentosVisitas() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('all')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendado'
      case 'confirmed': return 'Confirmado'
      case 'completed': return 'Realizado'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'outline'
      case 'confirmed': return 'default'
      case 'completed': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'website': return 'Website'
      case 'phone': return 'Telefone'
      case 'whatsapp': return 'WhatsApp'
      default: return source
    }
  }

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.vehicleTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus
    
    let matchesDate = true
    if (filterDate === 'today') {
      const today = new Date().toDateString()
      matchesDate = new Date(appointment.date).toDateString() === today
    } else if (filterDate === 'week') {
      const today = new Date()
      const appointmentDate = new Date(appointment.date)
      const diffTime = appointmentDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      matchesDate = diffDays >= 0 && diffDays <= 7
    }
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  const confirmAppointment = (id: string) => {
    console.log('Confirming appointment:', id)
    // Implement confirmation logic
  }

  const cancelAppointment = (id: string) => {
    console.log('Cancelling appointment:', id)
    // Implement cancellation logic
  }

  const getUpcomingAppointments = () => {
    const today = new Date()
    return mockAppointments.filter(a => {
      const appointmentDate = new Date(a.date)
      return appointmentDate >= today && a.status !== 'cancelled'
    }).length
  }

  const getCompletedToday = () => {
    const today = new Date().toDateString()
    return mockAppointments.filter(a => 
      new Date(a.date).toDateString() === today && a.status === 'completed'
    ).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agendamentos de Visitas</h1>
          <p className="text-foreground/60 mt-1">{filteredAppointments.length} agendamentos encontrados</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Buscar agendamentos..."
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
                <SelectItem value="scheduled">Agendados</SelectItem>
                <SelectItem value="confirmed">Confirmados</SelectItem>
                <SelectItem value="completed">Realizados</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterStatus('all'); setFilterDate('all') }} className="cursor-pointer">
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Agendamentos Futuros</p>
                <p className="text-2xl font-bold text-blue-600">{getUpcomingAppointments()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Realizados Hoje</p>
                <p className="text-2xl font-bold text-green-600">{getCompletedToday()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total de Visitas</p>
                <p className="text-2xl font-bold text-orange-600">{mockAppointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {sortedAppointments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-foreground/60">Tente ajustar os filtros de busca</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-foreground">{appointment.customerName}</h3>
                      <Badge variant={getStatusVariant(appointment.status)}>
                        {getStatusLabel(appointment.status)}
                      </Badge>
                      <Badge variant="outline">
                        {getSourceLabel(appointment.source)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-foreground/70">
                          <Car className="h-4 w-4" />
                          <span>{appointment.vehicleTitle}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-foreground/70">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(appointment.date)} às {appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-foreground/70">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm text-foreground/70">
                          <strong>Telefone:</strong> {appointment.customerPhone}
                        </div>
                        <div className="text-sm text-foreground/70">
                          <strong>Email:</strong> {appointment.customerEmail}
                        </div>
                        {appointment.notes && (
                          <div className="text-sm text-foreground/70">
                            <strong>Observações:</strong> {appointment.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {appointment.status === 'scheduled' && (
                      <Button size="sm" onClick={() => confirmAppointment(appointment.id)} className="cursor-pointer">
                        <Check className="h-4 w-4 mr-1" />
                        Confirmar
                      </Button>
                    )}
                    
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Ligar
                    </Button>
                    
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    
                    {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => cancelAppointment(appointment.id)}
                        className="cursor-pointer"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                    )}
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