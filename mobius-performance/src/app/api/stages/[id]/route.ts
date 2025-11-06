import { NextRequest, NextResponse } from 'next/server';
import { getStageById } from '@/data/stages';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do stage é obrigatório' },
        { status: 400 }
      );
    }

    const stageId = parseInt(id);
    if (isNaN(stageId)) {
      return NextResponse.json(
        { success: false, error: 'ID do stage deve ser um número' },
        { status: 400 }
      );
    }

    const stage = getStageById(stageId);

    if (!stage) {
      return NextResponse.json(
        { success: false, error: 'Stage não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: stage,
    });

  } catch (error) {
    console.error('Stage API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}
