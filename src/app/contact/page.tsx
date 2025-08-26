'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building, 
  MessageSquare, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const router = useRouter();
  const [pressedButtonId, setPressedButtonId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: '',
    budget: '',
    timeline: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: '',
        budget: '',
        timeline: ''
      })
    }, 5000)
  }

  const handleVerFAQ = () => {
    // Navigate to FAQ page or scroll to FAQ section
    router.push('/faq');
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Av. Paulista, 1000, Bela Vista, São Paulo - SP, 01310-100',
      description: 'Nossa sede principal'
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '+55 (11) 99999-9999',
      description: 'Segunda a Sexta, 8h às 18h'
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'contato@realestatepro.com.br',
      description: 'Resposta em até 24h'
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      content: 'Segunda a Sexta: 8h às 18h',
      description: 'Sábado: 9h às 13h'
    }
  ]

  const departments = [
    {
      name: 'Vendas',
      email: 'vendas@realestatepro.com.br',
      phone: '+55 (11) 99999-9998',
      description: 'Para compradores interessados em imóveis'
    },
    {
      name: 'Anúncios',
      email: 'anuncios@realestatepro.com.br',
      phone: '+55 (11) 99999-9997',
      description: 'Para vendedores que querem anunciar'
    },
    {
      name: 'Suporte Técnico',
      email: 'suporte@realestatepro.com.br',
      phone: '+55 (11) 99999-9996',
      description: 'Ajuda com a plataforma e problemas técnicos'
    },
    {
      name: 'Parcerias',
      email: 'parcerias@realestatepro.com.br',
      phone: '+55 (11) 99999-9995',
      description: 'Para corretores e empresas parceiras'
    }
  ]

  if (submitSuccess) {
    return (
      <RootLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Mensagem Enviada com Sucesso!
            </h1>
            <p className="text-foreground/60 mb-6">
              Obrigado pelo contato. Nossa equipe responderá em breve.
            </p>
            <Button onClick={() => setSubmitSuccess(false)} className="w-full cursor-pointer">
              Fechar
            </Button>
          </Card>
        </div>
      </RootLayout>
    )
  }

  return (
    <RootLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Entre em Contato
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Estamos aqui para ajudar! Entre em contato conosco para qualquer dúvida, 
              sugestão ou para falar sobre seus projetos imobiliários.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Envie uma Mensagem</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Assunto *</Label>
                        <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o assunto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consulta">Consulta sobre Imóvel</SelectItem>
                            <SelectItem value="anuncio">Anunciar Imóvel</SelectItem>
                            <SelectItem value="suporte">Suporte Técnico</SelectItem>
                            <SelectItem value="parceria">Proposta de Parceria</SelectItem>
                            <SelectItem value="outro">Outro Assunto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="propertyType">Tipo de Imóvel de Interesse</Label>
                        <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="casa">Casa</SelectItem>
                            <SelectItem value="apartamento">Apartamento</SelectItem>
                            <SelectItem value="terreno">Terreno</SelectItem>
                            <SelectItem value="comercial">Comercial</SelectItem>
                            <SelectItem value="rural">Rural</SelectItem>
                            <SelectItem value="nao-se-aplica">Não se aplica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Faixa de Orçamento</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a faixa" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ate-200k">Até R$ 200.000</SelectItem>
                            <SelectItem value="200k-500k">R$ 200.000 - R$ 500.000</SelectItem>
                            <SelectItem value="500k-1m">R$ 500.000 - R$ 1.000.000</SelectItem>
                            <SelectItem value="1m-2m">R$ 1.000.000 - R$ 2.000.000</SelectItem>
                            <SelectItem value="acima-2m">Acima de R$ 2.000.000</SelectItem>
                            <SelectItem value="nao-se-aplica">Não se aplica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timeline">Prazo de Interesse</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o prazo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imediato">Imediato</SelectItem>
                          <SelectItem value="1-3-meses">1-3 meses</SelectItem>
                          <SelectItem value="3-6-meses">3-6 meses</SelectItem>
                          <SelectItem value="6-12-meses">6-12 meses</SelectItem>
                          <SelectItem value="acima-1-ano">Acima de 1 ano</SelectItem>
                          <SelectItem value="nao-se-aplica">Não se aplica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        placeholder="Descreva sua dúvida, solicitação ou projeto em detalhes..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold" 
                      disabled={isSubmitting}
                      data-button="enviar-mensagem"
                      style={{ 
                        backgroundColor: '#1A53E0', 
                        borderColor: '#1A53E0',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting && pressedButtonId !== 'enviar-mensagem') {
                          e.currentTarget.style.backgroundColor = '#0f3bb8';
                          e.currentTarget.style.borderColor = '#0f3bb8';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting && pressedButtonId !== 'enviar-mensagem') {
                          e.currentTarget.style.backgroundColor = '#1A53E0';
                          e.currentTarget.style.borderColor = '#1A53E0';
                        }
                      }}
                      onMouseDown={(e) => {
                        if (!isSubmitting) {
                          setPressedButtonId('enviar-mensagem');
                          e.currentTarget.style.backgroundColor = '#0a2a8a';
                          e.currentTarget.style.borderColor = '#0a2a8a';
                          e.currentTarget.style.transform = 'scale(0.98)';
                        }
                      }}
                      onMouseUp={(e) => {
                        if (!isSubmitting && pressedButtonId === 'enviar-mensagem') {
                          setPressedButtonId(null);
                          e.currentTarget.style.backgroundColor = '#0f3bb8';
                          e.currentTarget.style.borderColor = '#0f3bb8';
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Main Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Informações de Contato</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{info.title}</h4>
                          <p className="text-foreground/80">{info.content}</p>
                          <p className="text-sm text-foreground/60">{info.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Departments */}
              <Card>
                <CardHeader>
                  <CardTitle>Departamentos Especializados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4">
                      <h4 className="font-semibold text-foreground">{dept.name}</h4>
                      <p className="text-sm text-foreground/60 mb-2">{dept.description}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-foreground/80">
                          <Mail className="h-3 w-3 inline mr-1" />
                          {dept.email}
                        </p>
                        <p className="text-foreground/80">
                          <Phone className="h-3 w-3 inline mr-1" />
                          {dept.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Link */}
              {/* <Card>
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-foreground mb-2">
                    Precisa de Ajuda Rápida?
                  </h4>
                  <p className="text-sm text-foreground/60 mb-4">
                    Consulte nossas perguntas frequentes
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full text-lg font-semibold"
                    onClick={handleVerFAQ}
                    data-button="ver-faq"
                    style={{ 
                      backgroundColor: '#1A53E0', 
                      borderColor: '#1A53E0',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      if (pressedButtonId !== 'ver-faq') {
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pressedButtonId !== 'ver-faq') {
                        e.currentTarget.style.backgroundColor = '#1A53E0';
                        e.currentTarget.style.borderColor = '#1A53E0';
                      }
                    }}
                    onMouseDown={(e) => {
                      setPressedButtonId('ver-faq');
                      e.currentTarget.style.backgroundColor = '#0a2a8a';
                      e.currentTarget.style.borderColor = '#0a2a8a';
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                      if (pressedButtonId === 'ver-faq') {
                        setPressedButtonId(null);
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    Ver FAQ
                  </Button>
                </CardContent>
              </Card> */}
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Nossa Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
                    <p className="text-foreground/60">
                      Mapa interativo será integrado aqui
                    </p>
                    <p className="text-sm text-foreground/40">
                      Av. Paulista, 1000, Bela Vista, São Paulo - SP
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 