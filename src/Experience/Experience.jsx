import { OrbitControls, Environment, useScroll} from '@react-three/drei'
import { Model } from './models/Babagift_compressed'
// import { useThree } from '@react-three/fiber'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useState, useEffect, useMemo, useRef } from 'react'


export default function Experience() {

  
    const controlsRef = useRef()
    const characterRef = useRef()
  return (
    <>
         {/* <DebugCamera /> */}

    <Model characterRef={characterRef} />
    

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


      <CameraMove characterRef={characterRef} />

      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} />

      <Environment preset="city" />
    </>
  )
}

function DebugCamera() {
  const camera = useThree((state) => state.camera)

  console.log(camera.position)

  return null
}


function moveCharacter(character, scrollOffset) {
  character.position.z =
    THREE.MathUtils.lerp(3.426, -53, scrollOffset)
}

function CameraMove({ characterRef }) {
  const camera = useThree((state) => state.camera)
  const scroll = useScroll()
  const startPos = useMemo(() => new THREE.Vector3( 6.197084463432617,2.30523878439237,1.5740099318200256),[])
  const endPos = useMemo(() => new THREE.Vector3( 8.122567370770916,5.519222107290952,-52.06012259692631),[])
  const startQuat = useMemo(() => {
    const q = new THREE.Quaternion()
    q.setFromEuler(new THREE.Euler( -1.511, 1.41, 1.506))
    return q
  }, [])
  const endQuat = useMemo(() => {
    const q = new THREE.Quaternion()
    q.setFromEuler(new THREE.Euler(-1.6166410003901928, 1.294351577698682, 1.6184476478120524))
    return q 
  }, [])


  useFrame(() => {
    const t = scroll.offset
    if (characterRef.current) {
      moveCharacter(characterRef.current, t)
    }
    camera.position.lerpVectors(startPos, endPos, t)
    const z = camera.position.z
    camera.position.y += getLift(z, -19, -26, 0.67)
    camera.position.y += getLift(z, -30, -33, 0.4)
    camera.position.y += getLift(z, -34, -40, -1)
    camera.quaternion.slerpQuaternions(startQuat, endQuat, t)
  })
  return null
}

function getLift(z, startZ, endZ, height) {
  const progress = THREE.MathUtils.clamp((z - startZ) / (endZ - startZ), 0, 1)
  return (THREE.MathUtils.smoothstep(progress, 0, 1) * height)
}