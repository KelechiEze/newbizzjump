import { motion } from 'motion/react';
import { Check, ArrowUpRight, Code2, Zap, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onOpenStartProject: (initialPlan?: string) => void;
}

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  badgeType?: 'popular' | 'fast' | 'enterprise';
  price: string;
  period: string;
  tagline: string;
  whyWeCharge: string;
  features: string[];
  idealFor: string;
  ctaText: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter-web',
    name: 'STARTER SPRINT',
    badge: 'RAPID LAUNCH',
    badgeType: 'fast',
    price: '$800',
    period: '/build',
    tagline: 'High-converting, ultra-fast single page or MVP web development.',
    whyWeCharge:
      'We write clean, semantic code with zero template bloat, sub-second load times, responsive fluid layouts, and flawless conversion-focused animations from day one.',
    idealFor: 'Early-stage startups, product launches & boutique portfolios.',
    features: [
      'Custom bespoke UI/UX architecture',
      'Single-page fluid responsive development',
      'Interactive motion & micro-interactions',
      'Lighthouse 95+ performance optimization',
      'Contact forms & lead capture integration',
      'Basic SEO metadata & social graph tags',
      '5-day rapid delivery turnaround',
    ],
    ctaText: 'START STARTER BUILD',
  },
  {
    id: 'growth-web',
    name: 'GROWTH ENGINE',
    badge: 'MOST POPULAR',
    badgeType: 'popular',
    price: '$1,500',
    period: '/build',
    tagline: 'Multi-page custom website with dynamic CMS and brand architecture.',
    whyWeCharge:
      'Covers complete full-stack web craftsmanship: bespoke design system, headless CMS integration, scalable component architecture, interactive filtering, and custom 3D/video asset embedding.',
    idealFor: 'Scaling businesses, creative studios & modern DTC brands.',
    features: [
      'Up to 5 custom-designed page layouts',
      'Headless CMS setup for effortless editing',
      'Custom animations with Motion / GSAP',
      'Full SEO infrastructure & structured schema',
      'Custom media & video player integration',
      'Custom domain setup, SSL & edge CDN hosting',
      '2 rounds of collaborative revisions',
      '10-day sprint delivery turnaround',
    ],
    ctaText: 'START GROWTH BUILD',
  },
  {
    id: 'shopify-flagship',
    name: 'SHOPIFY & ENTERPRISE',
    badge: 'SHOPIFY / BESPOKE',
    badgeType: 'enterprise',
    price: '$2,500',
    period: '/build',
    tagline: 'Custom Shopify Plus / Liquid ecommerce flagship & bespoke web platforms.',
    whyWeCharge:
      'Custom Shopify and complex enterprise builds demand specialized engineering: tailored Liquid/Hydrogen theme architecture, checkout customization, high-converting product pages, ERP/app integrations, and frictionless conversion funnels.',
    idealFor: 'DTC ecommerce brands, Shopify merchants & high-scale digital flagships.',
    features: [
      'Custom Shopify Liquid / Hydrogen theme build',
      'Custom product, collection & checkout templates',
      'Cart drawer, upsell modules & subscription setup',
      'Full-stack API & inventory/CRM integrations',
      'Custom interactive 3D product visualizer',
      'Advanced conversion tracking & analytics setup',
      'Payment gateways, tax & multi-currency config',
      '30 days of post-launch priority support',
    ],
    ctaText: 'START SHOPIFY SUITE',
  },
];

export const PricingSection = ({ onOpenStartProject }: PricingSectionProps) => {
  return (
    <section
      id="pricing-section"
      className="w-full px-6 sm:px-10 md:px-14 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-28 bg-[#fcfbf9] border-t border-neutral-200/80 select-none"
    >
      {/* 1. Header: PRICING (3) on Left | Transparent text on Right */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-12 sm:mb-16 md:mb-20 max-w-7xl mx-auto">
        {/* Main Section Heading */}
        <div className="flex items-start gap-2 sm:gap-3">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-neutral-950 uppercase leading-none">
            PRICING
          </h2>
          <span className="text-xs sm:text-sm font-mono-clean font-bold tracking-widest text-neutral-500 translate-y-1 sm:translate-y-2">
            (3)
          </span>
        </div>

        {/* Editorial Subtitle */}
        <div className="max-w-lg text-left">
          <p className="text-sm sm:text-base md:text-lg font-medium text-neutral-800 leading-snug tracking-tight">
            Transparent, value-anchored web development pricing. Built with clean code, sub-second speed, and precision design.
          </p>
        </div>
      </div>

      {/* 2. 3-Column Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {PRICING_TIERS.map((tier, index) => {
          const isPopular = tier.badgeType === 'popular';

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              style={{ borderRadius: '6px' }}
              className={`relative p-7 sm:p-8 md:p-9 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-xl border ${
                isPopular
                  ? 'bg-white border-neutral-900 ring-2 ring-neutral-900/10'
                  : 'bg-[#f4f3ee] border-neutral-200/90'
              }`}
            >
              {/* Badge Tag */}
              {tier.badge && (
                <div className="absolute top-6 right-6">
                  <span
                    style={{ borderRadius: '4px' }}
                    className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-mono-clean font-bold tracking-wider uppercase ${
                      isPopular
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'bg-neutral-200 text-neutral-800'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Title */}
                <div className="mb-2">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-neutral-950">
                    {tier.name}
                  </h3>
                </div>

                {/* Plan Subtitle */}
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-neutral-200/90">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-950">
                    {tier.price}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-wider">
                    {tier.period}
                  </span>
                </div>

                {/* "Why We Charge For This" Engineering & Value Rationale */}
                <div className="mb-6 p-4 rounded-xs bg-black/5 border border-black/5">
                  <div className="flex items-center gap-1.5 mb-1.5 text-neutral-950">
                    <Zap className="w-3.5 h-3.5 fill-neutral-950" />
                    <span className="text-[10px] font-black tracking-widest uppercase text-neutral-900 font-mono-clean">
                      WHY WE CHARGE THIS
                    </span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                    {tier.whyWeCharge}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="mb-8">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 block mb-3 font-mono-clean">
                    WHAT'S INCLUDED
                  </span>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 font-normal leading-snug"
                      >
                        <div className="w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-neutral-900 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-neutral-200/80">
                <button
                  onClick={() => onOpenStartProject(`${tier.name} (${tier.price})`)}
                  id={`pricing-plan-btn-${tier.id}`}
                  className={`w-full py-4 px-6 rounded-full font-bold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer group ${
                    isPopular
                      ? 'bg-[#dbfa07] text-neutral-950 hover:bg-[#181a33] hover:text-white'
                      : 'bg-neutral-950 text-white hover:bg-[#dbfa07] hover:text-neutral-950'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

