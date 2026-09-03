import { useState, FormEvent } from 'react';
import { X, Mail, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStartProject: () => void;
}

export const ContactModal = ({ isOpen, onClose, onOpenStartProject }: ContactModalProps) => {
  const [messageSent, setMessageSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleDirectSend = (e: FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setForm({ name: '', email: '', message: '' });
      onClose();
    }, 2500);
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
                COMMUNICATION DESK • 3H RESPONSE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase">
                Contact BIZZJUMP
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
          <div className="py-6 space-y-6">
            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-white rounded-2xl border border-neutral-200 flex items-center gap-3">
                <Mail className="w-5 h-5 text-neutral-900 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                    Contact BIZZJUMP
                  </span>
                  <a
                    href="mailto:support@bizzjump.com"
                    className="text-xs font-bold text-neutral-950 hover:underline"
                  >
                    support@bizzjump.com
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            {!messageSent ? (
              <form onSubmit={handleDirectSend} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                    Quick Inquiry Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ask us anything about timelines, pricing, or design systems..."
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenStartProject();
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Or build full project brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-[#dbfa07] text-black rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3 bg-white rounded-2xl border border-neutral-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-neutral-950">
                  Message sent to BIZZJUMP
                </h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  We have logged your query and will reply to <strong className="text-neutral-900">{form.email}</strong> within 3 hours.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
