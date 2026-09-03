import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Search } from 'lucide-react';
import { PROJECTS } from '../data/projectsData';
import { Project } from '../types';
import { CarouselSection } from '../components/CarouselSection';
import { ProjectsGridSection } from '../components/ProjectsGridSection';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
  onOpenStartProject: () => void;
}

const CATEGORIES: string[] = [
  'All',
  'Art Direction',
  'Branding',
  'Product Design',
  '3D & Motion',
  'Fashion',
  'Packaging',
  'Editorial',
  'Campaign',
  'Digital',
];

export const ProjectsPage = ({ onSelectProject, onOpenStartProject }: ProjectsPageProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory =
      activeCategory === 'All' ||
      proj.category === activeCategory ||
      proj.tag === activeCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#fcfbf9] text-neutral-950 pb-28 select-none">
      {/* 1. Header Hero */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-10 sm:pt-14 md:pt-20 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
          <div>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 block mb-3">
              SELECTED PORTFOLIO • 2023 - 2026
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tight leading-none text-neutral-950">
              PROJECTS
            </h1>
          </div>
          <div className="max-w-md md:text-left">
            <p className="text-sm sm:text-base md:text-lg font-medium text-neutral-800 leading-snug tracking-tight">
              Case studies and featured productions that walk through our approach, precision execution, and tangible impact.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Infinite Carousel (Exact Landing Page Component Clone) */}
      <div className="w-full">
        <CarouselSection
          projects={PROJECTS}
          onSelectProject={onSelectProject}
        />
      </div>

      {/* 3. Filter & Search Controls Bar */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-8 sticky top-20 z-20 bg-[#fcfbf9]/90 backdrop-blur-md border-y border-neutral-200/80 my-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Categories Pill Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100/90 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Archive Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-neutral-100/80 border border-neutral-200/80 text-xs font-medium placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 4. Filtered Archive Grid */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-neutral-100/60 rounded-xl border border-neutral-200">
              <p className="text-base text-neutral-600 font-medium">No projects found matching your criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2.5 bg-neutral-950 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
                  onClick={() => onSelectProject(project)}
                  className="group cursor-pointer flex flex-col select-none"
                >
                  <div
                    style={{ borderRadius: '6px' }}
                    className="relative w-full aspect-[9/14] sm:aspect-[9/13] md:aspect-[3/4] min-h-[420px] sm:min-h-[480px] md:min-h-[540px] overflow-hidden bg-neutral-100 shadow-xs transition-shadow duration-300 group-hover:shadow-xl border border-neutral-200/60"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ borderRadius: '6px' }}
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    <div
                      style={{ borderRadius: '6px' }}
                      className="absolute inset-0 bg-black/10 transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
                    />

                    {/* Tag / Category */}
                    <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                      <span
                        style={{ borderRadius: '6px' }}
                        className="px-3.5 py-1.5 bg-neutral-900/70 backdrop-blur-md text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white/90 shadow-sm"
                      >
                        {project.tag || project.category}
                      </span>
                    </div>

                    {/* Year / Client Badge Top Left */}
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span
                        style={{ borderRadius: '6px' }}
                        className="px-3 py-1 bg-white/85 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-neutral-950 shadow-xs"
                      >
                        {project.year || '2025'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3.5 pb-1">
                    <span className="block text-xs sm:text-[13px] font-medium text-neutral-500 tracking-normal mb-1">
                      {project.duration || '4 weeks'} • {project.client}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-neutral-950 uppercase group-hover:text-neutral-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Cloned Showcase Grid Section */}
      <ProjectsGridSection
        projects={PROJECTS}
        onSelectProject={onSelectProject}
        onOpenProjectsArchive={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* 6. Bottom Tailored CTA Strip */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-10">
        <div className="max-w-7xl mx-auto bg-[#181a33] text-white rounded-xs p-10 sm:p-14 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#dbfa07] block mb-2">
              HAVE A VISION IN MIND?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              LET'S BUILD SOMETHING EXTRAORDINARY
            </h2>
          </div>
          <button
            onClick={onOpenStartProject}
            id="projects-page-cta-btn"
            className="px-8 py-4.5 rounded-full bg-[#dbfa07] text-black font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-md cursor-pointer shrink-0 inline-flex items-center gap-2"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
