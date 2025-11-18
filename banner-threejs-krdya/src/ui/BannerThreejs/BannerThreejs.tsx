import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ImagePlane } from './ImagePlane'
import './BannerThreejs.css'

const IMAGE_URL = 'https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/BANNER_HOME_MOCKUP_KRDYA.png?width=860&t=1763502038137'

export const BannerThreejs = () => {
  return (
    <div className="banner-threejs-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ImagePlane imageUrl={IMAGE_URL} />
        </Suspense>
      </Canvas>
    </div>
  )
}

