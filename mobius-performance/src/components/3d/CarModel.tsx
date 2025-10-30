'use client'

import React, { Suspense, useMemo, useCallback, useState, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Preload, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor, Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Assumindo que você tem estes componentes
// import { NissanGTR } from './NissanGTR'
// import { NissanGTROptimized } from './NissanGTROptimized'
// import { NissanGTRLite } from './NissanGTRLite'

interface CarModelProps {
  carId: string
  className?: string
  autoRotate?: boolean
  enableControls?: boolean
  showEnvironment?: boolean
  cameraPosition?: [number, number, number]
  quality?: 'low' | 'medium' | 'high'
  environmentPreset?: Parameters<typeof Environment>[0]['preset']
  lazy?: boolean
}

// Componente de fallback - carro simples para quando o modelo não carrega
const FallbackCar = ({ position = [0, -1, 0] }: { position?: [number, number, number] }) => (
  <group position={position}>
    <group scale={0.8}>
      {/* Corpo principal */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.8, 1.8]} />
        <meshStandardMaterial color="#ff0000" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Teto/cabine */}
      <mesh position={[0, 1.2, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.6, 1.2]} />
        <meshStandardMaterial color="#cc0000" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Janelas */}
      <mesh position={[0, 1.2, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.5, 1.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>
      
      {/* Rodas */}
      {([
        [-1.3, 0, 1.0],   // Frente esquerda
        [1.3, 0, 1.0],    // Frente direita
        [-1.3, 0, -0.8],  // Traseira esquerda
        [1.3, 0, -0.8]    // Traseira direita
      ] as const).map((pos, i) => (
        <group key={i} position={pos}>
          {/* Pneu */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
          </mesh>
          {/* Aro */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.08]} castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.08, 16]} />
            <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
      
      {/* Faróis */}
      <mesh position={[0.8, 0.6, 0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffff99" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.8, 0.6, 0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffff99" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Lanternas traseiras */}
      <mesh position={[0.6, 0.6, -0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.6, 0.6, -0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Debug info */}
      <Html center>
        <div style={{ 
          background: 'rgba(255,0,0,0.8)', 
          color: 'white', 
          padding: '8px 12px', 
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 'bold',
          transform: 'translateY(-100px)',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}>
          <div>🏎️ NISSAN GT-R R35</div>
          <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
            Modelo 3D Indisponível - Usando Fallback
          </div>
        </div>
      </Html>
    </group>
  </group>
);

// Componente universal que funciona com qualquer GLTF
const NissanGTRUniversal = ({ 
  scale = 1, 
  position = [0, -1, 0], 
  rotation = [0, 0, 0],
  autoRotate = false,
}: {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Carregar o GLTF
  const { scene } = useGLTF('/nissan_aimgain_gt_r35_type2/scene.gltf') as any;

  // Auto-rotação
  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  // Processar a cena uma única vez
  const processedScene = useMemo(() => {
    if (!scene) {
      console.warn('❌ Scene não encontrada no GLTF');
      return null;
    }

    console.log('🎬 Processando cena GLTF...');
    
    // Clonar a cena para não afetar a original
    const clonedScene = scene.clone();
    
    let meshCount = 0;

    // Percorrer todos os objetos na cena
    clonedScene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        meshCount++;
        
        // Garantir que tem sombra
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Se não tem material, aplicar um padrão
        if (!mesh.material) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#ff0000',
            metalness: 0.7,
            roughness: 0.3
          });
        }
      }
    });

    console.log(`✅ Processamento completo: ${meshCount} meshes`);
    return clonedScene;
  }, [scene]);

  if (!processedScene) {
    return <FallbackCar position={position} />;
  }

  return (
    <group 
      ref={groupRef}
      position={position} 
      scale={scale} 
      rotation={rotation}
      dispose={null}
    >
      <primitive object={processedScene} />
      
      {/* Iluminação adicional */}
      <pointLight position={[5, 5, 5]} intensity={0.3} />
      <pointLight position={[-5, 5, -5]} intensity={0.2} />
    </group>
  );
};

const CarModelScene: React.FC<{ carId: string }> = ({ carId }) => {
  console.log('🚗 CarModelScene renderizando com carId:', carId);

  return (
    <ErrorBoundary fallback={<FallbackCar position={[0, -1, 0]} />}>
      <NissanGTRUniversal 
        scale={1} 
        position={[0, -1, 0]} 
        autoRotate={true}
      />
    </ErrorBoundary>
  );
}

