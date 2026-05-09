import React, { useRef } from 'react';
import { ChatbotFullPage } from './components/ChatbotFullPage';
import './index.css';

// Arrow SVG
function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 10h12M10.5 5.5L16 10l-5.5 4.5" stroke="#9aa6b5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Link card component
function LinkCard({ href, icon, title, sub, variant = 'default' }) {
  const borderColors = {
    gold: 'rgba(200,162,91,0.62)',
    teal: 'rgba(36,95,103,0.55)',
    sage: 'rgba(111,138,120,0.55)',
    red: 'rgba(157,66,84,0.45)',
    default: '#e7e2d8',
  };
  const iconBgs = {
    gold: '#fff5df',
    teal: '#e7f3f4',
    sage: '#eef5f0',
    red: '#faedf0',
    default: '#f7f6f2',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline block transition-transform"
      style={{
        background: '#fff',
        border: `1px solid ${borderColors[variant] || borderColors.default}`,
        borderRadius: '18px',
        display: 'grid',
        gridTemplateColumns: '42px 1fr 22px',
        gap: '13px',
        alignItems: 'center',
        padding: '15px 16px',
        boxShadow: '0 10px 28px rgba(16,42,63,0.08)',
        transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#245f67';
        e.currentTarget.style.boxShadow = '0 14px 32px rgba(16,42,63,0.13)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = borderColors[variant] || borderColors.default;
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(16,42,63,0.08)';
      }}
    >
      <div
        className="flex items-center justify-center text-[18px]"
        style={{
          width: 40, height: 40, borderRadius: 14,
          background: iconBgs[variant] || iconBgs.default,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div className="font-black text-[16px] text-[#162d42] mb-[3px]">{title}</div>
        <div className="text-[12.5px] text-[#9aa6b5] font-bold leading-[1.38]">{sub}</div>
      </div>
      <Arrow />
    </a>
  );
}

// Primary CTA
function PrimaryCTA({ href, icon, title, sub, variant = 'gold' }) {
  const borderColor = variant === 'teal' ? '#245f67' : '#c8a25b';
  const iconBg = variant === 'teal' ? '#e7f3f4' : '#fff5df';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline block"
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr 24px',
        alignItems: 'center',
        gap: '14px',
        background: 'linear-gradient(135deg, #fff 0%, #fbfaf7 100%)',
        border: `2px solid ${borderColor}`,
        borderRadius: '22px',
        padding: '17px',
        boxShadow: '0 10px 28px rgba(16,42,63,0.08)',
        marginBottom: '12px',
        transition: 'transform 0.18s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ width: 40, height: 40, borderRadius: 14, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
        {icon}
      </div>
      <div>
        <div className="font-black text-[16px] text-[#162d42] mb-[3px]">{title}</div>
        <div className="text-[12.5px] text-[#9aa6b5] font-bold leading-[1.38]">{sub}</div>
      </div>
      <span style={{ color: '#9aa6b5', fontSize: 22 }}>→</span>
    </a>
  );
}

// Tile component
function Tile({ title, children, link, linkText }) {
  return (
    <div style={{ background: '#fbfaf7', border: '1px solid rgba(231,226,216,0.9)', borderRadius: 17, padding: 15 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 15, color: '#162d42' }}>{title}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.58, marginBottom: link ? 12 : 0, color: '#718095' }}>{children}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#245f67', fontWeight: 950, fontSize: 13, textDecoration: 'none' }}>
          {linkText} →
        </a>
      )}
    </div>
  );
}

