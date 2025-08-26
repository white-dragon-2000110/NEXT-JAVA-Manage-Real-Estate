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
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function PlatformBenefits() {
  const router = useRouter();
  const [pressedButtonId, setPressedButtonId] = useState<string | null>(null);

  const handleButtonClick = (type: string) => {
    if (type === 'COMPRADOR') {
      router.push('/properties');
    } else if (type === 'VENDEDOR') {
      router.push('/sell');
    } else if (type === 'CORRETOR') {
      router.push('/dashboard/corretor');
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (pressedButtonId) {
        setPressedButtonId(null);
        const button = document.querySelector(`[data-button="${pressedButtonId}"]`) as HTMLElement;
        if (button) {
          button.style.backgroundColor = '#1A53E0';
          button.style.borderColor = '#1A53E0';
          button.style.transform = 'scale(1)';
        }
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [pressedButtonId]);

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
                    className="w-full font-semibold cursor-pointer"
                    onClick={() => handleButtonClick(userType.type)}
                    data-button={userType.type.toLowerCase()}
                                         style={{ 
                       backgroundColor: '#1A53E0', 
                       borderColor: '#1A53E0',
                       color: 'white',
                       cursor: 'pointer',
                       transition: 'all 0.2s ease-in-out'
                     }}
                    onMouseEnter={(e) => {
                      if (pressedButtonId !== userType.type.toLowerCase()) {
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pressedButtonId !== userType.type.toLowerCase()) {
                        e.currentTarget.style.backgroundColor = '#1A53E0';
                        e.currentTarget.style.borderColor = '#1A53E0';
                      }
                    }}
                    onMouseDown={(e) => {
                      setPressedButtonId(userType.type.toLowerCase());
                      e.currentTarget.style.backgroundColor = '#0a2a8a';
                      e.currentTarget.style.borderColor = '#0a2a8a';
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                      if (pressedButtonId === userType.type.toLowerCase()) {
                        setPressedButtonId(null);
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {userType.cta}
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