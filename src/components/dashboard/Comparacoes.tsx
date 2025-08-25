'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  Search, 
  Plus, 
  Trash2, 
  Eye, 
  Share2, 
  MapPin, 
  Calendar, 
  Building,
  Home,
  Star,
  Bed,
  Bath,
  Heart
} from 'lucide-react'

interface ComparisonProperty {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  type: 'apartment' | 'house' | 'commercial' | 'land'
  image: string
  rating: number
  features: string[]
  seller: string
  yearBuilt?: number
  parking: number
}

const mockComparisonProperties: ComparisonProperty[] = [
  {
    id: '1',
    title: 'Apartamento 3 quartos - Jardins',
    price: 850000,
    location: 'São Paulo, SP',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: 'apartment',
    image: '/api/placeholder/200/150',
    rating: 4.8,
    features: ['Ar Condicionado', 'Elevador', 'Portaria 24h', 'Academia'],
    seller: 'Imobiliária Jardins',
    yearBuilt: 2020,
    parking: 1
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
    image: '/api/placeholder/200/150',
    rating: 4.6,
    features: ['Piscina', 'Churrasqueira', 'Jardim', 'Garagem para 2 carros'],
    seller: 'Imobiliária Barra',
    yearBuilt: 2018,
    parking: 2
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
    image: '/api/placeholder/200/150',
    rating: 4.9,
    features: ['Localização privilegiada', 'Acesso fácil', 'Segurança 24h'],
    seller: 'Imobiliária Centro',
    parking: 0
  }
]

export function Comparacoes() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProperties, setSelectedProperties] = useState<ComparisonProperty[]>(mockComparisonProperties)

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

  const removeFromComparison = (id: string) => {
    setSelectedProperties(prev => prev.filter(property => property.id !== id))
  }

  const addToComparison = () => {
    // Implement add to comparison logic
    console.log('Add to comparison')
  }

  const shareComparison = () => {
    // Implement share logic
    console.log('Share comparison')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comparação de Imóveis</h1>
          <p className="text-foreground/60">Compare diferentes imóveis para tomar a melhor decisão</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addToComparison}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
          <Button onClick={shareComparison}>
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Imóveis para Comparar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Buscar imóveis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedProperties.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Comparação ({selectedProperties.length} imóveis)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Características</th>
                    {selectedProperties.map((property) => (
                      <th key={property.id} className="text-center p-3 font-medium min-w-[200px]">
                        <div className="flex flex-col items-center space-y-2">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-20 h-16 object-cover rounded"
                          />
                          <div className="text-center">
                            <p className="font-medium text-sm line-clamp-2">{property.title}</p>
                            <Badge variant="secondary" className="mt-1">
                              {getTypeLabel(property.type)}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromComparison(property.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Preço</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <p className="text-lg font-bold text-primary">{formatPrice(property.price)}</p>
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Localização</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex items-center justify-center gap-1">
                          <MapPin className="h-4 w-4 text-foreground/40" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Area */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Área</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Building className="h-4 w-4 text-foreground/40" />
                          <span>{property.area}m²</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Bedrooms */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Quartos</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        {property.bedrooms > 0 ? (
                          <div className="flex items-center justify-center gap-1">
                            <Bed className="h-4 w-4 text-foreground/40" />
                            <span>{property.bedrooms}</span>
                          </div>
                        ) : (
                          <span className="text-foreground/40">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Bathrooms */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Banheiros</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        {property.bathrooms > 0 ? (
                          <div className="flex items-center justify-center gap-1">
                            <Bath className="h-4 w-4 text-foreground/40" />
                            <span>{property.bathrooms}</span>
                          </div>
                        ) : (
                          <span className="text-foreground/40">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Parking */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Vagas</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <span>{property.parking}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Year Built */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Ano de Construção</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        {property.yearBuilt ? (
                          <div className="flex items-center justify-center gap-1">
                            <Calendar className="h-4 w-4 text-foreground/40" />
                            <span>{property.yearBuilt}</span>
                          </div>
                        ) : (
                          <span className="text-foreground/40">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Avaliação</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{property.rating}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Features */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Características</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="space-y-1">
                          {property.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {property.features.length > 3 && (
                            <p className="text-xs text-foreground/60">
                              +{property.features.length - 3} mais
                            </p>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Seller */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Imobiliária</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <span className="text-sm">{property.seller}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-3 font-medium">Ações</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="h-4 w-4 mr-2" />
                            Favorito
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {selectedProperties.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma comparação</h3>
            <p className="text-foreground/60 mb-4">
              Adicione imóveis para começar a comparar características e preços
            </p>
            <Button onClick={addToComparison}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Imóveis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 