/**
 * Detecta a capacidade de performance do dispositivo para escolher o modelo 3D apropriado
 */
export const detectPerformanceLevel = (): 'low' | 'medium' | 'high' => {
  // Verifica se é mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Verifica memória disponível (se suportado)
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  
  // Verifica número de cores do processador
  const cores = navigator.hardwareConcurrency || 1;
  
  // Detecção básica de GPU
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
  let gpuInfo = '';
  
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      gpuInfo = (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string).toLowerCase();
    }
  }
  
  // Lógica de detecção
  if (isMobile || cores < 4 || (memory && memory < 4)) {
    return 'low';
  }
  
  if (cores >= 8 && (!memory || memory >= 8) && gpuInfo.includes('nvidia')) {
    return 'high';
  }
  
  return 'medium';
};

/**
 * Retorna configurações otimizadas baseadas no nível de performance
 */
export const getOptimizedSettings = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return {
        modelType: 'lite',
        shadows: false,
        antialias: false,
        dpr: [1, 1],
        environment: false,
        autoRotateSpeed: 1,
      };
    case 'medium':
      return {
        modelType: 'optimized',
        shadows: false,
        antialias: false,
        dpr: [1, 1.5],
        environment: true,
        autoRotateSpeed: 2,
      };
    case 'high':
      return {
        modelType: 'full',
        shadows: true,
        antialias: true,
        dpr: [1, 2],
        environment: true,
        autoRotateSpeed: 2,
      };
  }
};