// ServiceTile with tags
function ServiceTile({ title, children, tags }) {
  return (
    <div style={{ background: '#fbfaf7', border: '1px solid rgba(231,226,216,0.9)', borderRadius: 17, padding: 15 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 15, color: '#162d42' }}>{title}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.58, marginBottom: 12, color: '#718095' }}>{children}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {tags.map((tag, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              background: '#fff',
              border: '1px solid #e7e2d8',
              color: '#245f67',
              borderRadius: 999,
              padding: '6px 9px',
              fontSize: 11,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// Card section wrapper
function CardSection({ title, children, style }) {
  return (
    <section
      style={{
        background: 'rgba(255,255,255,0.94)',
        border: '1px solid #e7e2d8',
        borderRadius: 22,
        boxShadow: '0 10px 28px rgba(16,42,63,0.08)',
        padding: 22,
        marginBottom: 16,
        ...style
      }}
    >
      {title && <h2 style={{ margin: '0 0 12px', fontSize: 20, letterSpacing: '-0.03em', color: '#162d42' }}>{title}</h2>}
      {children}
    </section>
  );
}

// Divider
function DividerTitle({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      color: '#9aa6b5', textTransform: 'uppercase', letterSpacing: '0.18em',
      fontSize: 11, fontWeight: 950, margin: '26px 0 14px', justifyContent: 'center',
    }}>
      <div style={{ flex: 1, height: 1, background: '#e7e2d8' }} />
      {children}
      <div style={{ flex: 1, height: 1, background: '#e7e2d8' }} />
    </div>
  );
}

function App() {
  const assistantRef = useRef(null);
  const [heroLogoUrl, setHeroLogoUrl] = React.useState('');

  const scrollToAssistant = () => {
    const el = document.getElementById('ask-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        color: '#162d42',
        background:
          'radial-gradient(circle at 10% 0%, rgba(200,162,91,0.18), transparent 32%), radial-gradient(circle at 90% 4%, rgba(36,95,103,0.15), transparent 30%), linear-gradient(180deg, #f7f6f2 0%, #fbfaf7 48%, #f1efe9 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Top Art Banner */}
      <div
        aria-hidden="true"
        style={{
          minHeight: 256,
          background: 'linear-gradient(135deg, rgba(16,42,63,0.96), rgba(36,95,103,0.92)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 24%)',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '8px solid #fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.92)',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(48px, 8vw, 86px)',
            letterSpacing: '-0.03em',
            whiteSpace: 'nowrap',
            marginTop: 38,
          }}
        >
          Arokia Health
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.76)',
            fontSize: 12,
            letterSpacing: '0.18em',
            fontWeight: 800,
            borderTop: '1px solid rgba(255,255,255,0.42)',
            paddingTop: 18,
            marginTop: 18,
            whiteSpace: 'nowrap',
          }}
        >
          PRIVATE PSYCHIATRY · TRAUMA-INFORMED CARE · PROFESSIONAL WELLBEING
        </div>
      </div>

      {/* Main Page */}
      <main
        style={{
          width: '100%',
          padding: '0 18px 60px',
          marginTop: -90,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {/* Hero */}
          <header style={{ textAlign: 'center', marginBottom: 24 }}>
            {/* Logo */}
            <div
              aria-label="Arokia Health logo"
              style={{
                width: 168, height: 168, borderRadius: 999,
                border: '7px solid #fff',
                background: 'linear-gradient(135deg, #102a3f, #245f67)',
                boxShadow: '0 22px 50px rgba(16,42,63,0.12)',
                margin: '0 auto 18px',
                display: 'grid', placeItems: 'center',
                color: '#fff', overflow: 'hidden',
              }}
            >
              {heroLogoUrl ? (
                <img
                  src={heroLogoUrl}
                  alt="Arokia Health logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 62, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.08em' }}>
                  AH
                </span>
              )}
            </div>

            <h1 style={{ margin: '0 0 8px', fontSize: 'clamp(34px, 7vw, 50px)', lineHeight: 1.04, letterSpacing: '-0.05em', fontWeight: 950, color: '#162d42' }}>
              Ask Dr Arokia's Assistant
            </h1>

            <div style={{ fontSize: 13, color: '#9aa6b5', fontWeight: 850, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>
              Dr Arokia Antonysamy · Consultant Psychiatrist · Mental Health Innovator
            </div>

            <p style={{ fontSize: 16.5, lineHeight: 1.55, color: '#718095', maxWidth: 650, margin: '0 auto 16px' }}>
              A dedicated AI-powered front door for Arokia Health — helping people understand Dr Arokia's private consultation pathways, specialist interests, professional wellbeing support and the right next step.
            </p>

            <div
              style={{
                background: 'rgba(255,255,255,0.82)',
                border: '1px solid rgba(231,226,216,0.95)',
                borderRadius: 999,
                padding: '10px 15px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                color: '#245f67',
                fontSize: 13,
                fontWeight: 900,
                boxShadow: '0 10px 28px rgba(16,42,63,0.08)',
              }}
            >
              ✨ Transforming the helpless into user experts through compassionate, specialist psychiatry
            </div>

            {/* Badges */}
            <div
              aria-label="Trust badges"
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 }}
            >
              {[
                { label: 'Private Psychiatry', bg: '#e7f3f4', color: '#245f67' },
                { label: 'Trauma-Informed Care', bg: '#fff5df', color: '#8b651e' },
                { label: 'Perinatal · Bipolar · Addictions', bg: '#eef5f0', color: '#6f8a78' },
                { label: 'Educational only', bg: '#faedf0', color: '#9d4254' },
              ].map((b) => (
                <span
                  key={b.label}
                  style={{ padding: '8px 12px', borderRadius: 999, background: b.bg, color: b.color, fontSize: 12, fontWeight: 900, whiteSpace: 'nowrap' }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </header>

          {/* Chat Widget */}
          <ChatbotFullPage onSettingsLoaded={(settings) => { if (settings.logoUrl) setHeroLogoUrl(settings.logoUrl); }} />

          {/* Feature card CTAs */}
          <section
            style={{
              background: 'rgba(255,255,255,0.94)',
              border: '1px solid #e7e2d8',
              borderRadius: 30,
              boxShadow: '0 10px 28px rgba(16,42,63,0.08)',
              padding: 20,
              marginBottom: 20,
            }}
          >
            <PrimaryCTA
              href="https://drarokia.com/#contact"
              icon="📅"
              title="Request a Private Consultation"
              sub="Start the enquiry route for Arokia Health private psychiatry support."
              variant="gold"
            />
            <PrimaryCTA
              href="https://drarokia.com/"
              icon="🌐"
              title="Visit Dr Arokia's Website"
              sub="Learn more about her vision, expertise, media, services and leadership work."
              variant="teal"
            />
          </section>

          {/* Quick Links */}
          <DividerTitle>Quick Links</DividerTitle>

          <nav aria-label="Primary links" style={{ display: 'grid', gap: 11, marginBottom: 22 }}>
            <LinkCard href="https://drarokia.com/#contact" icon="📅" title="Book / Enquire for Consultation" sub="Private consultation enquiry through Arokia Health" variant="gold" />
            <LinkCard href="https://drarokia.com/" icon="👩‍⚕️" title="Arokia Health Website" sub="Vision, services, expertise and contact details" variant="teal" />
            <LinkCard href="https://www.bupa.co.uk/finder/consultant/details/dr_arokia_antonysamy" icon="🏥" title="Bupa Consultant Profile" sub="Face-to-face, video and telephone consultation profile" variant="sage" />
            <LinkCard href="https://uk.linkedin.com/in/arokia-antonysamy-b6701127" icon={<span style={{ fontWeight: 900, fontSize: 14 }}>in</span>} title="Connect on LinkedIn" sub="Mental health leadership, innovation, AI and professional updates" variant="teal" />
            <LinkCard href="https://www.instagram.com/dr.arokia/" icon="📷" title="Follow Dr Arokia on Instagram" sub="Personal, professional and public-facing updates" variant="red" />
          </nav>

          {/* Highlight Box */}
          <section
            style={{
              background: 'linear-gradient(135deg, rgba(16,42,63,0.97), rgba(36,95,103,0.93))',
              color: '#fff',
              borderRadius: 30,
              padding: 24,
              boxShadow: '0 22px 50px rgba(16,42,63,0.12)',
              marginBottom: 16,
            }}
          >
            <h2 style={{ margin: '0 0 10px', fontSize: 24, letterSpacing: '-0.03em' }}>
              Arokia Health can start with this page.
            </h2>
            <p style={{ margin: '0 0 16px', lineHeight: 1.65, color: 'rgba(255,255,255,0.9)' }}>
              This gives Dr Arokia one professional, shareable front door before building a full private practice website. The AI assistant helps visitors understand whether they need a consultation, professional burnout support, trauma-informed assessment, or a different signpost.
            </p>
            <a
              href="https://drarokia.com/#contact"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', color: '#245f67',
                padding: '12px 15px', borderRadius: 999,
                fontWeight: 950, fontSize: 13, textDecoration: 'none',
              }}
            >
              Request Consultation →
            </a>
          </section>

          {/* Choose Your Path */}
          <CardSection title="Choose Your Path">
            <div style={{ display: 'grid', gap: 11 }}>
              <Tile title="I want a private psychiatric consultation" link="https://drarokia.com/#contact" linkText="Start Consultation Enquiry">
                For adults seeking a specialist psychiatric assessment, formulation, review or next-step guidance through Arokia Health.
              </Tile>
              <Tile title="I am affected by trauma or relationship-based distress" link="https://drarokia.com/#contact" linkText="Ask About Trauma-Informed Support">
                For people experiencing trauma, complex PTSD themes, family guilt, grief, cultural conflict, relationship strain or persistent anxiety linked to life context.
              </Tile>
              <Tile title="I'm a professional dealing with burnout" link="https://drarokia.com/#contact" linkText="Enquire About Professional Support">
                For professionals experiencing exhaustion, loss of purpose, workplace stress, leadership pressure or return-to-work concerns.
              </Tile>
              <Tile title="I want to understand Dr Arokia's leadership and innovation work" link="https://uk.linkedin.com/in/arokia-antonysamy-b6701127" linkText="View LinkedIn Profile">
                For speaking, collaborations, AI and mental health innovation, public education, leadership and advisory conversations.
              </Tile>
            </div>
          </CardSection>

          {/* Areas Dr Arokia Can Support */}
          <CardSection title="Areas Dr Arokia Can Support">
            <div style={{ display: 'grid', gap: 11 }}>
              <ServiceTile title="PTSD & Trauma" tags={['PTSD', 'Complex PTSD', 'Workplace trauma']}>
                Trauma may appear as anxiety, relationship difficulty, emotional numbness, or physical pain without a clear medical cause. Dr Arokia has specialist interest in trauma-informed care.
              </ServiceTile>
              <ServiceTile title="Relationship-Based Distress" tags={['Family guilt', 'Grief', 'Cultural conflict']}>
                Support for guilt, grief, relational strain, family responsibility, cultural conflict and emotionally complex life situations that create genuine suffering.
              </ServiceTile>
              <ServiceTile title="Bipolar Disorder" tags={['Bipolar I & II', 'Mood stabilisation', 'Relapse prevention']}>
                Careful psychiatric assessment, mood history, medication review, risk evaluation, mood stabilisation and relapse prevention planning.
              </ServiceTile>
              <ServiceTile title="Substance Misuse & Addiction" tags={['Alcohol dependence', 'Prescription misuse', 'Dual diagnosis']}>
                Assessment for alcohol dependence, prescription misuse, substance misuse and dual diagnosis where addiction and mental health need to be understood together.
              </ServiceTile>
              <ServiceTile title="Perinatal Mental Health" tags={['Antenatal depression', 'Postnatal depression', 'Medication safety']}>
                Specialist support around mental health during pregnancy and the postnatal period, including antenatal and postnatal depression themes.
              </ServiceTile>
              <ServiceTile title="Burnout & Workplace Stress" tags={['Professional burnout', 'Executive mental health', 'Return to work']}>
                Assessment and support for professionals whose careers are affecting their mental health, from exhaustion to loss of purpose and return-to-work planning.
              </ServiceTile>
            </div>
          </CardSection>

          {/* Why This Page Matters */}
          <CardSection title="Why This Page Matters">
            <div style={{ display: 'grid', gap: 11 }}>
              <Tile title="One shareable private practice front door">
                Dr Arokia can share one page across LinkedIn, Instagram, WhatsApp, conferences, emails and referrals.
              </Tile>
              <Tile title="Safer signposting before consultation">
                The assistant explains what the page can and cannot do, routes urgent issues away, and guides appropriate visitors toward enquiry.
              </Tile>
              <Tile title="Lead generation before full website build">
                This page can validate demand for Arokia Health before committing to a larger private practice website.
              </Tile>
              <Tile title="Audience intelligence">
                Over 90 days, the dashboard can show what people ask about most: trauma, bipolar, addiction, perinatal health, burnout, consultation logistics or speaking.
              </Tile>
            </div>
          </CardSection>

          {/* 90-Day Launch Focus */}
          <CardSection title="Suggested 90-Day Launch Focus">
            <div style={{ display: 'grid', gap: 11 }}>
              <Tile title="Month 1 — Launch private consultation front door">
                Share the page through LinkedIn, Instagram, professional networks and direct referral conversations.
              </Tile>
              <Tile title="Month 2 — Learn patient and professional demand">
                Review assistant questions and CTA clicks to see which pathways generate the strongest interest.
              </Tile>
              <Tile title="Month 3 — Decide website and offer architecture">
                Use real visitor behaviour to decide what the full Arokia Health website should prioritise.
              </Tile>
            </div>
          </CardSection>

          {/* Positioning Statement */}
          <CardSection title="Positioning Statement">
            <p style={{ margin: 0, color: '#718095', fontSize: 14.5, lineHeight: 1.68 }}>
              <span style={{ borderLeft: '4px solid #c8a25b', paddingLeft: 14, display: 'block', fontStyle: 'italic' }}>
                Arokia Health exists for people who need a thoughtful, specialist psychiatric opinion — and for professionals who need mental health care that understands complexity, culture, relationships, trauma and the pressures of modern work.
              </span>
            </p>
          </CardSection>

          {/* Socials */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', margin: '26px 0 14px' }}>
            {[
              { label: 'Website', href: 'https://drarokia.com/' },
              { label: 'Consultation', href: 'https://drarokia.com/#contact' },
              { label: 'LinkedIn', href: 'https://uk.linkedin.com/in/arokia-antonysamy-b6701127' },
              { label: 'Instagram', href: 'https://www.instagram.com/dr.arokia/' },
              { label: 'Bupa', href: 'https://www.bupa.co.uk/finder/consultant/details/dr_arokia_antonysamy' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff',
                  border: '1px solid #e7e2d8',
                  color: '#718095',
                  borderRadius: 999,
                  padding: '9px 13px',
                  fontSize: 12,
                  fontWeight: 950,
                  boxShadow: '0 10px 28px rgba(16,42,63,0.08)',
                  textDecoration: 'none',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#245f67'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#718095'}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Footer */}
          <footer style={{ textAlign: 'center', color: '#9aa6b5', fontSize: 11.5, lineHeight: 1.7, paddingBottom: 8 }}>
            © Dr Arokia Antonysamy · Arokia Health · AI page by{' '}
            <strong style={{ color: '#245f67' }}>NeuraScaleX</strong>
            <br />
            Educational information only. Not a substitute for professional advice, diagnosis, treatment, medication advice or crisis support. Clinical care should always be accessed through the appropriate clinical provider, emergency route or booking pathway.
            <br />
            askarokia.neurascalex.com
          </footer>
        </div>
      </main>

      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={scrollToAssistant}
        aria-label="Find my next step with Dr Arokia's assistant"
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          zIndex: 50,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'linear-gradient(135deg, #102a3f, #245f67)',
          color: '#fff',
          border: '2px solid rgba(255,255,255,0.9)',
          borderRadius: 999,
          padding: '13px 17px',
          boxShadow: '0 18px 36px rgba(16,42,63,0.24)',
          fontSize: 14,
          fontWeight: 950,
          cursor: 'pointer',
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 22px 44px rgba(16,42,63,0.28)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 18px 36px rgba(16,42,63,0.24)';
        }}
      >
        <span
          style={{
            width: 30, height: 30, borderRadius: 999,
            display: 'grid', placeItems: 'center',
            background: '#c8a25b',
            color: '#fff', fontSize: 15, flexShrink: 0,
          }}
        >
          💬
        </span>
        <span style={{ whiteSpace: 'nowrap' }}>Find My Next Step</span>
      </button>
    </div>
  );
}

export default App;
