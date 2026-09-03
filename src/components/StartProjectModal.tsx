import { useState, FormEvent } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

const SERVICES_OPTIONS = [
  'Web Design & Development',
  'Custom Shopify & E-Commerce Flagship',
  'Brand Strategy & Positioning',
  'Visual Identity & Logo Systems',
  'Digital Product & UI/UX',
  '3D Motion & Spatial Assets',
  'Full Brand Overhaul (0 to 1)',
];

const BUDGET_OPTIONS = [
  '$800 – $1,500 (Starter Sprint)',
  '$1,500 – $2,500 (Growth Engine)',
  '$2,500 – $5,000 (Shopify & Enterprise)',
  '$5,000+ (Custom Architecture & Scale)',
];

const TIMELINE_OPTIONS = [
  'Immediate (Rush / 3-4 Weeks)',
  'Standard Sprint (6-8 Weeks)',
  'Quarterly Evolution (3-6 Months)',
  'Ongoing Strategic Retainer',
];

export const StartProjectModal = ({ isOpen, onClose }: StartProjectModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      setSelectedServices(selectedServices.filter((s) => s !== svc));
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const generatedId = `DAS-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedId);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#000000', '#F4989C', '#0077B6', '#E09F3E', '#98A892'],
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedServices([]);
    setSelectedBudget('');
    setSelectedTimeline('');
    setFormData({ name: '', email: '', company: '', details: '' });
    setIsSubmitted(false);
    onClose();
  };

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
          className="relative w-full max-w-2xl bg-[#fcfbf9] text-neutral-900 rounded-[6px] shadow-2xl overflow-hidden z-10 my-auto p-6 md:p-10 border border-neutral-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 block mb-1">
                BIZZJUMP • PROJECT INITIATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase">
                {isSubmitted ? 'Brief Received' : 'Start a Project'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSubmitted ? (
            <div className="py-6 space-y-6">
              {/* Step indicator */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      step >= s ? 'bg-neutral-950' : 'bg-neutral-200'
                    }`}
                  />
                ))}
              </div>

              {/* STEP 1: Services */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold tracking-wider uppercase text-neutral-800">
                      1. Select Scope & Disciplines
                    </h4>
                    <span className="text-xs text-neutral-500">Pick all that apply</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES_OPTIONS.map((svc) => {
                      const isSelected = selectedServices.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                              : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <span>{svc}</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Budget & Timeline */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold tracking-wider uppercase text-neutral-800 mb-3">
                      2. Estimated Investment Range (USD)
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {BUDGET_OPTIONS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBudget(b)}
                          className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                            selectedBudget === b
                              ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                              : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <span>{b}</span>
                          {selectedBudget === b && <Check className="w-4 h-4 text-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold tracking-wider uppercase text-neutral-800 mb-3">
                      Target Timeline
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {TIMELINE_OPTIONS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTimeline(t)}
                          className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                            selectedTimeline === t
                              ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                              : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <span>{t}</span>
                          {selectedTimeline === t && <Check className="w-4 h-4 text-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact & Notes */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-sm font-bold tracking-wider uppercase text-neutral-800">
                    3. Contact & Brand Summary
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Lin"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="maya@company.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                      Brand / Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Horizon Labs"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                      Brief Description / Links
                    </label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Tell us about the vision, problems to solve, or current links..."
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                    />
                  </div>

                  <div className="p-3 bg-neutral-100 rounded-xl text-xs text-neutral-600 flex items-center justify-between">
                    <span>Average Response Time:</span>
                    <span className="font-bold text-neutral-950 font-mono-clean">&lt; 3 Hours</span>
                  </div>
                </form>
              )}

              {/* Wizard Footer Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <span />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && selectedServices.length === 0}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#dbfa07] text-black rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#181a33] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer shadow-xs"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.email}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-[#dbfa07] text-black rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#181a33] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <span>Transmit Brief</span>
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Submission Confirmation Screen */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-neutral-950 mb-2">
                  Sprint Request Dispatched!
                </h4>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  Thank you, <strong className="text-neutral-900">{formData.name}</strong>. BIZZJUMP has received your brief and will review your requirements within <strong className="text-neutral-900">3 hours</strong>.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-neutral-200 inline-block text-left">
                <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-500 mb-1">
                  Reference Ticket Number
                </div>
                <div className="text-xl font-mono-clean font-black text-neutral-950">
                  {ticketId}
                </div>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="px-7 py-3 bg-[#dbfa07] text-black rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#181a33] hover:text-white transition-all duration-300 cursor-pointer shadow-xs"
                >
                  Return to Studio
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
