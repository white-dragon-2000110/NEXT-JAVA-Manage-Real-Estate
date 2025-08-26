'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  History, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  RefreshCw, 
  MapPin, 
  Calendar, 
  Building,
  Home,
  Clock,
  TrendingUp,
  RotateCcw,
  Bookmark
} from 'lucide-react'

interface SearchHistory {
  id: string
  query: string
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
  resultsCount: number
  searchDate: string
  isSaved: boolean
  tags: string[]
}

const mockSearchHistory: SearchHistory[] = [
  {
    id: '1',
    query: 'Apartamentos 2-3 quartos Jardins',
    filters: {
      tipo: 'apartment',
      quartos: 3,
      banheiros: 2,
      areaMin: 80,
      areaMax: 150,
      precoMin: 500000,
      precoMax: 1000000,
      localizacao: 'São Paulo',
      bairro: 'Jardins'
    },
    resultsCount: 24,
    searchDate: '2024-01-20T10:30:00',
    isSaved: true,
    tags: ['Apartamento', '2-3 quartos', 'Jardins', 'São Paulo']
  },
  {
    id: '2',
    query: 'Casas 4+ quartos Barra da Tijuca',
    filters: {
      tipo: 'house',
      quartos: 4,
      banheiros: 3,
      areaMin: 150,
      precoMin: 800000,
      localizacao: 'Rio de Janeiro',
      bairro: 'Barra da Tijuca'
    },
    resultsCount: 18,
    searchDate: '2024-01-19T15:45:00',
    isSaved: false,
    tags: ['Casa', '4+ quartos', 'Barra da Tijuca', 'Rio de Janeiro']
  },
  {
    id: '3',
    query: 'Salas comerciais centro até 500k',
    filters: {
      tipo: 'commercial',
      areaMax: 100,
      precoMax: 500000,
      localizacao: 'Belo Horizonte'
    },
    resultsCount: 45,
    searchDate: '2024-01-18T09:15:00',
    isSaved: true,
    tags: ['Comercial', 'Centro', 'Até 500k', 'Belo Horizonte']
  },
  {
    id: '4',
    query: 'Terrenos zona sul 500m²+',
    filters: {
      tipo: 'land',
      areaMin: 500,
      localizacao: 'Curitiba',
      bairro: 'Zona Sul'
    },
    resultsCount: 32,
    searchDate: '2024-01-17T14:20:00',
    isSaved: false,
    tags: ['Terreno', '500m²+', 'Zona Sul', 'Curitiba']
  },
  {
    id: '5',
    query: 'Apartamentos novos 2023+',
    filters: {
      tipo: 'apartment',
      precoMin: 300000,
      precoMax: 800000,
      localizacao: 'Porto Alegre'
    },
    resultsCount: 67,
    searchDate: '2024-01-16T11:00:00',
    isSaved: true,
    tags: ['Apartamento', 'Novo', '2023+', 'Porto Alegre']
  }
]

