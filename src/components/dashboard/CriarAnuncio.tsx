'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Upload, 
  X, 
  Car, 
  Camera, 
  Save, 
  Eye,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Star
} from 'lucide-react'

interface VehicleForm {
  // Basic Info
  title: string
  description: string
  marca: string
  modelo: string
  ano: string
  quilometragem: string
  preco: string
  
  // Specifications
  combustivel: string
  transmissao: string
  cor: string
  tipo: string
  cambio: string
  direcao: string
  arCondicionado: boolean
  vidrosEletricos: boolean
  travasEletricas: boolean
  alarme: boolean
  som: boolean
  
  // Location & Contact
  localizacao: string
  telefone: string
  whatsapp: string
  
  // Photos
  photos: File[]
}

export function CriarAnuncio() {
  const [formData, setFormData] = useState<VehicleForm>({
    title: '',
    description: '',
    marca: '',
    modelo: '',
    ano: '',
    quilometragem: '',
    preco: '',
    combustivel: '',
    transmissao: '',
    cor: '',
    tipo: '',
    cambio: '',
    direcao: '',
    arCondicionado: false,
    vidrosEletricos: false,
    travasEletricas: false,
    alarme: false,
    som: false,
    localizacao: '',
    telefone: '',
    whatsapp: '',
    photos: []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (field: keyof VehicleForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 10) // Max 10 photos
    }))
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Creating announcement:', formData)
      setIsSubmitting(false)
      // Reset form or redirect
    }, 2000)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Anúncio *</Label>
          <Input
            id="title"
            placeholder="Ex: Toyota Corolla 2022 XEi Automático"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Veículo *</Label>
          <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">Carro</SelectItem>
              <SelectItem value="truck">Caminhão</SelectItem>
              <SelectItem value="motorcycle">Moto</SelectItem>
              <SelectItem value="van">Van</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição Detalhada *</Label>
        <Textarea
          id="description"
          placeholder="Descreva o veículo, histórico, estado de conservação, etc..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="marca">Marca *</Label>
          <Input
            id="marca"
            placeholder="Ex: Toyota"
            value={formData.marca}
            onChange={(e) => handleInputChange('marca', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="modelo">Modelo *</Label>
          <Input
            id="modelo"
            placeholder="Ex: Corolla"
            value={formData.modelo}
            onChange={(e) => handleInputChange('modelo', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ano">Ano *</Label>
          <Input
            id="ano"
            type="number"
            placeholder="2022"
            value={formData.ano}
            onChange={(e) => handleInputChange('ano', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quilometragem">Quilometragem *</Label>
          <Input
            id="quilometragem"
            type="number"
            placeholder="25000"
            value={formData.quilometragem}
            onChange={(e) => handleInputChange('quilometragem', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preco">Preço *</Label>
          <Input
            id="preco"
            type="number"
            placeholder="85000"
            value={formData.preco}
            onChange={(e) => handleInputChange('preco', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cor">Cor *</Label>
          <Input
            id="cor"
            placeholder="Ex: Prata"
            value={formData.cor}
            onChange={(e) => handleInputChange('cor', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="combustivel">Combustível *</Label>
          <Select value={formData.combustivel} onValueChange={(value) => handleInputChange('combustivel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Flex">Flex</SelectItem>
              <SelectItem value="Gasolina">Gasolina</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Elétrico">Elétrico</SelectItem>
              <SelectItem value="Híbrido">Híbrido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="transmissao">Transmissão *</Label>
          <Select value={formData.transmissao} onValueChange={(value) => handleInputChange('transmissao', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automático">Automático</SelectItem>
              <SelectItem value="CVT">CVT</SelectItem>
              <SelectItem value="Semi-automático">Semi-automático</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cambio">Câmbio</Label>
          <Input
            id="cambio"
            placeholder="Ex: 6 velocidades"
            value={formData.cambio}
            onChange={(e) => handleInputChange('cambio', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="direcao">Direção</Label>
        <Select value={formData.direcao} onValueChange={(value) => handleInputChange('direcao', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mecânica">Mecânica</SelectItem>
            <SelectItem value="Hidráulica">Hidráulica</SelectItem>
            <SelectItem value="Elétrica">Elétrica</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Equipamentos e Opcionais</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="arCondicionado"
              checked={formData.arCondicionado}
              onCheckedChange={(checked) => handleInputChange('arCondicionado', checked as boolean)}
            />
            <Label htmlFor="arCondicionado">Ar Condicionado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vidrosEletricos"
              checked={formData.vidrosEletricos}
              onCheckedChange={(checked) => handleInputChange('vidrosEletricos', checked as boolean)}
            />
            <Label htmlFor="vidrosEletricos">Vidros Elétricos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="travasEletricas"
              checked={formData.travasEletricas}
              onCheckedChange={(checked) => handleInputChange('travasEletricas', checked as boolean)}
            />
            <Label htmlFor="travasEletricas">Travas Elétricas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="alarme"
              checked={formData.alarme}
              onCheckedChange={(checked) => handleInputChange('alarme', checked as boolean)}
            />
            <Label htmlFor="alarme">Alarme</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="som"
              checked={formData.som}
              onCheckedChange={(checked) => handleInputChange('som', checked as boolean)}
            />
            <Label htmlFor="som">Sistema de Som</Label>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="localizacao">Localização *</Label>
          <Input
            id="localizacao"
            placeholder="Ex: São Paulo, SP"
            value={formData.localizacao}
            onChange={(e) => handleInputChange('localizacao', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone *</Label>
          <Input
            id="telefone"
            placeholder="(11) 99999-9999"
            value={formData.telefone}
            onChange={(e) => handleInputChange('telefone', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          placeholder="(11) 99999-9999"
          value={formData.whatsapp}
          onChange={(e) => handleInputChange('whatsapp', e.target.value)}
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Fotos do Veículo *</Label>
        <p className="text-sm text-foreground/60">
          Adicione até 10 fotos de alta qualidade. A primeira foto será a principal.
        </p>
        
        {/* Photo Upload */}
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-foreground/40 mx-auto mb-2" />
            <p className="text-foreground/60 mb-2">
              Clique para selecionar fotos ou arraste e solte
            </p>
            <p className="text-sm text-foreground/40">
              PNG, JPG até 5MB cada
            </p>
          </label>
        </div>

        {/* Photo Preview */}
        {formData.photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-6 w-6 p-0"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                {index === 0 && (
                  <Badge className="absolute top-2 left-2 bg-primary">
                    Principal
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Form Summary */}
      <div className="space-y-4">
        <Label>Resumo do Anúncio</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-foreground/60">Título:</span>
              <span className="font-medium">{formData.title || 'Não preenchido'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Marca/Modelo:</span>
              <span className="font-medium">
                {formData.marca && formData.modelo ? `${formData.marca} ${formData.modelo}` : 'Não preenchido'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Ano:</span>
              <span className="font-medium">{formData.ano || 'Não preenchido'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Preço:</span>
              <span className="font-medium">
                {formData.preco ? `R$ ${Number(formData.preco).toLocaleString('pt-BR')}` : 'Não preenchido'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-foreground/60">Fotos:</span>
              <span className="font-medium">{formData.photos.length}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Localização:</span>
              <span className="font-medium">{formData.localizacao || 'Não preenchido'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Telefone:</span>
              <span className="font-medium">{formData.telefone || 'Não preenchido'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      default:
        return renderStep1()
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return 'Informações Básicas'
      case 2:
        return 'Especificações Técnicas'
      case 3:
        return 'Equipamentos e Contato'
      case 4:
        return 'Fotos e Revisão'
      default:
        return 'Informações Básicas'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Criar Anúncio</h1>
        <p className="text-foreground/60 mt-1">
          Crie um anúncio atrativo para vender seu veículo
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-foreground/60'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-0.5 mx-2 ${
                step < currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5" />
            <span>{getStepTitle(currentStep)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>

              <div className="flex space-x-2">
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Próximo
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Save className="h-4 w-4 mr-2 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Criar Anúncio
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 