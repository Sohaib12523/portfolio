import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, Phone, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom bottom",
            toggleActions: "play none none reverse"
          }
        }
      );

      const button = buttonRef.current;
      if (button) {
        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const onMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          xTo(x * 0.3);
          yTo(y * 0.3);
        };

        const onMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        button.addEventListener("mousemove", onMouseMove);
        button.addEventListener("mouseleave", onMouseLeave);

        return () => {
          button.removeEventListener("mousemove", onMouseMove);
          button.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="relative bg-[#0a0a0a] text-white pt-32 pb-12 overflow-hidden z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-32">
          <div ref={titleRef} className="max-w-2xl">
            <h2 className="text-sm uppercase tracking-[0.3em] text-[#ff4e00] mb-4 font-mono font-bold">
              Contact Section
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none mb-6">
              Let's Build Something <span className="text-[#ff4e00] italic">Amazing</span> Together
            </h3>
            <p className="text-white/60 text-lg font-light mb-12">
              Have a project in mind? Let’s discuss how I can help bring your ideas to life with a professional, high-performance website.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#ff4e00]" />
                </div>
                <div>
                  <p className="text-sm text-white/50 font-mono uppercase tracking-wider">Phone</p>
                  <p className="text-lg">+92 311 9870892</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#ff4e00]" />
                </div>
                <div>
                  <p className="text-sm text-white/50 font-mono uppercase tracking-wider">Email</p>
                  <p className="text-lg">sohaibdev157@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#ff4e00]" />
                </div>
                <div>
                  <p className="text-sm text-white/50 font-mono uppercase tracking-wider">Availability</p>
                  <p className="text-lg">Monday – Sunday (Available Anytime)</p>
                </div>
              </div>
            </div>
          </div>

          <a 
            href="mailto:sohaibdev157@gmail.com"
            ref={buttonRef}
            className="group relative w-64 h-64 md:w-80 md:h-80 bg-[#ff4e00] rounded-full flex items-center justify-center interactive overflow-hidden flex-shrink-0"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-full" />
            <span className="relative z-10 text-white group-hover:text-[#0a0a0a] font-mono text-xl md:text-2xl uppercase tracking-widest flex items-center gap-2 transition-colors duration-300 font-bold">
              Get in touch <ArrowUpRight className="w-8 h-8" />
            </span>
          </a>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-white/40 font-mono text-sm uppercase tracking-widest">
            © 2026 Sohaib Ahmad. All Rights Reserved.
          </div>
          
          <div className="text-white/40 font-mono text-sm uppercase tracking-widest">
            Designed and Developed by Sohaib Ahmad
          </div>
        </div>
      </div>
    </footer>
  );
}
