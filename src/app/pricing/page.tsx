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
  const [pressedButtonId, setPressedButtonId] = useState<string | null>(null)
  const [faqVisible, setFaqVisible] = useState({
    card1: false,
    card2: false,
    card3: false
  })

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

  // Global mouse up event handler for button release
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (pressedButtonId) {
        setPressedButtonId(null)
        // Reset button styles
        const button = document.querySelector(`[data-button="${pressedButtonId}"]`) as HTMLElement
        if (button) {
          button.style.backgroundColor = '#1A53E0'
          button.style.borderColor = '#1A53E0'
          button.style.transform = 'scale(1)'
        }
      }
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [pressedButtonId])

  // Intersection Observer for FAQ cards
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = entry.target.getAttribute('data-faq-card')
          if (cardId) {
            console.log('Card visible:', cardId) // Debug log
            setFaqVisible(prev => ({ ...prev, [cardId]: true }))
          }
        }
      })
    }, {
      threshold: 0.1, // Lower threshold - trigger when 10% is visible
      rootMargin: '0px 0px -100px 0px' // Larger margin to trigger earlier
    })

    // Wait for DOM to be ready, then observe
    const timer = setTimeout(() => {
      const faqCards = document.querySelectorAll('[data-faq-card]')
      console.log('Found FAQ cards:', faqCards.length) // Debug log
      faqCards.forEach(card => {
        observer.observe(card)
        console.log('Observing card:', card.getAttribute('data-faq-card')) // Debug log
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

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
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 cursor-pointer ${
                billingCycle === 'yearly' 
                  ? 'bg-gradient-to-r from-purple-400 via-purple-600 to-blue-500 animate-gradient' 
                  : 'bg-blue-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
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
                  className={`relative transition-all duration-300 hover:scale-105 flex flex-col ${plan.popular
                      ? 'ring-0 shadow-2xl'
                      : 'hover:shadow-xl'
                    }`}
                    style={{border: plan.popular ? 'none' : undefined}}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                      <Badge className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-400 via-purple-600 to-blue-500 border-2 border-transparent bg-clip-padding animate-gradient shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {plan.popular && (
                    <div className="absolute inset-0 rounded-xl p-[4px] bg-gradient-to-r from-purple-400 via-purple-600 to-blue-500 animate-gradient">
                      <div className="h-full w-full bg-background rounded-lg">
                        <div className="p-6 h-full">
                          {/* Card Header */}
                          <div className="text-center pb-6">
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
                          </div>

                          {/* Card Content */}
                          <div className="space-y-6 flex-1 flex flex-col">
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
                                className="w-full h-12 text-lg font-semibold"
                                onClick={() => handleSubscribe(plan.id)}
                                data-button={plan.id}
                                style={{
                                  backgroundColor: plan.id === 'premium' ? 'transparent' : '#1A53E0',
                                  borderColor: plan.id === 'premium' ? 'transparent' : '#1A53E0',
                                  color: 'white',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease-in-out',
                                  background: plan.id === 'premium' ? 'linear-gradient(to right, #a855f7, #7c3aed, #3b82f6)' : undefined,
                                  backgroundSize: plan.id === 'premium' ? '150% 150%' : undefined,
                                  animation: plan.id === 'premium' ? 'gradient 3s ease infinite' : undefined
                                }}
                                onMouseEnter={(e) => {
                                  if (pressedButtonId !== plan.id) {
                                    if (plan.id === 'premium') {
                                      e.currentTarget.style.background = 'linear-gradient(to right, #9333ea, #6d28d9, #2563eb)';
                                    } else {
                                      e.currentTarget.style.backgroundColor = '#0f3bb8';
                                      e.currentTarget.style.borderColor = '#0f3bb8';
                                    }
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (pressedButtonId !== plan.id) {
                                    if (plan.id === 'premium') {
                                      e.currentTarget.style.background = 'linear-gradient(to right, #a855f7, #7c3aed, #3b82f6)';
                                    } else {
                                      e.currentTarget.style.backgroundColor = '#1A53E0';
                                      e.currentTarget.style.borderColor = '#1A53E0';
                                    }
                                  }
                                }}
                                onMouseDown={(e) => {
                                  setPressedButtonId(plan.id);
                                  if (plan.id === 'premium') {
                                    e.currentTarget.style.background = 'linear-gradient(to right, #7c3aed, #5b21b6, #1d4ed8)';
                                  } else {
                                    e.currentTarget.style.backgroundColor = '#0a2a8a';
                                    e.currentTarget.style.borderColor = '#0a2a8a';
                                  }
                                  e.currentTarget.style.transform = 'scale(0.98)';
                                }}
                                onMouseUp={(e) => {
                                  if (pressedButtonId === plan.id) {
                                    setPressedButtonId(null);
                                    if (plan.id === 'premium') {
                                      e.currentTarget.style.background = 'linear-gradient(to right, #9333ea, #6d28d9, #2563eb)';
                                    } else {
                                      e.currentTarget.style.backgroundColor = '#0f3bb8';
                                      e.currentTarget.style.borderColor = '#0f3bb8';
                                    }
                                    e.currentTarget.style.transform = 'scale(1)';
                                  }
                                }}
                              >
                                {plan.buttonText}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!plan.popular && (
                    <>
                      {/* Card Header */}
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

                      {/* Card Content */}
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
                            className="w-full h-12 text-lg font-semibold"
                            onClick={() => handleSubscribe(plan.id)}
                            data-button={plan.id}
                            style={{
                              backgroundColor: plan.id === 'premium' ? 'transparent' : '#1A53E0',
                              borderColor: plan.id === 'premium' ? 'transparent' : '#1A53E0',
                              color: 'white',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease-in-out',
                              background: plan.id === 'premium' ? 'linear-gradient(to right, #f43f5e, #ec4899, #f43f5e)' : undefined,
                              backgroundSize: plan.id === 'premium' ? '150% 150%' : undefined,
                              animation: plan.id === 'premium' ? 'gradient 3s ease infinite' : undefined
                            }}
                            onMouseEnter={(e) => {
                              if (pressedButtonId !== plan.id) {
                                if (plan.id === 'premium') {
                                  e.currentTarget.style.background = 'linear-gradient(to right, #e11d48, #db2777, #e11d48)';
                                } else {
                                  e.currentTarget.style.backgroundColor = '#0f3bb8';
                                  e.currentTarget.style.borderColor = '#0f3bb8';
                                }
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (pressedButtonId !== plan.id) {
                                if (plan.id === 'premium') {
                                  e.currentTarget.style.background = 'linear-gradient(to right, #f43f5e, #ec4899, #f43f5e)';
                                } else {
                                  e.currentTarget.style.backgroundColor = '#1A53E0';
                                  e.currentTarget.style.borderColor = '#1A53E0';
                                }
                              }
                            }}
                            onMouseDown={(e) => {
                              setPressedButtonId(plan.id);
                              if (plan.id === 'premium') {
                                e.currentTarget.style.background = 'linear-gradient(to right, #be123c, #be1857, #be123c)';
                              } else {
                                e.currentTarget.style.backgroundColor = '#0a2a8a';
                                e.currentTarget.style.borderColor = '#0a2a8a';
                              }
                              e.currentTarget.style.transform = 'scale(0.98)';
                            }}
                            onMouseUp={(e) => {
                              if (pressedButtonId === plan.id) {
                                setPressedButtonId(null);
                                if (plan.id === 'premium') {
                                  e.currentTarget.style.background = 'linear-gradient(to right, #e11d48, #db2777, #e11d48)';
                                } else {
                                  e.currentTarget.style.backgroundColor = '#0f3bb8';
                                  e.currentTarget.style.borderColor = '#0f3bb8';
                                }
                                e.currentTarget.style.transform = 'scale(1)';
                              }
                            }}
                          >
                            {plan.buttonText}
                          </Button>
                        </div>
                      </CardContent>
                    </>
                  )}
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
            {/* Test button to manually trigger animations */}
            <button 
              onClick={() => setFaqVisible({ card1: true, card2: true, card3: true })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Testar Animações
            </button>
          </div>

          <div className="space-y-6">
            <Card 
              className={faqVisible.card1 ? 'faq-card-visible' : 'faq-card-hidden'}
              data-faq-card="card1"
            >
              <CardHeader>
                <CardTitle className="text-lg">Posso alterar meu plano a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entrarão em vigor no início do seu próximo ciclo de cobrança.
                </p>
              </CardContent>
            </Card>

            <Card 
              className={faqVisible.card2 ? 'faq-card-visible' : 'faq-card-hidden-left'}
              data-faq-card="card2"
            >
              <CardHeader>
                <CardTitle className="text-lg">Quais métodos de pagamento vocês aceitam?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Aceitamos todos os principais cartões de crédito, cartões de débito e transferências bancárias. Todos os pagamentos são processados com segurança através de nossos parceiros de pagamento.
                </p>
              </CardContent>
            </Card>

            <Card 
              className={faqVisible.card3 ? 'faq-card-visible' : 'faq-card-hidden'}
              data-faq-card="card3"
            >
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