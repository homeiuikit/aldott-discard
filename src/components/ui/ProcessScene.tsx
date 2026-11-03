'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, type MutableRefObject } from 'react';
import { MeshBasicMaterial, type Group } from 'three';

/**
 * Scroll-driven wireframe turbine that assembles across the five lifecycle steps
 * (ui-ux-3d-design skill, Layer 3 — "camera/object choreography over one
 * timeline"). Model-free procedural geometry. `progressRef` (0..1) is written by
 * the parent on scroll and read here in useFrame, so scrolling drives the object
 * without re-rendering React. three.js lives only in this dynamically-imported
 * module. All lifecycle copy stays in the DOM (see ProcessLifecycle).
 */
const TEAL = '#1F7080'; // darkened teal so the wireframe reads on a white bg
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function Turbine({
  progressRef,
  animate,
}: {
  progressRef: MutableRefObject<number>;
  animate: boolean;
}) {
  const spin = useRef<Group>(null);
  const idle = useRef(0);

  // Shared materials so opacity can ramp with progress in one place.
  const structureMat = useMemo(
    () => new MeshBasicMaterial({ color: TEAL, wireframe: true, transparent: true, opacity: 0.2 }),
    []
  );
  const siteMat = useMemo(
    () => new MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0 }),
    []
  );

  useFrame((_, delta) => {
    const p = progressRef.current;
    const step = Math.min(delta, 0.05);

    // Concept (faint) → operation (solid); tower/ground fade in mid-lifecycle.
    // Higher floor than the old dark theme so the lines read on white.
    structureMat.opacity = 0.28 + p * 0.5;
    siteMat.opacity = clamp01((p - 0.35) / 0.4) * 0.6;

    // Scrolling turns the rotor; idle spin ramps up toward "operation".
    if (animate) idle.current += step * (0.05 + p * 0.4);
    if (spin.current) spin.current.rotation.z = -(p * Math.PI * 3 + idle.current);
  });

  return (
    <group rotation={[-0.5, 0.15, 0]}>
      {/* Tower + ground (fixed; fade in during construction/operation) */}
      <mesh material={siteMat} position={[0, -1.15, 0]}>
        <boxGeometry args={[0.05, 2.3, 0.05]} />
      </mesh>
      <mesh material={siteMat} position={[0, -2.3, 0]}>
        <boxGeometry args={[1.3, 0.03, 0.03]} />
      </mesh>

      {/* Rotor (spins) */}
      <group ref={spin}>
        <mesh material={structureMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.16, 28]} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            <mesh material={structureMat} position={[0, 0.98, 0]} rotation={[0, 0.35, 0]}>
              <boxGeometry args={[0.17, 1.75, 0.03]} />
            </mesh>
          </group>
        ))}
        <mesh material={structureMat}>
          <torusGeometry args={[1.9, 0.006, 8, 110]} />
        </mesh>
      </group>
    </group>
  );
}

export default function ProcessScene({
  progressRef,
  animate,
}: {
  progressRef: MutableRefObject<number>;
  animate: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={animate ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <Turbine progressRef={progressRef} animate={animate} />
    </Canvas>
  );
}
