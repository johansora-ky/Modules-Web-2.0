import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useMemo } from 'react'
import * as THREE from 'three'

interface ImagePlaneProps {
  imageUrl: string
}

export const ImagePlane = ({ imageUrl }: ImagePlaneProps) => {
  const texture = useLoader(TextureLoader, imageUrl)

  const aspectRatio = useMemo(() => {
    if (texture) {
      return texture.image.width / texture.image.height
    }
    return 16 / 9
  }, [texture])

  const planeSize = useMemo(() => {
    const baseHeight = 4
    return [baseHeight * aspectRatio, baseHeight]
  }, [aspectRatio])

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={planeSize} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  )
}

