import { useState, useRef, useEffect, useCallback, MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface CarouselSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const CarouselSection = ({ projects, onSelectProject }: CarouselSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // We repeat projects 3 times to create a truly seamless infinite scroll track
  const duplicatedProjects = [...projects, ...projects, ...projects];

  // Initialize scroll position in the middle track for bidirectional infinite scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Position at the start of the second set of projects
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth > 0) {
      el.scrollLeft = singleSetWidth;
    }
  }, [projects.length]);

  // Keep track of infinite wrap-around seamlessly
  const handleInfiniteScrollWrap = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    if (el.scrollLeft >= singleSetWidth * 2) {
      // Reached the 3rd set, seamlessly reset back to 2nd set without flash
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= 0) {
      // Reached the 1st set, seamlessly reset forward to 2nd set
      el.scrollLeft += singleSetWidth;
    }

    // Calculate normalized progress (0 to 1 across single set)
    const normalizedScroll = (el.scrollLeft % singleSetWidth) / singleSetWidth;
    setScrollProgress(normalizedScroll);

    // Active project index (0 to projects.length - 1)
    const cardWidthEstimate = singleSetWidth / projects.length;
    const currentRelIdx = Math.floor(((el.scrollLeft % singleSetWidth) + cardWidthEstimate / 2) / cardWidthEstimate) % projects.length;
    setActiveIndex(currentRelIdx >= 0 ? currentRelIdx : 0);
  }, [projects.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleInfiniteScrollWrap, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleInfiniteScrollWrap);
    };
  }, [handleInfiniteScrollWrap]);

  // Continuous auto-scroll animation loop (smooth requestAnimationFrame)
  useEffect(() => {
    let animFrameId: number;
    const speed = 0.85; // Pixels per frame (~50px/sec at 60fps)

    const step = () => {
      const el = containerRef.current;
      // Scroll continuously even when hovered over the track
      if (el && !isDragging && !isPausedByUser) {
        el.scrollLeft += speed;
        handleInfiniteScrollWrap();
      }
      animFrameId = requestAnimationFrame(step);
    };

    animFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameId);
  }, [isDragging, isPausedByUser, handleInfiniteScrollWrap]);

  // Navigation handlers for manual stepping
  const handleScrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftState(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      setHasMoved(true);
    }
    containerRef.current.scrollLeft = scrollLeftState - walk;
    handleInfiniteScrollWrap();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleCardClick = (project: Project) => {
    if (!hasMoved) {
      onSelectProject(project);
    }
  };

  return (
    <section 
      className="w-full relative pb-16 pt-2 select-none group/carousel"
      onMouseLeave={() => {
        setIsDragging(false);
      }}
    >
      {/* Floating Left Navigation Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-[#dbfa07] text-black hover:bg-[#181a33] hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Scroll left"
        id="carousel-btn-left"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 -translate-x-0.5" />
      </button>

      {/* Floating Right Navigation Button */}
      <button
        onClick={handleScrollRight}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-[#dbfa07] text-black hover:bg-[#181a33] hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Scroll right"
        id="carousel-btn-right"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 translate-x-0.5" />
      </button>

      {/* Main Infinite Horizontal Carousel Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className={`w-full overflow-x-auto no-scrollbar flex items-stretch gap-2 sm:gap-2.5 md:gap-3 px-6 md:px-12 lg:px-16 cursor-grab active:cursor-grabbing ${
          isDragging ? 'scroll-auto' : 'scroll-auto'
        }`}
        id="projects-carousel-container"
      >
        {duplicatedProjects.map((project, idx) => {
          const uniqueKey = `${project.id}-copy-${idx}`;
          return (
            <div
              key={uniqueKey}
              onMouseEnter={() => setHoveredCardId(uniqueKey)}
              onMouseLeave={() => setHoveredCardId(null)}
              onClick={() => handleCardClick(project)}
              className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[400px] lg:w-[440px] group cursor-pointer"
              id={`carousel-card-${project.id}-${idx}`}
            >
              {/* Outer Card Wrapper with 6px border-radius and increased height */}
              <div 
                style={{ borderRadius: '6px' }}
                className="relative w-full aspect-[9/14] sm:aspect-[9/13] md:aspect-[3/4] min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px] overflow-hidden bg-neutral-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1.5 border border-neutral-200/60"
              >
                {/* Visual Image with matching 6px radius inner fit */}
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  style={{ borderRadius: '6px' }}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />

                {/* Subtle dark ambient gradient on hover */}
                <div 
                  style={{ borderRadius: '6px' }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 md:p-6 text-white pointer-events-none"
                >
                  {/* Top pill tags */}
                  <div className="flex items-center justify-between">
                    <span 
                      style={{ borderRadius: '6px' }}
                      className="px-2.5 py-1 bg-white/25 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase border border-white/20"
                    >
                      {project.category}
                    </span>
                    <span 
                      style={{ borderRadius: '6px' }}
                      className="w-8 h-8 bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/20"
                    >
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </div>

                  {/* Bottom title & info */}
                  <div>
                    <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-300 block mb-1">
                      {project.client}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Minimal Bottom Pill on mobile / default when not hovering */}
                <div 
                  style={{ borderRadius: '6px' }}
                  className="absolute bottom-3 left-3 px-2.5 py-1 bg-neutral-900/70 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase group-hover:opacity-0 transition-opacity duration-200"
                >
                  {project.badge || project.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
