import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2, ease: "power4.out" }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 mix-blend-difference text-white">
      <div className="flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold tracking-tighter uppercase interactive">
          Portfolio<span className="text-[#ff4e00]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-12 font-mono text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-[#ff4e00] transition-colors interactive">Work</a>
          <a href="#" className="hover:text-[#ff4e00] transition-colors interactive">About</a>
          <a href="#" className="hover:text-[#ff4e00] transition-colors interactive">Contact</a>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 interactive">
          <div className="w-8 h-[2px] bg-white" />
          <div className="w-8 h-[2px] bg-white" />
          <div className="w-8 h-[2px] bg-white" />
        </button>
      </div>
    </nav>
  );
}
