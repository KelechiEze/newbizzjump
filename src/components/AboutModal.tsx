import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStartProject: () => void;
}

const CLIENT_ROSTER = [
  "Lola Shoneyin",
  'Dibire',
  "Annie's Beauty",
  'Cias Models',
  'Cademie',
  'Rad.ng',
  'Talkglam Studios',
  'Jovial Studios',
];

export const AboutModal = ({ isOpen, onClose, onOpenStartProject }: AboutModalProps) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-4xl bg-[#fcfbf9] text-neutral-900 rounded-[6px] shadow-2xl overflow-hidden z-10 my-auto p-6 md:p-10 border border-neutral-200 flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 block mb-1">
                BIZZJUMP • CREATIVE STUDIO
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase">
                About The Studio
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto py-6 space-y-8">
            {/* BIZZJUMP Introduction */}
            <div className="space-y-3">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                Built by developers who care about how the internet feels.
              </h4>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl">
                BizzJump was created by a team of developers with a simple idea: business websites should do more than just exist. They should make people stop, explore, trust, and take action.
                <br /><br />
                We combine web design, web development, e-commerce, Shopify, and modern digital experiences to help businesses build a stronger presence online.
                <br /><br />
                From a simple business website to a full-scale e-commerce store, we approach every project with the same mindset: understand the brand, understand the people it wants to reach, and build something that makes sense for both.
              </p>
            </div>

            {/* Brands We Have Worked With */}
            <div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.requestAnimationFrame(() => {
                    document.getElementById('who-we-are-section')?.scrollIntoView({ behavior: 'smooth' });
                  });
                }}
                className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 inline-flex items-center gap-1.5 hover:text-neutral-950 transition-colors cursor-pointer"
              >
                <span>Brands We Have Worked With</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CLIENT_ROSTER.map((client, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-xl border border-neutral-200 text-center text-xs font-bold text-neutral-800"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end">
            <button
              onClick={() => {
                onClose();
                onOpenStartProject();
              }}
              className="px-6 py-2.5 bg-[#dbfa07] text-black rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
            >
              Collaborate
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
