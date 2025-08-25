'use client'

import { useState, useEffect } from 'react'
import { RootLayout } from '@/layouts/RootLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star, Zap, Crown } from 'lucide-react'

interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  billing: string
  features: string[]
  popular?: boolean
  icon: any
  color: string
  buttonText: string
  buttonVariant: 'default' | 'secondary' | 'outline'
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    description: 'Sempre grátis',
    price: 0,
    currency: 'BRL',
    billing: 'Sempre grátis',
    features: [
      'Criar anúncios básicos',
      'Até 3 anúncios ativos',
      'Fotos padrão (máx. 5)',
      'Suporte por email',
      'Acesso à plataforma básica'
    ],
    icon: Check,
    color: 'text-gray-600',
    buttonText: 'Começar Grátis',
    buttonVariant: 'outline'
  },
  {
    id: 'premium',
    name: 'Avançado',
    description: 'por mês',
    price: 49.90,
    currency: 'BRL',
    billing: 'por mês',
    features: [
      'Tudo do plano Gratuito',
      'Anúncios em Destaque',
      'Métricas avançadas',
      'Até 10 anúncios ativos',
      'Fotos de alta qualidade (máx. 15)',
      'Suporte prioritário',
      'Relatórios de visualizações',
      'Chat com compradores'
    ],
    popular: true,
    icon: Star,
    color: 'text-yellow-600',
    buttonText: 'Assinar Avançado',
    buttonVariant: 'default'
  },
  {
    id: 'pro',
    name: 'Empresarial',
    description: 'por mês',
    price: 99.90,
    currency: 'BRL',
    billing: 'por mês',
    features: [
      'Tudo do plano Avançado',
      'Leads qualificados e pontuados',
      'IA avançada para otimização',
      'Anúncios ilimitados',
      'Fotos ilimitadas',
      'Suporte VIP 24/7',
      'Relatórios personalizados',
      'Integração CRM',
      'Análise de mercado',
      'Consultoria especializada'
    ],
    icon: Crown,
    color: 'text-purple-600',
    buttonText: 'Assinar Empresarial',
    buttonVariant: 'outline'
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const getDiscountedPrice = (price: number) => {
    if (billingCycle === 'yearly') {
      return price * 0.8 // 20% discount for yearly
    }
    return price
  }

  const handleSubscribe = (planId: string) => {
    console.log(`Subscribing to ${planId} plan`)
    // Implement subscription logic
  }

  return (
    <RootLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header */}
        <div className="text-center py-16 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Encontre o plano perfeito para impulsionar suas vendas imobiliárias. 
            Comece grátis e cresça conforme seu negócio se expande.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground' : 'text-foreground/60'}`}>
              Mensal
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-foreground' : 'text-foreground/60'}`}>
              Anual
              {billingCycle === 'yearly' && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  -20%
                </Badge>
              )}
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {pricingPlans.map((plan) => {
              const Icon = plan.icon
              const discountedPrice = getDiscountedPrice(plan.price)
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative transition-all duration-300 hover:scale-105 flex flex-col ${
                    plan.popular 
                      ? 'ring-2 ring-primary shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full bg-muted ${plan.color.replace('text-', 'text-')}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {plan.name}
                    </CardTitle>
                    <p className="text-foreground/60 mt-2">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    {/* Pricing */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-foreground">
                          {plan.price === 0 ? 'Grátis' : `R$ ${discountedPrice.toFixed(2)}`}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-foreground/60 ml-2">
                            /{billingCycle === 'monthly' ? 'mês' : 'mês'}
                          </span>
                        )}
                      </div>
                      {plan.price === 0 && (
                        <p className="text-foreground/60 text-sm mt-1">
                          Sempre grátis
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button - Positioned at bottom */}
                    <div className="mt-auto pt-4">
                      <Button 
                        variant={plan.buttonVariant}
                        className="w-full h-14 text-base font-semibold"
                        onClick={() => handleSubscribe(plan.id)}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-foreground/70">
              Tudo o que você precisa saber sobre nossos planos de preços
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso alterar meu plano a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entrarão em vigor no início do seu próximo ciclo de cobrança.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quais métodos de pagamento vocês aceitam?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Aceitamos todos os principais cartões de crédito, cartões de débito e transferências bancárias. Todos os pagamentos são processados com segurança através de nossos parceiros de pagamento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Existe um período de teste gratuito para planos pagos?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Sim, oferecemos um teste gratuito de 14 dias para todos os planos pagos. Você pode cancelar a qualquer momento durante o período de teste sem cobranças.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais imobiliários que confiam em nossa plataforma para crescer seus negócios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/auth/register">Iniciar Teste Gratuito</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Falar com Vendas</a>
            </Button>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 