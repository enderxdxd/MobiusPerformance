import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Nome, email e mensagem são obrigatórios' },
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

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // For now, we'll simulate the process

    console.log('Contact form submission:', {
      name,
      email,
      phone: body.phone,
      subject: body.subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you might:
    // - Send email using services like SendGrid, Resend, or Nodemailer
    // - Save to database (PostgreSQL, MongoDB, etc.)
    // - Add to CRM (HubSpot, Salesforce, etc.)
    // - Send notifications to team

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      data: {
        id: `contact_${Date.now()}`,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor. Tente novamente mais tarde.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint. Use POST to submit contact form.' },
    { status: 200 }
  );
}
