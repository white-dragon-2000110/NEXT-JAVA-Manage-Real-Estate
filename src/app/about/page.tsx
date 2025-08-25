'use client';

import { RootLayout } from '@/layouts/RootLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building, Shield, Users, Award, MapPin, Home, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: Building,
      title: 'Ampla Seleção',
      description: 'Navegue por milhares de imóveis, desde casas e apartamentos até terrenos e comerciais.'
    },
    {
      icon: Shield,
      title: 'Vendedores Verificados',
      description: 'Todos os nossos vendedores são verificados e os imóveis passam por inspeções de qualidade.'
    },
    {
      icon: Users,
      title: 'Suporte Especializado',
      description: 'Nossa equipe de especialistas imobiliários está aqui para ajudá-lo a fazer a escolha certa.'
    },
    {
      icon: Award,
      title: 'Melhores Preços',
      description: 'Preços competitivos e taxas transparentes sem custos ocultos.'
    }
  ]

  const stats = [
    { number: '50.000+', label: 'Imóveis Disponíveis' },
    { number: '25.000+', label: 'Clientes Satisfeitos' },
    { number: '500+', label: 'Corretores Parceiros' },
    { number: '95%', label: 'Taxa de Satisfação' }
  ]

  return (
    <RootLayout>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Sobre o RealEstatePro
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Estamos revolucionando a forma como as pessoas compram e vendem imóveis, tornando o processo 
              simples, transparente e confiável para todos os envolvidos.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-card border border-border rounded-lg p-8 mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nossa Missão</h2>
              <p className="text-lg text-foreground/70 max-w-4xl mx-auto">
                Criar a plataforma mais confiável e fácil de usar para transações imobiliárias, 
                conectando compradores e vendedores em um ambiente seguro, fornecendo serviço 
                excepcional ao cliente e suporte durante todo o processo.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Nossa História</h2>
              <div className="space-y-4 text-foreground/70">
                <p>
                  Fundado em 2023, o RealEstatePro nasceu de uma observação simples: o processo de 
                  compra e venda de imóveis era frequentemente complicado, estressante e carecia de transparência.
                </p>
                <p>
                  Nossa equipe de entusiastas imobiliários e especialistas em tecnologia se uniu para criar 
                  uma plataforma que simplificaria esse processo enquanto construía confiança entre compradores e vendedores.
                </p>
                <p>
                  Hoje, temos orgulho de atender milhares de clientes em todo o país, ajudando-os a encontrar 
                  o imóvel perfeito ou obter o melhor valor para o atual.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <span className="text-foreground/40 text-lg">Imagem da Empresa</span>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Transparência</h3>
                  <p className="text-foreground/70 text-sm">
                    Acreditamos na transparência total em todas as nossas operações, desde preços até processos.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Confiança</h3>
                  <p className="text-foreground/70 text-sm">
                    Construímos relacionamentos duradouros baseados na confiança e satisfação do cliente.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Inovação</h3>
                  <p className="text-foreground/70 text-sm">
                    Continuamente inovamos para oferecer a melhor experiência possível aos nossos usuários.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Pronto para Começar?</h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já encontraram o imóvel dos sonhos 
              ou venderam com sucesso através da nossa plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/properties">Ver Imóveis</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/sell">Anunciar Imóvel</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 