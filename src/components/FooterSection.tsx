import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { PROJECTS } from '../data/projectsData';
import { SocialMediaLinks } from './SocialIcons';

interface FooterSectionProps {
  onSelectProject: (project: Project) => void;
}

interface FooterProjectItem {
  id: string;
  title: string;
  image: string;
}

const FOOTER_PROJECTS: FooterProjectItem[] = [
  {
    id: 'lumen-void',
    title: 'Lumen void',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'primary-form',
    title: 'Primary form',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'luma-wood',
    title: 'Luma wood',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=300&auto=format&fit=crop',
  },
];

export const FooterSection = ({ onSelectProject }: FooterSectionProps) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const titleLetters = 'BIZZJUMP'.split('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer
      id="footer-section"
      className="w-full px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-24 bg-[#181a33] text-white border-t border-neutral-800 select-none overflow-hidden"
    >
      {/* 1. Giant Display Infinite Marquee with Bouncing Wave Letters (White on Navy Blue) */}
      <div className="w-full mb-14 sm:mb-20 md:mb-24 overflow-hidden relative select-none py-2">
        <motion.div
          className="flex whitespace-nowrap gap-12 sm:gap-20 md:gap-28 w-max items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 22,
          }}
        >
          {[0, 1, 2, 3].map((repeatIndex) => (
            <div
              key={repeatIndex}
              className="flex items-center text-[18vw] sm:text-[18.5vw] md:text-[19vw] font-black tracking-[-0.05em] uppercase text-white leading-[0.82] shrink-0"
            >
              {titleLetters.map((char, idx) => (
                <motion.span
                  key={`${repeatIndex}-${char}-${idx}`}
                  className="inline-block relative overflow-visible transform-gpu"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased',
                    paddingRight: idx === titleLetters.length - 1 ? '0.08em' : '0.01em',
                  }}
                  animate={{
                    y: [0, -14, 0],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: [0.42, 0, 0.58, 1],
                    delay: idx * 0.11,
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -18,
                    color: '#dbfa07',
                    transition: { duration: 0.18, ease: 'easeOut' },
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="mx-6 sm:mx-10 md:mx-14 text-[6vw] sm:text-[7vw] font-light text-[#dbfa07] opacity-80">
                •
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-6">
        {/* Left Column: Newsletter & Social Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between min-h-[300px]">
          <div>
            <p className="text-base sm:text-lg md:text-xl font-normal text-neutral-200 leading-snug tracking-tight mb-8 max-w-sm">
              Subscribe for new projects and insights, once a month.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md">
              <div className="relative mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-transparent pb-3 text-sm sm:text-base font-normal text-white placeholder-neutral-400 border-b border-neutral-700 focus:border-[#dbfa07] focus:outline-hidden transition-colors"
                />
              </div>

              <button
                type="submit"
                id="footer-newsletter-submit-btn"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-widest uppercase text-white hover:text-[#dbfa07] transition-colors cursor-pointer group"
              >
                {isSubscribed ? (
                  <span className="flex items-center gap-1.5 text-[#dbfa07] font-bold">
                    <Check className="w-4 h-4" /> SUBSCRIBED
                  </span>
                ) : (
                  <>
                    <span>SUBMIT</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Social Channels & Studio Address */}
          <div className="mt-14 sm:mt-20 space-y-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 block mb-2">
                FOLLOW US
              </span>
              <SocialMediaLinks
                iconSize={18}
                className="gap-4"
                itemClassName="text-white hover:text-[#dbfa07] hover:bg-neutral-800"
              />
            </div>

            <p className="text-xs sm:text-sm font-normal text-neutral-400 leading-relaxed pt-2">
              Unter den Linden 129, <br />
              Berlin, Germany
            </p>
          </div>
        </div>

        {/* Right Column: Featured Projects Rows + Pages Links */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {/* Featured Projects Mini Showcase Rows */}
          <div className="divide-y divide-neutral-800 border-t border-b border-neutral-800 mb-14 sm:mb-20">
            {FOOTER_PROJECTS.map((project) => {
              const isHovered = hoveredProjectId === project.id;

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    const matched = PROJECTS.find((p) => p.id === project.id) || PROJECTS[0];
                    onSelectProject(matched);
                  }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className="py-4.5 sm:py-5 flex items-center justify-between gap-4 cursor-pointer group transition-colors duration-200"
                  id={`footer-project-row-${project.id}`}
                >
                  {/* Left Side: Animated Hover Arrow Indicator + Image Thumbnail + Project Title */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1 : 0.6,
                          x: isHovered ? 0 : -8,
                        }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#dbfa07] text-black flex items-center justify-center shadow-xs"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>

                    <div
                      style={{ borderRadius: '6px' }}
                      className="w-11 h-14 sm:w-12 sm:h-15 shrink-0 overflow-hidden bg-neutral-800 border border-neutral-700"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{ borderRadius: '6px' }}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    <span className="text-base sm:text-lg md:text-xl font-normal text-white tracking-tight transition-colors duration-200 group-hover:text-[#dbfa07]">
                      {project.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono-clean font-bold tracking-wider text-neutral-300 group-hover:text-white uppercase transition-colors">
                    <span>VIEW PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Links Grid with Direct React Router Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 pt-4">
            {/* Column 1 */}
            <div className="space-y-3">
              <Link
                to="/about"
                className="block text-xs sm:text-sm font-bold tracking-widest uppercase text-neutral-300 hover:text-[#dbfa07] transition-colors text-left cursor-pointer"
              >
                ABOUT
              </Link>
              <Link
                to="/projects"
                className="block text-xs sm:text-sm font-bold tracking-widest uppercase text-neutral-300 hover:text-[#dbfa07] transition-colors text-left cursor-pointer"
              >
                PROJECTS
              </Link>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <Link
                to="/services"
                className="block text-xs sm:text-sm font-bold tracking-widest uppercase text-neutral-300 hover:text-[#dbfa07] transition-colors text-left cursor-pointer"
              >
                SERVICES
              </Link>
              <Link
                to="/contact"
                className="block text-xs sm:text-sm font-bold tracking-widest uppercase text-neutral-300 hover:text-[#dbfa07] transition-colors text-left cursor-pointer"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
