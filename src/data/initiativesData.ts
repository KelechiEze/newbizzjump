interface InitiativeImage {
  src: string;
  alt: string;
}

interface InitiativeBase {
  slug: string;
  name: string;
  summary: string;
  introduction: string;
  tagline?: string;
  discipline: string;
  credit: string;
  tutorial?: {
    title: string;
    description: string;
    fileId: string;
  };
  cover: InitiativeImage;
  screens: (InitiativeImage & { width: number; height: number })[];
  photographs: InitiativeImage[];
}

interface LegacyInitiative extends InitiativeBase {
  overview: string;
  challenge: string;
  approach: { title: string; description: string }[];
  feature: { title: string; description: string };
  outcome: string;
}

interface InitiativeStorySection {
  title: string;
  paragraphs?: string[];
  layout?: 'steps' | 'list' | 'cards';
  items?: { title: string; subtitle?: string; description: string }[];
}

interface StructuredInitiative extends InitiativeBase {
  storySections: InitiativeStorySection[];
  closingCallout: {
    title: string;
    tagline: string;
    description: string;
  };
}

export type Initiative = LegacyInitiative | StructuredInitiative;

export const INITIATIVES: Initiative[] = [
  {
    slug: 'cp-kids',
    name: 'CP Kids',
    summary: 'Adaptive learning and communication, built around every child.',
    introduction: 'Building bright young minds. A nurturing space where children learn, play, and communicate through adaptive vision.',
    discipline: 'Accessibility / Education / Adaptive vision',
    credit: 'In collaboration with EMITSPHERE',
    tutorial: {
      title: 'See CP Kids in action',
      description: 'A show-and-tell walkthrough of the CP Kids platform. Watch how the experience works, then explore the story and product designs below.',
      fileId: '1J-oQdge5sDTTnWG7ZpuWmMgCES2_44Fb',
    },
    cover: {
      src: '/initiatives/cp-kids-cover.jpg',
      alt: 'AI-generated illustration of a child in a supportive wheelchair exploring a mounted learning tablet with an educator.',
    },
    overview: 'CP Kids is a collaborative project with EMITSPHERE, with BIZZJUMP contributing as a collaborator, not as the product owner. It supports children whose motor disabilities can make conventional classrooms, handwriting, and everyday communication difficult to access. It brings learning, play, and expression into one nurturing digital space, with interaction that adapts to the child rather than asking the child to adapt to a keyboard.',
    challenge: 'A child should not be excluded from education because they cannot hold a pencil, type, or speak. Traditional learning tools often depend on precisely these abilities. The challenge is to create another way in: one that recognises different movements, supports different levels of mobility, and gives children room to learn at their own pace.',
    approach: [
      { title: 'A personal starting point.', description: 'An individual account gives each child a place to begin, with a learning experience that can be tailored with a caregiver or educator.' },
      { title: 'More than one way to participate.', description: 'Hand gestures, eye movements, and head movements offer alternative ways to make choices and interact, depending on each child\'s abilities.' },
      { title: 'Communication comes first.', description: 'An accessible word board, everyday phrases, and visual choices help children express needs and participate in learning.' },
      { title: 'Learning through encouragement.', description: 'Clear layouts, welcoming colours, and playful activities create a calmer, more approachable environment for discovery.' },
    ],
    feature: {
      title: 'Designed for adaptive growth',
      description: 'Eye-blink communication, a classroom word keyboard, and head-and-face gestures form the core of the product direction. Caregiver settings allow the experience to be adapted to a child\'s movement and communication needs. The intention is simple: more independent expression, and more opportunities to be included.',
    },
    outcome: 'A vision for a more inclusive learning experience, where a small movement can become a choice, an answer, or a new connection. Through the CP Kids collaboration with EMITSPHERE, BIZZJUMP contributes to a shared ambition for more accessible education.',
    screens: [
      { src: '/initiatives/cp-kids-screen-1.jpg', alt: 'CP Kids adaptive growth page showing eye-blink communication and an inclusive classroom.', width: 1440, height: 712 },
      { src: '/initiatives/cp-kids-screen-2.jpg', alt: 'CP Kids classroom word keyboard and gesture-based learning features.', width: 1440, height: 712 },
      { src: '/initiatives/cp-kids-screen-3.jpg', alt: 'CP Kids head and face expression tools for communication.', width: 1440, height: 712 },
      { src: '/initiatives/cp-kids-screen-4.jpg', alt: 'CP Kids core tools, including eye blink mode, a virtual keyboard, privacy, and caregiver settings.', width: 1440, height: 712 },
    ],
    photographs: [
      { src: '/initiatives/cp-kids-vision.jpg', alt: 'A child and caregiver sharing a joyful moment with an adaptive tablet.' },
      { src: '/initiatives/cp-kids-learning.jpg', alt: 'A child using a mounted communication screen in an inclusive classroom.' },
      { src: '/initiatives/cp-kids-community.jpg', alt: 'A child exploring a visual communication board on a mounted tablet.' },
    ],
  },
  {
    slug: 'jump-ride',
    name: 'Jump Ride',
    summary: 'Move smarter. Spend better. Go further.',
    tagline: 'Move smarter. Spend better. Go further.',
    introduction: 'An affordable mobility experience designed around the way people move every day in Nigeria. From individual rides to shared commutes and planned journeys, Jump Ride brings more ways to get where you need to go.',
    discipline: 'Mobility / Shared commutes / Rewards',
    credit: 'A BIZZJUMP initiative',
    cover: {
      src: '/initiatives/jump-ride-cover.jpg',
      alt: 'AI-generated illustration of a mint-green car on a Lagos boulevard near the Lekki-Ikoyi bridge.',
    },
    storySections: [
      {
        title: 'Overview',
        paragraphs: [
          'Getting around should be easier to plan and more affordable to manage.',
          'Jump Ride is a mobility platform designed to give passengers more control over their everyday journeys. Whether booking an individual ride, sharing a commute or planning trips ahead, users can explore flexible ways to move.',
          'Beyond transportation, Jump Ride introduces a connected experience that brings ride planning, shared mobility and rewards into one platform.',
        ],
      },
      {
        title: 'The Challenge',
        paragraphs: [
          'For many people, transportation is a daily expense that affects how they work, study, run businesses and manage everyday responsibilities.',
          'Individual rides can become expensive, daily commutes can be unpredictable, and planning multiple journeys often means using different services.',
          'Jump Ride explores a simpler approach: giving people more options to travel, plan ahead and make better use of their transportation budget.',
        ],
      },
      {
        title: 'The Jump Ride Experience',
        layout: 'steps',
        items: [
          {
            title: 'Book a Ride',
            subtitle: 'Your destination. Your journey. Your choice.',
            description: 'Need to get somewhere? Enter your destination, explore available ride options and book an individual trip. Jump Ride is designed to make everyday booking straightforward, with clear journey information and a convenient way to get moving.',
          },
          {
            title: 'Jump Circles',
            subtitle: 'Share your commute. Make every journey count.',
            description: 'Why travel alone when others are heading in the same direction? Jump Circles brings together passengers travelling along similar routes, creating opportunities to share scheduled journeys and split transportation costs. From regular work commutes to familiar daily routes, it offers another way to make getting around more affordable.',
          },
          {
            title: 'Jump Pass',
            subtitle: 'Plan your rides. Stay ahead of your commute.',
            description: 'Some journeys happen every day. Jump Pass is designed to help users plan those journeys ahead of time. Explore ride packages and planned travel options that make it easier to organise regular transportation and manage your commuting budget.',
          },
          {
            title: 'Jump Connect',
            subtitle: 'Connect your journey. Get where you need to go.',
            description: 'Not every journey happens in one ride. Jump Connect is designed to bring different transportation options together, helping users plan connections between their starting point, public transport and final destination. The goal is to make everyday journeys more connected and convenient.',
          },
          {
            title: 'Jump Rewards',
            description: 'One of Jump Ride\'s defining ideas is its passenger rewards experience. Through optional games, sponsored activities and engagement-based challenges, passengers can earn eligible ride credits towards future journeys. The rewards concept creates another reason to engage with the platform beyond booking a ride. Rewards are subject to eligibility, programme rules and available funding. They are designed as supplementary benefits rather than guaranteed income.',
          },
        ],
      },
      {
        title: 'More Than a Ride',
        paragraphs: ['Jump Ride brings several mobility experiences together in one place.'],
        layout: 'list',
        items: [
          { title: 'Individual trips', description: 'Book a ride whenever you need one.' },
          { title: 'Shared commutes', description: 'Connect with passengers travelling in your direction.' },
          { title: 'Planned journeys', description: 'Organise regular rides and explore available packages.' },
          { title: 'Connected transportation', description: 'Plan journeys that involve different transport options.' },
          { title: 'Ride rewards', description: 'Explore eligible activities and earn credits towards future rides.' },
        ],
      },
      {
        title: 'Designed Around Everyday Life',
        paragraphs: ['Jump Ride considers the needs of everyone involved in the mobility experience.'],
        layout: 'cards',
        items: [
          { title: 'For passengers', description: 'More ways to travel, plan journeys and manage transportation costs.' },
          { title: 'For drivers', description: 'Opportunities to receive ride requests and participate in individual or shared journeys.' },
          { title: 'For fleet partners', description: 'A connected platform to coordinate vehicles, drivers and transportation demand.' },
        ],
      },
      {
        title: 'Our Vision',
        paragraphs: [
          'We believe mobility should offer more than a way to get from one place to another.',
          'It should give people flexibility, help them manage everyday costs and create better connections between the places they need to go.',
          'Jump Ride is our vision for a more accessible and connected mobility experience, starting in Nigeria and built with the potential to serve communities across Africa.',
        ],
      },
    ],
    closingCallout: {
      title: 'Jump Ride',
      tagline: 'Move smarter. Spend better. Go further.',
      description: 'A better way to think about every journey.',
    },
    screens: [
      { src: '/initiatives/jump-ride-screen-1.jpg', alt: 'Jump Ride dashboard with mobility options, trip scheduling, a map, and a wallet.', width: 1440, height: 760 },
      { src: '/initiatives/jump-ride-screen-2.jpg', alt: 'Jump Ride login page with password and one-time-password sign-in options.', width: 1440, height: 813 },
      { src: '/initiatives/jump-ride-screen-3.jpg', alt: 'Jump Ride mission and mobility ecosystem design, featuring a green branded vehicle.', width: 1440, height: 760 },
      { src: '/initiatives/jump-ride-screen-4.jpg', alt: 'Jump Ride trip-planning interface with a side view of the green car and ride assistant.', width: 1440, height: 760 },
    ],
    photographs: [],
  },
];
