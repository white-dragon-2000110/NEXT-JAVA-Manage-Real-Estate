'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, Building, Car, User, Settings, Search, Plus, BarChart3 } from 'lucide-react'

export default function DemoNavigationPage() {
  const navigationItems = [
    {
      title: 'Página Inicial',
      description: 'Landing page principal da aplicação',
      icon: Home,
      href: '/',
      color: 'text-blue-600'
    },
    {
      title: 'Imóveis',
      description: 'Lista de todos os imóveis disponíveis',
      icon: Building,
      href: '/properties',
      color: 'text-green-600'
    },
    {
      title: 'Veículos',
      description: 'Lista de todos os veículos disponíveis',
      icon: Car,
      href: '/vehicles',
      color: 'text-purple-600'
    },
    {
      title: 'Busca',
      description: 'Página de busca avançada',
      icon: Search,
      href: '/search',
      color: 'text-orange-600'
    },
    {
      title: 'Anunciar',
      description: 'Formulário para anunciar imóveis',
      icon: Plus,
      href: '/sell',
      color: 'text-red-600'
    },
    {
      title: 'Sobre',
      description: 'Informações sobre a empresa',
      icon: Building,
      href: '/about',
      color: 'text-indigo-600'
    },
    {
      title: 'Contato',
      description: 'Página de contato e suporte',
      icon: User,
      href: '/contact',
      color: 'text-pink-600'
    },
    {
      title: 'Preços',
      description: 'Planos e preços da plataforma',
      icon: BarChart3,
      href: '/pricing',
      color: 'text-teal-600'
    },
    {
      title: 'Perfil',
      description: 'Gerenciar perfil do usuário',
      icon: Settings,
      href: '/profile',
      color: 'text-gray-600'
    }
  ]

  const dashboardItems = [
    {
      title: 'Painel Admin',
      description: 'Painel administrativo',
      href: '/dashboard/admin',
      color: 'text-red-600'
    },
    {
      title: 'Painel Anunciante',
      description: 'Painel do anunciante',
      href: '/dashboard/anunciante',
      color: 'text-blue-600'
    },
    {
      title: 'Painel Cliente',
      description: 'Painel do cliente',
      href: '/dashboard/cliente',
      color: 'text-green-600'
    },
    {
      title: 'Painel Corretor',
      description: 'Painel do corretor',
      href: '/dashboard/corretor',
      color: 'text-purple-600'
    }
  ]

  const authItems = [
    {
      title: 'Login',
      description: 'Página de autenticação',
      href: '/auth/login',
      color: 'text-blue-600'
    },
    {
      title: 'Registro',
      description: 'Página de cadastro',
      href: '/auth/register',
      color: 'text-green-600'
    },
    {
      title: 'Esqueci a Senha',
      description: 'Recuperação de senha',
      href: '/auth/forgot-password',
      color: 'text-orange-600'
    }
  ]

  return (
    <RootLayout>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Navegação da Aplicação
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Esta página demonstra todas as rotas e funcionalidades disponíveis na aplicação.
              Use os links abaixo para navegar entre as diferentes seções.
            </p>
          </div>

          {/* Main Navigation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Navegação Principal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navigationItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-6 w-6 ${item.color}`} />
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-foreground/70 mb-4">{item.description}</p>
                      <div className="mt-auto">
                        <Button asChild className="w-full">
                          <Link href={item.href}>
                            Acessar {item.title}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Dashboard Navigation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Painéis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardItems.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-foreground/70 mb-4">{item.description}</p>
                    <div className="mt-auto">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={item.href}>
                          Acessar Painel
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Authentication Navigation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Autenticação</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {authItems.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-foreground/70 mb-4">{item.description}</p>
                    <div className="mt-auto">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={item.href}>
                          Acessar {item.title}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Voltar para o Início
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 