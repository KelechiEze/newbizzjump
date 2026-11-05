import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, CarFront, Play, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { INITIATIVES, Initiative } from '../data/initiativesData';
import './InitiativesPage.css';

function InitiativeCover({ initiative, priority = false }: { initiative: Initiative; priority?: boolean }) {
  const Mark = initiative.slug === 'cp-kids' ? Sparkles : CarFront;

  return (
    <div className={`initiative-cover initiative-cover--${initiative.slug}`}>
      <img
        src={initiative.cover.src}
        alt={initiative.cover.alt}
        width={1536}
        height={1024}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      <div className="initiative-cover__shade" />
      <span className="initiative-cover__wordmark" aria-hidden="true">
        <Mark strokeWidth={2.2} />
        {initiative.name}
      </span>
    </div>
  );
}

function InitiativeCard({ initiative, related = false }: { initiative: Initiative; related?: boolean }) {
  return (
    <Link
      to={`/initiatives/${initiative.slug}`}
      className={`initiative-card${related ? ' initiative-card--related' : ''}`}
      aria-label={`View ${initiative.name} case study`}
    >
      <div className="initiative-card__visual">
        <InitiativeCover initiative={initiative} priority={!related} />
        <span className="initiative-card__arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
      </div>
      <h2>{initiative.name}</h2>
      <p>{initiative.summary}</p>
      <span className="initiative-card__credit">{initiative.credit}</span>
    </Link>
  );
}

export const InitiativesPage = () => {
  const reduceMotion = useReducedMotion();
  useInitiativeTitle('Initiatives | BIZZJUMP', '/initiatives');

  return (
    <div className="initiatives-page">
      <div className="initiatives-shell">
        <motion.section
          className="initiatives-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <Link className="initiatives-home-link" to="/" aria-label="Back to BIZZJUMP home">
            BIZZJUMP <ArrowUpRight size={13} />
          </Link>
          <span className="initiatives-eyebrow">Our initiatives</span>
          <h1>Built for people.<br />Made for possibility.</h1>
          <p>Our own ideas and meaningful collaborations.<br className="initiatives-desktop-break" /> Making learning more inclusive and everyday journeys more affordable.</p>
        </motion.section>

        <div className="initiatives-section-bar">
          <span>All initiatives</span>
          <span>Design for a better everyday</span>
        </div>
        <ul className="initiatives-grid" aria-label="Our initiatives">
          {INITIATIVES.map((initiative, index) => (
            <motion.li
              className="initiative-card-cell"
              key={initiative.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <InitiativeCard initiative={initiative} />
            </motion.li>
          ))}
        </ul>
        <motion.div
          className="initiatives-endnote"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span>Independent ideas. Shared possibilities.</span>
          <Link to="/about">The studio behind the work <ArrowUpRight size={14} /></Link>
        </motion.div>
      </div>
    </div>
  );
};

function useInitiativeTitle(title: string, pathname: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    document.title = title;
    if (canonical) canonical.href = `https://bizzjump.com${pathname}`;

    return () => {
      document.title = previousTitle;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, [title, pathname]);
}

function InitiativeTutorial({ tutorial, poster }: { tutorial: NonNullable<Initiative['tutorial']>; poster: string }) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const videoUrl = `https://drive.google.com/file/d/${tutorial.fileId}`;

  return (
    <motion.section
      className="initiative-tutorial"
      id="platform-tutorial"
      aria-labelledby="initiative-tutorial-title"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="initiative-tutorial__intro">
        <div>
          <span className="initiatives-eyebrow">Platform walkthrough</span>
          <h2 id="initiative-tutorial-title">{tutorial.title}</h2>
        </div>
        <p>{tutorial.description}</p>
      </div>
      <div className="initiative-tutorial__player">
        {isPlayerOpen ? (
          <iframe
            src={`${videoUrl}/preview`}
            title="CP Kids platform tutorial video"
            allow="fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            className="initiative-tutorial__poster"
            onClick={() => setIsPlayerOpen(true)}
            aria-label="Load CP Kids tutorial video"
            aria-describedby="initiative-tutorial-notice"
          >
            <img src={poster} alt="" width={1536} height={1024} loading="lazy" />
            <span className="initiative-tutorial__play"><Play size={28} fill="currentColor" aria-hidden="true" /></span>
            <span className="initiative-tutorial__caption">Watch the CP Kids walkthrough</span>
          </button>
        )}
      </div>
      <div className="initiative-tutorial__footnote">
        <p id="initiative-tutorial-notice">
          {isPlayerOpen ? 'Use the video controls to play, pause, or view fullscreen.' : 'Select to load the video from Google Drive.'}
          {' '}If the player asks for access or does not load, open the video in Google Drive.
        </p>
        <a href={`${videoUrl}/view`} target="_blank" rel="noopener noreferrer">
          Open in Google Drive <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </motion.section>
  );
}

