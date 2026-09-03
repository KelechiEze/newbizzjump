import { X, MapPin, Award, Users, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CREATORS } from '../data/projectsData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStartProject: () => void;
}

const CLIENT_ROSTER = [
  'Teenage Engineering',
  'Polestar Electric',
  'Nike Innovation Lab',
  'Glossier Inc.',
  'Spotify Design',
  'Acne Studios',
  'Rimowa Cologne',
  'Nothing Tech',
];

const AWARDS = [
  { year: '2026', org: 'Awwwards', title: 'Studio of the Year Nominee & 4x SOTD' },
  { year: '2025', org: 'Red Dot', title: 'Best of the Best: Sustainable Packaging' },
  { year: '2025', org: 'TDC New York', title: 'Type Directors Club Certificate of Typographic Excellence' },
  { year: '2024', org: 'FWA', title: 'Site of the Day (3x)' },
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
          className="relative w-full max-w-4xl bg-[#fcfbf9] text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto p-6 md:p-10 border border-neutral-200 flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 block mb-1">
                BIZZJUMP • BERLIN MITTE & KREUZBERG
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
            {/* Manifesto Statement */}
            <div className="space-y-3">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                We craft radical brand clarity for category-defining companies through mathematical precision, brutalist restraint, and sensory depth.
              </h4>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl">
                Founded in Berlin, Das Studio operates as an autonomous collective of 23 principal designers, 3D artists, brand strategists, and creative technologists. We reject unnecessary agency bloat to deliver pure, uncompromised craftsmanship at lightning speed.
              </p>
            </div>

            {/* 23 Creators Showcase */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>The 23 Creators (Leadership Core)</span>
                </h5>
                <span className="text-xs text-neutral-400 font-mono-clean">23 Active Makers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {CREATORS.map((creator, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-white rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-3"
                  >
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-neutral-100 flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-neutral-900 truncate">
                        {creator.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate">
                        {creator.role}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono-clean truncate">
                        {creator.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Roster */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Select Brand Partners
              </h5>
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

            {/* Awards & Recognition */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Industry Recognition</span>
              </h5>
              <div className="space-y-2">
                {AWARDS.map((award, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-white rounded-xl border border-neutral-200 flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-neutral-950">
                      {award.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-neutral-100 rounded text-[11px] font-bold">
                        {award.org}
                      </span>
                      <span className="text-neutral-400 font-mono-clean">
                        {award.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-neutral-900" />
              <span>Brunnenstraße 42, 10115 Berlin, Germany</span>
            </div>
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
