import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, CarFront, Play, Sparkles } from 'lucide-react';
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
  useInitiativeTitle('Initiatives | BIZZJUMP', '/initiatives');

  return (
    <div className="initiatives-page">
      <div className="initiatives-shell">
        <section className="initiatives-intro">
          <Link className="initiatives-home-link" to="/" aria-label="Back to BIZZJUMP home">
            BIZZJUMP <ArrowUpRight size={13} />
          </Link>
          <span className="initiatives-eyebrow">Our initiatives</span>
          <h1>Built for people.<br />Made for possibility.</h1>
          <p>Our own ideas and meaningful collaborations.<br className="initiatives-desktop-break" /> Making learning more inclusive and everyday journeys more affordable.</p>
        </section>

        <div className="initiatives-section-bar">
          <span>All initiatives</span>
          <span>Design for a better everyday</span>
        </div>
        <ul className="initiatives-grid" aria-label="Our initiatives">
          {INITIATIVES.map((initiative) => (
            <li className="initiative-card-cell" key={initiative.slug}><InitiativeCard initiative={initiative} /></li>
          ))}
        </ul>
        <div className="initiatives-endnote">
          <span>Independent ideas. Shared possibilities.</span>
          <Link to="/about">The studio behind the work <ArrowUpRight size={14} /></Link>
        </div>
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
  const videoUrl = `https://drive.google.com/file/d/${tutorial.fileId}`;

  return (
    <section className="initiative-tutorial" id="platform-tutorial" aria-labelledby="initiative-tutorial-title">
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
    </section>
  );
}

export const InitiativeDetailPage = () => {
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
        <header className="initiatives-intro initiatives-intro--detail">
          <Link className="initiatives-home-link" to="/initiatives"><ArrowLeft size={13} /> All initiatives</Link>
          <span className="initiatives-eyebrow">Case study</span>
          <h1>{initiative.name}</h1>
          <p>{initiative.introduction}</p>
          <span className="initiative-collaboration">{initiative.credit}</span>
          {initiative.tutorial && (
            <a className="initiative-watch-link" href="#platform-tutorial"><Play size={14} aria-hidden="true" /> Watch the platform tutorial</a>
          )}
        </header>

        <dl className="initiative-metadata">
          {metadata.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="initiative-hero"><InitiativeCover initiative={initiative} priority /></div>

        {initiative.tutorial && (
          <InitiativeTutorial tutorial={initiative.tutorial} poster={initiative.cover.src} />
        )}

        <div className="initiative-story">
          <section aria-labelledby="initiative-overview">
            <h2 id="initiative-overview">Overview</h2>
            <p>{initiative.overview}</p>
          </section>
          <section aria-labelledby="initiative-challenge">
            <h2 id="initiative-challenge">The challenge</h2>
            <p>{initiative.challenge}</p>
          </section>
          <section aria-labelledby="initiative-approach">
            <h2 id="initiative-approach">The approach</h2>
            <ul>
              {initiative.approach.map((item) => (
                <li key={item.title}><strong>{item.title}</strong> {item.description}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="initiative-feature">
            <h2 id="initiative-feature">{initiative.feature.title}</h2>
            <p>{initiative.feature.description}</p>
          </section>
          <section aria-labelledby="initiative-outcome">
            <h2 id="initiative-outcome">Outcome</h2>
            <p>{initiative.outcome}</p>
            <div className="initiative-story__links">
              <a href="#product-design">Explore the design <ArrowUpRight size={14} /></a>
              <Link to="/contact">Talk to BIZZJUMP <ArrowUpRight size={14} /></Link>
            </div>
          </section>
        </div>

        <section id="product-design" className={`initiative-gallery initiative-gallery--${initiative.slug}`} aria-label={`${initiative.name} product designs`}>
          {[0, 1].map((column) => (
            <div className="initiative-gallery__panel" key={column}>
              {initiative.screens.slice(column * 2, column * 2 + 2).map((image) => (
                <figure key={image.src}>
                  <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
                </figure>
              ))}
            </div>
          ))}
        </section>

        {initiative.photographs.length > 0 && (
          <section className="initiative-photographs" aria-label="The people at the heart of CP Kids">
            {initiative.photographs.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} width={1200} height={896} loading="lazy" />
            ))}
          </section>
        )}

        <div className="initiatives-section-bar initiatives-section-bar--related">
          <span>Another idea worth exploring</span>
          <Link className="initiatives-back-link" to="/initiatives"><ArrowLeft size={14} /> All initiatives</Link>
        </div>
        <ul className="initiatives-grid initiatives-grid--related" aria-label="More initiatives">
          {otherInitiatives.map((item) => (
            <li className="initiative-card-cell" key={item.slug}><InitiativeCard initiative={item} related /></li>
          ))}
          <li className="initiative-related-note">
            <span className="initiatives-eyebrow">One studio. A shared purpose.</span>
            <p>Good design starts<br />with giving a little back.</p>
            <Link to="/about">Meet BIZZJUMP <ArrowUpRight size={15} /></Link>
          </li>
        </ul>
      </article>
    </div>
  );
};
