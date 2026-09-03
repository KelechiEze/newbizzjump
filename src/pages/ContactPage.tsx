import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus, Minus, Check } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Do you take on small projects?',
    answer: "We're flexible. Whether you need a complete identity or just a standout landing page, we'll tailor our process to fit your scope — without compromising quality.",
  },
  {
    question: 'Can you work with an existing brand?',
    answer: "Yes — we love working with existing brands. Whether you have a full identity system or just a logo and a color palette, we can build upon your foundation and create visuals, campaigns, or digital experiences that stay true to your brand while elevating it in fresh and strategic ways.",
  },
  {
    question: "What's your typical project timeline?",
    answer: "Our timelines depend on project depth. Branding systems typically take 3–6 weeks, while digital experiences and design sprints range from 2–8 weeks. We align on a firm schedule before kickoff so you're never left guessing.",
  },
  {
    question: 'What happens after I reach out?',
    answer: "We review your inquiry within 24 hours, set up an introductory discovery call to discuss your objectives and parameters, and follow up with a clear proposal and timeline.",
  },
  {
    question: 'Do you offer free consultations or discovery calls?',
    answer: "Yes, our initial 30-minute discovery consultation is completely free. It's a chance to explore alignment, ask questions, and determine the most impactful approach for your vision.",
  },
  {
    question: "Can I reach out if I'm not sure what I need yet?",
    answer: "Absolutely. Many of our best partnerships start with an open conversation. We can help you identify opportunities, refine your scope, and recommend the best path forward.",
  },
];

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // First item open by default as shown in video

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name && !formData.email && !formData.message) return;
    setSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full bg-white text-neutral-950 min-h-screen">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left Column: Direct Info & Map */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-0 divide-y divide-neutral-300/80 border-t border-b border-neutral-300/80">
                {/* Phone */}
                <div className="py-4.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold tracking-wider uppercase text-neutral-800">
                    PHONE
                  </span>
                  <a
                    href="tel:+49211847300"
                    className="font-bold text-neutral-950 underline underline-offset-4 hover:opacity-75 transition-opacity"
                  >
                    +49 211 84 73 00
                  </a>
                </div>

                {/* Email */}
                <div className="py-4.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold tracking-wider uppercase text-neutral-800">
                    EMAIL
                  </span>
                  <a
                    href="mailto:INFO@DASSTUDIO.COM"
                    className="font-bold text-neutral-950 underline underline-offset-4 hover:opacity-75 transition-opacity"
                  >
                    INFO@DASSTUDIO.COM
                  </a>
                </div>

                {/* Location */}
                <div className="py-4.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold tracking-wider uppercase text-neutral-800">
                    LOCATION
                  </span>
                  <span className="font-bold tracking-wider uppercase text-neutral-950">
                    BERLIN
                  </span>
                </div>
              </div>

              {/* Styled Satellite Dark Map Container */}
              <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-neutral-900 border border-neutral-300/80 group">
                {/* Satellite / Dark Map background */}
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                  alt="Berlin Studio Location Map"
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.2] group-hover:scale-105 transition-transform duration-700"
                />

                {/* Map Graphic Overlay Lines & Pins */}
                <div className="absolute inset-0 bg-neutral-950/40 pointer-events-none" />
                
                {/* Map Labels Graphic */}
                <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    {/* Open in maps trigger button */}
                    <a
                      href="https://maps.google.com/?q=Berlin,+Germany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-neutral-900/85 backdrop-blur-md text-white text-[11px] font-medium tracking-wide hover:bg-neutral-950 transition-colors border border-white/10 shadow-sm"
                    >
                      <span>Open in Maps</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Berlin Center Pin & Label */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-white opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_8px_white]"></span>
                    </div>
                    <span className="text-white font-bold text-sm tracking-wider uppercase drop-shadow-md">
                      Berlin
                    </span>
                  </div>

                  {/* Secondary Region Labels */}
                  <div className="text-[10px] font-semibold tracking-wider text-neutral-400/80 flex justify-between">
                    <span>Oranienburg</span>
                    <span>Strausberg</span>
                  </div>
                </div>

                {/* Map Footer Attribution */}
                <div className="absolute bottom-1 right-2 z-10 text-[8px] text-neutral-400/80 pointer-events-none flex items-center gap-2">
                  <span>Google</span>
                  <span>Map data ©2026</span>
                  <span className="underline">Report a map error</span>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us A Message Form */}
            <div className="lg:col-span-7 flex flex-col justify-between">
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
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto bg-[#f4f4f4] rounded-xs border border-neutral-200/80 p-8 sm:p-12 md:p-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
            
            {/* Stat 1 */}
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950 leading-none mb-3">
                500+
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-700">
                PROJECTS DELIVERED
              </p>
            </div>

            {/* Stat 2 */}
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950 leading-none mb-3">
                200+
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-700">
                CLIENTS WORLDWIDE
              </p>
            </div>

            {/* Stat 3 */}
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950 leading-none mb-3">
                56K
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-700">
                HOURS INVESTED
              </p>
            </div>

            {/* Stat 4 Text Statement */}
            <div>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                Numbers that show we've been doing this long enough to know what works.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <span className="text-xs font-bold tracking-widest uppercase text-neutral-500 block mb-3">
            FAQ
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Headline */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-950 leading-[0.95]">
                HAVE SOME QUESTIONS?
              </h2>
            </div>

            {/* Right Accordion List */}
            <div className="lg:col-span-7 divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="py-6 sm:py-7">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-neutral-950 group-hover:opacity-75 transition-opacity">
                        {item.question}
                      </span>
                      <span className="shrink-0 text-neutral-950">
                        {isOpen ? (
                          <Minus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                        ) : (
                          <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal max-w-2xl">
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
        </div>
      </section>
    </div>
  );
};

