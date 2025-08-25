'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ShoppingCart, 
  UserPlus, 
  Shield, 
  Search, 
  Star, 
  CreditCard,
  Settings,
  BarChart3,
  Users,
  CheckCircle
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export function PlatformBenefits() {
  const userTypes = [
    {
      type: 'COMPRADOR',
      title: 'Para Compradores',
      description: 'Encontre o imóvel perfeito com segurança e transparência',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      features: [
        'Busca avançada com filtros personalizados',
        'Histórico completo dos imóveis',
        'Avaliações e comentários verificados',
        'Financiamento facilitado',
        'Suporte especializado'
      ],
      cta: 'Começar a Buscar',
      ctaVariant: 'default' as const
    },
    {
      type: 'VENDEDOR',
      title: 'Para Vendedores',
      description: 'Venda seu imóvel de forma rápida e segura',
      icon: UserPlus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      features: [
        'Anúncios destacados e personalizados',
        'Dashboard completo de vendas',
        'Ferramentas de marketing avançadas',
        'Suporte prioritário',
        'Comissões competitivas'
      ],
      cta: 'Anunciar Imóvel',
      ctaVariant: 'outline' as const
    },
    {
      type: 'CORRETOR',
      title: 'Para Corretores',
      description: 'Gerencie seus clientes e imóveis com ferramentas poderosas',
      icon: Settings,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      features: [
        'Painel de controle completo',
        'Gestão de clientes e leads',
        'Relatórios e analytics',
        'Ferramentas de prospecção',
        'Suporte técnico 24/7'
      ],
      cta: 'Acessar Painel',
      ctaVariant: 'outline' as const
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Benefícios da Plataforma
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Nossa plataforma oferece soluções completas para todos os tipos de usuários, 
            garantindo uma experiência excepcional em cada interação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {userTypes.map((userType) => (
            <Card key={userType.type} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
              <CardHeader className="text-center pb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${userType.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <userType.icon className={`h-8 w-8 ${userType.color}`} />
                </div>
                <Badge variant="secondary" className="mb-3">
                  {userType.type}
                </Badge>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {userType.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed truncate whitespace-nowrap overflow-hidden">
                  {userType.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0 flex-1 flex flex-col">
                <ul className="space-y-3 mb-6">
                  {userType.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <Button 
                    variant={userType.ctaVariant} 
                    className="w-full"
                    asChild
                  >
                    <Link href={userType.type === 'COMPRADOR' ? '/properties' : userType.type === 'VENDEDOR' ? '/sell' : '/dashboard/corretor'}>
                      {userType.cta}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Por que escolher nossa plataforma?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Segurança Garantida
              </h4>
              <p className="text-foreground/70 text-sm">
                Todas as transações são protegidas com criptografia de ponta e verificação de identidade.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Busca Inteligente
              </h4>
              <p className="text-foreground/70 text-sm">
                IA avançada para encontrar exatamente o que você procura com filtros personalizados.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Experiência Premium
              </h4>
              <p className="text-foreground/70 text-sm">
                Interface intuitiva e suporte especializado para uma experiência excepcional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 