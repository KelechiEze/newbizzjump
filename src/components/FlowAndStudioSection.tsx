import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface FlowStep {
  id: string;
  stepNumber: string;
  title: string;
  percentage: number;
  percentageLabel: string;
  description: string;
  hasVisual?: boolean;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 'discover',
    stepNumber: '01',
    title: 'DISCOVER',
    percentage: 25,
    percentageLabel: '25%',
    description: 'Understanding your challenge, your audience, and what success looks like for you.',
  },
  {
    id: 'design',
    stepNumber: '02',
    title: 'DESIGN',
    percentage: 50,
    percentageLabel: '50%',
    description: 'Ideas take shape. We explore directions, test concepts, and refine until it feels right.',
    hasVisual: true,
  },
  {
    id: 'build',
    stepNumber: '03',
    title: 'BUILD',
    percentage: 75,
    percentageLabel: '75%',
    description: 'We develop the final product with attention to every detail and technical precision.',
  },
  {
    id: 'launch',
    stepNumber: '04',
    title: 'LAUNCH',
    percentage: 100,
    percentageLabel: '100%',
    description: 'We manage the launch, provide training if needed, and ensure a smooth transition.',
  },
];

interface FlowAndStudioSectionProps {
  onOpenAbout: () => void;
  onOpenProjectsArchive: () => void;
}

