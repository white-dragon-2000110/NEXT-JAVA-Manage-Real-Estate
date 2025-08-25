'use client'

import Link from 'next/link'
import { Building, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'Sobre Nós', href: '/about' },
      { name: 'Carreiras', href: '/careers' },
      { name: 'Imprensa', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    services: [
      { name: 'Comprar Imóveis', href: '/properties' },
      { name: 'Vender Imóveis', href: '/sell' },
      { name: 'Financiamento', href: '/financing' },
      { name: 'Seguros', href: '/insurance' },
    ],
    support: [
      { name: 'Central de Ajuda', href: '/help' },
      { name: 'Contato', href: '/contact' },
      { name: 'FAQ', href: '/faqs' },
      { name: 'Chat ao Vivo', href: '/chat' },
    ],
    legal: [
      { name: 'Política de Privacidade', href: '/privacy' },
      { name: 'Termos de Uso', href: '/terms' },
      { name: 'Política de Cookies', href: '/cookies' },
      { name: 'LGPD', href: '/lgpd' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ]

  return (
    <footer className="bg-background border-t border-border">
      <div className="ml-64 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">RealEstatePro</span>
            </div>
            <p className="text-foreground/70 mb-4 max-w-md">
              Sua plataforma confiável para comprar, vender e alugar imóveis. Encontre o imóvel 
              dos seus sonhos com segurança e transparência.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-foreground/70">
                <Mail className="h-4 w-4" />
                <span>contato@realestatepro.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/70">
                <Phone className="h-4 w-4" />
                <span>+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/70">
                <MapPin className="h-4 w-4" />
                <span>Av. Paulista, 1000, São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-foreground/70 text-sm">
              © {currentYear} RealEstatePro. Todos os direitos reservados.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-foreground/70 hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 