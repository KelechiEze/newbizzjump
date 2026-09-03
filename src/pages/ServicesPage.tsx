import { useState } from 'react';
import { ArrowUpRight, Check, Plus, Minus, Layers, Zap, Compass, Code } from 'lucide-react';
import { ServicesSection } from '../components/ServicesSection';

interface ServicesPageProps {
  onOpenStartProject: (plan?: string) => void;
  onOpenContact: () => void;
}

const SERVICE_CAPABILITIES = [
  {
    icon: Compass,
    title: 'Brand Identity & Strategy',
    description: 'Distinctive visual systems that position your brand ahead of competition.',
    deliverables: ['Brand Architecture', 'Custom Typography', 'Visual Identity Guidelines', 'Voice & Tone Playbook', 'Editorial Print & Packaging'],
  },
  {
    icon: Layers,
    title: 'Spatial & 3D Scenography',
    description: 'Immersive physical and digital environments that command sensory attention.',
    deliverables: ['3D Product Renders', 'Interactive 3D Web', 'Spatial Exhibition Design', 'Lighting & Atmosphere Design', 'Motion Guidelines'],
  },
  {
    icon: Zap,
    title: 'Digital Product & UI/UX',
    description: 'High-converting websites and application interfaces engineered for clarity.',
    deliverables: ['Design Systems', 'Web & Mobile UX/UI', 'Micro-Interactions & Motion', 'Framer & Figma Handoff', 'Prototype Validation'],
  },
  {
    icon: Code,
    title: 'Creative Engineering',
    description: 'Lightning-fast, accessible digital frontends built on modern web standards.',
    deliverables: ['Modern React & Vite', 'Smooth Motion Architecture', 'Full-Stack Integration', 'Performance Optimization', 'SEO & Analytics'],
  },
];

const WORKFLOW_STEPS = [
  {
    num: '01',
    name: 'Discovery & Brief Alignment',
    desc: 'Deep exploration into your brand ambition, category whitespace, and aesthetic goals.',
  },
  {
    num: '02',
    name: 'Architectural Exploration',
    desc: 'Rapid prototyping of visual identities, design systems, and spatial compositions.',
  },
  {
    num: '03',
    name: 'Precision Refinement',
    desc: 'Rigorous typographic calibration, responsive testing, and asset production.',
  },
  {
    num: '04',
    name: 'Deployment & Scale',
    desc: 'Final rollout across digital platforms, guidelines distribution, and continuous iteration.',
  },
];

export const ServicesPage = ({ onOpenStartProject, onOpenContact }: ServicesPageProps) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <div className="w-full bg-[#fcfbf9] text-neutral-950 pb-28 select-none">
      {/* 1. Services Header */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-10 sm:pt-14 md:pt-20 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
          <div>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 block mb-3">
              CAPABILITIES & EXPERTISE
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tight leading-none text-neutral-950">
              SERVICES
            </h1>
          </div>
          <div className="max-w-md md:text-left">
            <p className="text-sm sm:text-base md:text-lg font-medium text-neutral-800 leading-snug tracking-tight">
              We operate across brand architecture, spatial design, digital product, and creative engineering to build cohesive universes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Cloned Landing Page Services Section (Full-Width Video Reel + Accordion) */}
      <ServicesSection
        onOpenStartProject={() => onOpenStartProject()}
      />

      {/* 3. Detailed Disciplines & Deliverables Matrix (Clean, minimal extra detail) */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-16 sm:py-24 border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 block mb-2">
              SCOPE & DELIVERABLES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950">
              EXPANDED SPECIALIZATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SERVICE_CAPABILITIES.map((service, idx) => {
              const Icon = service.icon;
              const isExpanded = expandedIdx === idx;

              return (
                <div
                  key={idx}
                  style={{ borderRadius: '6px' }}
                  className="bg-white p-8 sm:p-10 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-sm bg-neutral-100 flex items-center justify-center text-neutral-950 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-neutral-950 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      className="w-full flex items-center justify-between py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 border-t border-neutral-100 cursor-pointer"
                    >
                      <span>DELIVERABLES LIST</span>
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <ul className="pt-3 space-y-2 text-xs text-neutral-600 font-medium">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Studio Workflow Sprint Grid */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-16 sm:py-20 border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 block mb-2">
              HOW WE WORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950">
              4-STEP SPRINT PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={idx}
                style={{ borderRadius: '6px' }}
                className="bg-[#f4f3ee] p-6 sm:p-8 border border-neutral-200/80 flex flex-col justify-between min-h-[220px]"
              >
                <div className="text-2xl font-black text-neutral-400 font-mono-clean mb-4">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-base font-bold uppercase tracking-tight text-neutral-950 mb-2">
                    {step.name}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Tailored CTA Strip */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-8">
        <div className="max-w-7xl mx-auto bg-[#181a33] text-white rounded-xs p-10 sm:p-14 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#dbfa07] block mb-2">
              READY TO COMMENCE?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              LET'S CRAFT YOUR SIGNATURE IDENTITY
            </h2>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => onOpenStartProject()}
              id="services-page-cta-btn"
              className="px-8 py-4.5 rounded-full bg-[#dbfa07] text-black font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-md cursor-pointer shrink-0 inline-flex items-center gap-2"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenContact}
              className="px-8 py-4.5 rounded-full border border-white/40 text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shrink-0 inline-flex items-center gap-2"
            >
              <span>TALK TO US</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
