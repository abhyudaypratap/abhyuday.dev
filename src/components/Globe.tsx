import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TimelineEvent } from '../types/timeline';

interface GlobeProps {
  selectedLocation?: TimelineEvent['location'];
}

export default function Globe({ selectedLocation }: GlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef<[number, number]>([0, 0]);
  
  const material = useRef<THREE.MeshStandardMaterial>(
    new THREE.MeshStandardMaterial({
      color: '#000000',
      metalness: 0.2,
      roughness: 0.8,
      wireframe: true,
    })
  );

  useEffect(() => {
    if (selectedLocation) {
      const [lng, lat] = selectedLocation.coordinates;
      targetRotation.current = [
        THREE.MathUtils.degToRad(-lat),
        THREE.MathUtils.degToRad(-lng + 180),
      ];
    }
  }, [selectedLocation]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (selectedLocation) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current[0],
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current[1],
        0.05
      );
    } else {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <primitive object={material.current} attach="material" />
    </mesh>
  );
}