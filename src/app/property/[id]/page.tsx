'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building, MapPin, Heart, Share2, Phone, Mail, Star, Users } from 'lucide-react'
import Link from 'next/link'

export default function PropertyDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false)

  const property = {
    id: '3',
    title: 'Cobertura Duplex de Luxo',
    price: 2500000,
    location: 'Belo Horizonte, MG - Savassi',
    address: 'Rua da Bahia, 1234',
    city: 'Belo Horizonte',
    state: 'MG',
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    parking: 3,
    yearBuilt: 2020,
    type: 'Apartamento',
    description: 'Exclusiva cobertura duplex localizada no coração de Savassi, uma das regiões mais nobres de Belo Horizonte.',
    features: [
      'Piscina privativa',
      'Terraço gourmet',
      'Churrasqueira',
      'Acabamento alto padrão',
      'Vista panorâmica'
    ],
    agent: {
      name: 'Carlos Oliveira',
      phone: '+55 (31) 99999-9999',
      email: 'carlos.oliveira@realestatepro.com.br',
      rating: 4.9,
      propertiesSold: 127
    },
    status: 'available',
    featured: true,
    views: 1247,
    favorites: 89
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const shareProperty = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Confira este imóvel: ${property.title} - ${property.location}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Erro ao compartilhar:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado para a área de transferência!')
    }
  }

  return (
    <RootLayout>
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-foreground/60">
              <Link href="/" className="hover:text-foreground">Início</Link>
              <span>/</span>
              <Link href="/properties" className="hover:text-foreground">Imóveis</Link>
              <span>/</span>
              <span className="text-foreground">{property.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card>
                <CardContent className="p-6">
                  <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Building className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
                      <p className="text-foreground/40">Imagem do Imóvel</p>
                    </div>
                  </div>
                  
                  {property.featured && (
                    <div className="mt-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Destaque
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Property Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{property.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-foreground/70 text-lg leading-relaxed">
                    {property.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {property.bedrooms}
                      </div>
                      <div className="text-sm text-foreground/60">Quartos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {property.bathrooms}
                      </div>
                      <div className="text-sm text-foreground/60">Banheiros</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {property.area}m²
                      </div>
                      <div className="text-sm text-foreground/60">Área</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {property.parking}
                      </div>
                      <div className="text-sm text-foreground/60">Vagas</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Tipo:</span>
                        <span className="font-medium">{property.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Ano de Construção:</span>
                        <span className="font-medium">{property.yearBuilt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Status:</span>
                        <Badge variant="outline">
                          {property.status === 'available' ? 'Disponível' : 'Vendido'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Visualizações:</span>
                        <span className="font-medium">{property.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Favoritos:</span>
                        <span className="font-medium">{property.favorites}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Características
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Localização
                    </h3>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">{property.address}</p>
                        <p className="text-foreground/60">
                          {property.city}, {property.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {formatPrice(property.price)}
                    </div>
                    <p className="text-foreground/60">Preço à vista</p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Falar com Corretor
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                      {isFavorite ? 'Favorito' : 'Adicionar aos Favoritos'}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={shareProperty}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Agent Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Corretor Responsável</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-foreground/40 text-sm">CO</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{property.agent.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-foreground/60">{property.agent.rating}</span>
                        <span className="text-sm text-foreground/40">({property.agent.propertiesSold} vendas)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-foreground/60" />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-foreground/60" />
                      <span>{property.agent.email}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Ver Perfil Completo
                  </Button>
                </CardContent>
              </Card>

              {/* Similar Properties */}
              <Card>
                <CardHeader>
                  <CardTitle>Imóveis Similares</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/60 mb-4">
                    Imóveis similares nesta região
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/properties">Ver Todos os Imóveis</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 