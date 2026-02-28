import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Reimagined",
    category: "WooCommerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Corporate Business Profile",
    category: "WordPress / Elementor",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Creative Agency Portfolio",
    category: "Custom Theme",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "High-Performance Blog",
    category: "SEO Optimized",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const totalWidth = container.scrollWidth - window.innerWidth;

      const horizontalScroll = gsap.to(container, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          anticipatePin: 1
        }
      });

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Card entrance animation
      gsap.fromTo('.project-card',
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      gsap.utils.toArray('.project-image').forEach((img: any) => {
        gsap.to(img, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            containerAnimation: horizontalScroll,
            start: "left right",
            end: "right left",
            scrub: true
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="h-screen w-full bg-[#0a0a0a] text-white overflow-hidden relative z-20 flex flex-col justify-center">
      <div ref={titleRef} className="absolute top-16 md:top-24 left-6 md:left-24 z-10 max-w-3xl pointer-events-none">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[#ff4e00] mb-4 font-mono font-bold">
          Portfolio Section
        </h2>
        <h3 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-4">
          My Recent <span className="text-[#ff4e00] italic">Work</span>
        </h3>
      </div>

      <div className="w-full mt-24 md:mt-32">
        <div 
          ref={scrollContainerRef} 
          className="flex items-center pl-6 md:pl-24 pr-[20vw] gap-8 md:gap-16 w-max"
        >
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card relative w-[85vw] md:w-[45vw] h-[50vh] md:h-[55vh] flex-shrink-0 group overflow-hidden rounded-3xl interactive border border-white/10 hover:border-[#ff4e00]/50 transition-colors duration-500 shadow-2xl"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="project-image absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex items-center gap-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff4e00] font-bold">
                    0{index + 1}
                  </span>
                  <div className="h-[2px] w-12 bg-[#ff4e00]" />
                  <span className="text-sm font-mono uppercase tracking-wider text-white/90 font-medium">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white drop-shadow-lg">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
