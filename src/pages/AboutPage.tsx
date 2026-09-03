import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Play, X, Linkedin, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { TikTokIcon } from '../components/SocialIcons';

interface AboutPageProps {
  onOpenStartProject?: (plan?: string) => void;
}

const CORE_TEAM = [
  {
    name: 'Mila Hartmann',
    role: 'ART DIRECTOR',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      tiktok: 'https://tiktok.com',
    },
  },
  {
    name: 'Jonas Keller',
    role: 'LEAD DESIGNER',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      tiktok: 'https://tiktok.com',
    },
  },
  {
    name: 'Lea Winter',
    role: 'STRATEGY DIRECTOR',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      tiktok: 'https://tiktok.com',
    },
  },
  {
    name: 'Niko Brandt',
    role: 'DEVELOPMENT LEAD',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      tiktok: 'https://tiktok.com',
    },
  },
  {
    name: 'Clara Vogel',
    role: 'PROJECT DIRECTOR',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      tiktok: 'https://tiktok.com',
    },
  },
];

const STUDIO_VIDEOS = [
  {
    id: 'cyberpunk',
    title: 'Cyberpunk Aesthetic & High Velocity Tech',
    year: '2026',
    url: 'https://res.cloudinary.com/hdwuzrzf/video/upload/v1787860193/6995327_Cyberpunk_Cyber_1920x1080.mp4',
    badge: '1080P MASTER REEL',
  },
  {
    id: 'brand-flow',
    title: 'Studio Vision & Brand Storytelling',
    year: '2026',
    url: 'https://res.cloudinary.com/hdwuzrzf/video/upload/v1787860132/Y7gFBMR55ZjxtJCLlsAbQkdlls.mp4',
    badge: 'DIRECTOR CUT',
  },
  {
    id: 'kinetic-craft',
    title: 'Kinetic Motion & Design Process',
    year: '2026',
    url: 'https://res.cloudinary.com/hdwuzrzf/video/upload/v1787860638/cfswkeB0BMGJhJ7eQEPa0QMZhg.mp4',
    badge: 'MOTION PROCESS',
  },
];

