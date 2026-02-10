import { NextRequest, NextResponse } from 'next/server';
import { stages } from '@/data/stages';
import { Stage } from '@/types/stage';
import { getStagesByDifficulty, getPopularStages } from '@/data/stages';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const difficulty = searchParams.get('difficulty');
    const popular = searchParams.get('popular');
    const limit = searchParams.get('limit');

    let results = [...stages];

    // Apply filters
    if (popular === 'true') {
      results = getPopularStages();
    }

    if (difficulty) {
      results = getStagesByDifficulty(difficulty as 'easy' | 'medium' | 'hard' | 'expert');
    }

    // Apply limit
    const limitNum = limit ? parseInt(limit) : undefined;
    if (limitNum) {
      results = results.slice(0, limitNum);
    }

    // Get unique values for filters
    const difficulties = [...new Set(stages.map((stage: Stage) => stage.difficulty))].sort();

    return NextResponse.json({
      success: true,
      data: {
        stages: results,
        total: results.length,
        filters: {
          difficulties,
        },
      },
    });

  } catch (error) {
    console.error('Stages API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}
