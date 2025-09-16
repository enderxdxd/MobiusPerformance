'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

interface CarModelProps {
  carId: string;
  className?: string;
  autoRotate?: boolean;
  enableControls?: boolean;
  showEnvironment?: boolean;
  cameraPosition?: [number, number, number];
}

const CarModelScene: React.FC<{ carId: string; autoRotate?: boolean }> = ({ 
  carId, 
  autoRotate = true 
}) => {
  // Simple placeholder car model
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>
      {/* Wheels */}
      <mesh position={[-1.2, -0.8, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.2, -0.8, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1.2, -0.8, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.2, -0.8, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Windows */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 0.8, 1.8]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

const LoadingFallback: React.FC = () => (
  <mesh>
    <boxGeometry args={[2, 1, 4]} />
    <meshStandardMaterial color="#e5e7eb" />
  </mesh>
);

export const CarModel: React.FC<CarModelProps> = ({
  carId,
  className = '',
  autoRotate = true,
  enableControls = true,
  showEnvironment = true,
  cameraPosition = [4, 2, 6]
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Environment */}
        {showEnvironment && (
          <Environment
            preset="sunset"
            background={false}
            blur={0.8}
          />
        )}

        {/* Car Model */}
        <Suspense fallback={<LoadingFallback />}>
          <CarModelScene carId={carId} autoRotate={autoRotate} />
        </Suspense>

        {/* Ground Shadow */}
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.75}
          scale={10}
          blur={2.5}
          far={4}
        />

        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
          />
        )}
      </Canvas>
    </div>
  );
};
