'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Bed, Bath, Square, Car, Heart, Share2, Eye } from 'lucide-react'
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
    type: 'Apartamento',
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
    type: 'Apartamento',
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
    type: 'Casa',
    image: '/api/placeholder/400/300'
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
    image: '/api/placeholder/400/300'
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
    image: '/api/placeholder/400/300'
  }
]

export function SearchResults() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [comparisonList, setComparisonList] = useState<string[]>([])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const toggleComparison = (propertyId: string) => {
    if (comparisonList.includes(propertyId)) {
      setComparisonList(prev => prev.filter(id => id !== propertyId))
    } else if (comparisonList.length < 3) {
      setComparisonList(prev => [...prev, propertyId])
    }
  }

  const shareProperty = async (property: Property) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `${property.title} - ${formatPrice(property.price)}`,
          url: `/property/${property.id}`
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {property.type}
              </Badge>
              
              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0"
                  onClick={() => toggleFavorite(property.id)}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? 'fill-current text-red-500' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0"
                  onClick={() => toggleComparison(property.id)}
                >
                  <Eye className={`h-4 w-4 ${comparisonList.includes(property.id) ? 'text-primary' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0"
                  onClick={() => shareProperty(property)}
                >
                  <Share2 className="h-4 w-4" />
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
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
} 