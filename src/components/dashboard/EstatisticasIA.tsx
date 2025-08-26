'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Brain, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  MessageSquare, 
  Eye,
  Clock,
  Star,
  Users,
  BarChart3,
  Activity,
  Zap,
  X
} from 'lucide-react'

export function EstatisticasIA() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [timeRange, setTimeRange] = useState('7d')

  const exportReport = () => {
    console.log('Exporting AI statistics report...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estatísticas de IA</h1>
          <p className="text-foreground/60 mt-1">Buscas inteligentes, conversas e recomendações</p>
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
          <Button onClick={exportReport} className="cursor-pointer">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Searches Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-blue-600" />
              <span>Buscas Inteligentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/60">Total</p>
                <p className="text-2xl font-bold text-blue-600">8,947</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Sucesso</p>
                <p className="text-2xl font-bold text-green-600">8,234</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/60">Tempo Médio</p>
                <p className="text-lg font-semibold text-foreground">1.2s</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Satisfação</p>
                <p className="text-lg font-semibold text-foreground">4.3/5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversations Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <span>Conversas com IA</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/60">Total</p>
                <p className="text-2xl font-bold text-green-600">2,341</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Resolvidas</p>
                <p className="text-2xl font-bold text-blue-600">2,156</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/60">Duração Média</p>
                <p className="text-lg font-semibold text-foreground">5.2min</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Satisfação</p>
                <p className="text-lg font-semibold text-foreground">4.1/5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-600" />
              <span>Recomendações</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/60">Total</p>
                <p className="text-2xl font-bold text-purple-600">15,672</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Clicadas</p>
                <p className="text-2xl font-bold text-orange-600">12,847</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/60">Conversões</p>
                <p className="text-lg font-semibold text-foreground">3,456</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Precisão</p>
                <p className="text-lg font-semibold text-foreground">89%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Buscar usuários ou consultas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="casa">Casas</SelectItem>
                <SelectItem value="apartamento">Apartamentos</SelectItem>
                <SelectItem value="terreno">Terrenos</SelectItem>
                <SelectItem value="comercial">Comerciais</SelectItem>
                <SelectItem value="rural">Rurais</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterCategory('all') }} className="cursor-pointer">
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Searches Table */}
      <Card>
        <CardHeader>
          <CardTitle>Buscas Inteligentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Tabela de Buscas</h3>
            <p className="text-foreground/60">Implementar tabela com dados de buscas inteligentes</p>
          </div>
        </CardContent>
      </Card>

      {/* AI Conversations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Conversas com IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Tabela de Conversas</h3>
            <p className="text-foreground/60">Implementar tabela com dados de conversas com IA</p>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações de IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Eye className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Tabela de Recomendações</h3>
            <p className="text-foreground/60">Implementar tabela com dados de recomendações de IA</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 