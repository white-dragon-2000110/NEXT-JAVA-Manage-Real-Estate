'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, TrendingUp, BarChart3, FileText, Calendar, User } from 'lucide-react'

interface Vehicle {
  id: string
  title: string
  description: string
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

interface VehicleTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  vehicle: Vehicle
}

export function VehicleTabs({ activeTab, onTabChange, vehicle }: VehicleTabsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejeitado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="descricao">Descrição</TabsTrigger>
        <TabsTrigger value="fipe">Histórico FIPE</TabsTrigger>
        <TabsTrigger value="comparar">Comparar</TabsTrigger>
        <TabsTrigger value="vistoria">Relatórios de Vistoria</TabsTrigger>
      </TabsList>

      {/* Descrição Tab */}
      <TabsContent value="descricao" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Descrição do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Descrição Geral</h4>
              <p className="text-foreground/80 leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Características e Opcionais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-semibold text-foreground mb-3">Informações Adicionais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between py-2">
                  <span className="text-foreground/70">Único dono</span>
                  <span className="font-medium">Sim</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-foreground/70">Revisões em dia</span>
                  <span className="font-medium">Sim</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-foreground/70">Documentação</span>
                  <span className="font-medium">Em dia</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-foreground/70">IPVA</span>
                  <span className="font-medium">Pago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Histórico FIPE Tab */}
      <TabsContent value="fipe" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Histórico de Valores FIPE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-foreground/70 mb-4">
                  Acompanhe a evolução dos valores FIPE deste veículo ao longo dos anos.
                </p>
                
                <div className="space-y-4">
                  {vehicle.fipeHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{item.year}</div>
                          <div className="text-sm text-foreground/60">Valor FIPE</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(item.value)}
                        </div>
                        {index > 0 && (
                          <div className={`text-sm ${
                            item.value > vehicle.fipeHistory[index - 1].value 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {item.value > vehicle.fipeHistory[index - 1].value ? '+' : ''}
                            {formatPrice(item.value - vehicle.fipeHistory[index - 1].value)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">Sobre a Tabela FIPE</h5>
                  <p className="text-blue-800 text-sm">
                    A Tabela FIPE é uma referência oficial de preços médios de veículos no mercado brasileiro, 
                    calculada mensalmente pela Fundação Instituto de Pesquisas Econômicas.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Comparar Tab */}
      <TabsContent value="comparar" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Comparar Veículos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Adicione veículos para comparar
              </h3>
              <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                Selecione outros veículos para comparar especificações, preços e características 
                lado a lado com este veículo.
              </p>
              <Button size="lg">
                <BarChart3 className="h-4 w-4 mr-2" />
                Buscar Veículos para Comparar
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Relatórios de Vistoria Tab */}
      <TabsContent value="vistoria" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatórios de Vistoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-foreground/70 mb-4">
                  Relatórios de vistoria técnica realizados por profissionais certificados.
                </p>
                
                <div className="space-y-4">
                  {vehicle.inspectionReports.map((report) => (
                    <div key={report.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-foreground/60" />
                          <span className="font-medium">
                            {new Date(report.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        {getStatusBadge(report.status)}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-foreground/60" />
                          <span className="text-sm text-foreground/80">{report.inspector}</span>
                        </div>
                        
                        {report.status === 'approved' && (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Vistoria aprovada</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-900 mb-2">Vistoria Técnica</h5>
                  <p className="text-green-800 text-sm">
                    Todos os relatórios de vistoria são realizados por profissionais certificados e 
                    seguem rigorosos padrões de qualidade para garantir a transparência e confiabilidade 
                    das informações.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 