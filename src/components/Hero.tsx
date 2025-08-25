'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Car, Truck, Bike } from 'lucide-react'
import { useState } from 'react'
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

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    window.location.href = `/search?${params.toString()}`
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-muted/30 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Find the Property of Your Dreams
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto mb-8">
            The most complete platform to buy, sell and rent properties. 
            Thousands of properties across Brazil with intelligent search and advanced AI.
          </p>
        </div>

        {/* Advanced Search Bar */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 shadow-2xl border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="tipo">Property Type</Label>
                <Select value={searchParams.tipo} onValueChange={(value) => setSearchParams(prev => ({ ...prev, tipo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">House</SelectItem>
                    <SelectItem value="apartamento">Apartment</SelectItem>
                    <SelectItem value="terreno">Land</SelectItem>
                    <SelectItem value="comercial">Commercial</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="localizacao">Location</Label>
                <Input
                  id="localizacao"
                  placeholder="City, neighborhood or address"
                  value={searchParams.localizacao}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, localizacao: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="precoMin">Minimum Price</Label>
                <Input
                  id="precoMin"
                  placeholder="R$ 0"
                  value={searchParams.precoMin}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, precoMin: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="precoMax">Maximum Price</Label>
                <Input
                  id="precoMax"
                  placeholder="R$ 0"
                  value={searchParams.precoMax}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, precoMax: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="quartos">Bedrooms</Label>
                <Select value={searchParams.quartos} onValueChange={(value) => setSearchParams(prev => ({ ...prev, quartos: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+ bedroom</SelectItem>
                    <SelectItem value="2">2+ bedrooms</SelectItem>
                    <SelectItem value="3">3+ bedrooms</SelectItem>
                    <SelectItem value="4">4+ bedrooms</SelectItem>
                    <SelectItem value="5">5+ bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area">Area (m²)</Label>
                <Input
                  id="area"
                  placeholder="Minimum area"
                  value={searchParams.area}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, area: e.target.value }))}
                />
              </div>
            </div>

            <Button 
              onClick={handleSearch} 
              className="w-full h-12 text-lg font-semibold"
              size="lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-foreground/70">Properties Available</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25,000+</div>
            <div className="text-foreground/70">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-foreground/70">Partner Agents</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-foreground/70">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
} 