import { NextRequest, NextResponse } from 'next/server';
import { QuoteRequest } from '@/types/api';
import { getCarById } from '@/data/cars/database';
import { getStageById } from '@/data/stages';

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json();

    // Validate required fields
    const { carId, stageId, customerInfo } = body;
    if (!carId || !stageId || !customerInfo) {
      return NextResponse.json(
        { success: false, error: 'Dados do veículo, stage e cliente são obrigatórios' },
        { status: 400 }
      );
    }

    // Validate customer info
    const { name, email, phone } = customerInfo;
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Nome, email e telefone são obrigatórios' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Get car and stage data
    const car = getCarById(carId);
    const stage = getStageById(stageId);

    if (!car) {
      return NextResponse.json(
        { success: false, error: 'Veículo não encontrado' },
        { status: 404 }
      );
    }

    if (!stage) {
      return NextResponse.json(
        { success: false, error: 'Stage não encontrado' },
        { status: 404 }
      );
    }

    // Calculate estimated price based on car and stage
    const basePrice = stage.price.min;
    const maxPrice = stage.price.max;
    
    // Price adjustments based on car characteristics
    let priceMultiplier = 1;
    if (car.category === 'luxury') priceMultiplier += 0.2;
    if (car.category === 'sport') priceMultiplier += 0.15;
    if (car.year < 2010) priceMultiplier += 0.1; // Older cars might need additional work

    const estimatedPrice = {
      min: Math.round(basePrice * priceMultiplier),
      max: Math.round(maxPrice * priceMultiplier),
    };

    // Generate quote ID
    const quoteId = `QUOTE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Calculate estimated performance gains
    let hpMultiplier = 1;
    let torqueMultiplier = 1;

    switch (stageId) {
      case 1:
        hpMultiplier = 1.20;
        torqueMultiplier = 1.25;
        break;
      case 2:
        hpMultiplier = 1.30;
        torqueMultiplier = 1.35;
        break;
      case 3:
        hpMultiplier = 1.50;
        torqueMultiplier = 1.55;
        break;
      case 4:
        hpMultiplier = 2.00;
        torqueMultiplier = 1.80;
        break;
    }

    const estimatedGains = {
      hp: {
        before: car.stockPower.hp,
        after: Math.round(car.stockPower.hp * hpMultiplier),
        gain: Math.round(car.stockPower.hp * (hpMultiplier - 1)),
        percentage: Math.round((hpMultiplier - 1) * 100),
      },
      torque: {
        before: car.stockPower.torque,
        after: Math.round(car.stockPower.torque * torqueMultiplier),
        gain: Math.round(car.stockPower.torque * (torqueMultiplier - 1)),
        percentage: Math.round((torqueMultiplier - 1) * 100),
      },
    };

    const quoteData = {
      id: quoteId,
      car: {
        id: car.id,
        brand: car.brand,
        model: car.model,
        year: car.year,
        engine: car.engine,
      },
      stage: {
        id: stage.id,
        name: stage.name,
        title: stage.title,
        duration: stage.duration,
        warranty: stage.warranty,
      },
      customer: customerInfo,
      pricing: {
        estimated: estimatedPrice,
        currency: 'BRL',
        includes: stage.price.includes,
        excludes: stage.price.excludes,
      },
      performance: estimatedGains,
      timestamp: new Date().toISOString(),
      status: 'pending',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    };

    console.log('Quote request generated:', quoteData);

    // In a real implementation, you would:
    // - Save quote to database
    // - Send confirmation email to customer
    // - Notify sales team
    // - Schedule follow-up

    return NextResponse.json({
      success: true,
      message: 'Orçamento gerado com sucesso! Enviaremos os detalhes por email.',
      data: quoteData,
    });

  } catch (error) {
    console.error('Quote generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor. Tente novamente mais tarde.' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const quoteId = searchParams.get('id');

  if (!quoteId) {
    return NextResponse.json(
      { success: false, error: 'ID do orçamento é obrigatório' },
      { status: 400 }
    );
  }

  // In a real implementation, you would fetch from database
  // For now, return a mock response
  return NextResponse.json({
    success: true,
    message: 'Quote API endpoint. Use POST to generate quote or GET with ID to retrieve.',
    data: {
      id: quoteId,
      status: 'pending',
      message: 'Quote retrieval not implemented in demo',
    }
  });
}