export const InitiativeDetailPage = () => {
  const reduceMotion = useReducedMotion();
  const { slug } = useParams<{ slug: string }>();
  const initiative = INITIATIVES.find((item) => item.slug === slug);
  useInitiativeTitle(
    initiative ? `${initiative.name} | BIZZJUMP Initiatives` : 'Initiative not found | BIZZJUMP',
    initiative ? `/initiatives/${initiative.slug}` : '/initiatives',
  );

  if (!initiative) {
    return (
      <div className="initiatives-page">
        <div className="initiatives-shell initiatives-not-found">
          <span className="initiatives-eyebrow">Initiative not found</span>
          <h1>Let's get you back<br />to the good ideas.</h1>
          <Link className="initiatives-back-link" to="/initiatives"><ArrowLeft size={15} /> All initiatives</Link>
        </div>
      </div>
    );
  }

  const otherInitiatives = INITIATIVES.filter((item) => item.slug !== initiative.slug);
  const metadata = [
    { label: 'Initiative', value: initiative.name },
    { label: 'Credits', value: initiative.credit },
    { label: 'Year', value: '2026' },
    { label: 'Discipline', value: initiative.discipline },
  ];

  return (
    <div className="initiatives-page">
      <article className="initiatives-shell" key={initiative.slug}>
        <motion.header
          className="initiatives-intro initiatives-intro--detail"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <Link className="initiatives-home-link" to="/initiatives"><ArrowLeft size={13} /> All initiatives</Link>
          <span className="initiatives-eyebrow">Case study</span>
          <h1>{initiative.name}</h1>
          {initiative.tagline && <p className="initiative-tagline">{initiative.tagline}</p>}
          <p>{initiative.introduction}</p>
          <span className="initiative-collaboration">{initiative.credit}</span>
          {initiative.tutorial && (
            <a className="initiative-watch-link" href="#platform-tutorial"><Play size={14} aria-hidden="true" /> Watch the platform tutorial</a>
          )}
        </motion.header>

        <motion.dl
          className="initiative-metadata"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          {metadata.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          className="initiative-hero"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <InitiativeCover initiative={initiative} priority />
        </motion.div>

        {initiative.tutorial && (
          <InitiativeTutorial tutorial={initiative.tutorial} poster={initiative.cover.src} />
        )}

        <div className="initiative-story">
          {'storySections' in initiative ? (
            <>
              {initiative.storySections.map((section, index) => (
                <motion.section
                  key={section.title}
                  aria-labelledby={`initiative-section-${index}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55 }}
                >
                  <h2 id={`initiative-section-${index}`}>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items && section.layout === 'steps' && (
                    <ol className="initiative-story__steps">
                      {section.items.map((item) => (
                        <li key={item.title}>
                          <h3>{item.title}</h3>
                          {item.subtitle && <p className="initiative-story__subtitle">{item.subtitle}</p>}
                          <p>{item.description}</p>
                        </li>
                      ))}
                    </ol>
                  )}
                  {section.items && section.layout === 'list' && (
                    <ul className="initiative-story__list">
                      {section.items.map((item) => (
                        <li key={item.title}><strong>{item.title}:</strong> {item.description}</li>
                      ))}
                    </ul>
                  )}
                  {section.items && section.layout === 'cards' && (
                    <div className="initiative-story__cards">
                      {section.items.map((item) => (
                        <div key={item.title}>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.section>
              ))}
              <motion.section
                className="initiative-story__closing"
                aria-labelledby="initiative-closing-title"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
              >
                <span className="initiatives-eyebrow">{initiative.closingCallout.title}</span>
                <h2 id="initiative-closing-title">{initiative.closingCallout.tagline}</h2>
                <p>{initiative.closingCallout.description}</p>
                <div className="initiative-story__links">
                  <a href="#product-design">Explore the experience <ArrowUpRight size={14} /></a>
                  <Link to="/contact">Talk to BIZZJUMP <ArrowUpRight size={14} /></Link>
                </div>
              </motion.section>
            </>
          ) : (
            <>
              <motion.section
                aria-labelledby="initiative-overview"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
              >
                <h2 id="initiative-overview">Overview</h2>
                <p>{initiative.overview}</p>
              </motion.section>
              <motion.section
                aria-labelledby="initiative-challenge"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
              >
                <h2 id="initiative-challenge">The challenge</h2>
                <p>{initiative.challenge}</p>
              </motion.section>
              <motion.section
                aria-labelledby="initiative-approach"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
              >
                <h2 id="initiative-approach">The approach</h2>
                <ul>
                  {initiative.approach.map((item) => (
                    <li key={item.title}><strong>{item.title}</strong> {item.description}</li>
                  ))}
                </ul>
              </motion.section>
              <motion.section
                aria-labelledby="initiative-feature"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
              >
                <h2 id="initiative-feature">{initiative.feature.title}</h2>
                <p>{initiative.feature.description}</p>
              </motion.section>
              <motion.section
                aria-labelledby="initiative-outcome"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
              >
                <h2 id="initiative-outcome">Outcome</h2>
                <p>{initiative.outcome}</p>
                <div className="initiative-story__links">
                  <a href="#product-design">Explore the design <ArrowUpRight size={14} /></a>
                  <Link to="/contact">Talk to BIZZJUMP <ArrowUpRight size={14} /></Link>
                </div>
              </motion.section>
            </>
          )}
        </div>

        <motion.section
          id="product-design"
          className={`initiative-gallery initiative-gallery--${initiative.slug}`}
          aria-label={`${initiative.name} product designs`}
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {[0, 1].map((column) => (
            <motion.div
              className="initiative-gallery__panel"
              key={column}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: column * 0.12 }}
            >
              {initiative.screens.slice(column * 2, column * 2 + 2).map((image) => (
                <figure key={image.src}>
                  <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
                </figure>
              ))}
            </motion.div>
          ))}
        </motion.section>

        {initiative.photographs.length > 0 && (
          <motion.section
            className="initiative-photographs"
            aria-label="The people at the heart of CP Kids"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            {initiative.photographs.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} width={1200} height={896} loading="lazy" />
            ))}
          </motion.section>
        )}

        <div className="initiatives-section-bar initiatives-section-bar--related">
          <span>Another idea worth exploring</span>
          <Link className="initiatives-back-link" to="/initiatives"><ArrowLeft size={14} /> All initiatives</Link>
        </div>
        <ul className="initiatives-grid initiatives-grid--related" aria-label="More initiatives">
          {otherInitiatives.map((item, index) => (
            <motion.li
              className="initiative-card-cell"
              key={item.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <InitiativeCard initiative={item} related />
            </motion.li>
          ))}
          <motion.li
            className="initiative-related-note"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: otherInitiatives.length * 0.1 }}
          >
            <span className="initiatives-eyebrow">One studio. A shared purpose.</span>
            <p>Good design starts<br />with giving a little back.</p>
            <Link to="/about">Meet BIZZJUMP <ArrowUpRight size={15} /></Link>
          </motion.li>
        </ul>
      </article>
    </div>
  );
};
