import { Canvas } from '@react-three/fiber'
import Experience from './Experience/Experience'
// import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { ScrollControls } from '@react-three/drei'

export default function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [6.197, 3.705, 1.574],
          rotation: [-1.511, 1.165, 1.506],
          fov: 40,
        }}
      >
        
        <ScrollControls pages={3}>
        <Experience />
      </ScrollControls>
      </Canvas>

      <div style={{ height: '500vh' }} />
    </>
    
  )
}