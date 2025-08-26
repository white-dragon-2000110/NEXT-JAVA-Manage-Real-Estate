'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2, Trash2, MapPin, Bed, Bath, Square, Car, Star, Eye, Home } from 'lucide-react'

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
  rating?: number
}

interface PropertyCardProps {
  property: Property
  onDelete: (property: Property) => void
  pressedButtonId: string | null
  setPressedButtonId: (id: string | null) => void
}

export function PropertyCard({ property, onDelete, pressedButtonId, setPressedButtonId }: PropertyCardProps) {
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
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
      <div className="relative h-64 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div className="text-foreground/60 text-sm">Imagem do Imóvel</div>
          </div>
        </div>

        {property.featured && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Destaque
          </Badge>
        )}

        <Badge variant="secondary" className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-foreground">
          {property.type}
        </Badge>

        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 transition-all duration-300 ${
              isFavorite ? 'fill-current text-red-500 scale-110' : 'text-foreground/70'
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
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center text-foreground/60 text-sm">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="text-2xl font-bold text-primary mb-4 group-hover:scale-105 transition-transform duration-300">
          {formatPrice(property.price)}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center text-sm text-foreground/70">
            <Bed className="h-4 w-4 mr-2 text-primary" />
            {property.bedrooms} quartos
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <Bath className="h-4 w-4 mr-2 text-primary" />
            {property.bathrooms} banheiros
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <Square className="h-4 w-4 mr-2 text-primary" />
            {property.area}m²
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <Car className="h-4 w-4 mr-2 text-primary" />
            {property.parking} vagas
          </div>
        </div>

        <Button 
          className="w-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          data-button="ver-detalhes-card"
          style={{
            backgroundColor: '#1A53E0',
            borderColor: '#1A53E0',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            if (pressedButtonId !== 'ver-detalhes-card') {
              e.currentTarget.style.backgroundColor = '#0f3bb8';
              e.currentTarget.style.borderColor = '#0f3bb8';
            }
          }}
          onMouseLeave={(e) => {
            if (pressedButtonId !== 'ver-detalhes-card') {
              e.currentTarget.style.backgroundColor = '#1A53E0';
              e.currentTarget.style.borderColor = '#1A53E0';
            }
          }}
          onMouseDown={(e) => {
            setPressedButtonId('ver-detalhes-card');
            e.currentTarget.style.backgroundColor = '#0a2a8a';
            e.currentTarget.style.borderColor = '#0a2a8a';
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            if (pressedButtonId === 'ver-detalhes-card') {
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
      </CardContent>
    </Card>
  )
} 