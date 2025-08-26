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
        <div className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Filters */}
            <div className="lg:w-80 space-y-4">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <div className="p-2 bg-gradient-to-r from-primary to-purple-600 rounded-lg">
                      <Filter className="h-5 w-5 text-white" />
                    </div>
                    <span>Filtros Avançados</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Property Type */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground flex items-center">
                      <Home className="h-4 w-4 mr-2 text-primary" />
                      Tipo de Imóvel
                    </label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <Home className="h-4 w-4 text-white" />
                            </div>
                            <span>Todos os tipos</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="casa" className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                              <Home className="h-4 w-4 text-white" />
                            </div>
                            <span>Casas</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="apartamento" className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                              <Building className="h-4 w-4 text-white" />
                            </div>
                            <span>Apartamentos</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="terreno" className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-white" />
                            </div>
                            <span>Terrenos</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="comercial" className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
                              <Briefcase className="h-4 w-4 text-white" />
                            </div>
                            <span>Comercial</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="rural" className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                              <TreePine className="h-4 w-4 text-white" />
                            </div>
                            <span>Rural</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground flex items-center">
                      <span className="w-4 h-4 mr-2 text-primary">💰</span>
                      Faixa de Preço
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Select>
                        <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                          <SelectValue placeholder="Mínimo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Qualquer</SelectItem>
                          <SelectItem value="100000">R$ 100.000</SelectItem>
                          <SelectItem value="200000">R$ 200.000</SelectItem>
                          <SelectItem value="500000">R$ 500.000</SelectItem>
                          <SelectItem value="1000000">R$ 1.000.000</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                          <SelectValue placeholder="Máximo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500000">R$ 500.000</SelectItem>
                          <SelectItem value="1000000">R$ 1.000.000</SelectItem>
                          <SelectItem value="2000000">R$ 2.000.000</SelectItem>
                          <SelectItem value="5000000">R$ 5.000.000</SelectItem>
                          <SelectItem value="10000000">R$ 10.000.000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground flex items-center">
                      <span className="w-4 h-4 mr-2 text-primary">🛏️</span>
                      Quartos
                    </label>
                    <Select>
                      <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                        <SelectValue placeholder="Qualquer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Qualquer</SelectItem>
                        <SelectItem value="1">1 quarto</SelectItem>
                        <SelectItem value="2">2 quartos</SelectItem>
                        <SelectItem value="3">3 quartos</SelectItem>
                        <SelectItem value="4">4+ quartos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground flex items-center">
                      <span className="w-4 h-4 mr-2 text-primary">📐</span>
                      Área (m²)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Select>
                        <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                          <SelectValue placeholder="Mínimo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Qualquer</SelectItem>
                          <SelectItem value="50">50m²</SelectItem>
                          <SelectItem value="100">100m²</SelectItem>
                          <SelectItem value="200">200m²</SelectItem>
                          <SelectItem value="500">500m²</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                          <SelectValue placeholder="Máximo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="200">200m²</SelectItem>
                          <SelectItem value="500">500m²</SelectItem>
                          <SelectItem value="1000">1000m²</SelectItem>
                          <SelectItem value="2000">2000m²</SelectItem>
                          <SelectItem value="5000">5000m²+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  <Button
                    onClick={() => {
                      setFilterType('all')
                      setSearchTerm('')
                    }}
                    className="w-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    data-button="limpar-filtros"
                    style={{
                      backgroundColor: '#1A53E0',
                      borderColor: '#1A53E0',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      if (pressedButtonId !== 'limpar-filtros') {
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pressedButtonId !== 'limpar-filtros') {
                        e.currentTarget.style.backgroundColor = '#1A53E0';
                        e.currentTarget.style.borderColor = '#1A53E0';
                      }
                    }}
                    onMouseDown={(e) => {
                      setPressedButtonId('limpar-filtros');
                      e.currentTarget.style.backgroundColor = '#0a2a8a';
                      e.currentTarget.style.borderColor = '#0a2a8a';
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                      if (pressedButtonId === 'limpar-filtros') {
                        setPressedButtonId(null);
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
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
                  <div className="flex items-center border-2 border-gray-200 rounded-xl p-1 bg-white/80 backdrop-blur-sm shadow-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${viewMode === 'grid'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                        : 'text-foreground/60 hover:text-foreground hover:bg-gray-50'
                        }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${viewMode === 'list'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                        : 'text-foreground/60 hover:text-foreground hover:bg-gray-50'
                        }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Properties Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onDelete={handleDeleteClick}
                      pressedButtonId={pressedButtonId}
                      setPressedButtonId={setPressedButtonId}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProperties.map((property) => (
                    <PropertyListCard
                      key={property.id}
                      property={property}
                      onDelete={handleDeleteClick}
                      pressedButtonId={pressedButtonId}
                      setPressedButtonId={setPressedButtonId}
                    />
                  ))}
                </div>
              )}

              {/* No Results */}
              {filteredProperties.length === 0 && (
                <Card className="p-16 text-center border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Nenhum imóvel encontrado
                  </h3>
                  <p className="text-lg text-foreground/60 mb-6 max-w-md mx-auto">
                    Tente ajustar os filtros de busca ou usar termos diferentes para encontrar o imóvel perfeito
                  </p>
                  <Button
                    className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      setFilterType('all')
                      setSearchTerm('')
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Limpar Filtros
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
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
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
      {/* Image Container */}
      <div className="relative h-[170px] overflow-hidden">
        {/* Beautiful Ocean View Image */}
        <div className="w-full h-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center relative">
          {/* Ocean View Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600 opacity-80"></div>

          {/* Living Room Furniture */}
          <div className="relative z-10 w-full h-full flex items-end justify-center pb-8">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="h-8 w-8 text-white" />
              </div>
              <div className="text-white/90 text-sm font-medium">Vista para o Mar</div>
            </div>
          </div>

          {/* Favorite Button - Top Right */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
        </div>

        {
          property.featured && (
            <Badge className="absolute top-3 left-3 bg-rose-400 text-gray-800 border-0 shadow-sm text-xs font-medium">
              Novo
            </Badge>
          )/* Type Badge - Top Left */
        }
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price and Title Row */}
        <div className="flex w-full mb-3 flex-col">
          <div className="text-right h-5 flex justify-between mb-2">
            <Badge className="top-3 left-3 bg-gray-100 text-gray-800 border-0 shadow-sm text-xs font-medium">
              {property.type}
            </Badge>
            <div className="text-lg font-bold text-blue-600 mb-1">
              {formatPrice(property.price)}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

        </div>

        {/* Features Row */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.area}m²</span>
          </div>
        </div>

        {/* Ver Detalhes Button */}
        <Button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-2 text-sm font-medium transition-all duration-200 hover:shadow-md"
          onClick={() => window.location.href = `/property/${property.id}`}
        >
          Ver Detalhes
        </Button>
      </div>
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
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
      {/* Image Container */}
      <div className="relative h-[170px] overflow-hidden">
        {/* Beautiful Ocean View Image */}
        <div className="w-full h-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center relative">
          {/* Ocean View Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600 opacity-80"></div>

          {/* Living Room Furniture */}
          <div className="relative z-10 w-full h-full flex items-end justify-center pb-8">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="h-8 w-8 text-white" />
              </div>
              <div className="text-white/90 text-sm font-medium">Vista para o Mar</div>
            </div>
          </div>

          {/* Favorite Button - Top Right */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
        </div>

        {
          property.featured && (
            <Badge className="absolute top-3 left-3 bg-rose-400 text-gray-800 border-0 shadow-sm text-xs font-medium">
              Novo
            </Badge>
          )/* Type Badge - Top Left */
        }
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price and Title Row */}
        <div className="flex w-full mb-3 flex-col">
          <div className="text-right h-5 flex justify-between mb-2">
            <Badge className="top-3 left-3 bg-gray-100 text-gray-800 border-0 shadow-sm text-xs font-medium">
              {property.type}
            </Badge>
            <div className="text-lg font-bold text-blue-600 mb-1">
              {formatPrice(property.price)}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

        </div>

        {/* Features Row */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.area}m²</span>
          </div>
        </div>

        {/* Ver Detalhes Button */}
        <Button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-2 text-sm font-medium transition-all duration-200 hover:shadow-md"
          onClick={() => window.location.href = `/property/${property.id}`}
        >
          Ver Detalhes
        </Button>
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
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
      {/* Image Container */}
      <div className="relative h-[170px] overflow-hidden">
        {/* Beautiful Ocean View Image */}
        <div className="w-full h-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center relative">
          {/* Ocean View Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600 opacity-80"></div>

          {/* Living Room Furniture */}
          <div className="relative z-10 w-full h-full flex items-end justify-center pb-8">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="h-8 w-8 text-white" />
              </div>
              <div className="text-white/90 text-sm font-medium">Vista para o Mar</div>
            </div>
          </div>

          {/* Favorite Button - Top Right */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
        </div>

        {
          property.featured && (
            <Badge className="absolute top-3 left-3 bg-rose-400 text-gray-800 border-0 shadow-sm text-xs font-medium">
              Novo
            </Badge>
          )/* Type Badge - Top Left */
        }
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price and Title Row */}
        <div className="flex w-full mb-3 flex-col">
          <div className="text-right h-5 flex justify-between mb-2">
            <Badge className="top-3 left-3 bg-gray-100 text-gray-800 border-0 shadow-sm text-xs font-medium">
              {property.type}
            </Badge>
            <div className="text-lg font-bold text-blue-600 mb-1">
              {formatPrice(property.price)}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

        </div>

        {/* Features Row */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-gray-400" />
            <span>{property.area}m²</span>
          </div>
        </div>

        {/* Ver Detalhes Button */}
        <Button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-2 text-sm font-medium transition-all duration-200 hover:shadow-md"
          onClick={() => window.location.href = `/property/${property.id}`}
        >
          Ver Detalhes
        </Button>
      </div>
    </Card>
  )
} 