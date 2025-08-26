'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Bed, Bath, Square, Car, Heart, Share2, Eye, Filter, Grid, List, Trash2, Search, Home, Building, Briefcase, TreePine, X, Star } from 'lucide-react'
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
  const [pressedButtonId, setPressedButtonId] = useState<string | null>(null)

  // Global mouse up event handler for button release
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (pressedButtonId) {
        setPressedButtonId(null)
        // Reset button styles
        const button = document.querySelector(`[data-button="${pressedButtonId}"]`) as HTMLElement
        if (button) {
          button.style.backgroundColor = '#1A53E0'
          button.style.borderColor = '#1A53E0'
          button.style.transform = 'scale(1)'
        }
      }
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [pressedButtonId])

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
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden flex-col shadow-[inset_0_-20px_40px_-20px_rgba(0,0,0,0.15)]">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Main Heading */}
            <div className="mb-8 mt-16">
              <h1 className="text-xl md:text-4xl font-bold text-[#1A53E0] leading-tight">
                Bom dia, Luciana!
              </h1>
              <p className="text-xl md:text-4xl font-bold text-[#1A53E0] max-w-4xl mx-auto leading-relaxed">
                Que tipo de imóvel está procurando?
              </p>
            </div>
          </div>
          {/* Search Interface */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex items-center gap-0">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Input
                  placeholder="Digite o que precisa: bairro, cidade ou tipo de imóvel"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '20px' }}
                  className="h-16 text-5xl pl-6 pr-20 border-2 border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-3xl placeholder:text-xl placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Featured Properties Section */}
            <div className="mt-10 mb-10">
              <h2 className="text-xl md:text-2xl text-[#1A53E0] font-bold mb-4">
                Mais vistos hoje
              </h2>

              {/* Featured Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {mockProperties.slice(0, 4).map((property) => (
                  <FeaturedPropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* View All Properties Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  style={{
                    backgroundColor: '#1A53E0',
                    borderColor: '#1A53E0',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onClick={() => window.location.href = '/properties'}
                >
                  Ver Todos os Imóveis
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className='w-full flex justify-center mb-12'>
          <div className="mt-16 flex flex-row justify-between items-center gap-8 text-center w-[80%]">
            <div className="flex-1">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-foreground/70">Imóveis Disponíveis</div>
            </div>
            <div className="flex-1">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25,000+</div>
              <div className="text-foreground/70">Clientes Satisfeitos</div>
            </div>
            <div className="flex-1">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-foreground/70">Agentes Parceiros</div>
            </div>
            <div className="flex-1">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-foreground/70">Taxa de Satisfação</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Por que escolher nossos imóveis?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Oferecemos as melhores opções com qualidade garantida e atendimento personalizado
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Qualidade Garantida</h3>
                <p className="text-foreground/60">Todos os imóveis são verificados e aprovados por nossa equipe</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Melhores Localizações</h3>
                <p className="text-foreground/60">Imóveis estrategicamente posicionados em áreas de alto valor</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Atendimento Personalizado</h3>
                <p className="text-foreground/60">Nossa equipe está sempre pronta para ajudar você</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Satisfação Garantida</h3>
                <p className="text-foreground/60">98% dos nossos clientes recomendam nossos serviços</p>
              </div>
            </div>
          </div>
        </div> */}

       

        {/* Call to Action Section */}
        {/* <div className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para encontrar seu imóvel dos sonhos?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para ajudar você a encontrar o imóvel perfeito.
              Entre em contato conosco hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = '/contact'}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Falar com Corretor
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = '/sell'}
              >
                <Home className="h-5 w-5 mr-2" />
                Anunciar Imóvel
              </Button>
            </div>
          </div>
        </div> */}
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

