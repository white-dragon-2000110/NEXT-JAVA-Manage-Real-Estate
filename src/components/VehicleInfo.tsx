'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Calendar, Fuel, Gauge, Car, Shield } from 'lucide-react'

interface Vehicle {
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
}

interface VehicleInfoProps {
  vehicle: Vehicle
}

export function VehicleInfo({ vehicle }: VehicleInfoProps) {
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

  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
      case 'car':
        return 'CARRO'
      case 'truck':
        return 'CAMINHÃO'
      case 'motorcycle':
        return 'MOTO'
      default:
        return type.toUpperCase()
    }
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-foreground mb-2">
              {vehicle.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span className="text-sm text-foreground/70">{vehicle.rating}</span>
              </div>
              <span className="text-foreground/40">•</span>
              <span className="text-sm text-foreground/70">{vehicle.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {vehicle.isFeatured && (
              <Badge className="bg-primary text-primary-foreground">
                Destaque
              </Badge>
            )}
            <Badge variant="secondary">
              {getVehicleTypeLabel(vehicle.type)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">
            {formatPrice(vehicle.price)}
          </div>
          <div className="text-sm text-foreground/60">
            Preço à vista
          </div>
        </div>

        {/* Key Specifications */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Ano</div>
              <div className="font-semibold">{vehicle.year}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Gauge className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Quilometragem</div>
              <div className="font-semibold">{formatMileage(vehicle.mileage)} km</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Fuel className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Combustível</div>
              <div className="font-semibold">{vehicle.fuel}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Transmissão</div>
              <div className="font-semibold">{vehicle.transmission}</div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-foreground/70">Cor</span>
            <span className="font-medium">{vehicle.color}</span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-foreground/70">Localização</span>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-foreground/60" />
              <span className="font-medium">{vehicle.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-foreground/70">Tipo</span>
            <span className="font-medium">{getVehicleTypeLabel(vehicle.type)}</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span>Verificado</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>IPVA em dia</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 