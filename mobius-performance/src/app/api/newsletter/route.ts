import { NextRequest, NextResponse } from 'next/server';
import { NewsletterSubscription } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterSubscription = await request.json();

    // Validate required fields
    const { email } = body;
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email é obrigatório' },
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

    // Generate subscription data
    const subscriptionData = {
      id: `newsletter_${Date.now()}`,
      email,
      name: body.name,
      interests: body.interests || [],
      source: body.source || 'website',
      timestamp: new Date().toISOString(),
      status: 'active',
    };

    console.log('Newsletter subscription:', subscriptionData);

    // In a real implementation, you would:
    // - Save to database
    // - Add to email marketing service (Mailchimp, ConvertKit, etc.)
    // - Send welcome email
    // - Track subscription analytics

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso! Obrigado por se juntar à nossa newsletter.',
      data: {
        id: subscriptionData.id,
        timestamp: subscriptionData.timestamp,
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor. Tente novamente mais tarde.' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email && !token) {
      return NextResponse.json(
        { success: false, error: 'Email ou token de cancelamento é obrigatório' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // - Validate unsubscribe token
    // - Remove from database
    // - Remove from email marketing service
    // - Log unsubscribe event

    console.log('Newsletter unsubscribe:', { email, token });

    return NextResponse.json({
      success: true,
      message: 'Inscrição cancelada com sucesso.',
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor. Tente novamente mais tarde.' 
      },
      { status: 500 }
    );
  }
}
