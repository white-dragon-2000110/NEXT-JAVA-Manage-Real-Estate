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
  Home,
  X,
  Phone,
  MessageSquare,
  ExternalLink
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
  const [selectedProperty, setSelectedProperty] = useState<FavoriteProperty | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<'view' | 'share' | 'delete' | null>(null)

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

  const handleButtonClick = (property: FavoriteProperty, action: 'view' | 'share' | 'delete') => {
    setSelectedProperty(property)
    setModalAction(action)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedProperty(null)
    setModalAction(null)
  }

  const handleDelete = () => {
    if (selectedProperty) {
      console.log('Deleting property:', selectedProperty.id)
    }
    closeModal()
  }

  const handleShare = () => {
    if (selectedProperty) {
      console.log('Sharing property:', selectedProperty.id)
    }
    closeModal()
  }

  const handleView = () => {
    if (selectedProperty) {
      console.log('Viewing property:', selectedProperty.id)
    }
    closeModal()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">Meus Favoritos</h1>
          <p className="text-foreground/60">Gerencie seus imóveis favoritos</p>
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

      {/* Favorites Grid - KEY: Using flex flex-col for consistent button alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedFavorites.map((property) => (
          <Card key={property.id} className="group hover:shadow-lg transition-shadow flex flex-col">
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
            
            <CardContent className="space-y-4 flex-1 flex flex-col">
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
              
              {/* Actions - KEY: Using mt-auto to push buttons to bottom */}
              <div className="mt-auto">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleButtonClick(property, 'view')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleButtonClick(property, 'share')}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleButtonClick(property, 'delete')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Added Date */}
                <div className="text-xs text-foreground/60 text-center mt-3">
                  Adicionado em {new Date(property.addedDate).toLocaleDateString('pt-BR')}
                </div>
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

      {/* Property Action Modal */}
      {modalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {modalAction === 'view' && 'Ver Detalhes'}
                  {modalAction === 'share' && 'Compartilhar Imóvel'}
                  {modalAction === 'delete' && 'Excluir Imóvel'}
                </h2>
                <p className="text-sm text-foreground/60 mt-1">
                  {selectedProperty.title}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Property Image */}
              <div className="relative h-48 bg-muted rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={selectedProperty.isActive ? 'default' : 'secondary'}>
                    {selectedProperty.isActive ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{formatPrice(selectedProperty.price)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-foreground/40" />
                    <span className="truncate">{selectedProperty.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-foreground/40" />
                    <span>{selectedProperty.area}m²</span>
                  </div>
                  {selectedProperty.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-foreground/40" />
                      <span>{selectedProperty.bedrooms} quartos</span>
                    </div>
                  )}
                  {selectedProperty.bathrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-foreground/40" />
                      <span>{selectedProperty.bathrooms} banheiros</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-foreground/60 text-center">
                  Adicionado em {new Date(selectedProperty.addedDate).toLocaleDateString('pt-BR')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {modalAction === 'view' && (
                  <>
                    <Button className="w-full" onClick={handleView}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Detalhes Completos
                    </Button>
                    <Button variant="outline" className="w-full" onClick={closeModal}>
                      Fechar
                    </Button>
                  </>
                )}

                {modalAction === 'share' && (
                  <>
                    <Button className="w-full" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Copiar Link
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Compartilhar via WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Compartilhar via SMS
                    </Button>
                    <Button variant="outline" className="w-full" onClick={closeModal}>
                      Cancelar
                    </Button>
                  </>
                )}

                {modalAction === 'delete' && (
                  <>
                    <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <p className="text-sm text-destructive font-medium mb-2">
                        Tem certeza que deseja excluir este imóvel dos favoritos?
                      </p>
                      <p className="text-xs text-destructive/70">
                        Esta ação não pode ser desfeita.
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      className="w-full" 
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Sim, Excluir
                    </Button>
                    <Button variant="outline" className="w-full" onClick={closeModal}>
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
