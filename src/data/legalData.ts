export interface LegalSection {
  id: string;
  title: string;
  content: string[];
  list?: string[];
  subsections?: {
    subtitle: string;
    paragraphs: string[];
  }[];
  note?: string;
}

export interface LegalDocument {
  id: 'privacy-policy' | 'terms' | 'cookie-policy';
  slug: string;
  title: string;
  badge: string;
  lastUpdated: string;
  summary: string;
  introParagraphs: string[];
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocument = {
  id: 'privacy-policy',
  slug: '/privacy-policy',
  title: 'Privacy Policy',
  badge: 'PRIVACY & DATA PROTECTION',
  lastUpdated: 'September 17, 2026',
  summary: 'How Bizzjump collects, uses, and safeguards your personal information.',
  introParagraphs: [
    'Bizzjump ("we," "our," or "us") is dedicated to protecting your privacy and handling your personal information with full transparency.',
    'This Privacy Policy outlines how we collect, use, and protect your information when you browse our website (bizzjump.com), enquire about our design and development services, or collaborate with us as a client.',
  ],
  sections: [
    {
      id: 'section-1',
      title: '1. Information We Collect',
      content: [
        'We collect information that you voluntarily provide to us when contacting us, requesting a proposal, or working with our team.',
      ],
      list: [
        'Full name, email address, and phone number',
        'Company or business name and website URL',
        'Project details, design goals, and timeline expectations',
        'Communications, messages, and feedback exchanged with us',
      ],
    },
    {
      id: 'section-2',
      title: '2. How We Use Your Information',
      content: [
        'We use the information we collect strictly to provide and improve our creative digital services.',
      ],
      list: [
        'To respond to inquiries and discuss prospective projects',
        'To prepare quotations, scopes of work, and contracts',
        'To deliver website design, branding, and development services',
        'To provide ongoing client support and maintain business records',
        'To maintain the security and integrity of our digital platforms',
      ],
    },
    {
      id: 'section-3',
      title: '3. Technical Data & Cookies',
      content: [
        'When you navigate our website, basic technical data such as browser type, device information, and pages viewed may be collected automatically via cookies and analytics to ensure optimal performance.',
        'You can manage or disable cookies through your web browser settings at any time.',
      ],
    },
    {
      id: 'section-4',
      title: '4. Information Sharing',
      content: [
        'We never sell, rent, or trade your personal information to third parties.',
        'We only share information with trusted third-party service providers (such as hosting, email infrastructure, and payment processing partners) strictly necessary to operate our business and fulfill our services.',
      ],
    },
    {
      id: 'section-5',
      title: '5. Data Security & Retention',
      content: [
        'We implement appropriate technical and administrative safeguards to protect your personal information against unauthorized access, loss, or misuse.',
        'We retain your personal data only for as long as necessary to fulfill project requirements and comply with legal or accounting obligations.',
      ],
    },
    {
      id: 'section-6',
      title: '6. Your Rights',
      content: [
        'You have the right to request access to the personal data we hold about you, request corrections to inaccurate information, or ask for the deletion of your personal records, subject to legal requirements.',
      ],
    },
    {
      id: 'section-7',
      title: '7. Contact Us',
      content: [
        'If you have questions regarding this Privacy Policy or wish to exercise any of your privacy rights, please reach out to us at contact@bizzjump.com or through our contact page.',
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDocument = {
  id: 'terms',
  slug: '/terms',
  title: 'Terms & Conditions',
  badge: 'TERMS OF SERVICE',
  lastUpdated: 'September 17, 2026',
  summary: 'Standard terms governing website usage and client creative engagements with Bizzjump.',
  introParagraphs: [
    'Welcome to Bizzjump. By visiting our website or engaging our services, you agree to comply with and be bound by the following terms and conditions.',
    'These Terms apply to all visitors, clients, and partners who access our site or utilize our design, development, and consulting services.',
  ],
  sections: [
    {
      id: 'terms-1',
      title: '1. Services & Scope',
      content: [
        'Bizzjump provides digital agency services including bespoke website design, web development, UI/UX design, e-commerce solutions, and brand strategy.',
        'Each client project is governed by an agreed proposal, quote, or statement of work defining deliverables, milestones, and fees.',
      ],
    },
    {
      id: 'terms-2',
      title: '2. Client Responsibilities',
      content: [
        'Clients agree to provide timely feedback, approvals, and materials (including text copy, images, branding assets, and account credentials) required to complete the project.',
        'The client warrants that all provided content and assets are owned by the client or properly licensed for use.',
      ],
    },
    {
      id: 'terms-3',
      title: '3. Fees & Payment Terms',
      content: [
        'Project fees, deposits, and payment schedules are specified in individual client proposals or invoices.',
        'Work typically commences upon receipt of the initial deposit. Final files, code repositories, or production deployments are transferred upon receipt of full payment.',
      ],
    },
    {
      id: 'terms-4',
      title: '4. Intellectual Property',
      content: [
        'Upon receipt of final payment, ownership of custom project deliverables transfers to the client according to the project agreement.',
        'Bizzjump retains ownership of pre-existing frameworks, proprietary tools, and methodologies. Bizzjump reserves the right to showcase completed non-confidential work in our portfolio.',
      ],
    },
    {
      id: 'terms-5',
      title: '5. Revisions & Delivery',
      content: [
        'Projects include a designated round of revisions as detailed in the scope of work. Substantial changes outside the original scope will be quoted separately before execution.',
        'Estimated project timelines rely on timely client communication and prompt approvals.',
      ],
    },
    {
      id: 'terms-6',
      title: '6. Limitation of Liability',
      content: [
        'To the maximum extent permitted by applicable law, Bizzjump shall not be liable for indirect, incidental, or consequential damages resulting from website downtime, third-party service outages, or business interruption.',
      ],
    },
    {
      id: 'terms-7',
      title: '7. Contact Us',
      content: [
        'For inquiries or questions concerning these Terms & Conditions, please contact us via bizzjump.com/contact.',
      ],
    },
  ],
};

export const COOKIE_POLICY: LegalDocument = {
  id: 'cookie-policy',
  slug: '/cookie-policy',
  title: 'Cookie Policy',
  badge: 'COOKIE PREFERENCES',
  lastUpdated: 'September 17, 2026',
  summary: 'How Bizzjump uses cookies and similar technologies on our website.',
  introParagraphs: [
    'This Cookie Policy explains how Bizzjump uses cookies and related technologies to ensure our website functions effectively, securely, and smoothly.',
    'By continuing to use our website, you agree to our use of cookies in accordance with this policy.',
  ],
  sections: [
    {
      id: 'cookie-1',
      title: '1. What Are Cookies?',
      content: [
        'Cookies are small text files placed on your computer or mobile device when you visit a website. They help websites remember your preferences, keep you signed in, and analyze browsing behavior to improve overall performance.',
      ],
    },
    {
      id: 'cookie-2',
      title: '2. How We Use Cookies',
      content: [
        'We use cookies strictly to improve your browsing experience, guarantee security, and understand how visitors interact with our digital portfolio and services.',
      ],
      list: [
        'Essential cookies required for site navigation and core security',
        'Performance & analytics cookies to understand page usage and visitor trends',
        'Preference cookies to remember your device display settings',
      ],
    },
    {
      id: 'cookie-3',
      title: '3. Third-Party Services',
      content: [
        'Some embedded tools, web fonts, or analytics services may deploy third-party cookies subject to their respective privacy and security policies.',
      ],
    },
    {
      id: 'cookie-4',
      title: '4. Managing Cookies',
      content: [
        'You can choose to accept, block, or delete cookies via your browser settings at any time. Please note that disabling essential cookies may impact certain interactive features of our website.',
      ],
    },
    {
      id: 'cookie-5',
      title: '5. Contact Us',
      content: [
        'If you have questions about our Cookie Policy, please reach out to us at contact@bizzjump.com or through our contact page.',
      ],
    },
  ],
};
