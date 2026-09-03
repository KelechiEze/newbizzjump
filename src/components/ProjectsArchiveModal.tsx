import { useState } from 'react';
import { X, ArrowUpRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectsArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = ['All', 'Packaging', 'Branding', '3D & Motion', 'Editorial', 'Campaign'];

export const ProjectsArchiveModal = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
}: ProjectsArchiveModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#fcfbf9] text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto p-6 md:p-10 border border-neutral-200 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 block mb-1">
                DAS STUDIO • COMPLETE SELECTED WORKS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase">
                Projects Archive
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-neutral-200">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#dbfa07] text-black hover:bg-[#181a33] hover:text-white shadow-xs'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="overflow-y-auto py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    onClose();
                    onSelectProject(proj);
                  }}
                  style={{ borderRadius: '6px' }}
                  className="bg-white border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col"
                >
                  <div 
                    style={{ borderRadius: '6px 6px 0 0' }}
                    className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative"
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div 
                      style={{ borderRadius: '4px' }}
                      className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider"
                    >
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                        {proj.client} • {proj.year}
                      </span>
                      <h4 className="text-base font-bold text-neutral-950 group-hover:text-neutral-700 leading-snug">
                        {proj.title}
                      </h4>
                    </div>

                    <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900">
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
