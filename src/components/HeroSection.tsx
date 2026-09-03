import { useState } from 'react';
import { ArrowUpRight, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { CREATORS } from '../data/projectsData';

interface HeroSectionProps {
  onOpenStartProject: () => void;
  onOpenOurApproach: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const HeroSection = ({
  onOpenStartProject,
  onOpenOurApproach,
  onOpenAbout,
  onOpenContact,
}: HeroSectionProps) => {
  const [activeStatHover, setActiveStatHover] = useState<string | null>(null);

  // BIZZJUMP letters for silky-smooth slow-motion bouncing wave
  const titleLetters = 'BIZZJUMP'.split('');

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 pt-6 md:pt-10 pb-12 select-none relative overflow-x-clip">
      {/* Massive Brand Display Title: Solid Black + Zero-Lag Bouncing Wave */}
      <div className="mb-8 md:mb-12 w-full overflow-visible flex items-center">
        <h1
          id="hero-main-title"
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[120px] 2xl:text-[132px] font-black tracking-[-0.03em] leading-none uppercase flex items-center flex-nowrap overflow-visible cursor-default select-none pr-4 sm:pr-8 text-neutral-900"
        >
          {titleLetters.map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              className="inline-block relative overflow-visible transform-gpu"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                paddingRight: idx === titleLetters.length - 1 ? '0.08em' : '0.01em',
              }}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1], // Smooth sine-curve for 0 jitter
                delay: idx * 0.11,
              }}
              whileHover={{
                scale: 1.06,
                y: -16,
                transition: { duration: 0.18, ease: 'easeOut' },
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Grid Row: Left Subtitle & Buttons + Right Stats Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        {/* Left Column: Subtitle & CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <p className="text-base sm:text-lg md:text-xl text-[#181a33]/85 font-medium max-w-xl leading-relaxed mb-6 md:mb-8 tracking-[-0.01em]">
            Strategy and design that actually make real sense for your growing brand.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* START PROJECT Pill Button: Green bg #dbfa07 + Black text -> Deep purple #181a33 + White text on hover */}
            <button
              onClick={onOpenStartProject}
              id="hero-start-project-btn"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#dbfa07] text-black rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#181a33] hover:text-white active:scale-95 transition-all duration-300 shadow-sm cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-black group-hover:bg-[#dbfa07] transition-colors" />
              <span>START PROJECT</span>
            </button>

            {/* OUR APPROACH ↗ Text Button (no background) */}
            <button
              onClick={onOpenOurApproach}
              id="hero-our-approach-btn"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-neutral-900 font-bold text-xs sm:text-sm tracking-wider uppercase hover:text-neutral-600 active:scale-95 transition-colors cursor-pointer group"
            >
              <span>OUR APPROACH</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Studio Key Stats Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full max-w-md lg:ml-auto"
        >
          <div className="flex flex-col text-xs sm:text-[13px] font-bold tracking-wider uppercase text-[#181a33]">
            {/* Stat Row 1: RESPONSE TIME */}
            <div
              onMouseEnter={() => setActiveStatHover('time')}
              onMouseLeave={() => setActiveStatHover(null)}
              onClick={onOpenContact}
              className="py-3 border-b border-neutral-200 flex items-center justify-between group cursor-pointer hover:border-[#181a33] transition-colors relative"
              id="stat-response-time"
            >
              <span className="text-neutral-500 group-hover:text-[#181a33] transition-colors flex items-center gap-2">
                RESPONSE TIME
              </span>
              <span className="text-[#181a33] font-black text-sm sm:text-base font-mono-clean group-hover:underline">
                3H
              </span>

              {/* Hover Tooltip */}
              {activeStatHover === 'time' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-[#181a33] text-white text-[11px] font-normal normal-case rounded shadow-lg pointer-events-none z-20 whitespace-nowrap flex items-center gap-1.5"
                >
                  <Clock className="w-3 h-3 text-[#dbfa07]" />
                  <span>Avg first response within 3 hours during active sprints</span>
                </motion.div>
              )}
            </div>

            {/* Stat Row 2: CREATORS */}
            <div
              onMouseEnter={() => setActiveStatHover('creators')}
              onMouseLeave={() => setActiveStatHover(null)}
              onClick={onOpenAbout}
              className="py-3 border-b border-neutral-200 flex items-center justify-between group cursor-pointer hover:border-[#181a33] transition-colors relative"
              id="stat-creators"
            >
              <span className="text-neutral-500 group-hover:text-[#181a33] transition-colors flex items-center gap-2">
                CREATORS
              </span>
              <div className="flex items-center gap-2">
                {/* Creator Avatar Avatars Stack */}
                <div className="flex -space-x-1.5 overflow-hidden items-center">
                  {CREATORS.slice(0, 3).map((creator) => (
                    <img
                      key={creator.name}
                      src={creator.avatar}
                      alt={creator.name}
                      referrerPolicy="no-referrer"
                      className="inline-block h-5 w-5 rounded-full ring-1 ring-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-[#181a33] font-black text-sm sm:text-base font-mono-clean group-hover:underline">
                  23
                </span>
              </div>

              {/* Hover Tooltip */}
              {activeStatHover === 'creators' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-[#181a33] text-white text-[11px] font-normal normal-case rounded shadow-lg pointer-events-none z-20 whitespace-nowrap flex items-center gap-1.5"
                >
                  <Users className="w-3 h-3 text-[#dbfa07]" />
                  <span>23 Multi-disciplinary designers, art directors & strategists</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
