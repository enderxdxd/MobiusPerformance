'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { useModelInteraction } from '@/lib/hooks/use3DModel';
import { Button } from '@/components/ui/Button';
import { RotateCcw, ZoomIn, ZoomOut, Info } from 'lucide-react';

interface EngineViewerProps {
  engineType: string;
  className?: string;
  showControls?: boolean;
  showInfo?: boolean;
}

const EngineScene: React.FC<{ 
  engineType: string; 
  onPartClick: (partName: string) => void;
}> = ({ engineType, onPartClick }) => {
  const { 
    hoveredObject, 
    selectedObject, 
    handlePointerOver, 
    handlePointerOut, 
    handleClick 
  } = useModelInteraction();

  // Simple engine placeholder
  return (
    <group>
      {/* Engine block */}
      <mesh 
        position={[0, 0, 0]}
        onPointerOver={() => handlePointerOver('engine')}
        onPointerOut={handlePointerOut}
        onClick={() => {
          handleClick('engine');
          onPartClick('engine');
        }}
      >
        <boxGeometry args={[2, 1.5, 1.5]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      {/* Turbo */}
      <mesh 
        position={[1.5, 0.5, 0]}
        onPointerOver={() => handlePointerOver('turbo')}
        onPointerOut={handlePointerOut}
        onClick={() => {
          handleClick('turbo');
          onPartClick('turbo');
        }}
      >
        <torusGeometry args={[0.3, 0.15, 8, 16]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      
      {/* Intercooler */}
      <mesh 
        position={[-1.5, 0, 0]}
        onPointerOver={() => handlePointerOver('intercooler')}
        onPointerOut={handlePointerOut}
        onClick={() => {
          handleClick('intercooler');
          onPartClick('intercooler');
        }}
      >
        <boxGeometry args={[0.5, 1, 1.2]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      
      {/* Intake manifold */}
      <mesh 
        position={[0, 1, 0]}
        onPointerOver={() => handlePointerOver('intake')}
        onPointerOut={handlePointerOut}
        onClick={() => {
          handleClick('intake');
          onPartClick('intake');
        }}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.8, 8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Hover indicator */}
      {hoveredObject && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black text-white px-2 py-1 rounded text-sm">
            {hoveredObject}
          </div>
        </Html>
      )}
    </group>
  );
};

const LoadingFallback: React.FC = () => (
  <mesh>
    <cylinderGeometry args={[1, 1, 2, 8]} />
    <meshStandardMaterial color="#e5e7eb" />
  </mesh>
);

export const EngineViewer: React.FC<EngineViewerProps> = ({
  engineType,
  className = '',
  showControls = true,
  showInfo = true
}) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([3, 2, 3]);

  const handlePartClick = (partName: string) => {
    setSelectedPart(partName);
  };

  const resetCamera = () => {
    setCameraPosition([3, 2, 3]);
  };

  const zoomIn = () => {
    setCameraPosition(prev => [prev[0] * 0.8, prev[1] * 0.8, prev[2] * 0.8]);
  };

  const zoomOut = () => {
    setCameraPosition(prev => [prev[0] * 1.2, prev[1] * 1.2, prev[2] * 1.2]);
  };

  const engineParts = {
    'turbo': 'Turbocompressor - Aumenta a pressão do ar admitido',
    'intercooler': 'Intercooler - Resfria o ar comprimido pelo turbo',
    'intake': 'Coletor de Admissão - Distribui ar para os cilindros',
    'exhaust': 'Coletor de Escape - Coleta gases dos cilindros',
    'engine': 'Bloco do Motor - Componente principal',
    'pistons': 'Pistões - Convertem pressão em movimento',
    'crankshaft': 'Virabrequim - Converte movimento linear em rotativo'
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.3} />

        {/* Environment */}
        <Environment
          preset="warehouse"
          background={false}
          blur={0.5}
        />

        {/* Engine Model */}
        <Suspense fallback={<LoadingFallback />}>
          <EngineScene 
            engineType={engineType} 
            onPartClick={handlePartClick}
          />
        </Suspense>

        {/* Ground Shadow */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.5}
          scale={5}
          blur={1}
          far={2}
        />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* UI Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={resetCamera}
            className="bg-white/90 backdrop-blur-sm"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={zoomIn}
            className="bg-white/90 backdrop-blur-sm"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={zoomOut}
            className="bg-white/90 backdrop-blur-sm"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Part Information */}
      {showInfo && selectedPart && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 capitalize">
                {selectedPart}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {engineParts[selectedPart as keyof typeof engineParts] || 
                 'Componente do motor - Clique em outras partes para mais informações'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
        Clique e arraste para rotacionar • Scroll para zoom
      </div>
    </div>
  );
};
