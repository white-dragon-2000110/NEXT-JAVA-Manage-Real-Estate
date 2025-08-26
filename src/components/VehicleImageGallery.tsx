'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react'
import Image from 'next/image'

interface VehicleImageGalleryProps {
  images: string[]
}

export function VehicleImageGallery({ images }: VehicleImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    setZoomLevel(1)
  }

  const increaseZoom = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const decreaseZoom = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5))
  }

  const closeZoom = () => {
    setIsZoomed(false)
    setZoomLevel(1)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] bg-muted">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
              <span className="text-foreground/40 text-lg">Imagem do Veículo</span>
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg cursor-pointer"
                    disabled={currentImageIndex === 0}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg cursor-pointer"
                    disabled={currentImageIndex === images.length - 1}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Zoom Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleZoom}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg cursor-pointer"
              >
                <ZoomIn className="h-5 w-5" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                index === currentImageIndex
                  ? 'border-primary scale-110'
                  : 'border-transparent hover:border-primary/50'
              }`}
            >
              <img
                src={image}
                alt={`Vehicle image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeZoom}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/80 rounded-full p-2 shadow-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={decreaseZoom}
                className="rounded-full p-1 cursor-pointer"
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="px-2 text-sm font-medium text-gray-800">
                {Math.round(zoomLevel * 100)}%
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={increaseZoom}
                className="rounded-full p-1 cursor-pointer"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoomed Image */}
            <div 
              className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease-in-out'
              }}
            >
              <span className="text-foreground/40 text-2xl">Imagem Ampliada</span>
            </div>

            {/* Navigation in Zoom */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 