import { useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface WhoWeAreSectionProps {
  onOpenProjects: () => void;
  onOpenOurApproach: () => void;
}

export const WhoWeAreSection = ({
  onOpenProjects,
  onOpenOurApproach,
}: WhoWeAreSectionProps) => {
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);

  return (
    <section 
      id="who-we-are-section" 
      className="w-full px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 border-t border-neutral-200/80 select-none bg-[#fcfbf9]"
    >
      {/* Top Header Block: Left "WHO WE ARE" | Center Main Pitch + CTA Buttons | Right "01" */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-start">
        {/* Left Column: WHO WE ARE */}
        <div className="md:col-span-3 lg:col-span-3">
          <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.14em] text-neutral-800 block">
            WHO WE ARE
          </span>
        </div>

        {/* Center Column: Big Statement Headline + Actions */}
        <div className="md:col-span-8 lg:col-span-8 space-y-8 sm:space-y-10">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-semibold text-neutral-900 leading-[1.22] md:leading-[1.25] tracking-[-0.03em] max-w-4xl">
            We help brands create clear visuals, strong websites, and consistent marketing. We turn bold ideas into intuitive experiences. We are a creative design studio.
          </p>

          {/* Action Buttons: Green bg #dbfa07 with black text -> Deep Purple #181a33 with white text on hover */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
            {/* OUR WORK Button */}
            <button
              onClick={onOpenProjects}
              id="who-we-are-our-work-btn"
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#dbfa07] text-black font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              OUR WORK
            </button>

            {/* OUR APPROACH ↗ Text Link (no background) */}
            <button
              onClick={onOpenOurApproach}
              id="who-we-are-our-approach-btn"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-neutral-900 font-bold text-xs sm:text-sm tracking-wider uppercase hover:text-neutral-600 transition-colors active:scale-95 cursor-pointer group"
            >
              <span>OUR APPROACH</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Section Index "01" */}
        <div className="hidden md:block md:col-span-1 text-right">
          <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-500">
            01
          </span>
        </div>
      </div>

      {/* Collaboration / Brands Section */}
      <div className="mt-20 sm:mt-24 md:mt-28">
        {/* 5 Solid Black Stars & Subheading */}
        <div className="mb-8 sm:mb-10 space-y-2.5">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-neutral-950 text-neutral-950" 
              />
            ))}
          </div>
          <p className="text-xs sm:text-sm font-medium text-neutral-700 tracking-[-0.01em]">
            Some of the brands we collaborate with
          </p>
        </div>

        {/* 6 Brands Showcase Grid (Exact Replica of the 2-row x 3-column layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          
          {/* 1. UILOGOS */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(1)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-8 sm:p-10 min-h-[190px] sm:min-h-[220px] md:min-h-[240px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-uilogos"
          >
            <div className="w-full h-full min-h-[110px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://vdvqizejzzdociiqymld.supabase.co/storage/v1/object/public/Images%20For%20bizz/Lola%20logo.avif"
                alt="Lola Shoneyin logo"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-36 w-auto h-auto object-contain"
              />
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] uppercase font-bold tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
              UI System & Brand
            </div>
          </motion.div>

          {/* 2. 9 VELOCITY */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(2)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-8 sm:p-10 min-h-[190px] sm:min-h-[220px] md:min-h-[240px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-velocity"
          >
            <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
              {/* Circular '9' mark */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center font-black text-xl sm:text-2xl font-mono-clean shadow-xs">
                9
              </div>
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
                velocity
              </span>
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] uppercase font-bold tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Fintech Platform
            </div>
          </motion.div>

          {/* 3. PINK COSMETIC TUBE (High quality replica) */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(3)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#faebea] hover:bg-[#f6e4e3] rounded-2xl p-6 sm:p-8 min-h-[190px] sm:min-h-[220px] md:min-h-[240px] flex items-center justify-center transition-all duration-300 border border-[#f0dcd9] shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-cosmetics"
          >
            {/* Realistic stylized pink skincare applicator tube */}
            <div className="relative flex items-center justify-center h-36 sm:h-44 transition-transform duration-300 group-hover:scale-105">
              <div className="w-7 sm:w-8 h-32 sm:h-40 rounded-full bg-gradient-to-r from-[#f799a7] via-[#fba8b4] to-[#f28696] shadow-[0_8px_20px_rgba(242,134,150,0.35)] flex flex-col items-center justify-between py-3 border border-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="text-[7px] uppercase font-bold tracking-[0.2em] text-white/90 rotate-90 whitespace-nowrap">
                  SERUM · 50ML
                </span>
                <span className="w-3.5 h-1 rounded-sm bg-white/80" />
              </div>
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] uppercase font-bold tracking-widest text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Skincare & Packaging
            </div>
          </motion.div>

          {/* 4. KIMRONO (Black textured stitched leather tag) */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(4)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-6 sm:p-8 min-h-[190px] sm:min-h-[220px] md:min-h-[240px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-kimrono"
          >
            {/* Stitched tag aesthetic */}
            <div className="w-48 sm:w-56 py-4 px-5 bg-[#12141a] text-white rounded-xl shadow-lg border border-neutral-700 relative flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform duration-300">
              {/* String loop hole accent */}
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-500 mb-2" />
              <div className="font-serif italic font-normal text-xl sm:text-2xl text-white tracking-wide">
                kimrono
              </div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-400 mt-1 font-sans">
                A brand created by Kimrono Agency
              </div>
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] uppercase font-bold tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Agency Identity
            </div>
          </motion.div>

          {/* 5. ASGARDIA */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(5)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-8 sm:p-10 min-h-[190px] sm:min-h-[220px] md:min-h-[240px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-asgardia"
          >
            <div className="flex items-center gap-3.5 transition-transform duration-300 group-hover:scale-105">
              {/* Soundwave / equalizer vertical bars */}
              <div className="flex items-center gap-[3px] text-neutral-900">
                <span className="w-[3px] h-3 bg-neutral-900 rounded-xs" />
                <span className="w-[3px] h-5 bg-neutral-900 rounded-xs" />
                <span className="w-[3px] h-7 bg-neutral-900 rounded-xs" />
                <span className="w-[3px] h-8 bg-neutral-900 rounded-xs" />
                <span className="w-[3px] h-6 bg-neutral-900 rounded-xs" />
                <span className="w-[3px] h-4 bg-neutral-900 rounded-xs" />
                <span className="w-[3px] h-2 bg-neutral-900 rounded-xs" />
              </div>
              <span className="text-2xl sm:text-3xl font-serif font-black tracking-[0.12em] uppercase text-neutral-900">
                ASGARDIA
              </span>
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] uppercase font-bold tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Aerospace & Spatial
            </div>
          </motion.div>

          {/* 6. NIRASTATE */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(6)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-8 sm:p-10 min-h-[190px] sm:min-h-[220px] md:min-h-[240px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-nirastate"
          >
            <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
              {/* Architectural geometric arch icon */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-neutral-900 flex items-center justify-center relative">
                <div className="w-3 h-5 border-t-2 border-r-2 border-l-2 border-neutral-900 rounded-t-full" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                nirastate
              </span>
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] uppercase font-bold tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Real Estate Development
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
