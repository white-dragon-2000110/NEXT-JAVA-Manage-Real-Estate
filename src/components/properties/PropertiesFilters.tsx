'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, X, Home, Building, Map, Briefcase, TreePine } from 'lucide-react'

interface PropertiesFiltersProps {
  filterType: string
  onFilterChange: (value: string) => void
  onClearFilters: () => void
  pressedButtonId: string | null
  setPressedButtonId: (id: string | null) => void
}

export function PropertiesFilters({ 
  filterType, 
  onFilterChange, 
  onClearFilters, 
  pressedButtonId, 
  setPressedButtonId 
}: PropertiesFiltersProps) {
  const propertyTypes = [
    { value: 'all', label: 'Todos os tipos', icon: Home, color: 'from-blue-500 to-purple-600' },
    { value: 'house', label: 'Casas', icon: Home, color: 'from-green-500 to-emerald-600' },
    { value: 'apartment', label: 'Apartamentos', icon: Building, color: 'from-purple-500 to-pink-600' },
    { value: 'land', label: 'Terrenos', icon: Map, color: 'from-orange-500 to-red-600' },
    { value: 'commercial', label: 'Comercial', icon: Briefcase, color: 'from-indigo-500 to-blue-600' },
    { value: 'rural', label: 'Rural', icon: TreePine, color: 'from-emerald-500 to-teal-600' }
  ]

  return (
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
          <Select value={filterType} onValueChange={onFilterChange}>
            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => {
                const Icon = type.icon
                return (
                  <SelectItem key={type.value} value={type.value} className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                )
              })}
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
          onClick={onClearFilters}
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
  )
} 