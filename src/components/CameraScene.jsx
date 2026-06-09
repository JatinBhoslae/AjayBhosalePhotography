import React, {
  Suspense,
  useRef,
  useMemo,
  Component,
  useEffect,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

// Fallback Camera Model (Simple Geometric Representation)
const FallbackCamera = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 0.6, 0.4]} />
      <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
    </mesh>
    <mesh position={[0.2, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.25, 0.25, 0.3, 32]} />
      <meshStandardMaterial color="#050505" roughness={0.3} metalness={0.9} />
    </mesh>
  </group>
);

const ActualCameraModel = ({ progress }) => {
  const group = useRef();
  const flashLight = useRef();
  const timeRef = useRef(0);

  // Stable Antique Camera Model from KhronosGroup
  const CAMERA_MODEL_URL =
    "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb";

  const model = useGLTF(CAMERA_MODEL_URL);

  // Filter model to hide tripod
  useEffect(() => {
    if (model.scene) {
      model.scene.traverse((child) => {
        // Hide nodes that are typically part of the tripod in this specific model
        if (
          child.name.toLowerCase().includes("tripod") ||
          child.name.toLowerCase().includes("leg") ||
          child.name.toLowerCase().includes("stand")
        ) {
          child.visible = false;
        }
      });
    }
  }, [model]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;

    // Mouse tracking logic
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    if (group.current) {
      // Get the current value from MotionValue if it's a MotionValue, otherwise use as is
      const currentProgress =
        typeof progress === "object" && progress.get
          ? progress.get()
          : progress;

      // 1. Mouse Tracking Rotation (Cinematic and Smooth)
      // Target rotation based on mouse position + scroll
      const targetRotationY = mouseX * 0.4 + currentProgress * Math.PI * 0.8;
      const targetRotationX = -mouseY * 0.2;

      // Smooth interpolation (Lerp) for natural movement
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotationY,
        0.05,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetRotationX,
        0.05,
      );

      // 2. Subtle Floating Animation
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        Math.sin(time * 0.8) * 0.1,
        0.05,
      );
    }

    // Flash Logic
    if (flashLight.current) {
      const currentProgress =
        typeof progress === "object" && progress.get
          ? progress.get()
          : progress;
      const flashIntensity = Math.max(
        0,
        1 - Math.abs(currentProgress - 0.94) * 15,
      );
      flashLight.current.intensity = flashIntensity * 250;
    }
  });

  return (
    <group ref={group} scale={0.9} position={[1.4, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <primitive
          object={model.scene}
          scale={1}
          position={[0, 0, 0]}
          rotation={[0, -Math.PI / 12, 0]}
        />
      </Float>

      {/* Lighting for visibility */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={10}
        castShadow
      />
      <ambientLight intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={5} color="#444" />
      <directionalLight position={[0, 5, 5]} intensity={2} />

      {/* Camera Flash */}
      <pointLight
        ref={flashLight}
        color="#ffffff"
        intensity={0}
        distance={15}
        decay={2}
        position={[0.2, 0.45, 0.6]}
      />
    </group>
  );
};

const CameraModel = ({ progress }) => {
  return (
    <Suspense fallback={<FallbackCamera />}>
      <ActualCameraModel progress={progress} />
    </Suspense>
  );
};

class SceneErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null; // Silently hide if it fails
    return this.props.children;
  }
}

export const HeroCameraCanvas = ({ scrollProgress }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[5] pointer-events-none"
      style={{ background: "transparent" }}
    >
      {isVisible && (
        <SceneErrorBoundary>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            eventSource={document.body}
            eventPrefix="client"
            className="pointer-events-none"
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <Suspense fallback={null}>
              <CameraModel progress={scrollProgress} />
              <Environment preset="studio" />
              <ContactShadows
                position={[1.4, -1.2, 0]}
                opacity={0.3}
                scale={6}
                blur={2.5}
                far={4.5}
              />
            </Suspense>
          </Canvas>
        </SceneErrorBoundary>
      )}
    </div>
  );
};