export const FlowAndStudioSection = ({
  onOpenAbout,
  onOpenProjectsArchive,
}: FlowAndStudioSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Counter animation on scroll for Stats (500+ and 200+)
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  useEffect(() => {
    if (!isStatsInView) return;

    let start = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    const animateCounters = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setProjectsCount(Math.floor(easeOut * 500));
      setClientsCount(Math.floor(easeOut * 200));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setProjectsCount(500);
        setClientsCount(200);
      }
    };

    requestAnimationFrame(animateCounters);
  }, [isStatsInView]);

  return (
    <div className="w-full bg-[#fcfbf9] select-none">
      {/* ========================================================
          PART 1: FLOW SECTION (4 Step Process + Interactive Hover)
          ======================================================== */}
      <section
        id="flow-section"
        className="w-full px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-24 border-t border-neutral-200/80"
      >
        {/* Header: FLOW on Left | Description on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-neutral-950 uppercase leading-none">
            FLOW
          </h2>

          <div className="max-w-md text-left">
            <p className="text-sm sm:text-base md:text-lg font-medium text-neutral-800 leading-snug tracking-tight">
              Our process for turning ideas <br className="hidden sm:inline" />
              into real, working solutions that deliver amazing results.
            </p>
          </div>
        </div>

        {/* Process Meta Tracker: PROCESS: 4 STEPS | DURATION: ~1 MONTH */}
        <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-neutral-200/80 text-[11px] sm:text-xs font-mono-clean font-bold tracking-widest text-neutral-500 uppercase">
          <span>PROCESS: 4 STEPS</span>
          <span>DURATION: ~ 1 MONTH</span>
        </div>

        {/* 4 Column Flow Grid with Motion Scroll-Triggered Stagger Float Up & Color Theme Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-neutral-200/80 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80">
          {FLOW_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                delay: index * 0.14,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              style={{ borderRadius: '6px' }}
              className="group relative p-6 sm:p-7 md:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] transition-all duration-300 hover:bg-[#dbfa07] cursor-pointer"
              id={`flow-step-${step.id}`}
            >
              {/* Top Content: Title + Description + Optional Design Visual */}
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-950 mb-4 transition-colors duration-300 group-hover:text-black">
                  {step.title}
                </h3>

                {/* Step 02 Visual Interactive Badge/Graphic as shown in video */}
                {step.hasVisual && (
                  <div className="my-5 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-950/5 border border-neutral-200/70 p-2 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:bg-black/10 group-hover:border-black/20">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-tr from-neutral-950 via-neutral-800 to-neutral-600 shadow-md flex items-center justify-center p-2">
                      <div className="w-full h-full rounded-lg bg-neutral-900 border border-white/20 flex flex-col items-center justify-center gap-1">
                        <div className="w-5 h-1 bg-white/80 rounded-full" />
                        <div className="w-3 h-1 bg-white/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-xs sm:text-sm md:text-[15px] font-normal text-neutral-600 leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-black/85">
                  {step.description}
                </p>
              </div>

              {/* Bottom Percentage Progress Bar & Numerical Tag */}
              <div className="pt-8">
                {/* Progress Percentage Text */}
                <span className="block text-xs sm:text-sm font-mono-clean font-bold tracking-wider text-neutral-950 mb-2 transition-colors duration-300 group-hover:text-black">
                  {step.percentageLabel}
                </span>

                {/* Progress Track & Fill Bar */}
                <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden transition-colors duration-300 group-hover:bg-black/20">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${step.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: 0.2 + index * 0.15,
                      ease: 'easeOut',
                    }}
                    className="h-full bg-neutral-950 transition-colors duration-300 group-hover:bg-black rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 2: MORE ABOUT US & THE STUDIO SECTION
          ======================================================== */}
      <section
        id="more-about-us-section"
        className="w-full px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28"
      >
        {/* Header Grid: MORE ABOUT US on Left | Statement in Center | Section Index 02 on Right */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start mb-12 sm:mb-16 md:mb-20">
          {/* Left: Section Label */}
          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-600 uppercase">
              MORE ABOUT US
            </span>
          </div>

          {/* Center: Mission Statement */}
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-neutral-950 leading-[1.3] tracking-tight mb-8">
              We're a small team in Berlin doing thoughtful design work for brands that want to stand out. No big agency overhead, no unnecessary process, just clear strategic thinking and truly honest execution.
            </h3>

            {/* Action Buttons: ABOUT THE STUDIO (Citron Green to Deep Purple) | OUR WORK ↗ */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onOpenAbout}
                id="more-about-the-studio-btn"
                className="px-7 py-3.5 bg-[#dbfa07] text-black font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                ABOUT THE STUDIO
              </button>

              <button
                onClick={onOpenProjectsArchive}
                id="more-about-our-work-btn"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-neutral-900 font-bold text-xs sm:text-sm tracking-wider uppercase hover:text-neutral-600 transition-colors active:scale-95 cursor-pointer group"
              >
                <span>OUR WORK</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right: Section Index */}
          <div className="col-span-12 md:col-span-1 lg:col-span-2 flex md:justify-end">
            <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-400">
              02
            </span>
          </div>
        </div>

        {/* 3. The Studio Video / Interactive Showcase Reel */}
        <div
          style={{ borderRadius: '6px' }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] min-h-[320px] sm:min-h-[420px] md:min-h-[500px] overflow-hidden bg-neutral-950 mb-14 sm:mb-18 md:mb-20 shadow-md border border-neutral-200/60 group"
        >
          {/* Studio Video Background */}
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/nqlff1i2/video/upload/v1787743435/huki_wu5fzr.mp4"
            loop
            muted
            autoPlay
            playsInline
            style={{ borderRadius: '6px' }}
            className="w-full h-full object-cover transition-all duration-500 filter-none opacity-90 group-hover:opacity-100"
          />

          {/* Fallback & Atmosphere Gradient Overlay */}
          <div
            style={{ borderRadius: '6px' }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
          />

          {/* Year Tag (Top Right: 2026) */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-10">
            <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              2026
            </span>
          </div>

          {/* Bottom Left Studio Label & Author */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 text-white">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">
              THE STUDIO
            </h4>
            <p className="text-xs sm:text-sm font-medium text-white/80 tracking-wide">
              by Nicolas Han
            </p>
          </div>
        </div>

        {/* 4. Live Counter Stats: 500+ PROJECTS DELIVERED | 200+ CLIENTS WORLDWIDE */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-end pt-4 sm:pt-6"
        >
          {/* Stat 1: 500+ Projects Delivered */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] text-neutral-950 leading-none mb-2">
              {projectsCount}+
            </div>
            <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-700 uppercase">
              PROJECTS DELIVERED
            </span>
          </div>

          {/* Stat 2: 200+ Clients Worldwide */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] text-neutral-950 leading-none mb-2">
              {clientsCount}+
            </div>
            <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-700 uppercase">
              CLIENTS WORLDWIDE
            </span>
          </div>

          {/* Stat Description Note */}
          <div className="md:col-span-4 lg:col-span-4">
            <p className="text-sm sm:text-base font-medium text-neutral-800 leading-snug tracking-tight max-w-xs md:ml-auto">
              Numbers that show we've been doing this long enough to know what works.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
