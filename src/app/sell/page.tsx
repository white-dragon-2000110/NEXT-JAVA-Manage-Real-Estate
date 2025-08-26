'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Home, 
  Building, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Upload, 
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [pressedButtonId, setPressedButtonId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    price: '',
    city: '',
    state: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    parking: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
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

  return (
    <RootLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Anuncie seu Imóvel
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Alcançe milhares de compradores interessados. Anuncie com facilidade e 
              receba propostas qualificadas para seu imóvel.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground/60'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-foreground/60">
              <span>Informações Básicas</span>
              <span>Localização</span>
              <span>Características</span>
              <span>Contato</span>
            </div>
          </div>

          {/* Form Steps */}
          <Card className="mb-8">
            <CardContent className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Informações Básicas do Imóvel
                    </h2>
                    <p className="text-foreground/60 mb-6">
                      Comece fornecendo as informações essenciais sobre seu imóvel.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="type">Tipo de Imóvel *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
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
                      <Label htmlFor="price">Preço (R$) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0,00"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Título do Anúncio *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Casa Moderna com Piscina - Jardins"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição Detalhada *</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva seu imóvel com detalhes, características especiais, localização privilegiada..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Location */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Localização do Imóvel
                    </h2>
                    <p className="text-foreground/60 mb-6">
                      Informe onde está localizado seu imóvel para atrair compradores da região.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        placeholder="São Paulo"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">SP</SelectItem>
                          <SelectItem value="RJ">RJ</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          <SelectItem value="RS">RS</SelectItem>
                          <SelectItem value="PR">PR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Characteristics */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Características do Imóvel
                    </h2>
                    <p className="text-foreground/60 mb-6">
                      Detalhe as características físicas e comodidades do seu imóvel.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="bedrooms">Quartos</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        placeholder="0"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Banheiros</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        placeholder="0"
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="area">Área (m²)</Label>
                      <Input
                        id="area"
                        type="number"
                        placeholder="0"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="parking">Vagas de Estacionamento</Label>
                      <Input
                        id="parking"
                        type="number"
                        placeholder="0"
                        value={formData.parking}
                        onChange={(e) => handleInputChange('parking', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Informações de Contato
                    </h2>
                    <p className="text-foreground/60 mb-6">
                      Como os interessados podem entrar em contato com você?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactName">Nome Completo *</Label>
                      <Input
                        id="contactName"
                        placeholder="Seu nome completo"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactEmail">E-mail *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Telefone *</Label>
                    <Input
                      id="contactPhone"
                      placeholder="(11) 99999-9999"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 cursor-pointer">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="cursor-pointer"
                >
                  Anterior
                </Button>

                {currentStep < 4 ? (
                  <Button 
                    onClick={nextStep}
                    data-button="next-step-button"
                    style={{
                      backgroundColor: '#1A53E0',
                      borderColor: '#1A53E0',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      if (pressedButtonId !== 'next-step-button') {
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pressedButtonId !== 'next-step-button') {
                        e.currentTarget.style.backgroundColor = '#1A53E0';
                        e.currentTarget.style.borderColor = '#1A53E0';
                      }
                    }}
                    onMouseDown={(e) => {
                      setPressedButtonId('next-step-button');
                      e.currentTarget.style.backgroundColor = '#0a2a8a';
                      e.currentTarget.style.borderColor = '#0a2a8a';
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                      if (pressedButtonId === 'next-step-button') {
                        setPressedButtonId(null);
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button 
                    data-button="submit-button"
                    style={{
                      backgroundColor: '#1A53E0',
                      borderColor: '#1A53E0',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      if (pressedButtonId !== 'submit-button') {
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pressedButtonId !== 'submit-button') {
                        e.currentTarget.style.backgroundColor = '#1A53E0';
                        e.currentTarget.style.borderColor = '#1A53E0';
                      }
                    }}
                    onMouseDown={(e) => {
                      setPressedButtonId('submit-button');
                      e.currentTarget.style.backgroundColor = '#0a2a8a';
                      e.currentTarget.style.borderColor = '#0a2a8a';
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                      if (pressedButtonId === 'submit-button') {
                        setPressedButtonId(null);
                        e.currentTarget.style.backgroundColor = '#0f3bb8';
                        e.currentTarget.style.borderColor = '#0f3bb8';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    Enviar Anúncio
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Por que anunciar conosco?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Anúncio Gratuito</h3>
                  <p className="text-sm text-foreground/60">
                    Crie seu anúncio sem custos iniciais
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Aprovação Rápida</h3>
                  <p className="text-sm text-foreground/60">
                    Seu anúncio é aprovado em até 24h
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Suporte Completo</h3>
                  <p className="text-sm text-foreground/60">
                    Nossa equipe está sempre disponível
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RootLayout>
  )
} 