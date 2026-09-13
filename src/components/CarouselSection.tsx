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
  const [activeIndex, setActiveIndex] = useState(0);

  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const accumulatorRef = useRef<number>(0);

  // We repeat projects 3 times to create a truly seamless infinite scroll track
  const duplicatedProjects = [...projects, ...projects, ...projects];

  // Calculate dynamic step distance based on current card width + gap
  const getScrollStep = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 300;
    const firstCard = el.querySelector<HTMLElement>('[id^="carousel-card-"]');
    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const computedGap = parseFloat(window.getComputedStyle(el).gap || '12') || 12;
      return cardWidth + computedGap;
    }
    return 300;
  }, []);

  // Initialize scroll position in the middle track for bidirectional infinite scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const initScroll = () => {
      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0 && el.scrollLeft < 10) {
        el.scrollLeft = singleSetWidth;
      }
    };

    initScroll();
    const t = setTimeout(initScroll, 250);
    return () => clearTimeout(t);
  }, [projects.length]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (navTimeoutRef.current) window.clearTimeout(navTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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

  // ✅ AUTO-SCROLL: requestAnimationFrame with delta-time movement (works on mobile)
  useEffect(() => {
    const PIXELS_PER_SECOND = 45;

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isDragging && !isNavigatingRef.current) {
        accumulatorRef.current += (PIXELS_PER_SECOND * delta) / 1000;

        if (accumulatorRef.current >= 1) {
          const el = containerRef.current;
          if (el) {
            const move = Math.floor(accumulatorRef.current);
            accumulatorRef.current -= move;
            el.scrollLeft += move;
            handleInfiniteScrollWrap();
          }
        }
      } else {
        accumulatorRef.current = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
    };
  }, [isDragging, handleInfiniteScrollWrap]);

  // Navigation step handlers for left and right buttons
  const performStepScroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;

    isNavigatingRef.current = true;
    if (navTimeoutRef.current) {
      window.clearTimeout(navTimeoutRef.current);
    }
    navTimeoutRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1400);

    const step = getScrollStep();
    const singleSetWidth = el.scrollWidth / 3;

    if (direction === 'left') {
      if (singleSetWidth > 0 && el.scrollLeft - step < 20) {
        el.scrollLeft += singleSetWidth;
      }
      el.scrollBy({ left: -step, behavior: 'smooth' });
    } else {
      if (singleSetWidth > 0 && el.scrollLeft + step > singleSetWidth * 2 - 20) {
        el.scrollLeft -= singleSetWidth;
      }
      el.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = (e?: MouseEvent) => {
    e?.stopPropagation();
    performStepScroll('left');
  };

  const handleScrollRight = (e?: MouseEvent) => {
    e?.stopPropagation();
    performStepScroll('right');
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
      if (project.website) {
        window.location.assign(project.website);
      } else {
        onSelectProject(project);
      }
    }
  };

  return (
    <section 
      className="w-full relative pb-16 pt-2 select-none group/carousel"
      onMouseLeave={() => {
        setIsDragging(false);
      }}
    >
      <div className="relative w-full">
        {/* Floating Left Navigation Button */}
        <button
          type="button"
          onClick={handleScrollLeft}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-13 md:h-13 rounded-full bg-[#dbfa07] text-black hover:bg-[#181a33] hover:text-white shadow-[0_4px_25px_rgba(0,0,0,0.25)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group pointer-events-auto select-none"
          aria-label="Scroll left"
          id="carousel-btn-left"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 -translate-x-0.5" />
        </button>

        {/* Floating Right Navigation Button */}
        <button
          type="button"
          onClick={handleScrollRight}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-13 md:h-13 rounded-full bg-[#dbfa07] text-black hover:bg-[#181a33] hover:text-white shadow-[0_4px_25px_rgba(0,0,0,0.25)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group pointer-events-auto select-none"
          aria-label="Scroll right"
          id="carousel-btn-right"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 translate-x-0.5" />
        </button>

        {/* Main Infinite Horizontal Carousel Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          // ✅ Reduced padding on mobile (px-3) so cards have more room
          className="w-full overflow-x-auto no-scrollbar flex items-stretch gap-2 sm:gap-2.5 md:gap-3 px-3 sm:px-6 md:px-12 lg:px-16 cursor-grab active:cursor-grabbing touch-pan-x"
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
                // ✅ 3 CARDS FIT ON MOBILE
                // (100vw - 24px padding - 16px gaps) / 3 = each card
                className="flex-shrink-0 w-[calc((100vw-40px)/3)] sm:w-[calc((100vw-60px)/3)] md:w-[340px] lg:w-[440px] group cursor-pointer"
                id={`carousel-card-${project.id}-${idx}`}
              >
                <div 
                  style={{ borderRadius: '6px' }}
                  // ✅ Taller aspect ratio on mobile so cards don't look cramped
                  className="relative w-full aspect-[3/5] sm:aspect-[9/14] md:aspect-[3/4] overflow-hidden bg-neutral-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1.5 border border-neutral-200/60"
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
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-5 md:p-6 text-white pointer-events-none"
                  >
                    {/* Top pill tags */}
                    <div className="flex items-center justify-between">
                      <span 
                        style={{ borderRadius: '6px' }}
                        className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-white/25 backdrop-blur-md text-[8px] sm:text-[11px] font-bold tracking-wider uppercase border border-white/20"
                      >
                        {project.category}
                      </span>
                      <span 
                        style={{ borderRadius: '6px' }}
                        className="w-5 h-5 sm:w-8 sm:h-8 bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/20"
                      >
                        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </span>
                    </div>

                    {/* Bottom title & info */}
                    <div>
                      <span className="text-[8px] sm:text-[11px] font-medium tracking-widest uppercase text-neutral-300 block mb-0.5 sm:mb-1">
                        {project.client}
                      </span>
                      <h3 className="text-xs sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight sm:leading-snug">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Minimal Bottom Pill on mobile / default when not hovering */}
                  <div 
                    style={{ borderRadius: '6px' }}
                    className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-neutral-900/70 backdrop-blur-md text-white text-[7px] sm:text-[10px] font-semibold tracking-wider uppercase group-hover:opacity-0 transition-opacity duration-200"
                  >
                    {project.badge || project.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};