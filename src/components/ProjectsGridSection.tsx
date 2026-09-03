import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectsGridSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenProjectsArchive: () => void;
}

interface ProjectCardProps {
  key?: string;
  project: Project;
  onSelect: () => void;
}

const ProjectCard = ({ project, onSelect }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Original smooth cursor tracking with physics spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer flex flex-col select-none"
      id={`project-grid-item-${project.id}`}
    >
      {/* Visual Media Container with 6px border-radius matching Carousel Section height and aspect ratio */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ borderRadius: '6px' }}
        className="relative w-full aspect-[9/14] sm:aspect-[9/13] md:aspect-[3/4] min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px] overflow-hidden bg-neutral-100 shadow-xs transition-shadow duration-300 group-hover:shadow-xl border border-neutral-200/60"
      >
        {/* Project Image with Original Smooth Grayscale & Blur Transition */}
        <img
          src={project.image}
          alt={project.title}
          style={{ borderRadius: '6px' }}
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            isHovered
              ? 'scale-105 filter-none blur-[2px]'
              : 'scale-100 filter-none'
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Ambient Darkened Overlay on Hover for Maximum Visual Legibility */}
        <div
          style={{ borderRadius: '6px' }}
          className={`absolute inset-0 bg-black/10 transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Category / Discipline Pill Badge (Bottom Right with 6px radius) */}
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
          <span 
            style={{ borderRadius: '6px' }}
            className="px-3.5 py-1.5 bg-neutral-900/70 backdrop-blur-md text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white/90 shadow-sm"
          >
            {project.tag || project.category}
          </span>
        </div>

        {/* Floating "VIEW" Magnetic Circle Following the Cursor (Original Smooth Animation) */}
        {isHovered && (
          <motion.div
            style={{
              left: smoothX,
              top: smoothY,
              x: '-50%',
              y: '-50%',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full bg-white text-neutral-950 font-black text-[11px] sm:text-xs tracking-widest uppercase flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.35)] pointer-events-none border border-neutral-200/40"
          >
            VIEW
          </motion.div>
        )}
      </div>

      {/* Project Metadata Details */}
      <div className="pt-3.5 pb-1">
        {/* Duration / Timeline (e.g. "5 weeks", "4 weeks") */}
        <span className="block text-xs sm:text-[13px] font-medium text-neutral-500 tracking-normal mb-1">
          {project.duration || '4 weeks'}
        </span>

        {/* Project Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-neutral-950 uppercase group-hover:text-neutral-600 transition-colors duration-200">
          {project.title}
        </h3>
      </div>
    </div>
  );
};

export const ProjectsGridSection = ({
  projects,
  onSelectProject,
  onOpenProjectsArchive,
}: ProjectsGridSectionProps) => {
  const handleProjectSelect = (project: Project) => {
    if (project.website) {
      window.location.assign(project.website);
    } else {
      onSelectProject(project);
    }
  };

  // Take top 4 showcase projects (Lumen Void, Primary Form, Luma Wood, Silence Studio)
  const displayProjects = projects.slice(0, 4);

  return (
    <section
      id="projects-grid-section"
      className="w-full px-6 md:px-12 lg:px-16 pt-14 sm:pt-16 md:pt-20 pb-16 sm:pb-20 bg-[#fcfbf9] border-t border-neutral-200/80 select-none"
    >
      {/* Header: PROJECTS [6] on Left | "Case studies that walk through our approach and impact." on Right */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-8 sm:mb-10 md:mb-12">
        {/* Massive Main Heading */}
        <div className="flex items-start gap-2 sm:gap-3">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-neutral-950 uppercase leading-none">
            PROJECTS
          </h2>
          <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-500 translate-y-1 sm:translate-y-2">
            [6]
          </span>
        </div>

        {/* Editorial Subtitle */}
        <div className="max-w-md text-left md:text-left">
          <p className="text-base sm:text-lg md:text-xl font-medium text-neutral-800 leading-snug tracking-tight">
            Case studies that walk through <br className="hidden sm:inline" />
            our approach and impact.
          </p>
        </div>
      </div>

      {/* 2-Column Projects Showcase Grid with ultra-tight spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-6 sm:gap-y-8">
        {displayProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={() => handleProjectSelect(project)}
          />
        ))}
      </div>

      {/* Footer Call to Action Block */}
      <div className="mt-16 sm:mt-20 md:mt-24 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left Subtext */}
        <p className="text-sm sm:text-base text-neutral-700 font-normal leading-relaxed max-w-lg">
          These are just a few highlights. Browse <br className="hidden sm:inline" />
          our complete portfolio to see more.
        </p>

        {/* Right CTA Button */}
        <button
          onClick={onOpenProjectsArchive}
          id="see-all-projects-btn"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#dbfa07] text-black font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer group"
        >
          <span>SEE ALL PROJECTS</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </section>
  );
};
