import React from 'react';
import { useGLTF } from '@react-three/drei';

export const Show3DGLB = ({ source }) => {
  const { nodes, materials } = useGLTF(source);
  useGLTF.preload(source);

  return (
    <group dispose={null}>
      <group position={[-0.019, 0.007, -0.08]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={nodes.Cube002.geometry} material={materials.PaletteMaterial002} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials.PaletteMaterial001} />
      </group>
      <mesh geometry={nodes.Keyboard.geometry} material={materials.Keyboard} position={[-0.023, 0.017, -0.087]}
            rotation={[0, -Math.PI / 2, 0]} scale={[1.103, 1, 1.103]} />
      <mesh geometry={nodes.Screen.geometry} material={materials.Screen} position={[-0.019, 0.023, -0.182]}
            rotation={[-1.806, -1.571, 0]} />
    </group>
  );
};
