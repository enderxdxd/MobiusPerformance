import { NextRequest, NextResponse } from 'next/server';
import { cars, getFeaturedCars, getCarsByBrand, searchCars } from '@/data/cars/database';
import { Car } from '@/types/car';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const fuelType = searchParams.get('fuelType');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    let results = [...cars];

    // Apply filters
    if (featured === 'true') {
      results = getFeaturedCars();
    }

    if (brand) {
      results = getCarsByBrand(brand);
    }

    if (search) {
      results = searchCars(search);
    }

    if (category) {
      results = results.filter(car => car.category === category);
    }

    if (fuelType) {
      results = results.filter(car => car.fuelType === fuelType);
    }

    // Apply pagination
    const limitNum = limit ? parseInt(limit) : undefined;
    const offsetNum = offset ? parseInt(offset) : 0;

    if (limitNum) {
      results = results.slice(offsetNum, offsetNum + limitNum);
    }

    // Get unique values for filters
    const brands = [...new Set(cars.map((car: Car) => car.brand))].sort();
    const categories = [...new Set(cars.map((car: Car) => car.category))].sort();
    const fuelTypes = [...new Set(cars.map((car: Car) => car.fuelType))].sort();

    return NextResponse.json({
      success: true,
      data: {
        cars: results,
        total: results.length,
        filters: {
          brands,
          categories,
          fuelTypes,
        },
        pagination: {
          limit: limitNum,
          offset: offsetNum,
          hasMore: limitNum ? (offsetNum + limitNum) < cars.length : false,
        },
      },
    });

  } catch (error) {
    console.error('Cars API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}
