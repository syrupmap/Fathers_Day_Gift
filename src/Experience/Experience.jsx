import { OrbitControls, Environment, useScroll} from '@react-three/drei'
import { Model } from './models/Babagift_compressed'
// import { useThree } from '@react-three/fiber'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useState, useEffect, useMemo, useRef } from 'react'


export default function Experience() {
  const controlsRef = useRef()
  const characterRef = useRef()
  const bikeRef = useRef()
  const frontWheelRef = useRef()
  const backWheelRef = useRef()
  const airplaneRef = useRef()
  const motercycleRef = useRef()
  const motercycleBackRef = useRef()
  const motercycleFrontRef = useRef()
  
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

      <Model characterRef={characterRef} 
      bikeRef={bikeRef}
      frontWheelRef={frontWheelRef}
      backWheelRef={backWheelRef} 
      airplaneRef = {airplaneRef}
      motercycleRef = {motercycleRef}
      motercycleBackRef={motercycleBackRef}
      motercycleFrontRef = {motercycleFrontRef}
      />
      

      
      <CameraMove characterRef={characterRef} />
      <BikeMove bikeRef={bikeRef} frontWheelRef={frontWheelRef} backWheelRef={backWheelRef} />
      <AirplaneMove airplaneRef ={airplaneRef} characterRef={characterRef} />
      <MotercycleMove motercycleRef = {motercycleRef} motercycleBackRef={motercycleBackRef} motercycleFrontRef = {motercycleFrontRef} characterRef={characterRef}/>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      <Environment preset="city" />
  </>
  )
}

// function DebugCamera() {
//   const camera = useThree((state) => state.camera)
//   console.log(camera.position)
//   return null
// }

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
    const character = characterRef.current

    //camera oevement
    camera.position.lerpVectors(startPos, endPos, t)
    const z = camera.position.z
    camera.position.y += getLift(z, -19, -26, 0.67) //SIZzz SEVENENN //basically when z is going from -19 to -26, the y position of the camera raises by 0.67 units or pixels or whatever the fuck units they are, I lowkey just guessed and checked.
    camera.position.y += getLift(z, -30, -33, 0.4)
    camera.position.y += getLift(z, -34, -40, -1)
    camera.quaternion.slerpQuaternions(startQuat, endQuat, t)

    //character movement
    if (character) {
      const baseY = 0.598 
      const z = THREE.MathUtils.lerp(3.426, -53, t)
      character.position.z = z
      character.position.y = baseY + getLift(z, -10, -14, 2.19)
      character.position.y += getLift(z, -19, -24, -1.08)
      character.position.y += getLift(z, -30, -31, -0.5)
      character.position.y += getLift(z, -31, -33, 0.9)
      character.position.y += getLift(z, -33, -35, 2.4)
      character.position.y += getLift(z, -35, -42, -4.1)
      character.position.y += getLift(z, -42, -50, 3)
    }
  })
  return null
}

function getLift(z, startZ, endZ, height) {
  const progress = THREE.MathUtils.clamp((z - startZ) / (endZ - startZ), 0, 1) //okay so "clamp" forces to stay 0 --> 1 without overshooting
  return (THREE.MathUtils.smoothstep(progress, 0, 1) * height) //smooths the transition between between startZ and endZ (Z is basically the "x" for my scene cause Three.js and Blender were enemies for this project.) 
}

function BikeMove({ bikeRef, frontWheelRef, backWheelRef}) {
  const scroll = useScroll()
  const prevZ = useRef(0) //for wheel
  const startZ = 3.329
  const bikeFrontStartZ = 3.693
  const bikeBackStartZ = 2.954
  const endZ = -53
  const stopFollowZ = -10
  const wheelRadius = 0.3
  useFrame(() => {
    const t = scroll.offset
    if (!bikeRef.current) return
    const z = THREE.MathUtils.lerp(startZ, endZ, t)
    const z_front = THREE.MathUtils.lerp(bikeFrontStartZ, endZ, t)
    const z_back = THREE.MathUtils.lerp(bikeBackStartZ , endZ, t)

    // move bike ONLY until cutoff
    if (z > stopFollowZ) {
      bikeRef.current.position.z = z
      frontWheelRef.current.position.z = z_back
      backWheelRef.current.position.z = z_front
    } else {
      bikeRef.current.position.z = stopFollowZ
    }

    //WHEEEELESSSS ON THE BUS GO ROUND AND ORUND
    const currentZ = bikeRef.current.position.z
    const delta = currentZ - prevZ.current
    prevZ.current = currentZ
    const rotationAmount = delta / wheelRadius
    if (frontWheelRef.current) {
      frontWheelRef.current.rotation.x += rotationAmount
    }
    if (backWheelRef.current) {
      backWheelRef.current.rotation.x += rotationAmount
    }
  })
  return null
}


function AirplaneMove({airplaneRef, characterRef}){
  const scroll = useScroll()
  useFrame(() => {
    if (!airplaneRef.current || !characterRef.current){
      console.log("bitch")
      return
    }
    const characterZ = characterRef.current.position.z
    const triggerZ = -13.761
    const endCharacterZ = -20
    if (characterZ > triggerZ) {
      airplaneRef.current.position.z = triggerZ
      return
    }
    const progress = THREE.MathUtils.clamp(
      (characterZ - triggerZ) / (endCharacterZ - triggerZ),  0,  1 )
    airplaneRef.current.position.z = THREE.MathUtils.lerp(triggerZ,-20,  progress)
  })
}


function MotercycleMove({
  motercycleRef,
  motercycleBackRef,
  motercycleFrontRef,
  characterRef
}) {
  const prevZ = useRef(-23.319)
  const wheelRadius = 0.3

  useFrame(() => {
    if (
      !motercycleRef.current ||
      !motercycleBackRef.current ||
      !motercycleFrontRef.current ||
      !characterRef.current
    ) return

    const characterZ = characterRef.current.position.z

    const bodyStartZ = -23.319
    const frontStartZ = -23.808
    const backStartZ = -22.977

    let motorcycleZ

    if (characterZ > bodyStartZ) {
      motorcycleZ = bodyStartZ
    } else if (characterZ > -30) {
      motorcycleZ = characterZ
    } else {
      motorcycleZ = -30
    }

    // move motorcycle body
    motercycleRef.current.position.z = motorcycleZ

    // keep wheel offsets relative to body
    const frontOffset = frontStartZ - bodyStartZ
    const backOffset = backStartZ - bodyStartZ

    motercycleFrontRef.current.position.z =
      motorcycleZ + frontOffset

    motercycleBackRef.current.position.z =
      motorcycleZ + backOffset

    // wheel rotation
    const delta = motorcycleZ - prevZ.current
    prevZ.current = motorcycleZ

    const rotationAmount = delta / wheelRadius

    motercycleFrontRef.current.rotation.x += rotationAmount
    motercycleBackRef.current.rotation.x += rotationAmount
  })

  return null
}
