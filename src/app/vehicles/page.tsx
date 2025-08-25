'use client';

import { RootLayout } from '@/layouts/RootLayout'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Star, MapPin, Calendar, Filter, Search } from 'lucide-react'
import { GridSkeleton } from '@/components/ui/loading-spinner'
import { useEffect, useState } from 'react'

const vehicles = [
  {
    id: '1',
    title: '2022 Tesla Model 3',
    price: 45000,
    location: 'San Francisco, CA',
    year: 2022,
    mileage: 15000,
    rating: 4.8,
    type: 'car'
  },
  {
    id: '2',
    title: '2021 Ford F-150 Lariat',
    price: 52000,
    location: 'Austin, TX',
    year: 2021,
    mileage: 28000,
    rating: 4.6,
    type: 'truck'
  },
  {
    id: '3',
    title: '2023 Honda CBR600RR',
    price: 12000,
    location: 'Miami, FL',
    year: 2023,
    mileage: 5000,
    rating: 4.9,
    type: 'motorcycle'
  },
  {
    id: '4',
    title: '2020 BMW X5 xDrive40i',
    price: 58000,
    location: 'Seattle, WA',
    year: 2020,
    mileage: 32000,
    rating: 4.7,
    type: 'car'
  },
  {
    id: '5',
    title: '2021 Toyota Camry XSE',
    price: 28000,
    location: 'Chicago, IL',
    year: 2021,
    mileage: 22000,
    rating: 4.5,
    type: 'car'
  },
  {
    id: '6',
    title: '2022 Harley-Davidson Street Glide',
    price: 25000,
    location: 'Denver, CO',
    year: 2022,
    mileage: 8000,
    rating: 4.8,
    type: 'motorcycle'
  }
]

export default function VehiclesPage() {
  const [isContentLoading, setIsContentLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsContentLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage)
  }

  return (
    <RootLayout>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">Encontre o Veículo Perfeito</h1>
            <p className="text-foreground/70">Navegue por nossa coleção completa de veículos</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search vehicles..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="lg:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Vehicle Grid */}
          {isContentLoading ? (
            <GridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-foreground/40 text-sm">Vehicle Image</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="absolute top-2 right-2">
                        {vehicle.type.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-lg line-clamp-2">
                        {vehicle.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm text-foreground/70">{vehicle.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-foreground/70">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{vehicle.year}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="truncate">{vehicle.location}</span>
                      </div>
                      <div className="text-foreground/60">
                        {formatMileage(vehicle.mileage)} miles
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <div className="w-full">
                      <div className="text-2xl font-bold text-primary mb-3">
                        {formatPrice(vehicle.price)}
                      </div>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 