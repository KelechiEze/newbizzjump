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
      className="w-full px-6 md:px-12 lg:px-16 pt-4 sm:pt-6 md:pt-8 pb-20 sm:pb-24 border-t border-neutral-200/80 select-none bg-[#fcfbf9]"
    >
      {/* Top Header Block: Left "WHO WE ARE" | Center Main Pitch + CTA Buttons | Right "01" */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-start">
        {/* Left Column: WHO WE ARE */}
        <div className="md:col-span-3 lg:col-span-3">
          <span className="text-[14px] sm:text-[15px] font-medium uppercase tracking-normal text-neutral-800 block">
            WHO WE ARE
          </span>
        </div>

        {/* Center Column: Big Statement Headline + Actions */}
        <div className="md:col-span-8 lg:col-span-8 space-y-8 sm:space-y-10 lg:px-12">
          <p className="text-[20px] sm:text-[22px] font-medium text-neutral-900 leading-[1.22] md:leading-[1.25] tracking-[-0.03em] max-w-4xl">
            We help brands create clear visuals, strong websites, and consistent marketing. We turn bold ideas into intuitive experiences. We are a creative design agency.
          </p>

          {/* Action Buttons: Green bg #dbfa07 with black text -> Deep Purple #181a33 with white text on hover */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
            {/* OUR WORK Button */}
            <button
              onClick={onOpenProjects}
              id="who-we-are-our-work-btn"
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#dbfa07] text-black font-medium text-xs sm:text-sm tracking-normal uppercase rounded-full hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              OUR WORK
            </button>

            {/* OUR APPROACH ↗ Text Link (no background) */}
            <button
              onClick={onOpenOurApproach}
              id="who-we-are-our-approach-btn"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-neutral-900 font-medium text-xs sm:text-sm tracking-normal uppercase hover:text-neutral-600 transition-colors active:scale-95 cursor-pointer group"
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
      <div className="mt-10 sm:mt-12 md:mt-16">
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
          <p className="text-[15px] font-medium text-neutral-700 tracking-[-0.01em]">
            Some of the brands we collaborate with
          </p>
        </div>

        {/* 6 Brands Showcase Grid (Exact Replica of the 2-row x 3-column layout) */}
        <div className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-3 px-2 sm:gap-4 sm:px-4 md:gap-5 md:px-8 lg:grid-cols-3 lg:px-4">
          
          {/* 1. Lola logo */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(1)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-4 sm:p-5 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[140px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-lola"
          >
            <div className="w-full h-full min-h-[110px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://vdvqizejzzdociiqymld.supabase.co/storage/v1/object/public/Images%20For%20bizz/Lola%20logo.avif"
                alt="Lola Shoneyin logo"
                referrerPolicy="no-referrer"
                className="max-w-[72%] max-h-24 w-auto h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* 2. Brand collaboration image */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(2)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-4 sm:p-5 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[140px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-2"
          >
            <div className="w-full h-full min-h-[110px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://vdvqizejzzdociiqymld.supabase.co/storage/v1/object/public/Images%20For%20bizz/5.avif"
                alt="Brand collaboration 5"
                referrerPolicy="no-referrer"
                className="max-w-[72%] max-h-24 w-auto h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* 3. Brand collaboration image */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(3)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-3 sm:p-4 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[140px] flex items-center justify-center transition-all duration-300 border border-[#f0dcd9] shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-3"
          >
            <div className="w-full h-full min-h-[110px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://vdvqizejzzdociiqymld.supabase.co/storage/v1/object/public/Images%20For%20bizz/3.avif"
                alt="Brand collaboration 3"
                referrerPolicy="no-referrer"
                className="max-w-[72%] max-h-24 w-auto h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* 4. Brand collaboration image */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(4)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-3 sm:p-4 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[140px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-4"
          >
            <div className="w-full h-full min-h-[110px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://vdvqizejzzdociiqymld.supabase.co/storage/v1/object/public/Images%20For%20bizz/4.avif"
                alt="Brand collaboration 4"
                referrerPolicy="no-referrer"
                className="max-w-[72%] max-h-24 w-auto h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* 5. Brand collaboration image */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(5)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-4 sm:p-5 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[140px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-5"
          >
            <div className="w-full h-full min-h-[110px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://vdvqizejzzdociiqymld.supabase.co/storage/v1/object/public/Images%20For%20bizz/2.avif"
                alt="Brand collaboration 2"
                referrerPolicy="no-referrer"
                className="max-w-[72%] max-h-24 w-auto h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* 6. Brand collaboration image */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredBrand(6)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative bg-[#f5f4f0] hover:bg-[#f0eee8] rounded-2xl p-4 sm:p-5 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[140px] flex items-center justify-center transition-all duration-300 border border-neutral-200/60 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
            id="brand-card-6"
          >
            <div className="w-full h-full min-h-[110px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://vdvqizejzzdociiqymld.supabase.co/storage/v1/object/public/Images%20For%20bizz/6.avif"
                alt="Brand collaboration 6"
                referrerPolicy="no-referrer"
                className="max-w-[72%] max-h-24 w-auto h-auto object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
