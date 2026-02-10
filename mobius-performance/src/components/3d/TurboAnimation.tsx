'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Text } from '@react-three/drei';
import { Group } from 'three';
import { motion } from 'framer-motion';

interface TurboAnimationProps {
  className?: string;
  rpm?: number;
  boost?: number;
  showMetrics?: boolean;
  autoRotate?: boolean;
}

const TurboScene: React.FC<{ 
  rpm: number; 
  boost: number; 
  showMetrics: boolean;
}> = ({ rpm, boost, showMetrics }) => {
  const turbineRef = useRef<Group>(null);
  const particlesRef = useRef<Group>(null);

  // Animate based on RPM and boost
  useFrame((state) => {
    if (turbineRef.current) {
      // Turbine spinning speed based on RPM
      const spinSpeed = (rpm / 1000) * 0.1;
      turbineRef.current.rotation.z += spinSpeed;
    }

    if (particlesRef.current) {
      // Particle effects for exhaust flow
      particlesRef.current.children.forEach((particle, index) => {
        particle.position.x += 0.1;
        particle.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01;
        
        if (particle.position.x > 3) {
          particle.position.x = -1;
        }
      });
    }
  });

  return (
    <group>
      {/* Main turbo housing */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.3, 8, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      {/* Spinning turbine */}
      <group ref={turbineRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 8]} />
          <meshStandardMaterial color="#666" />
        </mesh>
        {/* Turbine blades */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 0.6,
              0,
              Math.sin((i / 8) * Math.PI * 2) * 0.6
            ]}
            rotation={[0, (i / 8) * Math.PI * 2, 0]}
          >
            <boxGeometry args={[0.1, 0.05, 0.4]} />
            <meshStandardMaterial color="#888" />
          </mesh>
        ))}
      </group>
      
      {/* Exhaust particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[-1 + i * 0.2, 0, 0]}>
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial 
              color="#ff6b35" 
              transparent 
              opacity={0.6 - i * 0.03}
            />
          </mesh>
        ))}
      </group>

      {/* Heat shimmer effect */}
      <mesh position={[2, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#ff4444" 
          transparent 
          opacity={0.3}
        />
      </mesh>

      {/* Metrics display */}
      {showMetrics && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black/80 text-white p-3 rounded-lg text-sm min-w-[200px]">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-gray-300">RPM</div>
                <div className="text-xl font-bold text-red-400">
                  {rpm.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-gray-300">Boost</div>
                <div className="text-xl font-bold text-blue-400">
                  {boost.toFixed(1)} bar
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Turbo Status: {rpm > 2000 ? 'Spooling' : 'Idle'}
            </div>
          </div>
        </Html>
      )}

      {/* Boost pressure visualization */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color={boost > 1.5 ? '#ff4444' : boost > 1 ? '#ffaa00' : '#44ff44'}
        anchorX="center"
        anchorY="middle"
      >
        {boost.toFixed(1)} BAR
      </Text>
    </group>
  );
};

const LoadingFallback: React.FC = () => (
  <mesh>
    <torusGeometry args={[1, 0.3, 8, 16]} />
    <meshStandardMaterial color="#e5e7eb" />
  </mesh>
);

export const TurboAnimation: React.FC<TurboAnimationProps> = ({
  className = '',
  rpm = 3000,
  boost = 1.2,
  showMetrics = true,
  autoRotate = false
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, -3]} intensity={0.5} color="#ff6b35" />

        {/* Environment */}
        <Environment
          preset="night"
          background={false}
          blur={0.8}
        />

        {/* Turbo Model */}
        <Suspense fallback={<LoadingFallback />}>
          <TurboScene 
            rpm={rpm} 
            boost={boost} 
            showMetrics={showMetrics}
          />
        </Suspense>

        {/* Ground Shadow */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={4}
          blur={1}
          far={2}
        />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          minDistance={2}
          maxDistance={6}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Performance Indicators */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Turbo Performance</h3>
          
          {/* RPM Gauge */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">RPM</span>
              <span className="text-sm font-medium">{rpm.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((rpm / 8000) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Boost Gauge */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Boost Pressure</span>
              <span className="text-sm font-medium">{boost.toFixed(1)} bar</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((boost / 2.5) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Status: {rpm > 2500 ? 'Active Boost' : rpm > 1500 ? 'Spooling' : 'Idle'}
            </span>
            <div className={`w-2 h-2 rounded-full ${
              rpm > 2500 ? 'bg-green-500' : 
              rpm > 1500 ? 'bg-yellow-500' : 'bg-gray-400'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
};
