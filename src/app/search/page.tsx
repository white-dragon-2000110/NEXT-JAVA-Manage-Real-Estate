'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { useState, useEffect } from 'react'
import { SearchFilters } from '@/components/SearchFilters'
import { SearchResults } from '@/components/SearchResults'
import { SearchHeader } from '@/components/SearchHeader'
import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    tipo: searchParams.get('tipo') || '',
    localizacao: searchParams.get('localizacao') || '',
    precoMin: searchParams.get('precoMin') || '',
    precoMax: searchParams.get('precoMax') || '',
    quartos: searchParams.get('quartos') || '',
    area: searchParams.get('area') || ''
  })
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <RootLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchHeader
            resultCount={24}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <SearchFilters 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
            </div>
            
            {/* Results */}
            <div className="lg:col-span-3">
              <SearchResults />
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 