import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Stars component generates and animates stars
const Stars = (props) => {
  const ref = useRef();
  // Generate random star positions inside a sphere
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  // Rotate stars on every frame
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
      <PointMaterial color="#ffffff" size={0.002} sizeAttenuation={true} />
    </Points>
  );
};

// StarCanvas component renders the Stars component inside a Canvas
const StarCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

// Export the StarCanvas component as default
export default StarCanvas;
