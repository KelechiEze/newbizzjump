import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, Cookie, ArrowRight } from 'lucide-react';
import { LegalDocument } from '../data/legalData';

interface LegalLayoutProps {
  document: LegalDocument;
}

const POLICY_TABS = [
  {
    id: 'privacy-policy',
    label: 'Privacy Policy',
    path: '/privacy-policy',
    icon: ShieldCheck,
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    path: '/terms',
    icon: FileText,
  },
  {
    id: 'cookie-policy',
    label: 'Cookie Policy',
    path: '/cookie-policy',
    icon: Cookie,
  },
];

export const LegalLayout: React.FC<LegalLayoutProps> = ({ document }) => {
  const location = useLocation();

  return (
    <div className="w-full bg-[#fcfbf9] text-neutral-950 min-h-screen py-16 sm:py-20 md:py-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-[11px] font-mono font-bold tracking-widest text-neutral-700 uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>
          <span>{document.badge}</span>
        </div>

        {/* Document Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-950 leading-tight">
          {document.title}
        </h1>

        {/* Last Updated */}
        <p className="mt-3 text-xs sm:text-sm font-mono text-neutral-500">
          Last updated: {document.lastUpdated}
        </p>

        {/* Centered Navigation Tabs */}
        <div className="mt-8 mb-12 inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-neutral-200/60 border border-neutral-200">
          {POLICY_TABS.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'text-neutral-950 bg-white shadow-xs font-bold'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Intro Paragraphs */}
        <div className="space-y-4 mb-14 text-center max-w-2xl mx-auto">
          {document.introParagraphs.map((para, idx) => (
            <p
              key={idx}
              className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Subtle Divider */}
        <div className="w-20 h-px bg-neutral-300 mx-auto my-12" />

        {/* Sections - Simple, Centered, Clean */}
        <div className="space-y-12 sm:space-y-14 text-center">
          {document.sections.map((section) => (
            <section key={section.id} className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                {section.title}
              </h2>

              {section.content && section.content.length > 0 && (
                <div className="space-y-3">
                  {section.content.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base text-neutral-600 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {section.list && section.list.length > 0 && (
                <ul className="pt-2 pb-1 space-y-2 text-center inline-block max-w-lg mx-auto">
                  {section.list.map((item, lIdx) => (
                    <li
                      key={lIdx}
                      className="text-sm sm:text-base text-neutral-600 leading-relaxed flex items-center justify-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <p className="text-xs sm:text-sm text-neutral-500 italic max-w-md mx-auto pt-2">
                  {section.note}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Subtle Divider */}
        <div className="w-20 h-px bg-neutral-300 mx-auto my-14" />

        {/* Bottom Contact Inquiries - Simple & Centered */}
        <div className="text-center space-y-4 max-w-md mx-auto">
          <h3 className="text-lg font-bold tracking-tight text-neutral-950">
            Have questions about our policies?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Feel free to reach out directly to our team with any legal or privacy inquiries.
          </p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>CONTACT BIZZJUMP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
