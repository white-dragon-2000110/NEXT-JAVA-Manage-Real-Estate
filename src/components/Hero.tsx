'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Car, Truck, Bike } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function Hero() {
  const [searchParams, setSearchParams] = useState({
    tipo: '',
    localizacao: '',
    precoMin: '',
    precoMax: '',
    quartos: '',
    area: ''
  })
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
            window.location.href = `/properties?${params.toString()}`
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isButtonPressed) {
        setIsButtonPressed(false);
        const button = document.querySelector('[data-button="search"]') as HTMLElement;
        if (button) {
          button.style.backgroundColor = '#1A53E0';
          button.style.borderColor = '#1A53E0';
          button.style.transform = 'scale(1)';
        }
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isButtonPressed]);

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-muted/30 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto mb-8">
            A plataforma mais completa para comprar, vender e alugar imóveis.
            Milhares de imóveis em todo o Brasil com busca inteligente e IA avançada.
          </p>
        </div>

        {/* Advanced Search Bar */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 shadow-2xl border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="tipo">Tipo de Imóvel</Label>
                <Select value={searchParams.tipo} onValueChange={(value) => setSearchParams(prev => ({ ...prev, tipo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="localizacao">Localização</Label>
                <Input
                  id="localizacao"
                  placeholder="Cidade, bairro ou endereço"
                  value={searchParams.localizacao}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, localizacao: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="precoMin">Preço Mínimo</Label>
                <Input
                  id="precoMin"
                  placeholder="R$ 0"
                  value={searchParams.precoMin}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, precoMin: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="precoMax">Preço Máximo</Label>
                <Input
                  id="precoMax"
                  placeholder="R$ 0"
                  value={searchParams.precoMax}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, precoMax: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="quartos">Quartos</Label>
                <Select value={searchParams.quartos} onValueChange={(value) => setSearchParams(prev => ({ ...prev, quartos: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+ quarto</SelectItem>
                    <SelectItem value="2">2+ quartos</SelectItem>
                    <SelectItem value="3">3+ quartos</SelectItem>
                    <SelectItem value="4">4+ quartos</SelectItem>
                    <SelectItem value="5">5+ quartos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area">Área (m²)</Label>
                <Input
                  id="area"
                  placeholder="Área mínima"
                  value={searchParams.area}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, area: e.target.value }))}
                />
              </div>
            </div>

                        <Button 
              onClick={handleSearch} 
              className="w-full h-12 text-lg font-semibold"
              size="lg"
              data-button="search"
              style={{
                backgroundColor: '#1A53E0',
                borderColor: '#1A53E0',
                color:'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (!isButtonPressed) {
                  e.currentTarget.style.backgroundColor = '#0f3bb8';
                  e.currentTarget.style.borderColor = '#0f3bb8';
                }
              }}
              onMouseLeave={(e) => {
                if (!isButtonPressed) {
                  e.currentTarget.style.backgroundColor = '#1A53E0';
                  e.currentTarget.style.borderColor = '#1A53E0';
                }
              }}
              onMouseDown={(e) => {
                setIsButtonPressed(true);
                e.currentTarget.style.backgroundColor = '#0a2a8a';
                e.currentTarget.style.borderColor = '#0a2a8a';
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                if (isButtonPressed) {
                  setIsButtonPressed(false);
                  e.currentTarget.style.backgroundColor = '#0f3bb8';
                  e.currentTarget.style.borderColor = '#0f3bb8';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <Search className="h-5 w-5 mr-2" />
              Buscar Imóveis
            </Button>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-foreground/70">Imóveis Disponíveis</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25,000+</div>
            <div className="text-foreground/70">Clientes Satisfeitos</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-foreground/70">Agentes Parceiros</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-foreground/70">Taxa de Satisfação</div>
          </div>
        </div>
      </div>
    </section>
  )
} 