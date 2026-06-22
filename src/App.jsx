import { Canvas } from '@react-three/fiber'
import Experience from './Experience/Experience'
// import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function App() {
  return (
    <Canvas
  camera={{
    position: [6.197084463432617, 3.690523878439237, 1.5740099318200256],
    rotation: [-1.5111737679508976, 1.1654853919520964, 1.5059313927324594],
    fov: 40,
  }}
>
  <Experience />
</Canvas>

    
  )
}