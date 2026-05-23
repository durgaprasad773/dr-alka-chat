import React from 'react';
import { ChatbotFullPage } from './components/ChatbotFullPage';
import './index.css';

// Arrow SVG
function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 10h12M10.5 5.5L16 10l-5.5 4.5" stroke="#9aa6b5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Link card component
function LinkCard({ href, icon, title, sub, variant = 'default' }) {
  const borderColors = {
    gold: 'rgba(215,178,106,0.55)',
    sage: 'rgba(96,115,90,0.55)',
    plum: 'rgba(143,71,107,0.45)',
    default: 'rgba(215,178,106,0.28)',
  };
  const iconBgs = {
    gold: '#fff5df',
    sage: '#eef5f0',
    plum: '#f9eef4',
    default: '#fffdf8',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: '#fff',
        border: `1px solid ${borderColors[variant] || borderColors.default}`,
        borderRadius: 18,
        display: 'grid',
        gridTemplateColumns: '42px 1fr 22px',
        gap: 13,
        alignItems: 'center',
        padding: '15px 16px',
        boxShadow: '0 12px 30px rgba(6,14,10,.12)',
        textDecoration: 'none',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(6,14,10,.18)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(6,14,10,.12)';
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 13, background: iconBgs[variant] || iconBgs.default, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, color: '#755019', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 950, fontSize: 15, color: '#172019', marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: '#8a8174', fontWeight: 720, lineHeight: 1.38 }}>{sub}</div>
      </div>
      <Arrow />
    </a>
  );
}

// Primary CTA
function PrimaryCTA({ href, icon, title, sub, variant = 'gold' }) {
  const borderMap = { gold: '#d7b26a', sage: '#60735a', plum: '#8f476b' };
  const iconBgMap = { gold: '#fff5df', sage: '#eef5f0', plum: '#f9eef4' };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr 24px',
        alignItems: 'center',
        gap: 14,
        background: '#fff',
        border: `2px solid ${borderMap[variant] || borderMap.gold}`,
        borderRadius: 22,
        padding: 17,
        boxShadow: '0 12px 30px rgba(6,14,10,.12)',
        marginBottom: 12,
        textDecoration: 'none',
        transition: 'transform 0.18s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{ width: 40, height: 40, borderRadius: 13, background: iconBgMap[variant] || iconBgMap.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 950, fontSize: 16, color: '#172019', marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: '#8a8174', fontWeight: 720, lineHeight: 1.38 }}>{sub}</div>
      </div>
      <span style={{ color: '#b09b72', fontSize: 20 }}>&#8594;</span>
    </a>
  );
}

// Tile component
function Tile({ title, children, link, linkText }) {
  return (
    <div style={{ background: '#fffdf8', border: '1px solid rgba(215,178,106,.26)', borderRadius: 17, padding: 15 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 15, color: '#172019' }}>{title}</h3>
      <p style={{ fontSize: 13.4, lineHeight: 1.58, marginBottom: link ? 10 : 0, color: '#6f746d', margin: link ? '0 0 10px' : 0 }}>{children}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#755019', fontWeight: 950, fontSize: 13, textDecoration: 'none' }}>
          {linkText} &#8594;
        </a>
      )}
    </div>
  );
}

