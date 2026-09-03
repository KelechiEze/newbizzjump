import { useState } from 'react';
import { X, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JOURNAL_ARTICLES } from '../data/projectsData';
import { JournalArticle } from '../types';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JournalModal = ({ isOpen, onClose }: JournalModalProps) => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

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
          className="relative w-full max-w-3xl bg-[#fcfbf9] text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto p-6 md:p-10 border border-neutral-200 flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 block mb-1">
                BIZZJUMP ESSAYS & DISPATCHES
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase">
                {selectedArticle ? 'Reading Journal' : 'Studio Journal'}
              </h3>
            </div>
            <button
              onClick={() => {
                if (selectedArticle) setSelectedArticle(null);
                else onClose();
              }}
              className="w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto py-6 space-y-6">
            {!selectedArticle ? (
              <div className="space-y-4">
                {JOURNAL_ARTICLES.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-900 transition-all cursor-pointer group shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-neutral-500 mb-2">
                      <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-800 font-bold uppercase text-[10px]">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-neutral-950 group-hover:text-neutral-700 transition-colors mb-2 leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                      <div className="flex items-center gap-2">
                        {article.tags.map((t, i) => (
                          <span key={i} className="text-[11px] text-neutral-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>Read Essay</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Single Article View */
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
                >
                  ← Back to all essays
                </button>

                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-500 mb-3">
                    <span className="px-2.5 py-1 bg-neutral-900 text-white rounded-full text-[10px] font-bold uppercase">
                      {selectedArticle.category}
                    </span>
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 leading-tight">
                    {selectedArticle.title}
                  </h3>
                </div>

                <div className="p-4 bg-neutral-100 rounded-2xl text-sm font-medium text-neutral-800 italic border-l-4 border-neutral-900">
                  {selectedArticle.excerpt}
                </div>

                <div className="space-y-4 text-neutral-800 leading-relaxed text-base font-normal">
                  {selectedArticle.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
