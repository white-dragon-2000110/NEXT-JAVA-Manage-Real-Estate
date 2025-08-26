'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, ArrowLeft, CheckCircle, Car } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Simulate content loading - shorter time to work with global transition
    const timer = setTimeout(() => {
      // stopLoading(); // This line was removed as per the edit hint
    }, 200);

    return () => clearTimeout(timer);
  }, []); // Removed startLoading and stopLoading from dependencies

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset requested for:', email)
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/properties" className="inline-flex items-center space-x-2 text-2xl font-bold text-foreground">
              <Car className="h-8 w-8 text-primary" />
              <span>VehicleMarket</span>
            </Link>
          </div>

          {/* Success Message */}
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Email Enviado!</CardTitle>
              <CardDescription className="text-base">
                Verifique sua caixa de entrada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-foreground/80">
                  Enviamos um link para redefinir sua senha para:
                </p>
                <p className="font-medium text-foreground">{email}</p>
                <p className="text-sm text-foreground/60">
                  Se você não receber o email em alguns minutos, verifique sua pasta de spam.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail('')
                  }}
                  className="w-full h-11"
                >
                  Enviar Novamente
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full h-11"
                >
                  Usar Outro Email
                </Button>
              </div>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline text-sm"
                >
                  ← Voltar para o login
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Back to Properties */}
          <div className="text-center mt-6">
            <Link
              href="/properties"
              className="text-foreground/60 hover:text-foreground text-sm"
            >
              ← Voltar para Imóveis
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/properties" className="inline-flex items-center space-x-2 text-2xl font-bold text-foreground">
            <Car className="h-8 w-8 text-primary" />
            <span>VehicleMarket</span>
          </Link>
          <p className="text-foreground/60 mt-2">Recupere sua senha</p>
        </div>

        {/* Forgot Password Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Esqueceu sua senha?</CardTitle>
            <CardDescription className="text-center">
              Não se preocupe! Digite seu email e enviaremos um link para redefinir sua senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading || !email}
              >
                {isLoading ? 'Enviando...' : 'Enviar Link de Redefinição'}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Precisa de ajuda?</h4>
              <p className="text-blue-800 text-sm">
                Se você não conseguir acessar sua conta, entre em contato com nosso suporte 
                através do email <span className="font-medium">suporte@vehiclemarket.com</span>
              </p>
            </div>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Properties */}
        <div className="text-center mt-6">
          <Link
            href="/properties"
            className="text-foreground/60 hover:text-foreground text-sm"
          >
            ← Voltar para Imóveis
          </Link>
        </div>
      </div>
    </div>
  )
} 