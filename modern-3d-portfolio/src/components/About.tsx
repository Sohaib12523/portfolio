import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(
        ".about-text-line",
        { y: 50, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      )
      .fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotation: -5 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "power4.out" },
        "-=0.5"
      );

      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 md:py-48 bg-[#0a0a0a] text-white relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          <div ref={textRef} className="lg:col-span-7 order-2 lg:order-1">
            <h2 className="text-sm uppercase tracking-[0.3em] text-[#ff4e00] mb-8 font-mono font-bold about-text-line">
              About Me
            </h2>
            <div className="text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-tight mb-8">
              <div className="overflow-hidden"><div className="about-text-line">Crafting Digital</div></div>
              <div className="overflow-hidden"><div className="about-text-line text-[#ff4e00] italic">Experiences That</div></div>
              <div className="overflow-hidden"><div className="about-text-line">Perform and Inspire</div></div>
            </div>
            
            <div className="space-y-6 text-white/70 text-lg font-light max-w-2xl mb-16">
              <div className="overflow-hidden">
                <p className="about-text-line">
                  I’m a passionate WordPress developer with over 5+ years of experience creating modern, responsive, and SEO-optimized websites. I specialize in building websites that don’t just look beautiful—but also perform exceptionally in speed, usability, and search rankings.
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="about-text-line">
                  I combine technical expertise with creative design thinking to deliver websites that attract, engage, and convert visitors into loyal customers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-display font-bold mb-4 about-text-line text-white">My Ambition</h3>
                <p className="text-white/60 font-light about-text-line">
                  Empowering Businesses Through Strategic Web Solutions. My ambition is to help businesses establish a strong and impactful online presence by delivering websites that drive engagement, increase visibility, and accelerate business growth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-4 about-text-line text-white">My Purpose</h3>
                <p className="text-white/60 font-light about-text-line">
                  Turning Ideas into Successful Digital Products. My purpose is to empower brands and entrepreneurs with high-quality WordPress solutions that strengthen their identity, enhance user experience, and deliver real business results.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative h-[60vh] lg:h-[80vh] w-full rounded-2xl overflow-hidden group">
            <div 
              ref={imageRef}
              className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop)' }}
            />
            <div className="absolute inset-0 bg-[#ff4e00]/10 group-hover:bg-transparent transition-colors duration-700 mix-blend-overlay" />
          </div>

        </div>
      </div>
    </section>
  );
}
