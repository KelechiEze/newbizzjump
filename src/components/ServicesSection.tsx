import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  index: string;
  title: string;
  bulletPoints: string[];
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'art-direction',
    index: '01',
    title: 'ART DIRECTION',
    bulletPoints: ['Visual direction', 'Type rules', 'Layout system'],
    description:
      'We set the visual direction for a brand or a project. That includes references, layout rules, typography choices, and the overall look and feel—so every page and asset follows the same logic.',
  },
  {
    id: 'branding',
    index: '02',
    title: 'BRANDING',
    bulletPoints: ['Brand basics', 'Visual system', 'Simple guidelines'],
    description:
      "We build or refine your brand identity so it's clear, consistent, and practical. You get the essentials done properly: foundations, usage rules, and a system that can grow with your needs.",
  },
  {
    id: 'marketing',
    index: '03',
    title: 'MARKETING',
    bulletPoints: ['Campaign assets', 'Landing pages', 'Content templates'],
    description:
      'We design marketing assets that communicate quickly and look consistent across channels. This can include campaign concepts, landing pages, social content, and a repeatable system for your team.',
  },
  {
    id: 'web-development',
    index: '04',
    title: 'WEB DEVELOPMENT',
    bulletPoints: ['Responsive build', 'Clean code', 'Fast loading'],
    description:
      'We design and build websites that are fast, responsive, and straightforward to maintain. We focus on structure first, then details—so the site works well now and still works well later.',
  },
  {
    id: 'editorial',
    index: '05',
    title: 'EDITORIAL',
    bulletPoints: ['Article layouts', 'Clear hierarchy', 'Reading rhythm'],
    description:
      'We create editorial layouts for content-heavy pages like journals, case studies, and guides. We focus on readability, hierarchy, and rhythm—so content feels organized and easy to scan.',
  },
];

interface ServicesSectionProps {
  onOpenStartProject: () => void;
}

export const ServicesSection = ({ onOpenStartProject }: ServicesSectionProps) => {
  // Accordion allows open items; defaults with item 01 open like the reference video
  const [openServiceIds, setOpenServiceIds] = useState<string[]>(['art-direction']);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="services-section"
      className="w-full px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-28 bg-[#fcfbf9] border-t border-neutral-200/80 select-none"
    >
      {/* 1. Header: SERVICES [4] on Left | "We work across art direction..." on Right */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-10 sm:mb-12 md:mb-14">
        {/* Main Section Heading */}
        <div className="flex items-start gap-2 sm:gap-3">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-neutral-950 uppercase leading-none">
            SERVICES
          </h2>
          <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-500 translate-y-1 sm:translate-y-2">
            (4)
          </span>
        </div>

        {/* Editorial Subtitle */}
        <div className="max-w-md text-left">
          <p className="text-sm sm:text-base md:text-lg font-medium text-neutral-800 leading-snug tracking-tight">
            We work across art direction, <br className="hidden sm:inline" />
            branding, editorial design, and web development.
          </p>
        </div>
      </div>

      {/* 2. Full-Width Autoplaying Infinite Video Container */}
      <div 
        style={{ borderRadius: '6px' }}
        className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] md:aspect-[16/8] lg:aspect-[16/7.5] min-h-[280px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[520px] overflow-hidden bg-neutral-950 mb-14 sm:mb-18 md:mb-20 shadow-sm border border-neutral-200/60"
      >
        <video
          src="https://res.cloudinary.com/hdwuzrzf/video/upload/v1787860193/6995327_Cyberpunk_Cyber_1920x1080.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ borderRadius: '6px' }}
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </div>

      {/* 3. Interactive Motion Accordion List */}
      <div className="w-full border-t border-neutral-200/80 divide-y divide-neutral-200/80">
        {SERVICES_DATA.map((service) => {
          const isOpen = openServiceIds.includes(service.id);
          const isHovered = hoveredId === service.id;

          return (
            <div
              key={service.id}
              className="py-6 sm:py-8 md:py-10 transition-colors duration-200"
              id={`service-row-${service.id}`}
            >
              {/* Accordion Row Header: Index | Title | Icon */}
              <div
                onClick={() => toggleService(service.id)}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="grid grid-cols-12 items-center gap-4 sm:gap-6 cursor-pointer group"
              >
                {/* Index (01, 02, etc.) */}
                <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2">
                  <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-800">
                    {service.index}
                  </span>
                </div>

                {/* Service Title */}
                <div className="col-span-8 sm:col-span-9 md:col-span-9 lg:col-span-9">
                  <h3
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black uppercase tracking-[-0.03em] transition-colors duration-200 ${
                      isHovered ? 'text-neutral-400' : 'text-neutral-950'
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Toggle Icon Indicator (+ / -) */}
                <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-end">
                  <div className="w-8 h-8 flex items-center justify-center text-neutral-900 transition-transform duration-200 group-hover:scale-110">
                    {isOpen ? (
                      <Minus className="w-6 h-6 stroke-[2]" />
                    ) : (
                      <Plus className="w-6 h-6 stroke-[2]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Accordion Expandable Content with Framer Motion */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-4 sm:gap-6 pt-6 sm:pt-8 md:pt-10">
                      {/* Left: Bullet Point Sub-Deliverables */}
                      <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-3 sm:pl-2">
                        <ul className="space-y-2 text-xs sm:text-[13px] md:text-sm font-medium text-neutral-800">
                          {service.bulletPoints.map((bullet, idx) => (
                            <li key={idx} className="tracking-tight">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Rich Descriptive Paragraph */}
                      <div className="col-span-12 sm:col-span-8 md:col-span-8 lg:col-span-8">
                        <p className="text-sm sm:text-base md:text-[17px] lg:text-lg font-normal text-neutral-700 leading-relaxed md:leading-[1.65] max-w-3xl">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Tailored Service CTA */}
      <div className="mt-14 sm:mt-18 md:mt-20 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <p className="text-sm sm:text-base text-neutral-700 font-normal leading-relaxed max-w-md">
          If you don't find exactly the service you need, we can tailor one for you.
        </p>

        <button
          onClick={onOpenStartProject}
          id="services-tailor-btn"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#dbfa07] text-black font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer group"
        >
          <span>BOOK A CALL</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </section>
  );
};
