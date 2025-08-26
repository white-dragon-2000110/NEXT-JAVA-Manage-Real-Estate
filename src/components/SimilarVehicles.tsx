'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Calendar, Gauge, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'

interface SimilarVehicle {
  id: string
  title: string
  price: number
  location: string
  year: number
  mileage: number
  fuel: string
  transmission: string
  color: string
  rating: number
  isFeatured: boolean
  type: 'car' | 'truck' | 'motorcycle'
  image: string
}

interface SimilarVehiclesProps {
  currentVehicleId: string
}

// Mock data for similar vehicles
const mockSimilarVehicles: SimilarVehicle[] = [
  {
    id: '2',
    title: '2021 Toyota Corolla XEi',
    price: 78000,
    location: 'Rio de Janeiro, RJ',
    year: 2021,
    mileage: 35000,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Preto',
    rating: 4.7,
    isFeatured: false,
    type: 'car',
    image: '/api/placeholder/400/300'
  },
  {
    id: '3',
    title: '2022 Toyota Corolla Altis',
    price: 92000,
    location: 'Belo Horizonte, MG',
    year: 2022,
    mileage: 18000,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Branco',
    rating: 4.9,
    isFeatured: true,
    type: 'car',
    image: '/api/placeholder/400/300'
  },
  {
    id: '4',
    title: '2020 Toyota Corolla XEi',
    price: 72000,
    location: 'Brasília, DF',
    year: 2020,
    mileage: 42000,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Prata',
    rating: 4.6,
    isFeatured: false,
    type: 'car',
    image: '/api/placeholder/400/300'
  },
  {
    id: '5',
    title: '2023 Toyota Corolla Cross',
    price: 150000,
    location: 'Curitiba, PR',
    year: 2023,
    mileage: 8000,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Azul',
    rating: 4.8,
    isFeatured: true,
    type: 'car',
    image: '/api/placeholder/400/300'
  }
]

export function SimilarVehicles({ currentVehicleId }: SimilarVehiclesProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage)
  }

  const toggleFavorite = (vehicleId: string) => {
    setFavorites(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    )
  }

  const handleShare = (vehicle: SimilarVehicle) => {
    if (navigator.share) {
      navigator.share({
        title: vehicle.title,
        text: `Confira este veículo: ${vehicle.title}`,
        url: `/vehicle/${vehicle.id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/vehicle/${vehicle.id}`)
    }
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Veículos Similares
        </h2>
        <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
          Descubra outras opções similares que podem interessar você
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockSimilarVehicles
          .filter(vehicle => vehicle.id !== currentVehicleId)
          .map((vehicle) => (
          <Card key={vehicle.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-foreground/40 text-sm">Imagem do Veículo</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(vehicle.id)}
                    className="cursor-pointer"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(vehicle.id) ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(vehicle)}
                    className="cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {vehicle.isFeatured && (
                    <Badge className="bg-primary text-primary-foreground">
                      Destaque
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    {vehicle.type === 'car' ? 'CARRO' : vehicle.type === 'truck' ? 'CAMINHÃO' : 'MOTO'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-lg line-clamp-2">
                  {vehicle.title}
                </h3>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm text-foreground/70">{vehicle.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-foreground/70">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="truncate">{vehicle.location}</span>
                </div>
                <div className="flex items-center">
                  <Gauge className="h-4 w-4 mr-2" />
                  <span>{formatMileage(vehicle.mileage)} km</span>
                </div>
                <div className="text-foreground/60">
                  {vehicle.fuel} • {vehicle.transmission}
                </div>
                <div className="text-foreground/60">
                  Cor: {vehicle.color}
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="w-full">
                <div className="text-2xl font-bold text-primary mb-3">
                  {formatPrice(vehicle.price)}
                </div>
                                 <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors cursor-pointer" 
                  onClick={() => window.location.href = `/vehicle/${vehicle.id}`}
                >
                  Ver Detalhes
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Ver Mais Veículos Similares
        </Button>
      </div>
    </div>
  )
} 