import { OrbitControls, Environment } from '@react-three/drei'
import { Model } from './models/Babagift_compressed'
import { useThree } from '@react-three/fiber'
import { useRef } from 'react'


export default function Experience() {
    const controlsRef = useRef()
  return (
    <>
         {/* <DebugCamera /> */}


    {/* logging position */}
    {/* <OrbitControls
        ref={controlsRef}
        onEnd={() => {
          const camera = controlsRef.current.object

          console.log('Position:', [
            camera.position.x,
            camera.position.y,
            camera.position.z,
          ])

          console.log('Rotation:', [
            camera.rotation.x,
            camera.rotation.y,
            camera.rotation.z,
          ])
        }}
      /> */}


      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} />

      <Environment preset="city" />

      <Model />
    </>
  )
}

function DebugCamera() {
  const camera = useThree((state) => state.camera)

  console.log(camera.position)

  return null
}