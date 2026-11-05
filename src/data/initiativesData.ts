interface InitiativeImage {
  src: string;
  alt: string;
}

export interface Initiative {
  slug: string;
  name: string;
  summary: string;
  introduction: string;
  discipline: string;
  credit: string;
  tutorial?: {
    title: string;
    description: string;
    fileId: string;
  };
  cover: InitiativeImage;
  overview: string;
  challenge: string;
  approach: { title: string; description: string }[];
  feature: { title: string; description: string };
  outcome: string;
  screens: (InitiativeImage & { width: number; height: number })[];
  photographs: InitiativeImage[];
}

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
    summary: 'Thoughtful mobility for the way Nigeria moves.',
    introduction: 'Comfortable journeys. More possibilities. A ride-hailing experience designed around everyday life in Nigeria.',
    discipline: 'Mobility / Product design / Community',
    credit: 'A BIZZJUMP initiative',
    cover: {
      src: '/initiatives/jump-ride-cover.jpg',
      alt: 'AI-generated illustration of a mint-green ride-hailing car on a Lagos boulevard near the Lekki-Ikoyi bridge.',
    },
    overview: 'Jump Ride is BIZZJUMP\'s response to a very everyday problem: getting where you need to go without stretching an already tight budget. It is a ride-hailing product built around comfortable journeys, reasonable fares, and opportunities for passengers to earn towards the cost of their rides.',
    challenge: 'In Nigeria, the cost of everyday transport can put pressure on work, education, and family life. A useful mobility service needs to understand that reality. The challenge is not simply to make booking a car easier, but to imagine a service that works with the local economy and gives passengers more flexibility.',
    approach: [
      { title: 'Make booking feel effortless.', description: 'A clear starting point, visible trip information, and an approachable booking flow help passengers plan a journey with confidence.' },
      { title: 'Put affordability at the centre.', description: 'Reasonable pricing and an easy-to-understand wallet experience keep the cost of a journey part of the conversation from the beginning.' },
      { title: 'Create opportunities along the way.', description: 'Games and other optional activities are part of the product vision, giving passengers ways to earn towards future ride costs. Earnings are not guaranteed.' },
      { title: 'Design for the whole community.', description: 'Passenger, driver, and fleet-owner experiences are considered together, with the aim of making the service useful for everyone involved.' },
    ],
    feature: {
      title: 'More than a journey',
      description: 'The product direction brings ride booking, scheduled trips, a passenger wallet, and rewards into one coherent experience. Optional games and activities explore how the time around a journey could create additional value, without getting in the way of the simple task of booking a ride.',
    },
    outcome: 'A community-minded mobility concept that treats affordability as a design priority, not an afterthought. Jump Ride reflects BIZZJUMP\'s ambition to build practical products that respond to the realities of life in Nigeria.',
    screens: [
      { src: '/initiatives/jump-ride-screen-1.jpg', alt: 'Jump Ride passenger dashboard with ride booking, trip scheduling, a map, and a wallet.', width: 1440, height: 760 },
      { src: '/initiatives/jump-ride-screen-2.jpg', alt: 'Jump Ride login page with password and one-time-password sign-in options.', width: 1440, height: 813 },
      { src: '/initiatives/jump-ride-screen-3.jpg', alt: 'Jump Ride mission and transport service design, featuring a green branded vehicle.', width: 1440, height: 760 },
      { src: '/initiatives/jump-ride-screen-4.jpg', alt: 'Jump Ride booking interface with a side view of the green car and ride assistant.', width: 1440, height: 760 },
    ],
    photographs: [],
  },
];
