'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, List, Grid } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchHeaderProps {
  resultCount: number
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  sortBy: string
  onSortByChange: (value: string) => void
}

export function SearchHeader({ 
  resultCount, 
  viewMode, 
  onViewModeChange, 
  sortBy, 
  onSortByChange 
}: SearchHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold  bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
          Resultados da Busca
        </h1>
        <p className="text-foreground/60">
          {resultCount} imóveis encontrados
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* View Mode Toggle */}
        <div className="flex items-center border rounded-lg p-1 bg-muted">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* Sort Options */}
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Mais Relevantes</SelectItem>
            <SelectItem value="price-asc">Menor Preço</SelectItem>
            <SelectItem value="price-desc">Maior Preço</SelectItem>
            <SelectItem value="area-asc">Menor Área</SelectItem>
            <SelectItem value="area-desc">Maior Área</SelectItem>
            <SelectItem value="date-new">Mais Recentes</SelectItem>
            <SelectItem value="date-old">Mais Antigos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 