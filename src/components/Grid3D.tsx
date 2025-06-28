'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

function GridItem({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[0.8, 0.8, 0.1]}
    >
      <meshStandardMaterial color="#374151" />
    </Box>
  );
}

export default function Grid3D() {
  const gridPositions: [number, number, number][] = [];
  
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      gridPositions.push([x * 1.2, y * 1.2, 0]);
    }
  }

  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {gridPositions.map((position, index) => (
          <GridItem key={index} position={position} />
        ))}
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}