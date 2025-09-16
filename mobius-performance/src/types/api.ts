export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  carBrand: string;
  carModel: string;
  carYear: number;
  service: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

export interface QuoteRequest {
  carId: string;
  stageId: number;
  stages: number[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  additionalServices?: string[];
  notes?: string;
}

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  interests: string[];
  source: string;
}

export interface ServiceRequest {
  id: string;
  type: 'quote' | 'appointment' | 'consultation';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  customerInfo: ContactFormData;
  requestedDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
