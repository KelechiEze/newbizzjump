import { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Check, Copy, ExternalLink, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenStartProject: () => void;
}

export const ProjectDetailModal = ({
  project,
  allProjects,
  onClose,
  onSelectProject,
  onOpenStartProject,
}: ProjectDetailModalProps) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 select-none">
        {/* Backdrop overlay click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#fcfbf9] text-neutral-900 rounded-none sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto min-h-screen sm:min-h-[auto] max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 bg-[#fcfbf9]/90 backdrop-blur-md px-6 md:px-8 py-4 border-b border-neutral-200 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-neutral-900 text-white rounded-full text-[11px] font-bold tracking-wider uppercase">
                {project.category}
              </span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {project.year} • {project.client}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenStartProject();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-bold tracking-wider uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span>Request Similar Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
                id="close-project-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto px-6 md:px-10 py-8 space-y-10">
            {/* Title & Overview Banner */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-950 uppercase mb-4 leading-tight">
                {project.title}
              </h2>
              <p className="text-lg md:text-xl text-neutral-700 font-medium leading-relaxed max-w-3xl">
                {project.shortDesc}
              </p>
            </div>

            {/* Main Featured Gallery / Motion Reel */}
            <div className="space-y-3">
              {project.video && (
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setActiveImageIdx(-1)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeImageIdx === -1
                        ? 'bg-[#dbfa07] text-neutral-950 shadow-sm'
                        : 'bg-neutral-200/80 text-neutral-700 hover:bg-neutral-300'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Motion Reel</span>
                  </button>
                  <button
                    onClick={() => setActiveImageIdx(0)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeImageIdx >= 0
                        ? 'bg-neutral-950 text-white shadow-sm'
                        : 'bg-neutral-200/80 text-neutral-700 hover:bg-neutral-300'
                    }`}
                  >
                    <span>Stills & Architecture</span>
                  </button>
                </div>
              )}

              <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 relative shadow-inner">
                {activeImageIdx === -1 && project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    controls
                    playsInline
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <>
                    <img
                      src={project.gallery[activeImageIdx]?.url || project.image}
                      alt={project.gallery[activeImageIdx]?.caption || project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-3 left-3 bg-neutral-900/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-medium">
                      {project.gallery[activeImageIdx]?.caption || project.title}
                    </div>
                  </>
                )}
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {project.video && (
                  <button
                    onClick={() => setActiveImageIdx(-1)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-neutral-900 flex items-center justify-center ${
                      activeImageIdx === -1 ? 'border-[#dbfa07] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">▶ Reel</span>
                  </button>
                )}
                {project.gallery.length > 1 &&
                  project.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx ? 'border-neutral-950 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-neutral-200">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-neutral-200/80 shadow-xs">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
                    {metric.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-neutral-950 font-mono-clean">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Strategic Deep-Dive: The Challenge & The Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-500">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>The Strategic Challenge</span>
                </div>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>The Design Solution</span>
                </div>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Deliverables & Material Specs */}
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-500 mb-3">
                Project Deliverables & Artifacts
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((item, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-semibold text-neutral-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Palette Tokens (Interactive Copy) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-500">
                  Design Token Palette
                </h4>
                <span className="text-[11px] text-neutral-400">Click swatch to copy HEX code</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.palette.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopyHex(color.hex)}
                    className="p-3 bg-white rounded-2xl border border-neutral-200 flex items-center gap-3 hover:border-neutral-900 transition-all text-left cursor-pointer group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl shadow-inner flex-shrink-0 flex items-center justify-center border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    >
                      {copiedHex === color.hex && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-neutral-900 block truncate">
                        {color.name}
                      </span>
                      <span className="text-[11px] font-mono-clean text-neutral-500 group-hover:text-neutral-900">
                        {copiedHex === color.hex ? 'COPIED!' : color.hex}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer: Prev/Next Project Switcher */}
          <div className="bg-neutral-100 px-6 md:px-8 py-4 border-t border-neutral-200 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveImageIdx(0);
                onSelectProject(prevProject);
              }}
              className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Prev: {prevProject.title}</span>
            </button>

            <button
              onClick={() => {
                setActiveImageIdx(0);
                onSelectProject(nextProject);
              }}
              className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer group"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