function PropertyCard({
  property,
  onDelete,
  pressedButtonId,
  setPressedButtonId
}: {
  property: Property;
  onDelete: (property: Property) => void;
  pressedButtonId: string | null;
  setPressedButtonId: (id: string | null) => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card
      className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div className="text-foreground/60 text-sm">Imagem do Imóvel</div>
          </div>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
            ⭐ Destaque
          </Badge>
        )}

        {/* Type Badge */}
        <Badge variant="secondary" className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-foreground">
          {property.type}
        </Badge>

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 transition-all duration-300 ${isFavorite ? 'fill-current text-red-500 scale-110' : 'text-foreground/70'
              }`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <Share2 className="h-4 w-4 text-foreground/70" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(property)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center text-foreground/60 text-sm">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Price */}
        <div className="text-2xl font-bold text-primary mb-4 group-hover:scale-105 transition-transform duration-300">
          {formatPrice(property.price)}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <Bed className="h-4 w-4 mr-2 text-primary" />
            {property.bedrooms} quartos
          </div>
          <div className="flex items-center text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <Bath className="h-4 w-4 mr-2 text-primary" />
            {property.bathrooms} banheiros
          </div>
          <div className="flex items-center text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <Square className="h-4 w-4 mr-2 text-primary" />
            {property.area}m²
          </div>
          <div className="flex items-center text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <Car className="h-4 w-4 mr-2 text-primary" />
            {property.parking} vagas
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <Button
            className="w-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            data-button="ver-detalhes-grid"
            style={{
              backgroundColor: '#1A53E0',
              borderColor: '#1A53E0',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              if (pressedButtonId !== 'ver-detalhes-grid') {
                e.currentTarget.style.backgroundColor = '#0f3bb8';
                e.currentTarget.style.borderColor = '#0f3bb8';
              }
            }}
            onMouseLeave={(e) => {
              if (pressedButtonId !== 'ver-detalhes-grid') {
                e.currentTarget.style.backgroundColor = '#1A53E0';
                e.currentTarget.style.borderColor = '#1A53E0';
              }
            }}
            onMouseDown={(e) => {
              setPressedButtonId('ver-detalhes-grid');
              e.currentTarget.style.backgroundColor = '#0a2a8a';
              e.currentTarget.style.borderColor = '#0a2a8a';
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              if (pressedButtonId === 'ver-detalhes-grid') {
                setPressedButtonId(null);
                e.currentTarget.style.backgroundColor = '#0f3bb8';
                e.currentTarget.style.borderColor = '#0f3bb8';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            onClick={() => window.location.href = `/property/${property.id}`}
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PropertyListCard({
  property,
  onDelete,
  pressedButtonId,
  setPressedButtonId
}: {
  property: Property;
  onDelete: (property: Property) => void;
  pressedButtonId: string | null;
  setPressedButtonId: (id: string | null) => void;
}) {
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
    <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 shadow-lg bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-80 h-48 md:h-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center relative overflow-hidden">
          <div className="text-center relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div className="text-foreground/60 text-sm">Imagem do Imóvel</div>
          </div>

          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-pink-200/30 to-red-200/30 rounded-full blur-2xl" />
          </div>
        </div>

        <div className="flex-1 p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {property.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                    ⭐ Destaque
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-foreground border border-gray-200">
                  {property.type}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {property.title}
              </h3>
              <div className="flex items-center text-foreground/60 text-sm mb-4">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span className="text-base">{property.location}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
                {formatPrice(property.price)}
              </div>
              <div className="flex items-center gap-6 text-sm text-foreground/70">
                <span className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <Bed className="h-4 w-4 mr-2 text-primary" />
                  {property.bedrooms} quartos
                </span>
                <span className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <Bath className="h-4 w-4 mr-2 text-primary" />
                  {property.bathrooms} banheiros
                </span>
                <span className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <Square className="h-4 w-4 mr-2 text-primary" />
                  {property.area}m²
                </span>
                <span className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <Car className="h-4 w-4 mr-2 text-primary" />
                  {property.parking} vagas
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              data-button="ver-detalhes-list"
              style={{
                backgroundColor: '#1A53E0',
                borderColor: '#1A53E0',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (pressedButtonId !== 'ver-detalhes-list') {
                  e.currentTarget.style.backgroundColor = '#0f3bb8';
                  e.currentTarget.style.borderColor = '#0f3bb8';
                }
              }}
              onMouseLeave={(e) => {
                if (pressedButtonId !== 'ver-detalhes-list') {
                  e.currentTarget.style.backgroundColor = '#1A53E0';
                  e.currentTarget.style.borderColor = '#1A53E0';
                }
              }}
              onMouseDown={(e) => {
                setPressedButtonId('ver-detalhes-list');
                e.currentTarget.style.backgroundColor = '#0a2a8a';
                e.currentTarget.style.borderColor = '#0a2a8a';
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                if (pressedButtonId === 'ver-detalhes-list') {
                  setPressedButtonId(null);
                  e.currentTarget.style.backgroundColor = '#0f3bb8';
                  e.currentTarget.style.borderColor = '#0f3bb8';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              onClick={() => window.location.href = `/property/${property.id}`}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
            <Button
              variant="outline"
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-primary"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 mr-2 transition-all duration-300 ${isFavorite ? 'fill-current text-red-500 scale-110' : ''
                }`} />
              {isFavorite ? 'Favorito' : 'Favoritar'}
            </Button>
            <Button
              variant="outline"
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-primary"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button
              variant="outline"
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-red-200 hover:border-red-500 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(property)}
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

function FeaturedPropertyCard({ property }: { property: Property }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div className="text-foreground/60 text-xs">Imagem do Imóvel</div>
          </div>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg text-xs">
            ⭐ Destaque
          </Badge>
        )}

        {/* Type Badge */}
        <Badge variant="secondary" className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-foreground text-xs">
          {property.type}
        </Badge>
      </div>

      {/* Content */}
      <CardHeader className="pb-3 pt-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center text-foreground/60 text-xs">
            <MapPin className="h-3 w-3 mr-1 text-primary" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        {/* Price */}
        <div className="text-lg font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
          {formatPrice(property.price)}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-xs text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <Bed className="h-3 w-3 mr-1 text-primary" />
            {property.bedrooms} quartos
          </div>
          <div className="flex items-center text-xs text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <Bath className="h-3 w-3 mr-1 text-primary" />
            {property.bathrooms} banheiros
          </div>
          <div className="flex items-center text-xs text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <Square className="h-3 w-3 mr-1 text-primary" />
            {property.area}m²
          </div>
          <div className="flex items-center text-xs text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <Car className="h-3 w-3 mr-1 text-primary" />
            {property.parking} vagas
          </div>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full text-sm py-2 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          style={{
            backgroundColor: '#1A53E0',
            borderColor: '#1A53E0',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out'
          }}
          onClick={() => window.location.href = `/property/${property.id}`}
        >
          <Eye className="h-3 w-3 mr-2" />
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  )
} 