// ServiceTile with tags
function ServiceTile({ title, children, tags }) {
  return (
    <div style={{ background: '#fffdf8', border: '1px solid rgba(215,178,106,.26)', borderRadius: 17, padding: 15 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 15, color: '#172019' }}>{title}</h3>
      <p style={{ fontSize: 13.4, lineHeight: 1.58, margin: '0 0 12px', color: '#6f746d' }}>{children}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {tags.map((tag, i) => (
          <span key={i} style={{ background: '#fff3d2', border: '1px solid rgba(215,178,106,.35)', color: '#755019', borderRadius: 999, padding: '6px 9px', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// Card section wrapper
function CardSection({ title, children, style, id }) {
  return (
    <section
      id={id}
      style={{
        background: 'rgba(255,250,240,.96)',
        border: '1px solid rgba(215,178,106,.28)',
        borderRadius: 22,
        boxShadow: '0 12px 30px rgba(6,14,10,.12)',
        padding: 22,
        marginBottom: 16,
        scrollMarginTop: 18,
        ...style,
      }}
    >
      {title && <h2 style={{ margin: '0 0 12px', fontSize: 20, letterSpacing: '-0.03em', color: '#172019', fontFamily: 'Georgia, "Times New Roman", serif' }}>{title}</h2>}
      {children}
    </section>
  );
}

// Divider
function DividerTitle({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      color: '#9d927f', textTransform: 'uppercase', letterSpacing: '0.18em',
      fontSize: 11, fontWeight: 950, margin: '28px 0 14px', justifyContent: 'center',
    }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(215,178,106,.32)' }} />
      {children}
      <div style={{ flex: 1, height: 1, background: 'rgba(215,178,106,.32)' }} />
    </div>
  );
}

function App() {
  const [heroLogoUrl, setHeroLogoUrl] = React.useState('');

  const scrollToAssistant = () => {
    const el = document.getElementById('ask-assistant');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        color: '#172019',
        background:
          'radial-gradient(circle at 20% 0%, rgba(215,178,106,.22), transparent 28%), radial-gradient(circle at 90% 8%, rgba(143,71,107,.26), transparent 30%), linear-gradient(180deg, #0f1c16 0%, #192a21 38%, #f6f1e8 38%, #fbf7ef 100%)',
        minHeight: '100vh',
      }}
    >
      <main style={{ padding: '34px 14px 60px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {/* Hero */}
          <header style={{ textAlign: 'center', color: '#fffaf0', padding: '8px 0 28px' }}>

            {/* Hero photo */}
            <div style={{
              width: 118, height: 118,
              margin: '0 auto 14px',
              borderRadius: 999,
              overflow: 'hidden',
              border: '3px solid rgba(255,250,240,.82)',
              boxShadow: '0 24px 70px rgba(6,14,10,.22)',
              background: '#fff',
            }}>
              {heroLogoUrl ? (
                <img src={heroLogoUrl} alt="Dr Alka Patel" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #60735a, #52283c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 36, color: '#fff', fontWeight: 900 }}>AP</span>
                </div>
              )}
            </div>

            {/* Brand — "The Million Hour Method" */}
            <div style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(34px, 7vw, 52px)',
              lineHeight: 1.05,
              letterSpacing: '-0.045em',
              margin: '0 0 8px',
              color: '#f8e3aa',
            }}>
              The Million <span style={{ color: '#fff', fontStyle: 'italic', fontWeight: 400 }}>Hour</span> Method
            </div>

            {/* Eyebrow */}
            <div style={{
              textTransform: 'uppercase',
              letterSpacing: '0.20em',
              fontSize: 11,
              fontWeight: 900,
              color: 'rgba(255,250,240,.78)',
              marginBottom: 16,
              lineHeight: 1.6,
            }}>
              Longevity &middot; Biohacking &middot; Precision Health &middot; Human Performance
            </div>

            {/* Main title */}
            <h1 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(40px, 8vw, 66px)',
              lineHeight: 0.96,
              letterSpacing: '-0.055em',
              margin: '16px 0 12px',
              color: '#fffaf0',
              fontWeight: 900,
              textShadow: '0 12px 38px rgba(0,0,0,.18)',
            }}>
              Ask Dr Alka
            </h1>

            <p style={{ margin: '0 auto', color: 'rgba(255,250,240,.86)', fontSize: 16, lineHeight: 1.6, maxWidth: 620 }}>
              A guided first conversation for longevity optimisers exploring The Million Hour Club, biological age testing, 10 Years Younger, private consultations, speaking enquiries and the next intelligent step.
            </p>

            {/* Mission pill */}
            <div style={{
              margin: '16px auto 0',
              maxWidth: 610,
              background: 'rgba(255,250,240,.11)',
              border: '1px solid rgba(255,250,240,.18)',
              borderRadius: 999,
              padding: '11px 16px',
              color: '#fff5dc',
              fontSize: 13,
              fontWeight: 850,
              lineHeight: 1.45,
            }}>
              Ask questions, understand your options, and choose the right next step — without guesswork.
            </div>

            {/* Trust strip */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, margin: '13px auto 0', maxWidth: 640 }}>
              {['Doctor-led longevity', 'Biological Age Testing', 'Application-only Club', 'As seen on ITV'].map((label) => (
                <span key={label} style={{
                  background: 'rgba(255,250,240,.95)',
                  color: '#755019',
                  border: '1px solid rgba(215,178,106,.45)',
                  borderRadius: 999,
                  padding: '7px 11px',
                  fontSize: 11,
                  fontWeight: 950,
                  boxShadow: '0 12px 30px rgba(6,14,10,.12)',
                }}>
                  {label}
                </span>
              ))}
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {['Million Hour Club', 'Biological Age', 'Precision Longevity', 'Private Consultations', 'Educational only'].map((label) => (
                <span key={label} style={{
                  background: 'rgba(255,250,240,.96)',
                  color: '#52283c',
                  border: '1px solid rgba(215,178,106,.40)',
                  borderRadius: 999,
                  padding: '7px 12px',
                  fontSize: 11,
                  fontWeight: 950,
                  boxShadow: '0 12px 30px rgba(6,14,10,.12)',
                }}>
                  {label}
                </span>
              ))}
            </div>
          </header>

          {/* Chat Widget */}
          <div id="ask-assistant" style={{ scrollMarginTop: 20 }}>
            <ChatbotFullPage onSettingsLoaded={(settings) => { if (settings?.logoUrl) setHeroLogoUrl(settings.logoUrl); }} />
          </div>

          {/* Primary CTAs */}
          <section style={{
            background: 'rgba(255,250,240,.96)',
            border: '1px solid rgba(215,178,106,.35)',
            borderRadius: 32,
            boxShadow: '0 24px 70px rgba(6,14,10,.22)',
            padding: 20,
            marginBottom: 20,
          }}>
            <PrimaryCTA href="https://www.dralkapatel.com/million-hour-club" icon="&#x23F3;" title="Apply to The Million Hour Club" sub="Premium membership by application, recommendation or invitation." variant="gold" />
            <PrimaryCTA href="https://www.dralkapatel.com/contact" icon="&#x1FA7A;" title="Book a Private Consultation" sub="Discuss health goals, suitability, testing and whether the Club is the right next step." variant="sage" />
            <PrimaryCTA href="https://www.dralkapatel.com/ten-years-younger" icon="&#x1F52C;" title="Explore 10 Years Younger" sub="A precision plan to optimise biomarkers, youthspan and vitality." variant="plum" />
          </section>

          {/* Quick Links */}
          <DividerTitle>Quick Links</DividerTitle>

          <nav style={{ display: 'grid', gap: 11, marginBottom: 22 }}>
            <LinkCard href="https://www.dralkapatel.com/million-hour-club" icon="&#x1F3C6;" title="Million Hour Club" sub="Premium longevity membership and community" variant="gold" />
            <LinkCard href="https://www.dralkapatel.com/articles" icon="&#x1F9E0;" title="Longevity Articles" sub="Biohacking, testing and health optimisation insights" variant="sage" />
            <LinkCard href="https://www.dralkapatel.com/biologicalage" icon="&#x1F9EC;" title="Biological Age Test" sub="Understand your biological age and where to focus next" variant="gold" />
            <LinkCard href="https://www.dralkapatel.com/watch-this" icon="&#x25B6;" title="Watch Younger By The Hour" sub="On-demand longevity presentation and private consultation route" variant="sage" />
            <LinkCard href="https://www.dralkapatel.com/about-dr-alka-patel" icon="&#x1F469;&#x200D;&#x2695;&#xFE0F;" title="About Dr Alka" sub="The Million Hour Doctor and founder profile" variant="default" />
            <LinkCard href="https://www.dralkapatel.com/media-and-press" icon="&#x1F399;&#xFE0F;" title="Media &amp; Press" sub="Authority, visibility and press enquiries" variant="default" />
            <LinkCard href="https://www.dralkapatel.com/public-speaking" icon="&#x1F3A4;" title="Public Speaking" sub="Longevity and lifestyle medicine talks" variant="default" />
            <LinkCard href="https://www.linkedin.com/in/dr-alka-patel-uk-81264954/" icon="in" title="Connect on LinkedIn" sub="Professional updates, longevity insights and speaking authority" variant="default" />
            <LinkCard href="https://www.instagram.com/dralkapateluk/" icon="&#x1F4F7;" title="Follow on Instagram" sub="Daily visibility, longevity content and community touchpoints" variant="default" />
          </nav>

          {/* Highlight Box */}
          <section style={{
            background: 'linear-gradient(135deg, #17251d, #4d2738 74%)',
            border: '1px solid rgba(215,178,106,.38)',
            borderRadius: 32,
            padding: 22,
            color: '#fffaf0',
            boxShadow: '0 24px 70px rgba(6,14,10,.22)',
            marginBottom: 16,
          }}>
            <h2 style={{ margin: '0 0 10px', fontFamily: 'Georgia, serif', fontSize: 24, letterSpacing: '-0.03em' }}>
              For people who want precision, not guesswork.
            </h2>
            <p style={{ margin: '0 0 14px', color: 'rgba(255,250,240,.83)', lineHeight: 1.65, fontSize: 14 }}>
              Ask Dr Alka helps serious health optimisers move from curiosity to the right pathway &#8212; Club application, biological age testing, private consultation, 10 Years Younger, speaking, partnership or the Million Hour Memo.
            </p>
            <a href="#ask-assistant" style={{ display: 'inline-flex', background: '#fffaf0', color: '#7d571a', borderRadius: 999, padding: '11px 14px', fontSize: 13, fontWeight: 950, textDecoration: 'none' }}>
              Ask First &#8594;
            </a>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
              {[{ b: '114', label: 'healthy years concept and testing rhythm' }, { b: '15k+', label: 'longevity audience already in motion' }, { b: '24/7', label: 'guided first conversation' }].map((m) => (
                <div key={m.b} style={{ background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 16, padding: 12 }}>
                  <b style={{ display: 'block', fontSize: 24, color: '#fff', marginBottom: 4 }}>{m.b}</b>
                  <span style={{ display: 'block', color: 'rgba(255,250,240,.72)', fontSize: 11, lineHeight: 1.3, fontWeight: 750 }}>{m.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Choose Your Path */}
          <CardSection title="Choose Your Path">
            <div style={{ display: 'grid', gap: 11 }}>
              <Tile title="I want to understand my biological age" link="https://www.dralkapatel.com/million-hour-club" linkText="Explore biological age pathway">
                Understand how biological age testing, biomarker tracking and repeat measurement can turn curiosity into clear action.
              </Tile>
              <Tile title="I'm interested in The Million Hour Club" link="https://www.dralkapatel.com/million-hour-club" linkText="Apply to The Million Hour Club">
                Learn what The Million Hour Club includes, who it is for, and whether application is the right next step.
              </Tile>
              <Tile title="I want personalised guidance first" link="https://www.dralkapatel.com/contact" linkText="Book a private consultation">
                For people who want to discuss health goals, suitability, testing and next steps before joining or applying.
              </Tile>
              <Tile title="I want Dr Alka to speak, advise or partner" link="https://www.dralkapatel.com/public-speaking" linkText="Explore speaking enquiries">
                Route event organisers, media teams, health-tech brands and corporate partners to the correct professional pathway.
              </Tile>
            </div>
          </CardSection>

          {/* What Ask Dr Alka Can Help With */}
          <CardSection title="What Ask Dr Alka Can Help With">
            <div style={{ display: 'grid', gap: 11 }}>
              <ServiceTile title="The Million Hour Club" tags={['Application', 'Premium membership', 'Community']}>
                Application, premium membership, core membership, community support, live sessions, testing rhythm and member exclusives.
              </ServiceTile>
              <ServiceTile title="Biomarkers &amp; Biological Age" tags={['Biological age', '114-day testing', 'Biomarkers']}>
                General education around biological age, testing timelines, 114-day checks, biomarkers and how data informs action.
              </ServiceTile>
              <ServiceTile title="Advanced Diagnostics" tags={['Metabolic', 'Brain', 'Heart health', 'Gut', 'Hormones']}>
                Signposting around metabolic, brain, energetic, heart, gut, mitochondrial, liver and hormone-health pathways.
              </ServiceTile>
              <ServiceTile title="Content, Speaking &amp; Press" tags={['Speaking', 'Media', 'Podcasts', 'Press']}>
                Route curiosity from TV, talks, podcasts, articles, media and social content into the correct next step.
              </ServiceTile>
            </div>
          </CardSection>

          {/* Intelligence Layer */}
          <CardSection title="The Intelligence Layer Behind Ask Dr Alka">
            <p style={{ margin: '0 0 12px', color: '#6f746d', fontSize: 14, lineHeight: 1.68 }}>
              Behind the page, NeuraScaleX can track what visitors ask, which pathway they choose, and whether they are leaning towards membership, consultation, testing, speaking, newsletter or partnership.
            </p>
            <div style={{ display: 'grid', gap: 11 }}>
              <Tile title="Audience intent">
                Identify whether visitors are asking about price, suitability, tests, time commitment, application, results or private consultations.
              </Tile>
              <Tile title="CTA routing">
                Guide each visitor to the highest-value next step instead of leaving them to navigate multiple pages alone.
              </Tile>
              <Tile title="90-day learning loop">
                Turn real questions into content topics, FAQ improvements, conversion insights and better membership positioning.
              </Tile>
            </div>
          </CardSection>

          {/* Footer Socials */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', margin: '26px 0 14px' }}>
            {[
              { label: 'Million Hour Club', href: 'https://www.dralkapatel.com/million-hour-club' },
              { label: 'Consultation', href: 'https://www.dralkapatel.com/contact' },
              { label: 'Biological Age', href: 'https://www.dralkapatel.com/biologicalage' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dr-alka-patel-uk-81264954/' },
              { label: 'Instagram', href: 'https://www.instagram.com/dralkapateluk/' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ background: 'rgba(255,250,240,.96)', border: '1px solid rgba(215,178,106,.28)', color: '#9d927f', borderRadius: 999, padding: '9px 13px', fontSize: 12, fontWeight: 950, boxShadow: '0 12px 30px rgba(6,14,10,.12)', textDecoration: 'none', transition: 'color 0.18s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#755019')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9d927f')}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Footer */}
          <footer style={{ textAlign: 'center', color: '#9d927f', fontSize: 11.5, lineHeight: 1.65, paddingBottom: 8 }}>
            Ask Dr Alka page by{' '}
            <strong style={{ color: '#755019' }}>
              <a href="https://neurascalex.com" target="_blank" rel="noopener noreferrer" style={{ color: '#755019', textDecoration: 'none' }}>NeuraScaleX</a>
            </strong>
            {' '}&middot; askalka.neurascalex.com
            <br />
            Educational signposting only. Not medical advice, diagnosis, treatment, prescribing or emergency support.
          </footer>

        </div>
      </main>

      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={scrollToAssistant}
        aria-label="Ask Dr Alka"
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          zIndex: 50,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'linear-gradient(135deg, #d7b26a, #8f476b)',
          color: '#fff',
          border: '2px solid rgba(255,255,255,.9)',
          borderRadius: 999,
          padding: '13px 17px',
          boxShadow: '0 18px 36px rgba(16,42,63,.24)',
          fontSize: 14,
          fontWeight: 950,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 22px 44px rgba(16,42,63,.28)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 18px 36px rgba(16,42,63,.24)';
        }}
      >
        &#x1F4AC; Ask Dr Alka
      </button>
    </div>
  );
}

export default App;
