'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Home, Building, Map, Briefcase, TreePine } from 'lucide-react'

interface PropertiesHeroProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  pressedButtonId: string | null
  setPressedButtonId: (id: string | null) => void
}

export function PropertiesHero({ 
  searchTerm, 
  onSearchChange, 
  onSearch, 
  pressedButtonId, 
  setPressedButtonId 
}: PropertiesHeroProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Todos', icon: Home, color: 'from-blue-500 to-purple-600' },
    { id: 'house', label: 'Casas', icon: Home, color: 'from-green-500 to-emerald-600' },
    { id: 'apartment', label: 'Apartamentos', icon: Building, color: 'from-purple-500 to-pink-600' },
    { id: 'land', label: 'Terrenos', icon: Map, color: 'from-orange-500 to-red-600' },
    { id: 'commercial', label: 'Comercial', icon: Briefcase, color: 'from-indigo-500 to-blue-600' },
    { id: 'rural', label: 'Rural', icon: TreePine, color: 'from-emerald-500 to-teal-600' }
  ]

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-200/30 to-red-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient leading-tight">
            Encontre o Imóvel
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              dos Seus Sonhos
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Explore milhares de propriedades em todo o Brasil com as melhores localizações, 
            preços competitivos e uma experiência de busca incomparável.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-purple-500/25`
                    : 'bg-white/80 backdrop-blur-sm text-foreground/70 hover:bg-white hover:text-foreground hover:shadow-lg'
                }`}
              >
                <Icon className={`inline-block w-5 h-5 mr-2 transition-transform duration-300 ${
                  selectedCategory === category.id ? 'scale-110' : 'group-hover:scale-110'
                }`} />
                {category.label}
              </button>
            )
          })}
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="h-6 w-6 text-foreground/40" />
                </div>
                <Input
                  placeholder="Buscar por localização, tipo, características ou preço..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="h-16 text-lg pl-12 pr-4 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <Button 
                size="lg" 
                className="h-16 px-12 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                data-button="buscar-imoveis-hero"
                style={{
                  backgroundColor: '#1A53E0',
                  borderColor: '#1A53E0',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  if (pressedButtonId !== 'buscar-imoveis-hero') {
                    e.currentTarget.style.backgroundColor = '#0f3bb8';
                    e.currentTarget.style.borderColor = '#0f3bb8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pressedButtonId !== 'buscar-imoveis-hero') {
                    e.currentTarget.style.backgroundColor = '#1A53E0';
                    e.currentTarget.style.borderColor = '#1A53E0';
                  }
                }}
                onMouseDown={(e) => {
                  setPressedButtonId('buscar-imoveis-hero');
                  e.currentTarget.style.backgroundColor = '#0a2a8a';
                  e.currentTarget.style.borderColor = '#0a2a8a';
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  if (pressedButtonId === 'buscar-imoveis-hero') {
                    setPressedButtonId(null);
                    e.currentTarget.style.backgroundColor = '#0f3bb8';
                    e.currentTarget.style.borderColor = '#0f3bb8';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
                onClick={onSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar Imóveis
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="group">
                  <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    50,000+
                  </div>
                  <div className="text-foreground/60">Imóveis Disponíveis</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    150+
                  </div>
                  <div className="text-foreground/60">Cidades Cobertas</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    98%
                  </div>
                  <div className="text-foreground/60">Clientes Satisfeitos</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 