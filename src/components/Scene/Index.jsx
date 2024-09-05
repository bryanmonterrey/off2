'use client';

import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

const Model = dynamic(() => import('./Model'), { ssr: false })

export default function Index() {
  return (
    <Canvas style={{background: '#FFFFFF'}}>
        <Model />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ambientLight intensity={0.5} />
        <Environment preset="studio" />
    </Canvas>
  )
}