export function HistoricoBuscas() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [pressedButtonId, setPressedButtonId] = useState<string | null>(null)

  // Global mouse up event handler for button release
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (pressedButtonId) {
        setPressedButtonId(null)
        // Reset button styles
        const button = document.querySelector(`[data-button="${pressedButtonId}"]`) as HTMLElement
        if (button) {
          if (pressedButtonId.startsWith('salva-') || pressedButtonId === 'atualizar-historico') {
            button.style.backgroundColor = '#1A53E0'
            button.style.borderColor = '#1A53E0'
          } else if (pressedButtonId === 'limpar-historico' || pressedButtonId.startsWith('delete-')) {
            button.style.backgroundColor = '#f43f5e'
            button.style.color = 'white'
          } else {
            button.style.backgroundColor = '#1A53E0'
            button.style.borderColor = '#1A53E0'
          }
          button.style.transform = 'scale(1)'
        }
      }
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [pressedButtonId])

  const filteredHistory = mockSearchHistory.filter(history => {
    const matchesSearch = history.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         history.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || history.filters.tipo === filterType
    return matchesSearch && matchesType
  })

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.searchDate).getTime() - new Date(a.searchDate).getTime()
      case 'oldest':
        return new Date(a.searchDate).getTime() - new Date(b.searchDate).getTime()
      case 'results':
        return b.resultsCount - a.resultsCount
      case 'saved':
        return (b.isSaved ? 1 : 0) - (a.isSaved ? 1 : 0)
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'apartment':
        return 'Apartamento'
      case 'house':
        return 'Casa'
      case 'commercial':
        return 'Comercial'
      case 'land':
        return 'Terreno'
      default:
        return type
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'apartment':
        return <Building className="h-4 w-4" />
      case 'house':
        return <Home className="h-4 w-4" />
      case 'commercial':
        return <Building className="h-4 w-4" />
      case 'land':
        return <MapPin className="h-4 w-4" />
      default:
        return <Building className="h-4 w-4" />
    }
  }

  const repeatSearch = (history: SearchHistory) => {
    console.log('Repeating search:', history)
    // Implement repeat search logic
  }

  const saveSearch = (id: string) => {
    console.log('Saving search:', id)
    // Implement save search logic
  }

  const deleteSearch = (id: string) => {
    console.log('Deleting search:', id)
    // Implement delete search logic
  }

  const clearAllHistory = () => {
    console.log('Clearing all history')
    // Implement clear all history logic
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Histórico de Buscas</h1>
          <p className="text-foreground/60">Acompanhe suas pesquisas anteriores de imóveis</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={clearAllHistory}
            className="cursor-pointer"
            data-button="limpar-historico"
            style={{
              backgroundColor: '#f43f5e',
              borderColor: '#f43f5e',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              if (pressedButtonId !== 'limpar-historico') {
                e.currentTarget.style.backgroundColor = '#e11d48';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (pressedButtonId !== 'limpar-historico') {
                e.currentTarget.style.backgroundColor = '#f43f5e';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseDown={(e) => {
              setPressedButtonId('limpar-historico');
              e.currentTarget.style.backgroundColor = '#e11d48';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              if (pressedButtonId === 'limpar-historico') {
                setPressedButtonId(null);
                e.currentTarget.style.backgroundColor = '#f43f5e';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar Histórico
          </Button>
          <Button
            className="cursor-pointer"
            data-button="atualizar-historico"
            style={{
              backgroundColor: '#1A53E0',
              borderColor: '#1A53E0',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              if (pressedButtonId !== 'atualizar-historico') {
                e.currentTarget.style.backgroundColor = '#0f3bb8';
                e.currentTarget.style.borderColor = '#0f3bb8';
              }
            }}
            onMouseLeave={(e) => {
              if (pressedButtonId !== 'atualizar-historico') {
                e.currentTarget.style.backgroundColor = '#1A53E0';
                e.currentTarget.style.borderColor = '#1A53E0';
              }
            }}
            onMouseDown={(e) => {
              setPressedButtonId('atualizar-historico');
              e.currentTarget.style.backgroundColor = '#0a2a8a';
              e.currentTarget.style.borderColor = '#0a2a8a';
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              if (pressedButtonId === 'atualizar-historico') {
                setPressedButtonId(null);
                e.currentTarget.style.backgroundColor = '#0f3bb8';
                e.currentTarget.style.borderColor = '#0f3bb8';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <Input
                  placeholder="Buscar no histórico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="apartment">Apartamentos</SelectItem>
                  <SelectItem value="house">Casas</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="land">Terrenos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Ordenar por</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigas</SelectItem>
                  <SelectItem value="results">Mais resultados</SelectItem>
                  <SelectItem value="saved">Salvas primeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Total</label>
              <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center">
                <span className="text-sm font-medium">{filteredHistory.length} buscas</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search History */}
      <div className="space-y-4">
        {sortedHistory.map((history) => (
          <Card key={history.id} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    {history.filters.tipo && (
                      <div className="flex items-center gap-2">
                        {getTypeIcon(history.filters.tipo)}
                        <Badge variant="secondary">
                          {getTypeLabel(history.filters.tipo)}
                        </Badge>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {history.query}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(history.searchDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Search className="h-4 w-4" />
                          <span>{history.resultsCount} resultados</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{history.filters.localizacao}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filters Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {history.filters.quartos && (
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-foreground/40" />
                        <span className="text-sm">
                          <span className="font-medium">{history.filters.quartos}</span> quartos
                        </span>
                      </div>
                    )}
                    {history.filters.banheiros && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-foreground/40" />
                        <span className="text-sm">
                          <span className="font-medium">{history.filters.banheiros}</span> banheiros
                        </span>
                      </div>
                    )}
                    {history.filters.areaMin && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-foreground/40" />
                        <span className="text-sm">
                          Área: <span className="font-medium">{history.filters.areaMin}m²</span>
                          {history.filters.areaMax && ` - ${history.filters.areaMax}m²`}
                        </span>
                      </div>
                    )}
                    {history.filters.precoMin && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-foreground/40" />
                        <span className="text-sm">
                          Preço: <span className="font-medium">
                            R$ {history.filters.precoMin.toLocaleString()}
                          </span>
                          {history.filters.precoMax && ` - R$ ${history.filters.precoMax.toLocaleString()}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {history.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => repeatSearch(history)}
                    className="w-full cursor-pointer"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Repetir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => saveSearch(history.id)}
                    className="w-full cursor-pointer"
                    data-button={`salva-${history.id}`}
                    style={{
                      backgroundColor: '#1A53E0',
                      borderColor: '#1A53E0',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      if (pressedButtonId !== `salva-${history.id}`) {
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pressedButtonId !== `salva-${history.id}`) {
                        e.currentTarget.style.backgroundColor = '#1A53E0';
                        e.currentTarget.style.borderColor = '#1A53E0';
                      }
                    }}
                    onMouseDown={(e) => {
                      setPressedButtonId(`salva-${history.id}`);
                      e.currentTarget.style.backgroundColor = '#0a2a8a';
                      e.currentTarget.style.borderColor = '#0a2a8a';
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                      if (pressedButtonId === `salva-${history.id}`) {
                        setPressedButtonId(null);
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {history.isSaved ? 'Salva' : 'Salvar'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSearch(history.id)}
                    className="cursor-pointer"
                    data-button={`delete-${history.id}`}
                    style={{
                      backgroundColor: '#f43f5e',
                      borderColor: '#f43f5e',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      if (pressedButtonId !== `delete-${history.id}`) {
                        e.currentTarget.style.backgroundColor = '#e11d48';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pressedButtonId !== `delete-${history.id}`) {
                        e.currentTarget.style.backgroundColor = '#f43f5e';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseDown={(e) => {
                      setPressedButtonId(`delete-${history.id}`);
                      e.currentTarget.style.backgroundColor = '#be123c';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                      if (pressedButtonId === `delete-${history.id}`) {
                        setPressedButtonId(null);
                        e.currentTarget.style.backgroundColor = '#e11d48';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <History className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma busca encontrada</h3>
            <p className="text-foreground/60 mb-4">
              {searchTerm || filterType !== 'all' 
                ? 'Tente ajustar os filtros ou termos de busca'
                : 'Comece a buscar imóveis para criar seu histórico'
              }
            </p>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Buscar Imóveis
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      {filteredHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Estatísticas das Buscas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {filteredHistory.length}
                </div>
                <div className="text-sm text-foreground/60">Total de buscas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {filteredHistory.filter(h => h.isSaved).length}
                </div>
                <div className="text-sm text-foreground/60">Buscas salvas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(filteredHistory.reduce((acc, h) => acc + h.resultsCount, 0) / filteredHistory.length)}
                </div>
                <div className="text-sm text-foreground/60">Média de resultados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {filteredHistory.filter(h => h.filters.tipo === 'apartment').length}
                </div>
                <div className="text-sm text-foreground/60">Buscas por apartamentos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 