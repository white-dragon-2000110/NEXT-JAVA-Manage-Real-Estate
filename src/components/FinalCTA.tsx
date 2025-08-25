'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Car, ArrowRight, Users, Star } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para Encontrar seu Imóvel dos Sonhos?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
          Junte-se a milhares de pessoas que já encontraram o imóvel perfeito 
          através da nossa plataforma. Comece sua busca hoje mesmo!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" variant="secondary" className="h-12 px-8">
            Buscar Imóveis
          </Button>
          <Button size="lg" variant="secondary" className="h-12 px-8">
            Anunciar Imóvel
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">58,000+</div>
            <div className="text-primary-foreground/80">Imóveis Disponíveis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">25,000+</div>
            <div className="text-primary-foreground/80">Clientes Satisfeitos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">1,200+</div>
            <div className="text-primary-foreground/80">Corretores Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
            <div className="text-primary-foreground/80">Taxa de Sucesso</div>
          </div>
        </div>
      </div>
    </section>
  )
} 