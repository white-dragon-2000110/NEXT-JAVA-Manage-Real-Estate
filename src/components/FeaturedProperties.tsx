'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Home, Building, Calendar, Car } from 'lucide-react'
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
  type: 'apartment' | 'house' | 'commercial' | 'land'
  image: string
  featured?: boolean
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
    type: 'house',
    image: '/api/placeholder/400/300',
    featured: true
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
    type: 'apartment',
    image: '/api/placeholder/400/300'
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
    type: 'apartment',
    image: '/api/placeholder/400/300'
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
    type: 'house',
    image: '/api/placeholder/400/300'
  }
]

export function FeaturedProperties() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'apartment': return 'Apartamento'
      case 'house': return 'Casa'
      case 'commercial': return 'Comercial'
      case 'land': return 'Terreno'
      default: return type
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'apartment': return <Building className="h-4 w-4" />
      case 'house': return <Home className="h-4 w-4" />
      case 'commercial': return <Building className="h-4 w-4" />
      case 'land': return <MapPin className="h-4 w-4" />
      default: return <Building className="h-4 w-4" />
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Imóveis em Destaque
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Descubra as melhores oportunidades do mercado imobiliário. 
            Propriedades selecionadas com localização privilegiada e excelente custo-benefício.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg flex flex-col">
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
                  {getTypeLabel(property.type)}
                </Badge>
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
                    <Home className="h-4 w-4 mr-2" />
                    {property.bedrooms} quartos
                  </div>
                  <div className="flex items-center text-sm text-foreground/70">
                    <Calendar className="h-4 w-4 mr-2" />
                    {property.bathrooms} banheiros
                  </div>
                  <div className="flex items-center text-sm text-foreground/70">
                    <Building className="h-4 w-4 mr-2" />
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="h-12 px-8" asChild>
            <Link href="/properties">
              Ver Todos os Imóveis
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 