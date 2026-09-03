import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: 'small-projects',
    question: 'Do you take on small projects?',
    answer:
      "We're flexible. Whether you need a complete identity or just a standout landing page, we'll tailor our process to fit your scope — without compromising quality.",
  },
  {
    id: 'existing-brand',
    question: 'Can you work with an existing brand?',
    answer:
      'Yes. We can work within your existing brand guidelines, extend them into new digital or print collateral, or help evolve specific elements while maintaining brand equity.',
  },
  {
    id: 'timeline',
    question: "What's your typical project timeline?",
    answer:
      'Most sprint projects take between 2 to 6 weeks from kickoff to launch. Comprehensive branding or full-stack web platforms generally range from 6 to 10 weeks.',
  },
  {
    id: 'after-reach-out',
    question: 'What happens after I reach out?',
    answer:
      "We'll review your inquiry within 24 hours and schedule a brief 20-minute discovery call to discuss your goals, timeline, and deliverables before preparing a proposal.",
  },
  {
    id: 'free-consultations',
    question: 'Do you offer free consultations or discovery calls?',
    answer:
      'Yes, our initial discovery call is completely free. We discuss your project scope, answer your questions, and ensure we are the right match for your brand vision.',
  },
  {
    id: 'not-sure-needs',
    question: "Can I reach out if I'm not sure what I need yet?",
    answer:
      'Absolutely. Many of our clients come to us with just an idea or challenge. We can help you define the right scope, priorities, and roadmap during our discovery phase.',
  },
];

interface FAQSectionProps {
  onOpenContact: () => void;
}

export const FAQSection = ({ onOpenContact }: FAQSectionProps) => {
  // First item open by default as in screenshot
  const [openIds, setOpenIds] = useState<string[]>(['small-projects']);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq-section"
      className="w-full px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-28 bg-[#fcfbf9] border-t border-neutral-200/80 select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-7xl mx-auto">
        {/* Left Column: Heading & "Not Finding Answers?" Contact Card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="block text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-500 uppercase mb-3">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] text-neutral-950 uppercase leading-none mb-12 sm:mb-16">
              HAVE SOME <br className="hidden sm:inline" />
              QUESTIONS?
            </h2>
          </div>

          {/* Contact Prompt Block */}
          <div className="mt-8 lg:mt-auto pt-6">
            <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-950 mb-2">
              NOT FINDING ANSWERS?
            </h4>
            <p className="text-sm sm:text-[15px] text-neutral-600 font-normal leading-relaxed mb-6 max-w-sm">
              Reach out anytime. We're happy to answer any questions before you commit to working together.
            </p>
            <button
              onClick={onOpenContact}
              id="faq-contact-us-btn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#dbfa07] text-black font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer group"
            >
              <span>CONTACT US</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Accordion List */}
        <div className="lg:col-span-7 divide-y divide-neutral-200/80 border-t border-b border-neutral-200/80">
          {FAQS_DATA.map((item) => {
            const isOpen = openIds.includes(item.id);
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                className="py-6 sm:py-7 transition-colors duration-200"
                id={`faq-item-${item.id}`}
              >
                {/* Question Row Header */}
                <div
                  onClick={() => toggleItem(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <h3
                    className={`text-xl sm:text-2xl md:text-[26px] font-normal tracking-tight transition-colors duration-200 ${
                      isHovered ? 'text-neutral-500' : 'text-neutral-950'
                    }`}
                  >
                    {item.question}
                  </h3>

                  <div className="shrink-0 w-8 h-8 flex items-center justify-center text-neutral-900 transition-transform duration-200 group-hover:scale-110">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2]" />
                    )}
                  </div>
                </div>

                {/* Expandable Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed max-w-xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
