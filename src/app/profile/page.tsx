'use client'

import { RootLayout } from '@/layouts/RootLayout'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Shield, 
  Bell, 
  CreditCard,
  Settings,
  Camera,
  Save,
  Edit,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@email.com',
    phone: '+55 (11) 99999-9999',
    role: 'cliente',
    city: 'São Paulo',
    state: 'SP',
    bio: 'Interessado em encontrar o imóvel perfeito para minha família.',
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    }
  })

  useEffect(() => {
    // Simulate content loading - shorter time to work with global transition
    const timer = setTimeout(() => {
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (type: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'cliente':
        return 'Cliente'
      case 'anunciante':
        return 'Anunciante'
      case 'corretor':
        return 'Corretor'
      default:
        return 'Usuário'
    }
  }

  return (
    <RootLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-background to-muted/30 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Meu Perfil
            </h1>
            <p className="text-foreground/70">
              Gerencie suas informações pessoais e configurações da conta
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    {/* Profile Avatar */}
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-foreground/40" />
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Profile Info */}
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-foreground/60 mb-2">{profileData.email}</p>
                    <Badge variant="secondary" className="mb-4">
                      {getRoleLabel(profileData.role)}
                    </Badge>

                    {/* Quick Stats */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Membro desde:</span>
                        <span className="font-medium">Janeiro 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Status:</span>
                        <span className="text-green-600 font-medium">Ativo</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                  <TabsTrigger value="security">Segurança</TabsTrigger>
                  <TabsTrigger value="notifications">Notificações</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <User className="h-5 w-5" />
                          <span>Informações Pessoais</span>
                        </CardTitle>
                        <Button
                          variant={isEditing ? "outline" : "default"}
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? (
                            <>
                              <Edit className="h-4 w-4 mr-2" />
                              Cancelar
                            </>
                          ) : (
                            <>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Nome</Label>
                            <Input
                              id="firstName"
                              value={profileData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Sobrenome</Label>
                            <Input
                              id="lastName"
                              value={profileData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="city">Cidade</Label>
                            <Input
                              id="city"
                              value={profileData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Estado</Label>
                            <Select 
                              value={profileData.state} 
                              onValueChange={(value) => handleInputChange('state', value)}
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="SP">São Paulo</SelectItem>
                                <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                                <SelectItem value="MG">Minas Gerais</SelectItem>
                                <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                                <SelectItem value="PR">Paraná</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Biografia</Label>
                          <textarea
                            id="bio"
                            rows={3}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground disabled:opacity-50"
                            value={profileData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>

                        {isEditing && (
                          <div className="flex justify-end space-x-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="button"
                              onClick={handleSave}
                              disabled={isSaving}
                            >
                              {isSaving ? (
                                <>
                                  <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                                  Salvando...
                                </>
                              ) : (
                                <>
                                  <Save className="h-4 w-4 mr-2" />
                                  Salvar Alterações
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Segurança da Conta</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Alterar Senha</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Senha Atual</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              placeholder="Digite sua senha atual"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">Nova Senha</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              placeholder="Digite a nova senha"
                            />
                          </div>
                        </div>
                        <Button variant="outline">
                          Alterar Senha
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                        <p className="text-sm text-foreground/60">
                          Adicione uma camada extra de segurança à sua conta
                        </p>
                        <Button variant="outline">
                          Configurar 2FA
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Preferências de Notificação</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notificações por E-mail</h4>
                            <p className="text-sm text-foreground/60">
                              Receba atualizações importantes por e-mail
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={profileData.notifications.email}
                            onChange={(e) => handleNotificationChange('email', e.target.checked)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notificações por SMS</h4>
                            <p className="text-sm text-foreground/60">
                              Receba alertas importantes por SMS
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={profileData.notifications.sms}
                            onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notificações Push</h4>
                            <p className="text-sm text-foreground/60">
                              Receba notificações no navegador
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={profileData.notifications.push}
                            onChange={(e) => handleNotificationChange('push', e.target.checked)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">E-mails de Marketing</h4>
                            <p className="text-sm text-foreground/60">
                              Receba ofertas e novidades da plataforma
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={profileData.notifications.marketing}
                            onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 