// Motion animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const AboutPage = ({ onOpenStartProject }: AboutPageProps) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [hoveredTeamIndex, setHoveredTeamIndex] = useState<number | null>(null);

  // Animated stat values
  const [statValues, setStatValues] = useState({
    valueCreated: 17,
    hoursInvested: 29,
    projectsDelivered: 107,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatValues({
        valueCreated: 32,
        hoursInvested: 54,
        projectsDelivered: 200,
      });
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-[#fcfbf9] text-neutral-950 pb-28 select-none overflow-x-hidden">
      {/* =========================================================================
          SECTION 1: STUDIO HERO & STORY (From Reference Video 00:00 - 00:18)
          ========================================================================= */}
      <section className="w-full px-6 md:px-12 lg:px-16 pt-8 md:pt-14 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-end mb-6 sm:mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-neutral-700 border border-neutral-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dbfa07] animate-pulse" />
              ABOUT US
            </span>
          </motion.div>

          {/* Main Display Headline with Line Mask Reveal */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-12 sm:mb-16"
          >
            <div className="overflow-hidden">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-black tracking-tight uppercase leading-[0.92] text-neutral-950"
              >
                REIMAGINING HOW
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-black tracking-tight uppercase leading-[0.92] text-neutral-950"
              >
                CUSTOMERS CONNECT
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-black tracking-tight uppercase leading-[0.92] text-neutral-950"
              >
                WITH YOUR BRAND
              </motion.h1>
            </div>
          </motion.div>

          {/* Subtext Grid: BASED IN BERLIN vs Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-12 sm:mb-16"
          >
            <div className="md:col-span-6">
              <span className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-neutral-900 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-neutral-900" />
                BASED IN BERLIN
              </span>
            </div>
            <div className="md:col-span-6 flex justify-start md:justify-end">
              <p className="text-sm sm:text-base text-neutral-700 max-w-md font-normal leading-relaxed text-left md:text-right">
                A design studio grounded in the thoughtful work and sustainable client partnerships built.
              </p>
            </div>
          </motion.div>

          {/* Large Architectural Studio Photograph / Video with Smooth Entry & Floating Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 aspect-[16/9] sm:aspect-[16/8.5] shadow-sm mb-16 sm:mb-24 group"
          >
            <video
              src="https://res.cloudinary.com/hdwuzrzf/video/upload/v1787860638/cfswkeB0BMGJhJ7eQEPa0QMZhg.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            />
            {/* Subtle Gradient Veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Dark Floating Pill in Bottom-Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setActiveVideoIdx(2);
                setIsPlayingVideo(true);
              }}
              className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 px-4 py-2 rounded-full bg-neutral-950/85 backdrop-blur-md text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-neutral-900"
            >
              <span>THE STUDIO</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#dbfa07]" />
            </motion.div>
          </motion.div>

          {/* "THE TEAM" - 01 Block with Manifesto & Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pt-4 pb-20 sm:pb-28 border-b border-neutral-200/80"
          >
            {/* Row: THE TEAM --- 01 */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-neutral-700 mb-8">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                THE TEAM
              </span>
              <span className="font-mono-clean text-neutral-500">01</span>
            </div>

            {/* Manifesto Statement */}
            <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 px-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg sm:text-2xl md:text-3xl text-neutral-900 font-normal leading-relaxed tracking-tight"
              >
                We're a small studio based in Berlin, working with clients around the world. We don't follow trends or chase awards. We focus on solving real problems through design, strategy, and clear communication.
              </motion.p>
            </div>

            {/* 3 Metric Stat Blocks with Spring Numbers & Hover Glow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 text-center">
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="pt-6 sm:pt-0 sm:px-6 group cursor-default"
              >
                <div className="text-5xl sm:text-6xl md:text-7xl font-black text-neutral-950 tracking-tight leading-none mb-3 group-hover:text-neutral-700 transition-colors">
                  ${statValues.valueCreated}M
                </div>
                <div className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-neutral-500">
                  VALUE CREATED
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="pt-6 sm:pt-0 sm:px-6 group cursor-default"
              >
                <div className="text-5xl sm:text-6xl md:text-7xl font-black text-neutral-950 tracking-tight leading-none mb-3 group-hover:text-neutral-700 transition-colors">
                  {statValues.hoursInvested}K
                </div>
                <div className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-neutral-500">
                  HOURS INVESTED
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="pt-6 sm:pt-0 sm:px-6 group cursor-default"
              >
                <div className="text-5xl sm:text-6xl md:text-7xl font-black text-neutral-950 tracking-tight leading-none mb-3 group-hover:text-neutral-700 transition-colors">
                  {statValues.projectsDelivered}+
                </div>
                <div className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-neutral-500">
                  PROJECTS DELIVERED
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ABOUT^US & Studio Showcase Video Banner (Video timestamp 00:09 - 00:18) */}
          <div className="pt-16 sm:pt-24">
            {/* Header with ABOUT^US and side manifesto quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12"
            >
              <div className="flex items-start">
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase text-neutral-950 leading-none">
                  ABOUT
                </h2>
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-xs sm:text-sm font-bold tracking-wider text-neutral-950 uppercase ml-1 -mt-1 font-mono-clean"
                >
                  US
                </motion.span>
              </div>
              <p className="text-sm sm:text-base text-neutral-700 max-w-sm font-normal leading-relaxed md:text-right">
                We believe that design is about making the right choices, not the flashiest ones.
              </p>
            </motion.div>

            {/* Cinematic Video / Ambient Reel Container with Pulsing Play Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                setActiveVideoIdx(0);
                setIsPlayingVideo(true);
              }}
              className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 aspect-[16/9] sm:aspect-[16/8] shadow-lg group cursor-pointer"
            >
              <video
                src="https://res.cloudinary.com/hdwuzrzf/video/upload/v1787860132/Y7gFBMR55ZjxtJCLlsAbQkdlls.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 group-hover:from-black/70 transition-colors" />

              {/* Top-Right Year Tag */}
              <div className="absolute top-6 right-6 text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-white/90">
                2026
              </div>

              {/* Center Play Button with Magnetic Breathing Pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outer breathing aura */}
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full bg-white/40"
                  />

                  {/* Main Play Circle */}
                  <motion.div
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:bg-[#dbfa07]"
                  >
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black translate-x-0.5" />
                  </motion.div>
                </div>
              </div>

              {/* Bottom-Left Tag: THE STUDIO by Nicolas Han */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white">
                <div className="text-sm sm:text-base font-bold uppercase tracking-wider flex items-center gap-2">
                  <span>THE STUDIO</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dbfa07]" />
                </div>
                <div className="text-xs sm:text-sm text-neutral-300 font-normal">
                  by Nicolas Han
                </div>
              </div>
            </motion.div>

            {/* Bottom Caption */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 flex items-center justify-between"
            >
              <p className="text-xs sm:text-sm text-neutral-600 font-normal max-w-md leading-relaxed">
                Our work is rooted in research, shaped by strategy, and refined through collaboration.
              </p>
              <span className="text-[11px] font-mono-clean text-neutral-400 hidden sm:inline">
                HD REEL • 02:40
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CORE TEAM - THE PEOPLE BEHIND THE WORK (From Screenshot 2)
          ========================================================================= */}
      <section className="w-full px-6 md:px-12 lg:px-16 pt-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 block mb-3">
              CORE TEAM
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-neutral-950">
              THE PEOPLE <br className="hidden sm:inline" />
              BEHIND THE WORK
            </h2>
          </motion.div>

          {/* Animated Clean Row List divided by lines matching Screenshot 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="divide-y divide-neutral-200 border-t border-b border-neutral-200"
          >
            {CORE_TEAM.map((member, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                onMouseEnter={() => setHoveredTeamIndex(i)}
                onMouseLeave={() => setHoveredTeamIndex(null)}
                className="py-5 sm:py-6 grid grid-cols-12 items-center gap-4 group hover:bg-neutral-100/70 transition-all duration-300 px-3 rounded-xl cursor-default relative overflow-hidden"
              >
                {/* Left side subtle active indicator */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredTeamIndex === i ? 1 : 0,
                    scaleY: hoveredTeamIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-950 origin-left"
                />

                {/* Left: Avatar + Full Name */}
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3.5 sm:gap-5">
                  <div className="relative">
                    <motion.img
                      animate={{
                        scale: hoveredTeamIndex === i ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-1 ring-neutral-200 shadow-xs flex-shrink-0"
                    />
                    {hoveredTeamIndex === i && (
                      <motion.span
                        layoutId="active-dot"
                        className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#dbfa07] border-2 border-white"
                      />
                    )}
                  </div>
                  <span className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight group-hover:text-neutral-600 transition-colors">
                    {member.name}
                  </span>
                </div>

                {/* Center: Role in uppercase */}
                <div className="col-span-4 sm:col-span-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-800 flex items-center gap-2">
                  <span>{member.role}</span>
                  <motion.div
                    animate={{
                      opacity: hoveredTeamIndex === i ? 1 : 0,
                      x: hoveredTeamIndex === i ? 0 : -6,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </motion.div>
                </div>

                {/* Right: Social Media Links (LinkedIn, Instagram, TikTok) */}
                <div className="col-span-2 sm:col-span-3 flex items-center justify-end gap-3 sm:gap-4 text-neutral-900">
                  <motion.a
                    whileHover={{ scale: 1.25, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="hover:text-neutral-500 transition-colors p-1"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.25, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on Instagram`}
                    className="hover:text-neutral-500 transition-colors p-1"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.25, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on TikTok`}
                    className="hover:text-neutral-500 transition-colors p-1"
                  >
                    <TikTokIcon size={16} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Studio Film Video Modal */}
      <AnimatePresence>
        {isPlayingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsPlayingVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header & Reel Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-neutral-800/80 bg-neutral-900/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dbfa07] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {STUDIO_VIDEOS[activeVideoIdx].title}
                  </span>
                  <span className="text-[10px] font-mono-clean px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                    {STUDIO_VIDEOS[activeVideoIdx].badge}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                    {STUDIO_VIDEOS.map((vid, idx) => (
                      <button
                        key={vid.id}
                        onClick={() => setActiveVideoIdx(idx)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          activeVideoIdx === idx
                            ? 'bg-[#dbfa07] text-neutral-950 shadow-sm'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        Reel 0{idx + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsPlayingVideo(false)}
                    className="w-8 h-8 rounded-full bg-neutral-800/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer ml-1"
                    aria-label="Close Video"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video
                  key={STUDIO_VIDEOS[activeVideoIdx].url}
                  src={STUDIO_VIDEOS[activeVideoIdx].url}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
