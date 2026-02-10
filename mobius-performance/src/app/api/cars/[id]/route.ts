import { NextRequest, NextResponse } from 'next/server';
import { getCarById } from '@/data/cars/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do veículo é obrigatório' },
        { status: 400 }
      );
    }

    const car = getCarById(id);

    if (!car) {
      return NextResponse.json(
        { success: false, error: 'Veículo não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: car,
    });

  } catch (error) {
    console.error('Car API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}
