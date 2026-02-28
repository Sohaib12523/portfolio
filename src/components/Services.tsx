import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, ShoppingCart, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "WordPress Theme Customization",
    description: "Transform your WordPress theme into a fully customized, brand-focused website. I tailor layouts, functionality, and design elements to create a unique and professional online presence that reflects your business identity.",
    icon: <Code2 className="w-12 h-12 text-[#ff4e00]" />
  },
  {
    title: "WooCommerce Development",
    description: "Launch a powerful, conversion-focused online store built for performance and scalability. I create WooCommerce websites with seamless navigation, secure payment integration, and optimized user experience to maximize your sales.",
    icon: <ShoppingCart className="w-12 h-12 text-[#ff4e00]" />
  },
  {
    title: "SEO Optimization for WordPress",
    description: "Boost your website’s visibility and attract targeted traffic with professional SEO optimization. I optimize speed, structure, keywords, and performance to help your website rank higher and convert more visitors into customers.",
    icon: <LineChart className="w-12 h-12 text-[#ff4e00]" />
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-header",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, delay: index * 0.2, ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = cardsRef.current;
    cards.forEach(card => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-[#050505] text-white relative z-10" onMouseMove={handleMouseMove}>
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center service-header">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#ff4e00] mb-4 font-mono font-bold">
            Services
          </h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold">
            What I <span className="italic text-white/50">Do</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-[#0a0a0a] p-10 rounded-2xl border border-white/5 transition-all duration-500 interactive overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,78,0,0.2)]"
            >
              <div 
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,78,0,0.15), transparent 40%)`
                }}
              />
              <div 
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: `inset 0 0 0 1px rgba(255,78,0,0.3)`
                }}
              />
              
              <div className="relative z-10">
                <div className="mb-8 p-4 bg-white/5 inline-block rounded-xl group-hover:scale-110 group-hover:bg-[#ff4e00]/10 transition-all duration-500">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-display font-bold mb-4 group-hover:text-[#ff4e00] transition-colors duration-300">{service.title}</h4>
                <p className="text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