// Error Boundary simples
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('❌ GLTF Error capturado pelo ErrorBoundary:', error);
    console.error('📍 Error Info:', errorInfo);
    console.error('🔍 Stack:', error.stack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const LoadingFallback: React.FC = () => (
  <group>
    <mesh>
      <boxGeometry args={[3, 1.5, 1.5]} />
      <meshStandardMaterial color="#666666" wireframe />
    </mesh>
    <Html center>
      <div style={{ 
        color: '#666', 
        fontSize: '12px',
        textAlign: 'center',
        transform: 'translateY(50px)'
      }}>
        Carregando componente 3D...
      </div>
    </Html>
  </group>
)

const Controls: React.FC<{ autoRotate: boolean; enableControls: boolean }> = ({ autoRotate, enableControls }) => {
  const { invalidate } = useThree()
  
  if (!enableControls) return null
  
  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableZoom
      enableRotate
      minDistance={3}
      maxDistance={15}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
      autoRotate={autoRotate}
      autoRotateSpeed={1}
      onChange={() => invalidate()}
    />
  )
}

const ErrorFallback: React.FC<{ 
  onRetry: () => void; 
  onSafeMode: () => void; 
  contextLossCount: number;
  safeMode: boolean;
}> = ({ onRetry, onSafeMode, contextLossCount, safeMode }) => (
  <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg">
    <div className="text-center p-6">
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {contextLossCount > 0 ? 'WebGL Context Lost' : 'Erro ao Carregar Modelo 3D'}
      </h3>
      
      {contextLossCount > 1 && (
        <div className="bg-red-100 border border-red-300 rounded p-2 mb-3">
          <p className="text-red-700 text-xs">
            ⚠️ Context perdido {contextLossCount}x - GPU sobrecarregada
          </p>
        </div>
      )}
      
      <p className="text-gray-600 mb-4 text-sm">
        {contextLossCount > 1 
          ? "Múltiplas perdas detectadas. Recomendamos Modo Seguro."
          : "O modelo 3D pode não estar disponível ou houve um erro de carregamento."
        }<br/>
        Tente uma das opções abaixo:
      </p>
      
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
        >
          🔄 Tentar Novamente
        </button>
        <button 
          onClick={onSafeMode}
          className={`px-4 py-2 text-white rounded transition-colors text-sm ${
            contextLossCount > 1 
              ? 'bg-orange-600 hover:bg-orange-700 animate-pulse' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          🛡️ Modo Seguro {contextLossCount > 1 ? '(Recomendado)' : ''}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        Modo Seguro: modelo fallback + sem environment{safeMode ? ' (Ativo)' : ''}
      </p>
    </div>
  </div>
)

// Hook para IntersectionObserver
const useIntersectionObserver = (lazy: boolean = false) => {
  const [isVisible, setIsVisible] = useState(!lazy)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lazy || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [lazy])

  return { ref, isVisible }
}

export const CarModel: React.FC<CarModelProps> = ({
  carId,
  className = '',
  autoRotate = true,
  enableControls = true,
  showEnvironment = true,
  cameraPosition = [4, 2, 6],
  quality = 'medium',
  environmentPreset = 'city',
  lazy = false,
}) => {
  const [hasError, setHasError] = useState(false)
  const [retryKey, setRetryKey] = useState(0)
  const [currentQuality, setCurrentQuality] = useState(quality)
  const [safeMode, setSafeMode] = useState(false)
  const [contextLossCount, setContextLossCount] = useState(0)
  
  // IntersectionObserver para lazy loading
  const { ref: containerRef, isVisible } = useIntersectionObserver(lazy)

  // Detectar mobile para otimizações automáticas
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  }, [])

  const perf = useMemo(() => {
    const actualQuality = isMobile ? 'low' : currentQuality
    if (actualQuality === 'low') return { dpr: [1, 1] as [number, number], aa: false, shadows: false as const, blur: 1.2 }
    if (actualQuality === 'high') return { dpr: [1, 1.25] as [number, number], aa: false, shadows: false as const, blur: 0.8 }
    return { dpr: [1, 1.25] as [number, number], aa: false, shadows: false as const, blur: 1.0 }
  }, [currentQuality, isMobile])

  const handleContextLoss = useCallback((event: Event) => {
    event.preventDefault()
    console.warn('WebGL context lost:', event)
    
    setContextLossCount(prev => prev + 1)
    setHasError(true)
    
    if (contextLossCount >= 1) {
      console.warn('Multiple context losses detected, enabling safe mode automatically')
      setSafeMode(true)
      setCurrentQuality('low')
    }
    
    console.log('Context loss details:', {
      timestamp: Date.now(),
      carId,
      quality: currentQuality,
      isMobile,
      safeMode,
      lossCount: contextLossCount + 1
    })
  }, [carId, currentQuality, isMobile, safeMode, contextLossCount])

  const handleContextRestore = useCallback((event: Event) => {
    console.log('WebGL context restored:', event)
    setHasError(false)
  }, [])

  const handleRetry = useCallback(() => {
    setHasError(false)
    setRetryKey(prev => prev + 1)
  }, [])

  const handleSafeMode = useCallback(() => {
    setSafeMode(true)
    setCurrentQuality('low')
    setHasError(false)
    setRetryKey(prev => prev + 1)
  }, [])

  // Pausar quando a aba fica oculta
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Opcional: pausar auto-rotate quando oculto
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Auto-recovery timeout para casos extremos
  useEffect(() => {
    if (!hasError) return

    const timeout = setTimeout(() => {
      console.log('Auto-recovery timeout: enabling safe mode')
      setSafeMode(true)
      setCurrentQuality('low')
      setHasError(false)
      setRetryKey(prev => prev + 1)
    }, 10000)

    return () => clearTimeout(timeout)
  }, [hasError])

  const handleCanvasCreated = useCallback(({ gl, scene }: { gl: THREE.WebGLRenderer; scene: THREE.Scene }) => {
    const canvas = gl.domElement
    canvas.addEventListener('webglcontextlost', handleContextLoss)
    canvas.addEventListener('webglcontextrestored', handleContextRestore)

    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    gl.outputColorSpace = THREE.SRGBColorSpace
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.0
    scene.background = null

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLoss)
      canvas.removeEventListener('webglcontextrestored', handleContextRestore)
    }
  }, [handleContextLoss, handleContextRestore])

  const handlePerformanceDecline = useCallback(() => {
    console.warn('Performance decline detected, switching to low quality')
    setCurrentQuality('low')
  }, [])

  if (hasError) {
    return (
      <ErrorFallback 
        onRetry={handleRetry} 
        onSafeMode={handleSafeMode}
        contextLossCount={contextLossCount}
        safeMode={safeMode}
      />
    )
  }

  // Lazy loading - só renderiza quando visível
  if (lazy && !isVisible) {
    return (
      <div ref={containerRef} className={`w-full h-full ${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <div className="text-center p-6">
          <div className="text-2xl mb-2">🏎️</div>
          <p className="text-gray-600 text-sm">Scroll para carregar o modelo 3D</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <Canvas
        key={retryKey}
        frameloop="demand"
        camera={{ position: cameraPosition, fov: 40 }}
        shadows={false}
        dpr={perf.dpr}
        gl={{ 
          antialias: false,
          alpha: false,
          stencil: false,
          depth: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={handleCanvasCreated}
      >
        <PerformanceMonitor onDecline={handlePerformanceDecline} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Luzes otimizadas */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 10, 5]} intensity={0.8} />
        <spotLight position={[-8, 10, -5]} intensity={0.3} angle={0.3} penumbra={1} />

        {/* Environment só se não for mobile e não estiver em safe mode */}
        {showEnvironment && !isMobile && !safeMode && (
          <Environment preset={environmentPreset} background={false} blur={perf.blur} />
        )}

        <Suspense fallback={<LoadingFallback />}>
          <CarModelScene carId={carId} />
          <Preload all />
        </Suspense>

        {/* Contact shadow */}
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.4}
          scale={12}
          blur={2.5}
          far={3}
        />

        <Controls autoRotate={autoRotate} enableControls={enableControls} />
      </Canvas>
      
      {/* Debug info overlay - Atualizado */}
      <div className="absolute top-2 left-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        <div>📊 Debug Info:</div>
        <div>Car ID: {carId}</div>
        <div>Quality: {currentQuality}</div>
        <div>Safe Mode: {safeMode ? '✅' : '❌'}</div>
        <div>Mobile: {isMobile ? '📱' : '💻'}</div>
        <div>DPR: {perf.dpr[0]}-{perf.dpr[1]}</div>
        <div>GLTF: Tentando carregar...</div>
      </div>
      
      {/* Instruções do usuário */}
      <div className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-70 text-white px-3 py-2 rounded">
        <div>🖱️ Arraste para girar</div>
        <div>🔍 Scroll para zoom</div>
        <div>🔄 Auto-rotate: {autoRotate ? 'ON' : 'OFF'}</div>
      </div>
    </div>
  )
}

// Preload do GLTF
if (typeof window !== 'undefined') {
  useGLTF.preload('/nissan_aimgain_gt_r35_type2/scene.gltf');
}