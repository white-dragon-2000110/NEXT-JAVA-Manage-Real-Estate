'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Heart, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Share2, 
  MapPin, 
  Calendar, 
  Building,
  Home
} from 'lucide-react'

interface FavoriteProperty {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  type: 'apartment' | 'house' | 'commercial' | 'land'
  image: string
  addedDate: string
  isActive: boolean
}

const mockFavorites: FavoriteProperty[] = [
  {
    id: '1',
    title: 'Apartamento 3 quartos - Jardins',
    price: 850000,
    location: 'São Paulo, SP',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: 'apartment',
    image: '/api/placeholder/300/200',
    addedDate: '2024-01-15',
    isActive: true
  },
  {
    id: '2',
    title: 'Casa 4 quartos - Barra da Tijuca',
    price: 1200000,
    location: 'Rio de Janeiro, RJ',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    type: 'house',
    image: '/api/placeholder/300/200',
    addedDate: '2024-01-10',
    isActive: true
  },
  {
    id: '3',
    title: 'Sala comercial - Centro',
    price: 450000,
    location: 'Belo Horizonte, MG',
    bedrooms: 0,
    bathrooms: 1,
    area: 80,
    type: 'commercial',
    image: '/api/placeholder/300/200',
    addedDate: '2024-01-08',
    isActive: false
  },
  {
    id: '4',
    title: 'Terreno 500m² - Zona Sul',
    price: 350000,
    location: 'Curitiba, PR',
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    type: 'land',
    image: '/api/placeholder/300/200',
    addedDate: '2024-01-05',
    isActive: true
  }
]

export function Favoritos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const filteredFavorites = mockFavorites.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || property.type === filterType
    return matchesSearch && matchesType
  })

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'recent':
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      case 'area':
        return b.area - a.area
      default:
        return 0
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">Meus Favoritos</h1>
          <p className="text-foreground/60">Gerencie seus imóveis favoritos</p>
        </div>
        {/* <Button>
          <Heart className="h-4 w-4 mr-2" />
          Adicionar Favorito
        </Button> */}
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
                  placeholder="Buscar imóveis..."
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
                  <SelectItem value="price-low">Menor preço</SelectItem>
                  <SelectItem value="price-high">Maior preço</SelectItem>
                  <SelectItem value="area">Maior área</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Total</label>
              <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center">
                <span className="text-sm font-medium">{filteredFavorites.length} imóveis</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedFavorites.map((property) => (
          <Card key={property.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(property.type)}
                  <Badge variant="secondary">
                    {getTypeLabel(property.type)}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                </Button>
              </div>
              <CardTitle className="text-lg leading-tight">{property.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Image */}
              <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={property.isActive ? 'default' : 'secondary'}>
                    {property.isActive ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
              
              {/* Price */}
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{formatPrice(property.price)}</p>
              </div>
              
              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-foreground/40" />
                  <span className="truncate">{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-foreground/40" />
                  <span>{property.area}m²</span>
                </div>
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-foreground/40" />
                    <span>{property.bedrooms} quartos</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-foreground/40" />
                    <span>{property.bathrooms} banheiros</span>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Added Date */}
              <div className="text-xs text-foreground/60 text-center">
                Adicionado em {new Date(property.addedDate).toLocaleDateString('pt-BR')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredFavorites.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum favorito encontrado</h3>
            <p className="text-foreground/60 mb-4">
              {searchTerm || filterType !== 'all' 
                ? 'Tente ajustar os filtros ou termos de busca'
                : 'Comece adicionando imóveis aos seus favoritos'
              }
            </p>
            <Button>
              <Heart className="h-4 w-4 mr-2" />
              Explorar Imóveis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 