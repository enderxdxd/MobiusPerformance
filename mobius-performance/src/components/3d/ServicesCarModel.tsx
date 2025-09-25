'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ServicesNissanGTRProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function ServicesNissanGTR({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: ServicesNissanGTRProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/nissan_aimgain_gt_r35_type2/scene.gltf') as any;
  
  // Auto-rotação suave
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2; // Rotação bem lenta
    }
  });
  
  return (
    <group ref={groupRef} scale={scale} position={position} rotation={rotation} dispose={null}>
      <group rotation={[0, 0, 0]}> 
        <group scale={0.01}>
          {/* Corpo principal do carro - versão simplificada para performance */}
          {[12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 72, 84].map((objNum) => (
            nodes[`Object_${objNum}`]?.geometry && (
              <mesh
                key={objNum}
                castShadow
                receiveShadow
                geometry={nodes[`Object_${objNum}`].geometry}
                material={materials[Object.keys(materials)[objNum % Object.keys(materials).length]]}
                position={[0, -0.034, 0]}
              />
            )
          ))}

          {/* Janelas */}
          <group position={[0, -0.034, 0]}>
            {[88, 91, 94].map((objNum) => (
              nodes[`Object_${objNum}`]?.geometry && (
                <mesh
                  key={objNum}
                  castShadow
                  receiveShadow
                  geometry={nodes[`Object_${objNum}`].geometry}
                  material={materials[Object.keys(materials)[objNum % Object.keys(materials).length]]}
                />
              )
            ))}
          </group>

          {/* Rodas simplificadas */}
          <group position={[0.855, 0.353, 1.424]} rotation={[0, 0, 0.026]}>
            {[128, 132, 136, 140].map((objNum) => (
              nodes[`Object_${objNum}`]?.geometry && (
                <mesh
                  key={objNum}
                  castShadow
                  receiveShadow
                  geometry={nodes[`Object_${objNum}`].geometry}
                  material={materials.NNissan_GTRNismoNRewardRecycled_2017_Wheel1A_3D_3DWheel1_d95be4f1 || Object.values(materials)[0]}
                />
              )
            ))}
          </group>

          <group position={[-0.855, 0.353, 1.424]} rotation={[Math.PI, 0, -3.115]}>
            {[351, 355, 359, 363].map((objNum) => (
              nodes[`Object_${objNum}`]?.geometry && (
                <mesh
                  key={objNum}
                  castShadow
                  receiveShadow
                  geometry={nodes[`Object_${objNum}`].geometry}
                  material={materials.NNissan_GTRNismoNRewardRecycled_2017_Wheel1A_3D_3DWheel1_d95be4f1 || Object.values(materials)[0]}
                />
              )
            ))}
          </group>

          <group position={[0.897, 0.348, -1.348]} rotation={[0, 0, 0.052]}>
            {[622, 626, 630, 634].map((objNum) => (
              nodes[`Object_${objNum}`]?.geometry && (
                <mesh
                  key={objNum}
                  castShadow
                  receiveShadow
                  geometry={nodes[`Object_${objNum}`].geometry}
                  material={materials.NNissan_GTRNismoNRewardRecycled_2017_Wheel1A_3D_3DWheel1_d95be4f1 || Object.values(materials)[0]}
                />
              )
            ))}
          </group>

          <group position={[-0.897, 0.348, -1.348]} rotation={[Math.PI, 0, -3.089]}>
            {[853, 857, 861, 865].map((objNum) => (
              nodes[`Object_${objNum}`]?.geometry && (
                <mesh
                  key={objNum}
                  castShadow
                  receiveShadow
                  geometry={nodes[`Object_${objNum}`].geometry}
                  material={materials.NNissan_GTRNismoNRewardRecycled_2017_Wheel1A_3D_3DWheel1_d95be4f1 || Object.values(materials)[0]}
                />
              )
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}

// Componente de loading
function LoadingCar() {
  return (
    <mesh>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color="#666" wireframe />
    </mesh>
  );
}

// Componente principal para a seção de serviços
export function ServicesCarModel() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ 
          position: [6, 3, 6], 
          fov: 45,
        }}
        shadows
        style={{ background: 'transparent' }}
      >
        {/* Iluminação clara e bem distribuída */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 15, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-8, 10, -8]} intensity={0.6} />
        <pointLight position={[0, 8, 0]} intensity={0.4} />
        <spotLight position={[5, 10, 5]} intensity={0.3} angle={0.3} penumbra={1} />
        
        {/* Environment para reflexos realistas */}
        <Environment preset="studio" background={false} />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0, 0]}
        />
        
        <Suspense fallback={<LoadingCar />}>
          <ServicesNissanGTR 
            scale={80} 
            position={[0, -0.2, 0]} 
            rotation={[0, 0, 0]}
          />
        </Suspense>
        
        {/* Chão invisível para sombras */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.1} />
        </mesh>
      </Canvas>
    </div>
  );
}

// Preload
useGLTF.preload('/nissan_aimgain_gt_r35_type2/scene.gltf');
