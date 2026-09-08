import { useEffect, useRef, useState, FormEvent } from 'react';
import { AnimatePresence, useInView } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';

interface ContactPageProps {
  onOpenContact: () => void;
}

export const ContactPage = ({ onOpenContact }: ContactPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const [statValues, setStatValues] = useState({ valueCreated: 0, hoursInvested: 0, projectsDelivered: 0 });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name && !formData.email && !formData.message) return;
    setSubmitted(true);
  };

  useEffect(() => {
    if (!isStatsInView) return;

    const duration = 1200;
    const start = performance.now();
    let animationFrame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStatValues({
        valueCreated: Math.round(eased * 15),
        hoursInvested: Math.round(eased * 10),
        projectsDelivered: Math.round(eased * 100),
      });

      if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isStatsInView]);

  return (
    <div className="w-full bg-[#fcfbf9] text-neutral-950 min-h-screen">
      {/* 1. Header Section */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-10 sm:pt-14 md:pt-20 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12">
          {/* Giant Display Title */}
          <div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tight leading-none text-neutral-950">
              CONTACT
            </h1>
          </div>

          {/* Subtitle / Promise Statement */}
          <div className="md:pt-2 max-w-xs md:text-left">
            <p className="text-sm sm:text-base text-neutral-800 font-normal leading-relaxed">
              Tell us about your project and we'll get back to you within 24 hours without delay.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Form & Details Grid */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto bg-[#f4f4f4] rounded-xs border border-neutral-200/80 p-6 sm:p-10 md:p-14 lg:p-16">
          <div className="max-w-3xl mx-auto">
            {/* Single Contact Form */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-neutral-950 mb-8 sm:mb-10">
                  SEND US A MESSAGE
                </h2>

                {submitted ? (
                  <div className="py-12 px-6 bg-white/70 border border-neutral-300 rounded-xs text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-950 text-white flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-neutral-950">
                      MESSAGE TRANSMITTED
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. We will review your idea and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-xs font-bold uppercase tracking-wider underline hover:opacity-75 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    {/* Top Row: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                          NAME
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full py-2.5 px-0 bg-transparent border-b border-neutral-300/90 text-sm sm:text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                          EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@framer.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full py-2.5 px-0 bg-transparent border-b border-neutral-300/90 text-sm sm:text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                        MESSAGE
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your new idea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full py-2.5 px-0 bg-transparent border-b border-neutral-300/90 text-sm sm:text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        id="contact-submit-btn"
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 hover:text-neutral-600 transition-colors cursor-pointer group"
                      >
                        <span>SUBMIT</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Direct contact details below the form */}
                <div className="mt-12 pt-6 border-t border-neutral-300/80 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm">
                  <a
                    href="mailto:support@bizzjump.com"
                    className="font-bold text-neutral-950 underline underline-offset-4 hover:opacity-75 transition-opacity"
                  >
                    support@bizzjump.com
                  </a>
                  <a
                    href="tel:13858859701"
                    className="font-bold text-neutral-950 underline underline-offset-4 hover:opacity-75 transition-opacity"
                  >
                    13858859701
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto bg-[#f4f4f4] rounded-xs border border-neutral-200/80 p-8 sm:p-12 md:p-16">
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
            
            {/* Stat 1 */}
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950 leading-none mb-3">
                ${statValues.valueCreated}K
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-700">
                VALUE CREATED
              </p>
            </div>

            {/* Stat 2 */}
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950 leading-none mb-3">
                {statValues.hoursInvested}K
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-700">
                HOURS INVESTED
              </p>
            </div>

            {/* Stat 3 */}
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950 leading-none mb-3">
                {statValues.projectsDelivered}+
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-700">
                PROJECTS DELIVERED
              </p>
            </div>

            {/* Stat 4 Text Statement */}
            <div>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                Numbers that reflect the value, time, and work we bring to every partnership.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Shared Homepage FAQ Section */}
      <FAQSection onOpenContact={onOpenContact} />
    </div>
  );
};

