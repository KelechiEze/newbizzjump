import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const STORAGE_KEY = 'bizzjump_cookie_consent_v3';

interface CookieConsentBannerProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const CookieConsentBanner = ({
  isOpen,
  onAccept,
  onDecline,
}: CookieConsentBannerProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent banner"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
          style={{
            bottom: 'max(1.25rem, calc(1rem + env(safe-area-inset-bottom, 0px)))',
          }}
          className="fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] min-[480px]:w-[calc(100%-2.5rem)] max-w-2xl lg:max-w-3xl pointer-events-auto select-none"
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.98 }
            }
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full bg-white/95 backdrop-blur-xl border border-neutral-200/90 text-neutral-900 rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              {/* Text Description Column */}
              <div className="flex-1 min-w-0 pr-0 md:pr-2">
                <h2
                  id="cookie-banner-title"
                  className="text-sm sm:text-base font-bold tracking-tight text-neutral-950 mb-1.5 uppercase font-sans"
                >
                  We use cookies
                </h2>
                <p
                  id="cookie-banner-description"
                  className="text-xs sm:text-[13px] md:text-sm text-neutral-600 leading-relaxed font-normal"
                >
                  We use cookies to improve your experience and understand how visitors interact with our website.{' '}
                  <Link
                    to="/cookie-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-950 hover:text-black underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-950 font-semibold transition-colors inline-block whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-950 rounded-xs"
                  >
                    Cookie Policy
                  </Link>
                </p>
              </div>

              {/* Action Buttons Column */}
              <div className="shrink-0 flex flex-col min-[360px]:grid min-[360px]:grid-cols-2 md:flex md:flex-row md:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
                <button
                  type="button"
                  id="cookie-banner-decline-btn"
                  onClick={onDecline}
                  className="w-full md:w-auto px-5 py-2.5 sm:py-3 min-h-[44px] rounded-full text-xs font-bold tracking-wider uppercase text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 transition-all duration-200 cursor-pointer active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 flex items-center justify-center text-center"
                >
                  Decline
                </button>

                <button
                  type="button"
                  id="cookie-banner-accept-btn"
                  onClick={onAccept}
                  className="w-full md:w-auto px-6 py-2.5 sm:py-3 min-h-[44px] rounded-full text-xs font-bold tracking-wider uppercase text-black bg-[#dbfa07] hover:bg-[#181a33] hover:text-white transition-all duration-200 shadow-xs cursor-pointer active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#181a33] focus-visible:ring-offset-2 flex items-center justify-center text-center font-bold"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
};
