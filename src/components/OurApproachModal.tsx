import { useState } from 'react';
import { X, ArrowRight, Check, Sparkles, Layers, ShieldCheck, Compass, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APPROACH_STEPS } from '../data/projectsData';

interface OurApproachModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStartProject: () => void;
}

export const OurApproachModal = ({ isOpen, onClose, onOpenStartProject }: OurApproachModalProps) => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  if (!isOpen) return null;

  const currentStep = APPROACH_STEPS[activeStepIdx];

  const icons = [Compass, Layers, Palette, ShieldCheck];
  const StepIcon = icons[activeStepIdx] || Sparkles;

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
          className="relative w-full max-w-4xl bg-[#fcfbf9] text-neutral-900 rounded-[6px] shadow-2xl overflow-hidden z-10 my-auto p-6 md:p-10 border border-neutral-200 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 block mb-1">
                OUR METHODOLOGY & DESIGN DISCIPLINE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase">
                The Das Studio Framework
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Phase Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6 pb-4">
            {APPROACH_STEPS.map((step, idx) => (
              <button
                key={step.number}
                onClick={() => setActiveStepIdx(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  activeStepIdx === idx
                    ? 'bg-[#dbfa07] text-black border-[#dbfa07] shadow-sm font-bold'
                    : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span className="text-[10px] font-mono-clean block opacity-70 mb-0.5">
                  PHASE {step.number}
                </span>
                <span className="text-xs font-bold block truncate">
                  {step.title.split('&')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Step Detail Card */}
          <div className="overflow-y-auto py-4 space-y-6">
            <div className="p-6 md:p-8 bg-white rounded-3xl border border-neutral-200/80 shadow-xs space-y-6">
              {/* Phase Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-950">
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Phase {currentStep.number} • {currentStep.timeline}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-neutral-950">
                      {currentStep.title}
                    </h4>
                  </div>
                </div>
                <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-mono-clean font-bold text-neutral-800">
                  {currentStep.timeline}
                </span>
              </div>

              {/* Description */}
              <p className="text-base text-neutral-700 leading-relaxed font-medium">
                {currentStep.description}
              </p>

              {/* Key Activities */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Sprint Activities & Analysis
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentStep.keyActivities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concrete Deliverables */}
              <div className="pt-4 border-t border-neutral-100">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Key Deliverable Artifacts
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentStep.deliverables.map((deliv, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-neutral-100 text-neutral-900 rounded-lg text-xs font-semibold"
                    >
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <div className="text-xs text-neutral-500 hidden sm:block">
              Ready to apply this framework to your brand?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenStartProject();
              }}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#dbfa07] text-black rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>Kickoff Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
