export function formatHP(hp: number): string {
  return `${hp.toLocaleString('pt-BR')} HP`;
}

export function formatTorque(torque: number): string {
  return `${torque.toLocaleString('pt-BR')} Nm`;
}

export function formatRPM(rpm: number): string {
  return `${rpm.toLocaleString('pt-BR')} RPM`;
}

export function formatAcceleration(seconds: number): string {
  return `${seconds.toFixed(1)}s`;
}

export function formatSpeed(speed: number): string {
  return `${speed} km/h`;
}

export function formatDisplacement(displacement: number): string {
  if (displacement >= 1000) {
    return `${(displacement / 1000).toFixed(1)}L`;
  }
  return `${displacement}cc`;
}

export function formatYear(year: number): string {
  return year.toString();
}

export function formatPrice(price: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceRange(min: number, max: number, currency = 'BRL'): string {
  return `${formatPrice(min, currency)} - ${formatPrice(max, currency)}`;
}

export function formatPercentage(percentage: number): string {
  return `+${percentage}%`;
}

export function formatGain(gain: number, unit: string): string {
  return `+${gain.toLocaleString('pt-BR')} ${unit}`;
}

export function formatDuration(duration: string): string {
  return duration;
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('pt-BR');
}
