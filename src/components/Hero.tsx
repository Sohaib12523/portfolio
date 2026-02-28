import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';

function BlobDots() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  
  const count = 4000;
  
  const [positions, originalPositions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    
    for(let i=0; i<count; i++) {
      // Golden ratio spiral for even distribution on a sphere
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const r = 3.5; // Base radius
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
      orig[i*3] = x; orig[i*3+1] = y; orig[i*3+2] = z;
      rand[i] = Math.random();
    }
    return [pos, orig, rand];
  }, [count]);

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color("#ff4e00") }
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smoothly follow mouse
    const targetX = (mouse.x * viewport.width) * 0.4;
    const targetY = (mouse.y * viewport.height) * 0.4;
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    
    // Rotate the whole blob
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for(let i=0; i<count; i++) {
      const ix = i * 3;
      const ox = originalPositions[ix];
      const oy = originalPositions[ix+1];
      const oz = originalPositions[ix+2];
      
      const len = Math.sqrt(ox*ox + oy*oy + oz*oz);
      const nx = ox/len;
      const ny = oy/len;
      const nz = oz/len;
      
      // 3D Sine wave distortion for blob effect
      const distortion = Math.sin(nx * 4 + time * 2) * 0.4 
                       + Math.cos(ny * 4 + time * 2) * 0.4 
                       + Math.sin(nz * 4 + time * 2) * 0.4;
                       
      // Add some random scatter
      const scatter = Math.sin(time * 2 + randoms[i] * Math.PI * 2) * 0.15;
      
      const finalR = len + distortion + scatter;
      
      positions[ix] = nx * finalR;
      positions[ix+1] = ny * finalR;
      positions[ix+2] = nz * finalR;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} position={[0, 0, -5]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 12.0 * (10.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - (dist * 2.0)) * 0.8;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
}

const roles = ["WordPress Developer", "UI/UX Designer", "SEO Optimizer"];

function WordRotator() {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        y: -30,
        opacity: 0,
        rotationX: 90,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % roles.length);
          gsap.fromTo(textRef.current, 
            { y: 30, opacity: 0, rotationX: -90 },
            { y: 0, opacity: 1, rotationX: 0, duration: 0.6, ease: "power3.out" }
          );
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block min-w-[280px] md:min-w-[450px] lg:min-w-[550px] text-[#ff4e00] perspective-1000 whitespace-nowrap">
      <span ref={textRef} className="inline-block origin-center transform-style-3d">{roles[index]}</span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(title1Ref.current, 
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(title2Ref.current,
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" },
        "-=1"
      )
      .fromTo(subtitleRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(buttonsRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(canvasRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power3.out" },
        "-=1.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-0 pointer-events-auto"
      >
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <BlobDots />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 z-10 relative pointer-events-none">
        <div className="flex flex-col items-start text-left max-w-5xl">
          <div className="overflow-hidden pb-2">
            <h1 ref={title1Ref} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter uppercase leading-none whitespace-nowrap">
              HI, I'M SOHAIB AHMAD
            </h1>
          </div>
          <div className="overflow-hidden pb-2 mt-4 flex items-center w-full max-w-full">
            <h2 ref={title2Ref} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter flex items-center flex-nowrap whitespace-nowrap">
              Creative&nbsp;<WordRotator />
            </h2>
          </div>
          
          <div ref={subtitleRef} className="mt-8 text-base md:text-lg lg:text-xl text-white/70 max-w-3xl font-light tracking-wide space-y-6">
            <p>
              I craft high-performance WordPress websites that combine stunning design, flawless functionality, and powerful SEO strategies. My goal is simple: transform your ideas into visually compelling, conversion-focused digital experiences that elevate your brand and deliver measurable results.
            </p>
            <p>
              Whether you need a business website, eCommerce store, or custom solution, I build websites that are fast, scalable, and built to grow with your business.
            </p>
          </div>

          <div ref={buttonsRef} className="mt-12 flex flex-wrap gap-6 pointer-events-auto">
            <a href="#contact" className="group relative px-8 py-4 bg-[#ff4e00] text-white rounded-full overflow-hidden interactive inline-block shadow-[0_0_20px_rgba(255,78,0,0.4)] hover:shadow-[0_0_40px_rgba(255,78,0,0.6)] transition-shadow duration-300">
              <span className="relative z-10 font-mono text-sm uppercase tracking-wider font-semibold">
                Download CV
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0 rounded-full" />
              <span className="absolute inset-0 z-20 flex items-center justify-center font-mono text-sm uppercase tracking-wider font-semibold text-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                Download CV
              </span>
            </a>
            <a href="#work" className="group relative px-8 py-4 border border-white/30 text-white rounded-full overflow-hidden interactive inline-block hover:border-[#ff4e00] transition-colors duration-300">
              <span className="relative z-10 font-mono text-sm uppercase tracking-wider group-hover:text-[#0a0a0a] transition-colors duration-300">
                View Portfolio
              </span>
              <div className="absolute inset-0 bg-[#ff4e00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0 rounded-full" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
        <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50" />
      </div>
    </section>
  );
}
