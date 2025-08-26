'use client'

import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Car, Menu, X, Sun, Moon, Building } from 'lucide-react'
import { useState } from 'react'
import { useBreakpoints } from '@/hooks/useMediaQuery'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isMobile } = useBreakpoints()
  const pathname = usePathname()

  const navigation = [
    { name: 'Imóveis', href: '/properties' },
    { name: 'Vendedora', href: '/sell' },
    { name: 'Preços', href: '/pricing' },
    { name: 'Painel', href: '/dashboard/cliente' },
    { name: 'Sobre', href: '/about' },
    { name: 'Contato', href: '/contact' },
  ]

  const isActive = (href: string) => {
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/properties" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">RealEstatePro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 rounded-md transition-all duration-200 ${
                      active
                        ? 'text-white font-medium'
                        : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                    }`}
                    style={active ? {
                      background: 'linear-gradient(to right, #a855f7, #7c3aed, #3b82f6)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient 3s ease infinite'
                    } : {}}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Theme Toggle and Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-foreground/60" />
              <Switch
                id="theme-toggle"
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
              <Moon className="h-4 w-4 text-foreground/60" />
              <Label htmlFor="theme-toggle" className="sr-only">
                Alternar tema
              </Label>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Cadastrar</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      active
                        ? 'text-white font-medium'
                        : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                    }`}
                    style={active ? {
                      background: 'linear-gradient(to right, #a855f7, #7c3aed, #3b82f6)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient 3s ease infinite'
                    } : {}}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/auth/login">Entrar</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/auth/register">Cadastrar</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 