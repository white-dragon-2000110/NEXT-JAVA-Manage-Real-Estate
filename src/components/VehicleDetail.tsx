'use client'

import { useState } from 'react'
import { VehicleImageGallery } from './VehicleImageGallery'
import { VehicleInfo } from './VehicleInfo'
import { VehicleTabs } from './VehicleTabs'
import { SimilarVehicles } from './SimilarVehicles'
import { VehicleActions } from './VehicleActions'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Calendar, Fuel, Gauge, Car, Shield, CheckCircle } from 'lucide-react'

interface Vehicle {
  id: string
  title: string
  price: number
  location: string
  year: number
  mileage: number
  fuel: string
  transmission: string
  color: string
  rating: number
  isFeatured: boolean
  type: 'car' | 'truck' | 'motorcycle'
  images: string[]
  description: string
  seller: {
    name: string
    rating: number
    verified: boolean
    responseTime: string
  }
  features: string[]
  fipeHistory: {
    year: number
    value: number
  }[]
  inspectionReports: {
    id: string
    date: string
    status: 'approved' | 'pending' | 'rejected'
    inspector: string
  }[]
}

interface VehicleDetailProps {
  vehicleId: string
}

// Mock data for demonstration
const mockVehicle: Vehicle = {
  id: '1',
  title: '2022 Toyota Corolla XEi',
  price: 85000,
  location: 'São Paulo, SP',
  year: 2022,
  mileage: 25000,
  fuel: 'Flex',
  transmission: 'Automático',
  color: 'Prata',
  rating: 4.8,
  isFeatured: true,
  type: 'car',
  images: [
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600'
  ],
  description: 'Toyota Corolla XEi 2022 em excelente estado, único dono, revisões em dia na concessionária. Veículo completo com todos os opcionais: ar condicionado, direção elétrica, freios ABS, airbags, câmera de ré, sensor de estacionamento, central multimídia com Apple CarPlay e Android Auto, bancos em couro, rodas de liga leve 17", faróis LED e muito mais. Documentação em dia, IPVA pago, sem restrições. Perfeito para quem busca conforto, economia e confiabilidade.',
  seller: {
    name: 'Auto Center São Paulo',
    rating: 4.9,
    verified: true,
    responseTime: 'Responde em até 2 horas'
  },
  features: [
    'Ar Condicionado',
    'Direção Elétrica',
    'Freios ABS',
    'Airbags',
    'Câmera de Ré',
    'Sensor de Estacionamento',
    'Central Multimídia',
    'Apple CarPlay',
    'Android Auto',
    'Bancos em Couro',
    'Rodas de Liga Leve 17"',
    'Faróis LED',
    'Alarme',
    'Teto Solar',
    'Controle de Estabilidade'
  ],
  fipeHistory: [
    { year: 2020, value: 75000 },
    { year: 2021, value: 78000 },
    { year: 2022, value: 82000 },
    { year: 2023, value: 85000 }
  ],
  inspectionReports: [
    {
      id: '1',
      date: '2024-01-15',
      status: 'approved',
      inspector: 'João Silva - Vistoriador Certificado'
    },
    {
      id: '2',
      date: '2024-06-20',
      status: 'approved',
      inspector: 'Maria Santos - Vistoriadora Certificada'
    }
  ]
}

export function VehicleDetail({ vehicleId }: VehicleDetailProps) {
  const [activeTab, setActiveTab] = useState('descricao')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-foreground/60 mb-6">
          <span>Início</span>
          <span className="mx-2">/</span>
          <span>Veículos</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{mockVehicle.title}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-2">
            <VehicleImageGallery images={mockVehicle.images} />
          </div>

          {/* Right Column - Vehicle Info & Actions */}
          <div className="space-y-6">
            {/* Vehicle Basic Info */}
            <VehicleInfo vehicle={mockVehicle} />

            {/* Action Buttons */}
            <VehicleActions vehicle={mockVehicle} />

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Informações do Vendedor
                  </h3>
                  {mockVehicle.seller.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{mockVehicle.seller.name}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm">{mockVehicle.seller.rating}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-foreground/70">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      <span>{mockVehicle.seller.responseTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Garantias e Segurança
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Documentação verificada</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Sem restrições</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>IPVA em dia</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Revisões na concessionária</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <VehicleTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            vehicle={mockVehicle}
          />
        </div>

        {/* Similar Vehicles */}
        <div className="mt-16">
          <SimilarVehicles currentVehicleId={vehicleId} />
        </div>
      </div>
    </div>
  )
} 