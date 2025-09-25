'use client';

import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface NissanGTRDirectProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function NissanGTRDirect({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: NissanGTRDirectProps) {
  const { nodes, materials } = useGLTF('/nissan_aimgain_gt_r35_type2/scene.gltf') as any;
  
  // Helper para acessar geometrias
  const geo = (id: number) => nodes[`Object_${id}`]?.geometry as THREE.BufferGeometry | undefined;

  // Listas de objetos por roda (copiados do gltfjsx)
  const FR_RIM = [196,200,204,208,212,216,220,224,228,232,236,240];
  const FR_DISC = [246,250,254,258,262,266,270,274,278,282,334];
  const FR_CAL = [286,290,294,298,302,306,310,314,318,322,326,330];
  const FR_EXTRA = [128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,343,346];

  const FL_RIM = [419,423,427,431,435,439,443,447,451,455,459,463];
  const FL_DISC = [469,473,477,481,485,489,493,497,501,505,509,513,517,521,525,529,533,537,541,545,549,553,557];
  const FL_EXTRA = [351,355,359,363,367,371,375,379,383,387,391,395,399,403,407,411,415,566,569,562];

  const RR_RIM = [574,578,582,586,590,594,598,602,606,610,614,618];
  const RR_DISC = [692,696,700,704,708,712,716,720,724,728,732,736,740,744,748,752,756,760,764,768,772,776,780,784,788];
  const RR_EXTRA = [622,626,630,634,638,642,646,650,654,658,662,666,670,674,678,682,686,797,800,793];

  const RL_RIM = [805,809,813,817,821,825,829,833,837,841,845,849];
  const RL_DISC = [923,927,931,935,939,943,947,951,955,959,963,967,971,975,979,983,987,991,995,999,1003,1007,1011,1015,1019];
  const RL_EXTRA = [853,857,861,865,869,873,877,881,885,889,893,897,901,905,909,913,917,1028,1031,1024];

  // Materiais de fallback para rodas
  const wheelMaterials = useMemo(() => ({
    rim: new THREE.MeshStandardMaterial({
      color: '#333333',
      metalness: 0.8,
      roughness: 0.2
    }),
    tire: new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      metalness: 0.1,
      roughness: 0.9
    }),
    brake: new THREE.MeshStandardMaterial({
      color: '#666666',
      metalness: 0.7,
      roughness: 0.3
    }),
    caliper: new THREE.MeshStandardMaterial({
      color: '#cc0000',
      metalness: 0.6,
      roughness: 0.4
    }),
    rimDark: new THREE.MeshStandardMaterial({
      color: '#222222',
      metalness: 0.9,
      roughness: 0.1
    })
  }), []);

  // Componente de roda que usa o GLTF se disponível, senão cai no procedural
  function GLTFOrProceduralWheel({
    pos, rot, side, rimIds, discIds, caliperIds, extraIds
  }: {
    pos: [number, number, number]
    rot: [number, number, number]
    side: 'L' | 'R'
    rimIds: number[]
    discIds: number[]
    caliperIds?: number[]
    extraIds?: number[]
  }) {
    const hasGLTF = rimIds.every((id) => !!geo(id)); // critério simples

    if (!hasGLTF) {
      // fallback para roda procedural
      return (
        <group position={pos} rotation={rot}>
          {/* Pneu principal */}
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
            <primitive object={wheelMaterials.tire} />
          </mesh>
          
          {/* Aro */}
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0, side === 'L' ? 0.08 : -0.08]}>
            <cylinderGeometry args={[0.28, 0.28, 0.08, 32]} />
            <primitive object={wheelMaterials.rim} />
          </mesh>
          
          {/* Raios do aro */}
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} castShadow receiveShadow rotation={[Math.PI / 2, 0, (Math.PI * 2 * i) / 5]} position={[0, 0, side === 'L' ? 0.08 : -0.08]}>
              <boxGeometry args={[0.04, 0.2, 0.02]} />
              <primitive object={wheelMaterials.rim} />
            </mesh>
          ))}
          
          {/* Disco de freio */}
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0, side === 'L' ? 0.12 : -0.12]}>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
            <primitive object={wheelMaterials.brake} />
          </mesh>
          
          {/* Pinça de freio */}
          <mesh castShadow receiveShadow position={[0, 0.15, side === 'L' ? 0.12 : -0.12]}>
            <boxGeometry args={[0.08, 0.12, 0.06]} />
            <primitive object={wheelMaterials.caliper} />
          </mesh>
        </group>
      );
    }

    return (
      <group position={pos} rotation={rot}>
        {/* aro / pneu do GLTF */}
        {rimIds.map((id) => {
          const g = geo(id); if (!g) return null;
          return (
            <mesh key={`rim-${id}`} geometry={g}
              material={materials.NNissan_GTRNismoNRewardRecycled_2017_Wheel1A_3D_3DWheel1_d95be4f1 || wheelMaterials.rim}
              castShadow receiveShadow position={[-0.045,0,0]} scale={0.9}
            />
          );
        })}

        {/* disco + caliper */}
        <group position={[-0.03, side === 'L' ? 0.002 : 0.001, side === 'L' ? (rot[0] ? 0.002 : -0.003) : 0.003]}
               scale={[1.0, 1.02, 1.02]}>
          {discIds?.map((id) => {
            const g = geo(id); if (!g) return null;
            return <mesh key={`disc-${id}`} geometry={g} material={materials.phong3 || wheelMaterials.brake} castShadow receiveShadow />;
          })}
          {caliperIds?.map((id) => {
            const g = geo(id); if (!g) return null;
            return <mesh key={`cal-${id}`} geometry={g} material={materials.NNissan_GTRTNR0_2017_CallipersCalliperGloss_Material1 || wheelMaterials.caliper} castShadow receiveShadow />;
          })}
        </group>

        {/* extras (badges, miolo etc.) */}
        {extraIds?.map((id) => {
          const g = geo(id); if (!g) return null;
          // tenta achar material original; se não, usa um dos nossos
          const m = (nodes[`Object_${id}`] as any)?.material || materials.material || wheelMaterials.rimDark;
          return <mesh key={`x-${id}`} geometry={g} material={m} castShadow receiveShadow />;
        })}
      </group>
    );
  }

  return (
    <group scale={scale} position={position} rotation={rotation} dispose={null}>
      <group rotation={[0, 0, 0]}> 
        <group scale={0.01}>
          {/* Corpo principal do carro */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_12?.geometry}
            material={materials.nNissan_GTRTNR4_2017EngineA_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_16?.geometry}
            material={materials.nNissan_GTRTNR4_2017Grille7A_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_20?.geometry}
            material={materials.nNissan_GTRTNR4_2017Grille8A_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_24?.geometry}
            material={materials.nNissan_GTRTNR4_2017Grille9A_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_28?.geometry}
            material={materials.nNissan_GTRTNR4_2017InteriorTillingColourZoneA_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_32?.geometry}
            material={materials.nNissan_GTRTNR4_2017InteriorA_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_36?.geometry}
            material={materials.nNissan_GTRTNR4_2017BadgeE_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_40?.geometry}
            material={materials.nNissan_GTRTNR4_2017Base_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_44?.geometry}
            material={materials.nNissan_GTRTNR4_2017Carbon1_Material_004}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_48?.geometry}
            material={materials.nNissan_GTRTNR4_2017Coloured_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_52?.geometry}
            material={materials.nNissan_GTRTNR4_2017Grille1E_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_56?.geometry}
            material={materials.nNissan_GTRTNR4_2017Grille2E_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_60?.geometry}
            material={materials.nNissan_GTRTNR4_2017Grille4E_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_64?.geometry}
            material={materials.nNissan_GTRTNR4_2017LightE_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_68?.geometry}
            material={materials.nNissan_GTRTNR4_2017ManufacturerPlateE_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_72?.geometry}
            material={materials.nNissan_GTRTNR4_2017PaintTNR_Material_002}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_76?.geometry}
            material={materials.nNissan_GTRTNR4_2017SpecularTintE_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_80?.geometry}
            material={materials.nNissan_GTRTNR4_2017TexturedE_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_84?.geometry}
            material={materials.nNissan_GTRTNR4_2017Window_Material1}
            position={[0, -0.034, 0]}
          />

          {/* Janelas */}
          <group position={[0, -0.034, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_88?.geometry}
              material={materials.nNissan_GTRTNR4_2017Window_Material1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_91?.geometry}
              material={materials.phong2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_94?.geometry}
              material={materials.glass_surr}
            />
          </group>

          {/* Partes adicionais do corpo */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_98?.geometry}
            material={materials.nNissan_GTRTNR4_2017Coloured_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_102?.geometry}
            material={materials.nNissan_GTRTNR4_2017Coloured_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_106?.geometry}
            material={materials.nNissan_GTRTNR4_2017Hood4a_Grille1_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_110?.geometry}
            material={materials.nNissan_GTRTNR4_2017PaintTNR_Material_002}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_114?.geometry}
            material={materials.nNissan_GTRTNR4_2017Carbon1_Material_004}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_118?.geometry}
            material={materials.nNissan_GTRTNR4_2017Coloured_Material1}
            position={[0, -0.034, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_122?.geometry}
            material={materials.nNissan_GTRTNR4_2017PaintTNR_Material_002}
            position={[0, -0.034, 0]}
          />

          {/* Rodas com GLTF detalhado e fallback procedural */}
          {/* Front Right */}
          <GLTFOrProceduralWheel pos={[0.855, 0.353, 1.424]} rot={[0,0,0.026]} side="R"
            rimIds={FR_RIM} discIds={FR_DISC} caliperIds={FR_CAL} extraIds={FR_EXTRA}
          />

          {/* Front Left */}
          <GLTFOrProceduralWheel pos={[-0.855, 0.353, 1.424]} rot={[Math.PI,0,-3.115]} side="L"
            rimIds={FL_RIM} discIds={FL_DISC} extraIds={FL_EXTRA}
          />

          {/* Rear Right */}
          <GLTFOrProceduralWheel pos={[0.897, 0.348, -1.348]} rot={[0,0,0.052]} side="R"
            rimIds={RR_RIM} discIds={RR_DISC} extraIds={RR_EXTRA}
          />

          {/* Rear Left */}
          <GLTFOrProceduralWheel pos={[-0.897, 0.348, -1.348]} rot={[Math.PI,0,-3.089]} side="L"
            rimIds={RL_RIM} discIds={RL_DISC} extraIds={RL_EXTRA}
          />
        </group>
      </group>
    </group>
  );
}

// Preload do modelo
useGLTF.preload('/nissan_aimgain_gt_r35_type2/scene.gltf');