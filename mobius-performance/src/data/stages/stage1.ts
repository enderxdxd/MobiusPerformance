import { Stage } from '@/types/stage';

export const stage1: Stage = {
  id: 1,
  name: 'Stage 1',
  title: 'Reprogramação ECU',
  description: 'Otimização do mapeamento original do motor através de reprogramação da ECU, mantendo todos os componentes originais.',
  shortDescription: 'Reprogramação ECU para máxima performance com peças originais',
  icon: '/icons/stage1.svg',
  color: '#3B82F6',
  modifications: [
    {
      id: 'ecu-remap',
      name: 'Reprogramação ECU',
      description: 'Otimização completa do mapeamento de ignição, injeção e boost',
      category: 'software',
      required: true,
    },
    {
      id: 'dyno-tune',
      name: 'Acerto em Dinamômetro',
      description: 'Ajuste fino no dinamômetro para máxima performance',
      category: 'software',
      required: true,
    },
  ],
  requirements: [
    'Motor em bom estado',
    'Manutenção em dia',
    'Combustível de qualidade',
  ],
  benefits: [
    'Ganho de 15-25% de potência',
    'Melhora no torque em baixas rotações',
    'Resposta mais rápida do acelerador',
    'Economia de combustível em condução normal',
    'Mantém garantia do motor*',
  ],
  price: {
    min: 800,
    max: 1500,
    currency: 'BRL',
    includes: [
      'Reprogramação ECU',
      'Teste em dinamômetro',
      'Certificado de performance',
      'Garantia de 2 anos',
    ],
  },
  duration: '4-6 horas',
  warranty: '2 anos ou 40.000 km',
  popularity: 95,
  difficulty: 'easy',
  reversible: true,
};
