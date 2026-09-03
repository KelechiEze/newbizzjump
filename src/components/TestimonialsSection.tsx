import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  index: string;
  type: 'video' | 'quote';
  quote?: string;
  name: string;
  role: string;
  avatar?: string;
  videoSrc?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sophie-turner',
    index: '1/5',
    type: 'video',
    name: 'SOPHIE TURNER',
    role: 'Brand Strategist at Noora',
    videoSrc: 'https://res.cloudinary.com/hdwuzrzf/video/upload/v1787860132/Y7gFBMR55ZjxtJCLlsAbQkdlls.mp4',
  },
  {
    id: 'sarah-mitchell',
    index: '2/5',
    type: 'quote',
    quote: '“They gave us a clear direction early, and everything after that became easier. The work is clean and consistent.”',
    name: 'SARAH MITCHELL',
    role: 'Brand Strategist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'maya-rodriguez',
    index: '3/5',
    type: 'quote',
    quote: '“Intelligent tools that understand aesthetics and adapt to your creative direction.”',
    name: 'MAYA RODRIGUEZ',
    role: 'Art Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'nina-petersen',
    index: '4/5',
    type: 'quote',
    quote: '“Upload to complete moodboard in seconds. No complex workflows or manual setup.”',
    name: 'NINA PETERSEN',
    role: 'Lead designer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'clara-fontaine',
    index: '5/5',
    type: 'quote',
    quote: '“Intelligent tools that understand aesthetics and adapt to your creative direction.”',
    name: 'CLARA FONTAINE',
    role: 'Marketing Agent',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop',
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialVideoRef = useRef<HTMLVideoElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials-section"
      className="w-full px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-28 bg-[#fcfbf9] border-t border-neutral-200/80 select-none overflow-hidden"
    >
      {/* 1. Header with Title & Arrow Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
        <div>
          <span className="block text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-500 uppercase mb-3">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-neutral-950 uppercase leading-tight">
            BRANDS THAT LOVE <br />
            WORKING WITH US
          </h2>
        </div>

        {/* Carousel Navigation Buttons (< and >) */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            id="testimonials-prev-btn"
            className="w-12 h-12 rounded-full bg-[#dbfa07] text-black flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#181a33] hover:text-white active:scale-95 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <button
            onClick={handleNext}
            id="testimonials-next-btn"
            className="w-12 h-12 rounded-full bg-[#dbfa07] text-black flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#181a33] hover:text-white active:scale-95 shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Testimonials Carousel Track */}
      <div
        ref={carouselContainerRef}
        className="relative w-full overflow-hidden"
      >
        <motion.div
          animate={{ x: `-${currentIndex * 280}px` }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="flex gap-4 sm:gap-5 md:gap-6 py-2"
        >
          {TESTIMONIALS.map((item) => {
            if (item.type === 'video') {
              return (
                <div
                  key={item.id}
                  style={{ borderRadius: '6px' }}
                  className="relative shrink-0 w-[260px] sm:w-[280px] md:w-[320px] min-h-[340px] sm:min-h-[380px] md:min-h-[400px] overflow-hidden bg-neutral-900 shadow-xs border border-neutral-300/80 group flex flex-col justify-between p-6"
                >
                  {/* Background Autoplay Video */}
                  <div className="absolute inset-0 z-0">
                    <video
                      ref={testimonialVideoRef}
                      src={item.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-all duration-500 filter-none opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                  </div>

                  {/* Top Bar: 5 White Stars & Index 1/5 */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                      ))}
                    </div>
                    <span className="text-xs font-mono-clean font-bold text-white/90">
                      {item.index}
                    </span>
                  </div>

                  {/* Bottom Author Info */}
                  <div className="relative z-10 text-white">
                    <h4 className="text-sm sm:text-base font-black uppercase tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-white/80 font-normal">
                      {item.role}
                    </p>
                  </div>
                </div>
              );
            }

            // Standard Quote Testimonial Card
            return (
              <div
                key={item.id}
                style={{ borderRadius: '6px' }}
                className="relative shrink-0 w-[260px] sm:w-[280px] md:w-[320px] min-h-[340px] sm:min-h-[380px] md:min-h-[400px] bg-[#f4f3ef] shadow-xs border border-neutral-300/80 flex flex-col justify-between p-6 transition-all duration-200 hover:shadow-md hover:border-neutral-400"
              >
                {/* Top Bar: 5 Black Stars & Index */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-1 text-neutral-950">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950" />
                      ))}
                    </div>
                    <span className="text-xs font-mono-clean font-bold text-neutral-700">
                      {item.index}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm sm:text-[15px] md:text-base font-normal text-neutral-800 leading-relaxed">
                    {item.quote}
                  </p>
                </div>

                {/* Bottom Author Detail with Avatar */}
                <div className="flex items-center gap-3 pt-6 border-t border-neutral-200/60">
                  {item.avatar && (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      style={{ borderRadius: '6px' }}
                      className="w-10 h-10 object-cover border border-neutral-300/60"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-neutral-950">
                      {item.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-500 font-normal">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* 3. Bottom Trust Badge & Note */}
      <div className="mt-14 sm:mt-18 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-1 text-neutral-950 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950" />
            ))}
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed max-w-sm">
            We've worked with over 200 clients who trust us with their brand. Want to see what we could do for you?
          </p>
        </div>
      </div>
    </section>
  );
};
