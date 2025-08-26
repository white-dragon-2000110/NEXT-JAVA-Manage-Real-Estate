'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Share2, MessageCircle, Calendar, BarChart3, Star } from 'lucide-react'

interface Vehicle {
  id: string
  title: string
  price: number
}

interface VehicleActionsProps {
  vehicle: Vehicle
}

export function VehicleActions({ vehicle }: VehicleActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInComparison, setIsInComparison] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const toggleComparison = () => {
    setIsInComparison(!isInComparison)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle.title,
        text: `Confira este veículo: ${vehicle.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const handleChat = () => {
    // Implement chat functionality
    console.log('Opening chat with seller for vehicle:', vehicle.id)
  }

  const handleScheduleVisit = () => {
    // Implement scheduling functionality
    console.log('Scheduling visit for vehicle:', vehicle.id)
  }

  const handleCompare = () => {
    // Implement comparison functionality
    console.log('Adding vehicle to comparison:', vehicle.id)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Primary Actions */}
        <div className="space-y-3">
          <Button 
            onClick={handleChat}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </Button>
          
          <Button 
            onClick={handleScheduleVisit}
            variant="outline"
            className="flex-1 cursor-pointer"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Agendar Visita
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={toggleFavorite}
            variant="outline"
            className={`flex-1 transition-colors cursor-pointer ${
              isFavorite ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : ''
            }`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Favorito' : 'Favoritar'}
          </Button>

          <Button
            onClick={toggleComparison}
            variant="outline"
            className={`flex-1 transition-colors cursor-pointer ${
              isInComparison ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' : ''
            }`}
          >
            <BarChart3 className={`h-4 w-4 mr-2 ${isInComparison ? 'fill-current' : ''}`} />
            {isInComparison ? 'Comparando' : 'Comparar'}
          </Button>
        </div>

        {/* Share Button */}
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex-1 cursor-pointer"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Compartilhar
        </Button>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-foreground/60">Visualizações</div>
              <div className="font-semibold text-foreground">1.247</div>
            </div>
            <div>
              <div className="text-foreground/60">Favoritos</div>
              <div className="font-semibold text-foreground">89</div>
            </div>
            <div>
              <div className="text-foreground/60">Avaliação</div>
              <div className="flex items-center justify-center">
                <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                <span className="font-semibold text-foreground">4.8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Veículo Verificado
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 