import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power3.inOut"
    })
    .to(textRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in"
    }, "-=0.5")
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut"
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center text-white"
    >
      <div className="overflow-hidden">
        <h1 ref={textRef} className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
          LOADING<span className="text-[#ff4e00]">.</span>
        </h1>
      </div>
      <div className="w-64 h-[2px] bg-white/20 mt-8 rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full w-0 bg-[#ff4e00]" />
      </div>
    </div>
  );
}
