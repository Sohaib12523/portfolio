import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const skills = [
  "WordPress", "WooCommerce", "Elementor", "Breakdance Builder",
  "HTML", "CSS", "PHP", "JavaScript", "SEO", "Figma", "Website Optimization"
];

export default function Skills() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      // Clone the content for seamless looping
      const content = marquee.innerHTML;
      marquee.innerHTML = content + content;

      gsap.to(marquee, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-[#ff4e00] text-[#0a0a0a] overflow-hidden relative z-10 rotate-[-2deg] scale-110">
      <div className="container mx-auto px-6 mb-8 text-center rotate-[2deg]">
        <h2 className="text-sm uppercase tracking-[0.3em] font-mono font-bold text-[#0a0a0a]/70">
          My Technical Expertise
        </h2>
      </div>
      <div className="flex whitespace-nowrap" ref={marqueeRef}>
        <div className="flex items-center gap-8 px-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter">
                {skill}
              </span>
              <span className="text-3xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
