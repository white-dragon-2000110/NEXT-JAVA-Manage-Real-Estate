'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { X, Filter, RotateCcw } from 'lucide-react'
import { useState } from 'react'

interface Filters {
  marca: string
  modelo: string
  ano: string
  precoMin: string
  precoMax: string
  quilometragem: string
  combustivel: string
  transmissao: string
  cor: string
  localizacao: string
}

interface SearchFiltersProps {
  filters: Filters
  onFilterChange: (filterName: string, value: string) => void
}

export function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const propertyTypes = [
    { value: 'casa', label: 'Casa' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'rural', label: 'Rural' }
  ]

  const bedroomOptions = [
    { value: '1', label: '1+ quarto' },
    { value: '2', label: '2+ quartos' },
    { value: '3', label: '3+ quartos' },
    { value: '4', label: '4+ quartos' },
    { value: '5', label: '5+ quartos' }
  ]

  const areaOptions = [
    { value: '50', label: '50m²+' },
    { value: '100', label: '100m²+' },
    { value: '150', label: '150m²+' },
    { value: '200', label: '200m²+' },
    { value: '300', label: '300m²+' }
  ]

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Filtros</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Type */}
        <div>
          <Label className="text-sm font-medium">Tipo de Imóvel</Label>
          <div className="mt-2 space-y-2">
            {propertyTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={type.value}
                  name="tipo"
                  value={type.value}
                  checked={filters.tipo === type.value}
                  onChange={(e) => onFilterChange('tipo', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <Label htmlFor={type.value} className="text-sm text-foreground/70">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="localizacao">Localização</Label>
          <Input
            id="localizacao"
            placeholder="Cidade, bairro ou endereço"
            value={filters.localizacao}
            onChange={(e) => onFilterChange('localizacao', e.target.value)}
            className="mt-2"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Faixa de Preço</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Mínimo"
              value={filters.precoMin}
              onChange={(e) => onFilterChange('precoMin', e.target.value)}
            />
            <Input
              placeholder="Máximo"
              value={filters.precoMax}
              onChange={(e) => onFilterChange('precoMax', e.target.value)}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <Label className="text-sm font-medium">Quartos</Label>
          <div className="mt-2 space-y-2">
            {bedroomOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`quartos-${option.value}`}
                  name="quartos"
                  value={option.value}
                  checked={filters.quartos === option.value}
                  onChange={(e) => onFilterChange('quartos', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <Label htmlFor={`quartos-${option.value}`} className="text-sm text-foreground/70">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Area */}
        <div>
          <Label className="text-sm font-medium">Área Mínima</Label>
          <div className="mt-2 space-y-2">
            {areaOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`area-${option.value}`}
                  name="area"
                  value={option.value}
                  checked={filters.area === option.value}
                  onChange={(e) => onFilterChange('area', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <Label htmlFor={`area-${option.value}`} className="text-sm text-foreground/70">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={() => {
            onFilterChange('tipo', '')
            onFilterChange('localizacao', '')
            onFilterChange('precoMin', '')
            onFilterChange('precoMax', '')
            onFilterChange('quartos', '')
            onFilterChange('area', '')
          }}
          className="w-full"
        >
          Limpar Filtros
        </Button>
      </CardContent>
    </Card>
  )
} 