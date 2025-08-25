'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Bed, Bath, Square, Car, Heart, Share2, Eye, Filter, Grid3X3, List, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  parking: number
  type: string
  image: string
  featured?: boolean
  status: 'available' | 'sold' | 'rented'
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Casa Moderna com Piscina',
    price: 850000,
    location: 'São Paulo, SP - Jardins',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    parking: 2,
    type: 'Casa',
    image: '/api/placeholder/400/300',
    featured: true,
    status: 'available'
  },
  {
    id: '2',
    title: 'Apartamento de Luxo',
    price: 1200000,
    location: 'Rio de Janeiro, RJ - Leblon',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    parking: 1,
    type: 'Apartamento',
    image: '/api/placeholder/400/300',
    status: 'available'
  },
  {
    id: '3',
    title: 'Cobertura Duplex',
    price: 2500000,
    location: 'Belo Horizonte, MG - Savassi',
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    parking: 3,
    type: 'Apartamento',
    image: '/api/placeholder/400/300',
    featured: true,
    status: 'available'
  },
  {
    id: '4',
    title: 'Casa de Campo',
    price: 650000,
    location: 'Campinas, SP - Nova Campinas',
    bedrooms: 3,
    bathrooms: 2,
    area: 450,
    parking: 2,
    type: 'Casa',
    image: '/api/placeholder/400/300',
    status: 'available'
  },
  {
    id: '5',
    title: 'Loft Industrial',
    price: 450000,
    location: 'São Paulo, SP - Vila Madalena',
    bedrooms: 1,
    bathrooms: 1,
    area: 120,
    parking: 1,
    type: 'Comercial',
    image: '/api/placeholder/400/300',
    status: 'available'
  },
  {
    id: '6',
    title: 'Terreno Residencial',
    price: 350000,
    location: 'Campinas, SP - Jardim Proença',
    bedrooms: 0,
    bathrooms: 0,
    area: 800,
    parking: 0,
    type: 'Terreno',
    image: '/api/placeholder/400/300',
    status: 'available'
  }
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || property.type === filterType
    return matchesSearch && matchesType
  })

  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (propertyToDelete) {
      // Here you would typically make an API call to delete the property
      console.log('Deleting property:', propertyToDelete.id)
      // Remove from mock data (in real app, this would be handled by API response)
      // mockProperties = mockProperties.filter(prop => prop.id !== propertyToDelete.id)
    }
    setDeleteModalOpen(false)
    setPropertyToDelete(null)
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setPropertyToDelete(null)
  }

  return (
    <RootLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Encontre o Imóvel Perfeito
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Explore milhares de propriedades em todo o Brasil. Casas, apartamentos, 
              terrenos e comerciais com as melhores localizações e preços.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 shadow-2xl border-0">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar por localização, tipo ou características..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>
                  <Button size="lg" className="h-12 px-8">
                    Buscar Imóveis
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Filters */}
            <div className="lg:w-80 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Filtros</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Property Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tipo de Imóvel</label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os tipos</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="terreno">Terreno</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterType('all')
                      setSearchTerm('')
                    }}
                    className="w-full"
                  >
                    Limpar Filtros
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results and Controls */}
            <div className="flex-1">
              {/* Header Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Imóveis Disponíveis
                  </h2>
                  <p className="text-foreground/60">
                    {filteredProperties.length} imóveis encontrados
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center border rounded-lg p-1 bg-muted">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-background text-foreground shadow-sm' 
                          : 'text-foreground/60 hover:text-foreground'
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-background text-foreground shadow-sm' 
                          : 'text-foreground/60 hover:text-foreground'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Properties Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} onDelete={handleDeleteClick} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProperties.map((property) => (
                    <PropertyListCard key={property.id} property={property} onDelete={handleDeleteClick} />
                  ))}
                </div>
              )}

              {/* No Results */}
              {filteredProperties.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="text-foreground/20 mb-4">
                    <MapPin className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nenhum imóvel encontrado
                  </h3>
                  <p className="text-foreground/60 mb-4">
                    Tente ajustar os filtros de busca ou usar termos diferentes
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterType('all')
                      setSearchTerm('')
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Confirmar Exclusão
              </h3>
            </div>
            
            <p className="text-foreground/70 mb-6">
              Tem certeza que deseja excluir o imóvel "{propertyToDelete?.title}"? 
              Esta ação não pode ser desfeita.
            </p>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handleDeleteCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteConfirm}
                className="flex-1"
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </RootLayout>
  )
}

function PropertyCard({ property, onDelete }: { property: Property; onDelete: (property: Property) => void }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg flex flex-col">
      <div className="relative">
        <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
          <div className="text-foreground/40 text-sm">Imagem do Imóvel</div>
        </div>
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Destaque
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-3 right-3">
          {property.type}
        </Badge>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(property)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {property.title}
        </CardTitle>
        <div className="flex items-center text-foreground/60 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="text-2xl font-bold text-primary mb-4">
          {formatPrice(property.price)}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center text-sm text-foreground/70">
            <Bed className="h-4 w-4 mr-2" />
            {property.bedrooms} quartos
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <Bath className="h-4 w-4 mr-2" />
            {property.bathrooms} banheiros
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <Square className="h-4 w-4 mr-2" />
            {property.area}m²
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <Car className="h-4 w-4 mr-2" />
            {property.parking} vagas
          </div>
        </div>

        <div className="mt-auto">
          <Button className="w-full" asChild>
            <Link href={`/property/${property.id}`}>
              Ver Detalhes
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PropertyListCard({ property, onDelete }: { property: Property; onDelete: (property: Property) => void }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 h-48 md:h-auto bg-muted rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center">
          <div className="text-foreground/40 text-sm">Imagem do Imóvel</div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {property.featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    Destaque
                  </Badge>
                )}
                <Badge variant="secondary">
                  {property.type}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {property.title}
              </h3>
              <div className="flex items-center text-foreground/60 text-sm mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-primary mb-2">
                {formatPrice(property.price)}
              </div>
              <div className="flex items-center gap-4 text-sm text-foreground/70">
                <span className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {property.bedrooms} quartos
                </span>
                <span className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {property.bathrooms} banheiros
                </span>
                <span className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  {property.area}m²
                </span>
                <span className="flex items-center">
                  <Car className="h-4 w-4 mr-1" />
                  {property.parking} vagas
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href={`/property/${property.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              {isFavorite ? 'Favorito' : 'Favoritar'}
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onDelete(property)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
} 