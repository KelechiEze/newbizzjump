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
  const [videoReady, setVideoReady] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  // Counter animation on scroll for Stats (500+ and 200+)
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  // ✅ FORCE VIDEO PLAYBACK ON MOBILE
  // Mobile browsers (iOS Safari, Android Chrome) frequently ignore the autoPlay
  // attribute even when the video is muted. We must explicitly call .play() after
  // the video has loaded, and retry on visibility changes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Make sure the video is muted programmatically too — some browsers
    // reset the muted state and then block autoplay.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoReady(true);
            setNeedsTap(false);
          })
          .catch(() => {
            // Autoplay was blocked. Show the tap-to-play overlay so the user
            // can start it with a gesture (which mobile browsers allow).
            setNeedsTap(true);
          });
      }
    };

    // Attempt playback as soon as enough data is available.
    const handleLoadedData = () => tryPlay();
    const handleCanPlay = () => tryPlay();

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);

    // If the video already has data cached, try immediately.
    if (video.readyState >= 2) {
      tryPlay();
    }

    // Retry when the tab becomes visible again (mobile browsers pause
    // background videos and won't resume them automatically).
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Retry when the video enters the viewport (mobile lazy behaviour).
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tryPlay();
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(video);
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (observer) observer.disconnect();
    };
  }, []);

  // ✅ Tap-to-play handler for the fallback overlay
  const handleTapToPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setNeedsTap(false);
          setVideoReady(true);
        })
        .catch(() => {
          // Still blocked — keep the overlay.
          setNeedsTap(true);
        });
    }
  };

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

        {/* Stepped Flow Cards with Motion Scroll-Triggered Stagger Float Up & Color Theme Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 border-b border-neutral-200/80 pb-8 lg:pb-12">
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
              className={`group relative p-6 sm:p-7 md:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] bg-white border border-neutral-200/80 shadow-xs transition-all duration-300 hover:bg-[#dbfa07] hover:shadow-md cursor-pointer ${
                index === 1 ? 'lg:mt-10' : index === 2 ? 'lg:mt-20' : index === 3 ? 'lg:mt-30' : ''
              }`}
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
            <h3 className="text-[20px] sm:text-[22px] md:text-[22px] font-medium text-neutral-950 leading-[1.4] tracking-[-0.02em] mb-8">
              We're a small team doing thoughtful design work for brands that want to stand out. No big agency overhead, no unnecessary process, just clear strategic thinking and truly honest execution.
            </h3>

            {/* Action Buttons: ABOUT THE STUDIO (Citron Green to Deep Purple) | OUR WORK ↗ */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onOpenAbout}
                id="more-about-the-studio-btn"
                className="px-7 py-3.5 bg-[#dbfa07] text-black font-medium text-xs sm:text-sm tracking-normal uppercase rounded-full hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                ABOUT THE STUDIO
              </button>

              <button
                onClick={onOpenProjectsArchive}
                id="more-about-our-work-btn"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-neutral-900 font-medium text-xs sm:text-sm tracking-normal uppercase hover:text-neutral-600 transition-colors active:scale-95 cursor-pointer group"
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
          className="relative w-full aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/8] min-h-[260px] sm:min-h-[330px] md:min-h-[380px] overflow-hidden bg-neutral-950 mb-14 sm:mb-18 md:mb-20 shadow-md border border-neutral-200/60 group"
        >
          {/* Studio Video Background — mobile-safe playback */}
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/nqlff1i2/video/upload/v1787743435/huki_wu5fzr.mp4"
            loop
            muted
            autoPlay
            playsInline
            // @ts-ignore - webkit-playsinline is required for older iOS Safari
            webkit-playsinline="true"
            // @ts-ignore - x5-playsinline helps on some Android WebViews (WeChat, QQ, etc.)
            x5-playsinline="true"
            x5-video-player-type="h5"
            preload="auto"
            disablePictureInPicture
            controls={false}
            style={{ borderRadius: '6px' }}
            className="w-full h-full object-cover transition-all duration-500 filter-none opacity-90 group-hover:opacity-100"
          />

          {/* Fallback & Atmosphere Gradient Overlay */}
          <div
            style={{ borderRadius: '6px' }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
          />

          {/* ✅ TAP-TO-PLAY FALLBACK (only shown if mobile browser blocked autoplay) */}
          {needsTap && (
            <button
              type="button"
              onClick={handleTapToPlay}
              aria-label="Play video"
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity duration-300"
              style={{ borderRadius: '6px' }}
            >
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#dbfa07] text-black flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95">
                {/* Simple play triangle */}
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="translate-x-[2px]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}

          {/* Year Tag (Top Right: 2026) */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-10 pointer-events-none">
            <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              2026
            </span>
          </div>

          {/* Bottom Left Studio Label & Author */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 text-white pointer-events-none">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">
              THE DESIGN AGENCY
            </h4>
            <p className="text-xs sm:text-sm font-medium text-white/80 tracking-wide">
              Built by Bizzjump
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