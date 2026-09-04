import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, Route, Router, Switch, useLocation } from 'wouter';
import {
  Activity,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Bell,
  Battery,
  Check,
  ChevronDown,
  CircleAlert,
  Cloud,
  Droplets,
  Gauge,
  RadioTower,
  ShieldAlert,
  ShieldCheck,
  Wifi,
  Factory,
  HardHat,
  HeartPulse,
  LockKeyhole,
  MapPin,
  Mountain,
  Radio,
  Search,
  Signal,
  Truck,
  UserRound,
  UsersRound,
  Waves,
  X,
} from 'lucide-react';

// EDITABLE BRAND / CONTENT CONSTANTS
const BRAND = { name: 'WorkSense', tagline: 'Safety You Can Sense.' };
const INDUSTRIES = [
  { name: 'Construction', code: '01', icon: HardHat, copy: 'Keep every crew visible when the site changes faster than the plan.', tags: ['Heat load', 'Impact', 'Fall risk'] },
  { name: 'Mining', code: '02', icon: Mountain, copy: 'Make the invisible hazards of deep work visible, shift by shift.', tags: ['Gas exposure', 'Fatigue', 'Location'] },
  { name: 'Chemical', code: '03', icon: Waves, copy: 'An early signal for environments where seconds change outcomes.', tags: ['VOC exposure', 'Temperature', 'Evacuation'] },
  { name: 'Manufacturing', code: '04', icon: Factory, copy: 'Understand the human rhythm around every moving line and machine.', tags: ['Ergonomics', 'Impact', 'Near miss'] },
  { name: 'Ports', code: '05', icon: Truck, copy: 'Coordinate people and heavy equipment across a living yard.', tags: ['Proximity', 'Fatigue', 'Zone safety'] },
  { name: 'Oil & Gas', code: '06', icon: Signal, copy: 'Confidence for high-consequence work, from wellhead to turnaround.', tags: ['Gas exposure', 'Heart rate', 'Man down'] },
];

function BrandMark({ footer = false }: { footer?: boolean }) {
  return (
    <img
      src={footer ? '/images/worksense-logo.png' : '/images/worksense-logo-header.png'}
      alt="WorkSense — Sense what you can sense"
      className="ws-logo"
      data-testid="img-worksense-logo"
    />
  );
}

function LandingHeader() {
  return (
    <header className="ws-header">
      <div className="ws-container ws-header-inner">
        <Link href="/" aria-label="WorkSense home" data-testid="link-home">
          <BrandMark />
        </Link>
        <nav className="ws-nav" aria-label="Main navigation">
          <a href="#how-it-works" data-testid="link-how-it-works">How It Works</a>
          <a href="#pricing" data-testid="link-pricing">Pricing</a>
          <a href="#pilot" data-testid="link-pilot-program">Pilot Program</a>
          <div className="ws-header-socials" aria-label="Social links">
            <a href="https://www.facebook.com/share/1Ektkab1bB/" target="_blank" rel="noreferrer" className="ws-social-link" aria-label="Facebook" data-testid="link-facebook"><i className="fa-brands fa-facebook" aria-hidden="true" /></a>
            <a href="https://www.instagram.com/worksense_official" target="_blank" rel="noreferrer" className="ws-social-link" aria-label="Instagram" data-testid="link-instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/work-sense-61b010434" target="_blank" rel="noopener noreferrer" className="ws-social-link" aria-label="LinkedIn" data-testid="link-linkedin"><i className="fa-brands fa-linkedin" aria-hidden="true" /></a>
          </div>
          <Link href="/dashboard" className="ws-login-link" data-testid="link-business-login">Business Login <ArrowRight size={14} /></Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [rotation, setRotation] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const top = heroRef.current?.getBoundingClientRect().top || 0;
        const height = heroRef.current?.clientHeight || window.innerHeight;
        setRotation(Math.max(-20, Math.min(20, (-top / height) * 40)));
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  return (
    <section className="ws-hero" ref={heroRef} aria-labelledby="hero-title">
      <LandingHeader />
      <div className="ws-container ws-hero-content">
        <div className="ws-reveal">
          <div className="ws-eyebrow" style={{ color: 'var(--brand-green)' }}>Workplace signal / 01</div>
          <h1 id="hero-title" className="ws-display">The workplace safety wearable device that <em>alerts before accidents happen.</em></h1>
          <p className="ws-hero-copy">WorkSense helps teams sense changing risk in real time — without asking workers to stare at a screen.</p>
          <div className="ws-hero-actions">
            <a href="#pilot" className="ws-btn ws-btn-primary" data-testid="button-start-pilot">Start Your 30-Day Pilot <ArrowRight size={16} /></a>
            <a href="#how-it-works" className="ws-btn ws-btn-ghost" data-testid="button-see-how-it-works">See How It Works <ArrowDownRight size={16} /></a>
          </div>
          <div className="ws-hero-note"><i className="ws-live-dot" /> Real-time monitoring. Human-first response.</div>
        </div>
        <div className="ws-product-stage ws-reveal ws-delay-2" aria-label="WorkSense safety band product preview">
          <img
            src="/images/band-hero.png"
            alt="WorkSense black safety band with green status light"
            className="ws-product-image"
            style={{ transform: `rotate(${rotation}deg)` }}
            data-testid="img-product-band"
          />
          <div className="ws-product-tag"><strong>DEVICE / WS-01</strong>Built for the shift.</div>
        </div>
      </div>
      <div className="ws-scroll-cue"><span>Scroll to sense</span><i className="ws-scroll-line" /></div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="ws-section ws-light-section">
      <div className="ws-container ws-intro-grid">
        <div>
          <div className="ws-eyebrow">The signal gets lost</div>
          <h2 className="ws-display">Risk changes<br />by the minute.</h2>
        </div>
        <div className="ws-intro-text">
          <p>On a busy site, a supervisor can’t be everywhere. A worker shouldn’t have to choose between stopping the job and pushing through a warning sign.</p>
          <p>WorkSense closes that gap with a wearable signal workers trust and a command view managers can act on.</p>
          <div className="ws-stat-strip">
            <div className="ws-stat"><strong>24 / 7</strong><span>quiet coverage across every shift</span></div>
            <div className="ws-stat"><strong>&lt; 1 sec</strong><span>from sensor event to alert</span></div>
            <div className="ws-stat"><strong>01 view</strong><span>for the whole operation</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanProblemSection() {
  return (
    <section className="ws-section ws-problem">
      <div className="ws-container ws-problem-layout">
        <div>
          <div className="ws-eyebrow">For workers + companies</div>
          <h2 className="ws-display">Two sides of the same promise.</h2>
          <p className="ws-problem-copy">Protection only works when it respects the person wearing it — and gives the people responsible for them enough context to respond.</p>
        </div>
        <div className="ws-split-cards">
          <div className="ws-split-card">
            <div className="icon-ring"><UserRound size={16} /></div>
            <h3>For workers</h3>
            <p>A quiet, instant vibration when your body or environment needs your attention.</p>
          </div>
          <div className="ws-split-card accent">
            <div className="icon-ring"><UsersRound size={16} /></div>
            <h3>For companies</h3>
            <p>A live operational picture that turns scattered signals into a calm next step.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="ws-section ws-system" id="how-it-works">
      <div className="ws-container">
        <div className="ws-system-head">
          <div><div className="ws-eyebrow">A simple language for complex work</div><h2 className="ws-display">See it.<br />Feel it.<br />Respond.</h2></div>
          <p className="ws-system-lede">One visual code from wrist to command center. No alarm fatigue. No dashboard archaeology. Just a signal with a clear meaning.</p>
        </div>
        <div className="ws-system-flow">
          <div className="ws-flow-item"><div className="ws-flow-number">01 / MONITOR</div><h3>Sense</h3><p>Biometrics and environmental readings are continuously measured without interrupting the job.</p></div>
          <div className="ws-flow-arrow" aria-hidden="true" />
          <div className="ws-flow-item"><div className="ws-flow-number">02 / CLASSIFY</div><h3>Understand</h3><p>Signals become a three-level risk status that anyone on the team can read at a glance.</p></div>
          <div className="ws-flow-arrow" aria-hidden="true" />
          <div className="ws-flow-item"><div className="ws-flow-number">03 / ACT</div><h3>Respond</h3><p>The right person gets the right alert — with enough context to move, not panic.</p></div>
        </div>
      </div>
    </section>
  );
}

function AlertSection() {
  return (
    <section className="ws-section ws-alert">
      <div className="ws-container ws-alert-layout">
        <div>
          <div className="ws-eyebrow">The band speaks first</div>
          <h2 className="ws-display">A vibration is<br />worth a thousand alarms.</h2>
          <p className="ws-alert-copy">When the risk is personal, the first message should be personal too. Discreet haptics give workers a moment to pause before a manager has to intervene.</p>
        </div>
        <div className="ws-device-card" aria-label="Illustration of a WorkSense device alert">
          <div className="ws-device-top"><span>WS-01 / LIVE SIGNAL</span><span>14:32:08</span></div>
          <div className="ws-wave">
            <svg viewBox="0 0 500 100" role="img" aria-label="Alert pulse waveform">
              <path d="M0 50 H130 L142 50 L151 29 L162 72 L176 50 H238 L247 49 L257 17 L271 84 L284 50 H500" fill="none" stroke="#22C55E" strokeWidth="3" />
              <path d="M0 50 H500" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" strokeDasharray="3 8" />
            </svg>
          </div>
          <div className="ws-alert-message"><i className="ws-alert-icon" /> elevated heat load / pause and hydrate</div>
        </div>
      </div>
    </section>
  );
}

function FeatureCoverage() {
  const features = [
    { icon: HeartPulse, title: 'Vitals', text: 'Heart rate, exertion and fatigue patterns in one readable signal.' },
    { icon: Activity, title: 'Environment', text: 'Temperature, air quality and exposure readings around the worker.' },
    { icon: MapPin, title: 'Location', text: 'Zone-aware context without turning people into dots on a map.' },
    { icon: Bell, title: 'Escalation', text: 'Clear alert paths that keep response close to the work.' },
  ];
  return (
    <section className="ws-section ws-features">
      <div className="ws-container">
        <div className="ws-eyebrow">What the system watches</div>
        <h2 className="ws-display">Coverage without<br />the clutter.</h2>
        <div className="ws-feature-grid">
          {features.map(({ icon: Icon, title, text }) => <div className="ws-feature" key={title}><Icon size={19} strokeWidth={1.7} /><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function IndustrySection() {
  const [selected, setSelected] = useState(0);
  const industry = INDUSTRIES[selected];
  const Icon = industry.icon;
  return (
    <section className="ws-section ws-industries" id="industries">
      <div className="ws-container ws-industry-layout">
        <div>
          <div className="ws-eyebrow">One system, your context</div>
          <h2 className="ws-display">Made for<br />where work happens.</h2>
          <div className="ws-industry-tabs" role="tablist" aria-label="Industries">
            {INDUSTRIES.map((item, index) => <button key={item.name} role="tab" aria-selected={selected === index} className={`ws-industry-tab ${selected === index ? 'active' : ''}`} onClick={() => setSelected(index)} data-testid={`button-industry-${item.name.toLowerCase().replaceAll(' ', '-')}`}>{item.name}</button>)}
          </div>
        </div>
        <div className="ws-industry-panel" data-code={industry.code} key={industry.name}>
          <Icon size={25} color="var(--brand-green)" strokeWidth={1.5} />
          <h3>{industry.name}</h3>
          <p>{industry.copy}</p>
          <div className="ws-module-tags">{industry.tags.map(tag => <span className="ws-module-tag" key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="ws-section ws-pricing" id="pricing">
      <div className="ws-container">
        <div className="ws-pricing-head"><div><div className="ws-eyebrow">Straightforward by design</div><h2 className="ws-display">Safety scales<br />with the shift.</h2></div><p>Start with the people and zones that need a clearer signal. Add coverage as your operation grows.</p></div>
        <div className="ws-price-card">
          <div><div className="ws-price-label">WorkSense core</div><h3>Signal, not surveillance.</h3><p>Hardware, live monitoring and the response layer in one focused platform.</p></div>
          <div className="ws-price-value"><strong>$18</strong><span>per worker / month</span></div>
          <Link href="/dashboard" className="ws-btn ws-btn-primary" data-testid="button-pricing-demo">See the live demo <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ws-footer">
      <div className="ws-container">
        <div className="ws-footer-main">
          <div className="ws-footer-brand">
            <BrandMark footer />
            <p>Safety You Can Sense.<br />Real-time safety intelligence for people doing difficult work.</p>
            <span className="ws-contact">Contact: pilot@worksense.demo</span>{/* EDIT CONTACT PLACEHOLDER ABOVE before launch. */}
          </div>
          <div className="ws-footer-links">
            <div><span>Explore</span><a href="#how-it-works">How It Works</a><a href="#industries">Industries</a><a href="#pricing">Pricing</a><a href="#pilot">Pilot Program</a></div>
            <div><span>Connect</span><Link href="/dashboard">Business Login</Link><div className="ws-footer-socials" aria-label="Social links">
              <a href="https://www.facebook.com/share/1Ektkab1bB/" target="_blank" rel="noreferrer" className="ws-social-link" aria-label="Facebook"><i className="fa-brands fa-facebook" aria-hidden="true" /></a>
              <a href="https://www.instagram.com/worksense_official" target="_blank" rel="noreferrer" className="ws-social-link" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/in/work-sense-61b010434" target="_blank" rel="noopener noreferrer" className="ws-social-link" aria-label="LinkedIn"><i className="fa-brands fa-linkedin" aria-hidden="true" /></a>
            </div></div>
          </div>
        </div>
        <div className="ws-footer-bottom"><span>© 2026 WorkSense Systems</span><a href="#hero-title">Back to top ↑</a></div>
      </div>
    </footer>
  );
}

// AIDA landing experience. Content, prices, links, and contact details below are intentionally easy to edit.
const AIDA_INDUSTRIES = [
  { name: 'Construction', icon: 'helmet', copy: 'Keep every crew visible when the site changes faster than the plan.', tags: ['Temperature / heat monitoring', 'Physical strain', 'Environmental conditions', 'Fall / immobility detection'] },
  { name: 'Mining', icon: 'pickaxe', copy: 'Make the invisible hazards of deep work visible, shift by shift.', tags: ['Gas detection', 'Air quality', 'Temperature', 'Location / proximity', 'Emergency features'] },
  { name: 'Chemical', icon: 'flask', copy: 'An early signal for environments where seconds change outcomes.', tags: ['Gas / chemical sensing', 'Air quality', 'Exposure monitoring'] },
  { name: 'Manufacturing', icon: 'factory', copy: 'Understand the human rhythm around every moving line and machine.', tags: ['Noise', 'Heat', 'Air quality', 'Physical workload', 'Vibration exposure'] },
  { name: 'Ports', icon: 'anchor', copy: 'Coordinate people and heavy equipment across a living yard.', tags: ['Physical workload', 'Heat / environment', 'Movement', 'Location / proximity', 'Emergency features'] },
  { name: 'Oil & Gas', icon: 'flame', copy: 'Confidence for high-consequence work, from wellhead to turnaround.', tags: ['Gas detection', 'Temperature', 'Air quality', 'Emergency alerts'] },
];

function AidaFlow() {
  const items = [
    [UserRound, 'Worker', 'A person doing difficult work.'],
    [RadioTower, 'WorkSense Band', 'Senses body + environment.'],
    [Wifi, 'WorkSense Gateway', 'Keeps the signal local.'],
    [Cloud, 'Secure Cloud', 'Routes only what matters.'],
    [Gauge, 'Company Safety Dashboard', 'Turns risk into action.'],
  ] as const;
  return <div className="ws-flow-new">{items.map(([Icon, title, copy], index) => <div className="ws-flow-new-wrap" key={title}><div className="ws-flow-new-item"><span className="ws-mono-number">0{index + 1}</span><Icon size={20} /><strong>{title}</strong><small>{copy}</small></div>{index < items.length - 1 && <i className="ws-flow-new-arrow" />}</div>)}</div>;
}

function AidaProblem() {
  return <section className="ws-section ws-aida-interest" id="interest"><div className="ws-container"><div className="ws-section-kicker"><span>02</span> Interest / The gap</div><div className="ws-interest-heading"><h2 className="ws-display">Risk changes<br /><em>by the minute.</em></h2><p>In difficult environments, a worker’s body and surroundings can change before a supervisor sees the warning. WorkSense is a workplace safety wearable device that makes the change easier to feel — and easier to act on.</p></div><div className="ws-face-grid"><article className="ws-face-card"><span className="ws-card-index">01 / WORKERS FACE</span><h3>Hard work has a human signal.</h3><p>Physical overexertion, fatigue-related risks, heat and environmental stress, hazardous gases, noise, poor air quality, falls and emergencies — often at the same time.</p><b><UserRound size={16} /> Protection that speaks quietly, at the wrist.</b></article><article className="ws-face-card ws-face-card-dark"><span className="ws-card-index">02 / COMPANIES FACE</span><h3>Visibility has a time limit.</h3><p>Large or remote workforces, different risks across different jobs, early warning signs that are difficult to identify, and emergency awareness that arrives too late.</p><b><UsersRound size={16} /> A calm company view, built for decisions.</b></article></div><div className="ws-ppe-statement"><ShieldCheck size={23} /><p>PPE protects against hazards — but it doesn't tell you when a safety condition is changing.</p></div><div className="ws-subsection-heading" id="how-it-works"><div className="ws-eyebrow">How it works</div><h3 className="ws-display">From a changing signal<br /><em>to a clear next step.</em></h3></div><AidaFlow /><div className="ws-gateway-note"><RadioTower size={18} /><span>The Gateway is especially important in challenging environments like underground mining, where cellular connectivity may be unreliable.</span></div></div></section>;
}

function AidaSignal() {
  const statuses = [['safe', 'Green / Safe', 'Within the expected baseline.'], ['caution', 'Orange / Caution', 'Pause, check, and adjust.'], ['high', 'Red / High Risk', 'Act now and escalate.']];
  return <section className="ws-section ws-aida-signal"><div className="ws-container ws-signal-grid"><div><div className="ws-section-kicker"><span>03</span> Desire / The signal</div><h2 className="ws-display">Traffic lights<br /><em>for changing risk.</em></h2><p>Complex sensor readings become three simple states. Vibration alerts reach the wrist first, so the worker doesn't need to continuously look at a screen.</p><div className="ws-status-list">{statuses.map(([tone, title, copy]) => <div key={title}><i className={tone} /><span><b>{title}</b><small>{copy}</small></span></div>)}</div></div><div className="ws-signal-visual"><div className="ws-signal-top"><span>WS-01 / LIVE SIGNAL</span><span>14:32:08</span></div><div className="ws-signal-band"><img src="/images/band-standard.png" alt="WorkSense band showing a green signal" /><div className="ws-vibration"><span /><span /><span /><span /><b>VIBRATION ALERT</b></div></div><div className="ws-signal-readout"><span><i className="caution" /> elevated heat load</span><strong>pause + hydrate</strong></div></div></div></section>;
}

function AidaComparison() {
  const rows = [
    ['Primary purpose', 'Personal convenience', 'Worker safety', 'Live safety signal'],
    ['Main customer', 'Consumer', 'Employer', 'Employer / safety team'],
    ['User', 'Individual', 'Worker', 'Worker + company'],
    ['Decision maker', 'User', 'Safety manager', 'Safety + operations'],
    ['Health monitoring', 'Basic', 'Focused', 'Continuous indicators'],
    ['Environmental sensing', 'Rare', 'Limited', 'Built for the environment'],
    ['Industry customization', 'No', 'Some', 'Yes'],
    ['Worker alerts', 'Screen / sound', 'Sound / screen', 'Vibration first'],
    ['Company dashboard', 'No', 'Sometimes', 'Core'],
    ['Privacy-first positioning', 'Personal data', 'Varies', 'Safety, not surveillance'],
    ['Battery rotation', 'No', 'Rare', 'Designed in'],
    ['One platform across industries', 'No', 'Limited', 'Yes'],
    ['B2B SaaS model', 'No', 'Sometimes', 'Yes'],
  ];
  return <section className="ws-section ws-aida-comparison"><div className="ws-container"><div className="ws-compare-heading"><div><div className="ws-section-kicker"><span>04</span> Built for the decision</div><h2 className="ws-display">Why teams choose<br /><em>WorkSense.</em></h2></div><p>Smartwatches are made for individuals. Traditional wearables stop at the worker. WorkSense connects the signal to a safer company decision.</p></div><div className="ws-table-wrap"><table className="ws-compare-table"><thead><tr><th>Capability</th><th>Smartwatch</th><th>Traditional<br />Safety Wearable</th><th className="ws-core-head"><span>WorkSense</span><small>CORE</small></th></tr></thead><tbody>{rows.map(([label, smart, traditional, worksense]) => <tr key={label}><th>{label}</th><td>{smart}</td><td>{traditional}</td><td className="ws-core-cell"><Check size={14} />{worksense}</td></tr>)}</tbody></table></div></div></section>;
}

function AidaFeatures() {
  const features = [
    [HeartPulse, 'Vital Monitoring', 'Relevant physiological indicators that help teams spot changing strain.'],
    [Activity, 'Activity & Physical Strain', 'Understand exertion patterns before they become an incident.'],
    [ShieldAlert, 'Risk Indicator', 'Green, orange, and red states that turn data into a next step.'],
    [Bell, 'Vibration Alerts', 'A discreet wrist signal, even when eyes and hands are busy.'],
    [MapPin, 'Emergency Alerts + Location Tracking', 'Get the right context to the right person when it matters.'],
    [Gauge, 'Company Safety Dashboard', 'A calm, live view of every active zone and signal.'],
  ] as const;
  return <section className="ws-section ws-aida-features"><div className="ws-container"><div className="ws-eyebrow">The WorkSense system</div><h2 className="ws-display">Coverage without<br /><em>the clutter.</em></h2><div className="ws-feature-grid-new">{features.map(([Icon, title, text], index) => <article className="ws-feature-new" key={title}><span className="ws-feature-number">0{index + 1}</span><Icon size={21} strokeWidth={1.7} /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="ws-badges"><div><ShieldCheck size={19} /><span><b>Rugged Construction</b><small>Made for the worksite.</small></span></div><div><Droplets size={19} /><span><b>IP68 Water Resistance</b><small>Ready for dust, rain, and rinse-down.</small></span></div></div></div></section>;
}

function AidaIndustryIcon({ type }: { type: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (type === 'helmet') return <svg viewBox="0 0 48 48" {...p}><path d="M8 29h32M11 29v-5a13 13 0 0 1 26 0v5M24 11v7M5 29h38v5H5zM30 17l4-4" /></svg>;
  if (type === 'pickaxe') return <svg viewBox="0 0 48 48" {...p}><path d="m14 37 20-25M10 15c8-4 17-3 27 3M16 17l8 6M33 12l5 4" /></svg>;
  if (type === 'flask') return <svg viewBox="0 0 48 48" {...p}><path d="M19 7h10M22 7v12L12 36a3 3 0 0 0 3 5h18a3 3 0 0 0 3-5L26 19V7M16 31h16" /></svg>;
  if (type === 'factory') return <svg viewBox="0 0 48 48" {...p}><path d="M7 40V19l11 6v-6l11 6V12h8v28M4 40h40M13 33h3M21 33h3M29 33h3" /></svg>;
  if (type === 'anchor') return <svg viewBox="0 0 48 48" {...p}><circle cx="24" cy="10" r="4" /><path d="M24 14v25M16 21h16M12 30a12 12 0 0 0 24 0M9 30l3 4 4-2M39 30l-3 4-4-2" /></svg>;
  return <svg viewBox="0 0 48 48" {...p}><path d="M26 6c3 6-2 9 3 14 4 4 5 9 1 14a9 9 0 1 1-15-10c2-3 5-5 6-10 1-3 2-5 5-8zM25 29c2 3 1 7-2 8-3 0-4-3-2-6l3-4z" /></svg>;
}

function AidaIndustries() {
  const [selected, setSelected] = useState(0);
  const industry = AIDA_INDUSTRIES[selected];
  return <section className="ws-section ws-aida-industries" id="industries"><div className="ws-container ws-industry-layout-new"><div><div className="ws-eyebrow">Context matters</div><h2 className="ws-display">Made for<br /><em>where work happens.</em></h2><div className="ws-industry-tabs-new" role="tablist" aria-label="Industries">{AIDA_INDUSTRIES.map((item, index) => <button key={item.name} role="tab" aria-selected={selected === index} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)} data-testid={`button-industry-${item.name.toLowerCase().replaceAll(' ', '-')}`}><AidaIndustryIcon type={item.icon} /><span>{item.name}</span><ChevronDown size={13} /></button>)}</div></div><div className="ws-industry-panel-new" data-code={industry.name}><span className="ws-panel-code">{String(selected + 1).padStart(2, '0')} / MODULE</span><div className="ws-industry-panel-icon"><AidaIndustryIcon type={industry.icon} /></div><h3>{industry.name}</h3><p>{industry.copy}</p><div className="ws-module-tags-new">{industry.tags.map(tag => <span key={tag}><Check size={12} />{tag}</span>)}</div></div></div></section>;
}

function AidaBatteryPrivacy() {
  const batterySteps = ['2 Batteries Included', '1 In Use', 'Battery Low', 'Swap with Charged', 'Worker Continues', 'Low Battery Goes to Charging Tray', 'Ready for Next Use'];
  return <section className="ws-section ws-aida-battery"><div className="ws-container"><div className="ws-battery-heading"><div><div className="ws-eyebrow">Designed for continuous shift operation</div><h2 className="ws-display">Power that<br /><em>keeps moving.</em></h2></div><p>12+ hour runtime per battery, supporting continuous shift operation through battery rotation.</p></div><div className="ws-battery-flow">{batterySteps.map((item, index) => <div className="ws-battery-step" key={item}><span>{String(index + 1).padStart(2, '0')}</span><Battery size={17} /><b>{item}</b>{index < batterySteps.length - 1 && <i />}</div>)}</div><div className="ws-privacy"><div className="ws-privacy-mark"><img src="/images/worksense-logo-mark.png" alt="" /></div><div><div className="ws-eyebrow">Trust is part of the product</div><h2 className="ws-display">Safety monitoring,<br /><em>not employee surveillance.</em></h2></div><div className="ws-privacy-columns"><div className="privacy-no"><h3>WorkSense does NOT track</h3>{['Attendance', 'Work hours', 'Rest / break tracking', 'Productivity', 'Performance'].map(item => <span key={item}><X size={13} />{item}</span>)}</div><div className="privacy-yes"><h3>WorkSense focuses on</h3>{['Safety conditions', 'Risk alerts', 'Relevant environmental conditions', 'Relevant physiological indicators', 'Emergencies'].map(item => <span key={item}><Check size={13} />{item}</span>)}</div></div></div></div></section>;
}

function AidaPricing() {
  return <div className="ws-pricing-new" id="pricing"><div className="ws-pricing-head-new"><div><div className="ws-eyebrow">Indicative pricing</div><h3>Clear enough to plan.</h3></div><span>Pricing shown is indicative and subject to change</span></div><div className="ws-price-grid-new"><div><span>WorkSense Band</span><strong>₹1,999 <small>per band</small></strong><em>MOQ 50 units</em></div><div><span>Backend Subscription</span><strong>₹5,999 <small>/ month / company</small></strong><em>Flat, regardless of worker count</em></div><div><span>Additional Battery</span><strong>₹299</strong><em>Per battery</em></div></div><div className="ws-bulk-new"><span>Bulk bands</span><b>100–149 <em>₹1,899</em></b><b>150–249 <em>₹1,799</em></b><b>250–499 <em>₹1,699</em></b><b>500+ <em>Custom</em></b></div><p>Final band price = ₹1,999 base + selected custom features (₹100–₹1,000+ depending on module). Subscription is base platform plus selected features.</p></div>;
}

function AidaAction() {
  const steps = [['01', '10–20 Bands'], ['02', '30-Day Pilot'], ['03', '₹5,999 Software FREE during pilot'], ['04', 'Evaluate'], ['05', 'Continue ₹5,999/month or Cancel']];
  return <section className="ws-section ws-aida-action" id="pilot"><div className="ws-container"><div className="ws-action-heading"><div><div className="ws-section-kicker"><span>05</span> Action / Start safer</div><h2 className="ws-display">Try the signal<br /><em>on your shift.</em></h2></div><p>Start with a focused group. See what changes when your team can feel risk before it becomes an incident.</p></div><div className="ws-pilot-flow">{steps.map(([number, text], index) => <div key={number}><span>{number}</span><b>{text}</b>{index < steps.length - 1 && <i />}</div>)}</div><div className="ws-pilot-bottom"><p>Pilot condition: band purchase is non-refundable.</p><a href="mailto:pilot@worksense.demo?subject=WorkSense%2030-Day%20Pilot" className="ws-btn ws-btn-primary" data-testid="button-pilot-action">Start Your 30-Day Pilot <ArrowRight size={16} /></a></div><AidaPricing /></div></section>;
}

function LandingPage() {
  return <main className="ws-app"><Hero /><AidaProblem /><AidaSignal /><AidaComparison /><AidaFeatures /><AidaIndustries /><AidaBatteryPrivacy /><AidaAction /><Footer /></main>;
}

// EDITABLE DEMO LOGIN CREDENTIALS
const DEMO_CREDENTIALS = { username: 'admin', password: 'worksense2026' };
// EDITABLE DEMO WORKER COUNT
const WORKER_COUNT = 120;
type RiskStatus = 'Safe' | 'Caution' | 'High Risk';
type Worker = { id: number; name: string; initials: string; zone: string; role: string; status: RiskStatus; heartRate: number; temperature: number; lastSeen: string };
const WORKER_NAMES = ['Maya Chen', 'Jon Bell', 'Priya Shah', 'Noah Williams', 'Lena Ortiz', 'Samir Khan', 'Ava Morgan', 'Eli Brooks', 'Rosa Diaz', 'Theo Martin', 'Nia Evans', 'Owen Scott'];
const ZONES = ['North crane deck', 'Assembly line 04', 'West tunnel', 'Tank farm', 'Loading yard', 'Fabrication bay'];
const ROLES = ['Site engineer', 'Rigging lead', 'Operator', 'Safety lead', 'Technician', 'General crew'];

function buildWorkers(): Worker[] {
  return Array.from({ length: WORKER_COUNT }, (_, index) => {
    const name = `${WORKER_NAMES[index % WORKER_NAMES.length]}${index >= WORKER_NAMES.length ? ` ${Math.floor(index / WORKER_NAMES.length) + 1}` : ''}`;
    const heartRate = 69 + ((index * 13) % 39);
    const status: RiskStatus = index % 17 === 0 ? 'High Risk' : index % 7 === 0 ? 'Caution' : 'Safe';
    return { id: index + 1, name, initials: name.split(' ').map(part => part[0]).join('').slice(0, 2), zone: ZONES[index % ZONES.length], role: ROLES[index % ROLES.length], status, heartRate, temperature: 36.3 + (index % 7) * .12, lastSeen: `${(index % 5) + 1}s ago` };
  });
}

function statusColor(status: RiskStatus) { return status === 'Safe' ? 'safe' : status === 'Caution' ? 'caution' : 'high'; }

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) { setError(''); onLogin(); } else setError('That access combination did not match the expo demo credentials. Try again.');
  };
  return (
    <main className="ws-login-screen">
      <section className="ws-login-brand">
        <Link href="/" aria-label="Return to WorkSense landing page" data-testid="link-login-home"><BrandMark /></Link>
        <div><div className="ws-eyebrow" style={{ color: 'var(--brand-green)' }}>Private company demo</div><h1>Make the next decision a safer one.</h1><p>A simulated operations view for teams using WorkSense to keep a live read on changing risk.</p></div>
        <div className="ws-login-foot">SECURE DEMO ENVIRONMENT / WS-OPS-01</div>
      </section>
      <section className="ws-login-form-wrap">
        <form className="ws-login-form" onSubmit={submit} noValidate>
          <div className="ws-eyebrow">Operations console</div><h2>Sign in to WorkSense</h2><p>Use the demo credentials supplied at the expo desk.</p>
          {error && <div className="ws-login-error" role="alert" data-testid="status-login-error">{error}</div>}
          <div className="ws-login-field"><label htmlFor="username">Username</label><input id="username" value={username} onChange={event => setUsername(event.target.value)} autoComplete="username" data-testid="input-username" /></div>
          <div className="ws-login-field"><label htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" data-testid="input-password" /></div>
          <button className="ws-btn ws-btn-primary ws-login-submit" type="submit" data-testid="button-login"><LockKeyhole size={15} /> Enter command center</button>
          <Link href="/" className="ws-back-link" data-testid="link-back-home"><ArrowLeft size={14} /> Back to WorkSense</Link>
        </form>
      </section>
    </main>
  );
}

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, []);
  return <div className="ws-clock" data-testid="text-live-clock"><strong>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</strong>{now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</div>;
}

function WorkerTable({ workers, onSelect }: { workers: Worker[]; onSelect: (worker: Worker) => void }) {
  return (
    <table className="ws-worker-table">
      <thead><tr><th>Worker</th><th>Zone</th><th>Signal</th><th>Last seen</th></tr></thead>
      <tbody>
        {workers.map(worker => <tr key={worker.id} onClick={() => onSelect(worker)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') onSelect(worker); }} tabIndex={0} data-testid={`row-worker-${worker.id}`}>
          <td><div className="ws-worker-name"><span className="ws-avatar">{worker.initials}</span><span><b>{worker.name}</b><small style={{ display: 'block', color: 'var(--brand-slate)', fontSize: 10, fontWeight: 400 }}>{worker.role}</small></span></div></td>
          <td><span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', color: 'var(--brand-slate)' }}><MapPin size={12} />{worker.zone}</span></td>
          <td><span className="ws-status"><i className={statusColor(worker.status)} /><span>{worker.status}</span></span><span className="ws-vitals" style={{ display: 'block', marginTop: 3 }}><b>{worker.heartRate}</b> bpm</span></td>
          <td className="ws-vitals">{worker.lastSeen}</td>
        </tr>)}
      </tbody>
    </table>
  );
}

function WorkerChart({ worker }: { worker: Worker }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * ratio; canvas.height = height * ratio;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.scale(ratio, ratio);
    context.clearRect(0, 0, width, height);
    context.strokeStyle = '#dce6e8'; context.lineWidth = 1;
    for (let row = 1; row < 4; row++) { const y = (height / 4) * row; context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }
    const points = Array.from({ length: 25 }, (_, index) => worker.heartRate - 8 + Math.sin(index * .8 + worker.id) * 6 + ((index * worker.id) % 5));
    context.beginPath();
    points.forEach((value, index) => { const x = (index / (points.length - 1)) * width; const y = height - ((value - 50) / 80) * height; if (index === 0) context.moveTo(x, y); else context.lineTo(x, y); });
    context.strokeStyle = '#164E63'; context.lineWidth = 2; context.stroke();
    context.lineTo(width, height); context.lineTo(0, height); context.closePath(); context.fillStyle = 'rgba(34,197,94,.08)'; context.fill();
  }, [worker]);
  return <canvas ref={canvasRef} className="ws-chart" aria-label={`Heart rate history chart for ${worker.name}`} data-testid="canvas-heart-rate" />;
}

function WorkerDrawer({ worker, onClose }: { worker: Worker; onClose: () => void }) {
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [onClose]);
  return (
    <div className="ws-drawer-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="ws-worker-drawer" role="dialog" aria-modal="true" aria-labelledby="worker-detail-title">
        <div className="ws-worker-drawer-head"><div><div className="ws-eyebrow">Worker detail / #{String(worker.id).padStart(3, '0')}</div><h2 id="worker-detail-title">{worker.name}</h2><span className="ws-status"><i className={statusColor(worker.status)} /> {worker.status} · {worker.zone}</span></div><button className="ws-close" onClick={onClose} aria-label="Close worker details" data-testid="button-close-worker-detail"><X size={17} /></button></div>
        <div className="ws-detail-grid"><div className="ws-detail-box"><span>Heart rate</span><strong>{worker.heartRate} <small style={{ font: '12px var(--font-mono-face)', color: 'var(--brand-slate)' }}>bpm</small></strong></div><div className="ws-detail-box"><span>Skin temp.</span><strong>{worker.temperature.toFixed(1)}°</strong></div><div className="ws-detail-box"><span>Role</span><strong style={{ fontSize: 17 }}>{worker.role}</strong></div><div className="ws-detail-box"><span>Last signal</span><strong style={{ fontSize: 17 }}>{worker.lastSeen}</strong></div></div>
        <div className="ws-chart-wrap"><h3>Heart rate / last 24 minutes</h3><WorkerChart worker={worker} /><div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brand-slate)', font: '10px var(--font-mono-face)', marginTop: 7 }}><span>−24 min</span><span>now</span></div></div>
        <p className="ws-detail-note"><CircleAlert size={14} style={{ verticalAlign: 'middle', marginRight: 5, color: 'var(--brand-amber)' }} /> This is a simulated worker signal for demonstration. No personal data is stored.</p>
      </aside>
    </div>
  );
}

function DashboardApp() {
  const [workers, setWorkers] = useState<Worker[]>(() => buildWorkers());
  const [search, setSearch] = useState('');
  const [zone, setZone] = useState('All zones');
  const [status, setStatus] = useState('All statuses');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setWorkers(current => current.map(worker => {
        const nextRate = Math.max(56, Math.min(139, worker.heartRate + (worker.id % 3 === 0 ? 2 : -1)));
        const nextStatus: RiskStatus = worker.id % 17 === 0 ? 'High Risk' : nextRate > 103 ? 'Caution' : 'Safe';
        return { ...worker, heartRate: nextRate, status: nextStatus, lastSeen: 'just now' };
      }));
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);
  const filtered = useMemo(() => workers.filter(worker => (worker.name.toLowerCase().includes(search.toLowerCase()) || worker.zone.toLowerCase().includes(search.toLowerCase())) && (zone === 'All zones' || worker.zone === zone) && (status === 'All statuses' || worker.status === status)), [workers, search, zone, status]);
  const counts = useMemo(() => workers.reduce((result, worker) => { result[worker.status] += 1; return result; }, { Safe: 0, Caution: 0, 'High Risk': 0 } as Record<RiskStatus, number>), [workers]);
  return (
    <main className="ws-dashboard">
      <header className="ws-dash-nav"><div className="ws-dash-nav-inner"><Link href="/" aria-label="WorkSense home" data-testid="link-dashboard-logo"><BrandMark /></Link><div className="ws-dash-status"><i className="ws-live-dot" /> Live operations view</div><div className="ws-dash-actions"><span style={{ color: 'rgba(255,255,255,.55)', fontSize: 12 }}>Northstar Industrial</span><Link href="/" data-testid="link-dashboard-signout">Sign out</Link></div></div></header>
      <div className="ws-dashboard-main">
        <div className="ws-dash-heading"><div><div className="ws-eyebrow">Northstar Industrial / Site 04</div><h1>Good morning, operations.</h1><p>A live read of 120 people across six active zones.</p></div><Clock /></div>
        <div className="ws-dash-kpis">
          <div className="ws-kpi primary"><div className="ws-kpi-label">People monitored <UsersRound size={15} /></div><strong data-testid="text-worker-count">{WORKER_COUNT}</strong><small>signals active right now</small></div>
          <div className="ws-kpi"><div className="ws-kpi-label">Safe <i className="ws-kpi-dot safe" /></div><strong data-testid="text-safe-count">{counts.Safe}</strong><small>within baseline</small></div>
          <div className="ws-kpi"><div className="ws-kpi-label">Caution <i className="ws-kpi-dot caution" /></div><strong data-testid="text-caution-count">{counts.Caution}</strong><small>needs attention</small></div>
          <div className="ws-kpi"><div className="ws-kpi-label">High risk <i className="ws-kpi-dot high" /></div><strong data-testid="text-high-risk-count">{counts['High Risk']}</strong><small>action recommended</small></div>
        </div>
        <div className="ws-dash-grid">
          <section className="ws-panel" aria-labelledby="workers-title">
            <div className="ws-panel-head"><h2 id="workers-title">All workers</h2><span data-testid="text-filtered-workers">{filtered.length} of {WORKER_COUNT} shown</span></div>
            <div className="ws-toolbar"><div className="ws-search"><Search size={15} /><input className="ws-input" type="search" placeholder="Search people or zones" value={search} onChange={event => setSearch(event.target.value)} aria-label="Search workers or zones" data-testid="input-worker-search" /></div><select className="ws-select" value={zone} onChange={event => setZone(event.target.value)} aria-label="Filter by zone" data-testid="select-zone"><option>All zones</option>{ZONES.map(item => <option key={item}>{item}</option>)}</select><select className="ws-select" value={status} onChange={event => setStatus(event.target.value)} aria-label="Filter by status" data-testid="select-status"><option>All statuses</option><option>Safe</option><option>Caution</option><option>High Risk</option></select></div>
            {filtered.length ? <WorkerTable workers={filtered} onSelect={setSelectedWorker} /> : <div style={{ padding: '55px 20px', textAlign: 'center', color: 'var(--brand-slate)' }}><Search size={24} /><p>No workers match those filters.</p></div>}
          </section>
          <aside style={{ display: 'grid', gap: 12 }}>
            <section className="ws-panel"><div className="ws-panel-head"><h2>Recent alerts</h2><span><Radio size={11} /> live feed</span></div><div className="ws-alert-list">{[{ color: 'high', title: 'Elevated heart rate', detail: 'Maya Chen · North crane deck', time: '2m' }, { color: 'caution', title: 'Heat load rising', detail: '3 workers · Tank farm', time: '8m' }, { color: 'caution', title: 'Signal interrupted', detail: 'Jon Bell · West tunnel', time: '14m' }, { color: 'safe', title: 'Zone cleared', detail: 'Loading yard · all clear', time: '22m' }].map(alert => <div className="ws-alert-row" key={`${alert.title}-${alert.time}`}><i className={`ws-alert-marker ${alert.color}`} /><div><strong>{alert.title}</strong><p>{alert.detail}</p></div><span className="ws-alert-time">{alert.time}</span></div>)}</div></section>
            <section className="ws-panel"><div className="ws-panel-head"><h2>Zone pulse</h2><span>active now</span></div><div className="ws-zone-list">{ZONES.slice(0, 5).map((item, index) => <div className="ws-zone" key={item}><span className="ws-zone-name"><MapPin size={13} color="var(--brand-teal)" />{item}</span><span style={{ display: 'flex', alignItems: 'center', gap: 9 }}><i className="ws-zone-bar"><i style={{ width: `${72 - index * 7}%` }} /></i><strong>{18 - index * 2}</strong></span></div>)}</div></section>
          </aside>
        </div>
      </div>
      {selectedWorker && <WorkerDrawer worker={selectedWorker} onClose={() => setSelectedWorker(null)} />}
    </main>
  );
}

function DashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  return authenticated ? <DashboardApp /> : <LoginGate onLogin={() => setAuthenticated(true)} />;
}

function NotFound() {
  const [, setLocation] = useLocation();
  return <main className="ws-login-screen"><section className="ws-login-brand"><BrandMark /><div><div className="ws-eyebrow" style={{ color: 'var(--brand-green)' }}>404 / signal not found</div><h1>This route went quiet.</h1><p>The page you’re looking for is outside the current WorkSense signal.</p><button className="ws-btn ws-btn-primary" onClick={() => setLocation('/')} data-testid="button-return-home">Return to home <ArrowRight size={15} /></button></div><div className="ws-login-foot">WORKSENSE SYSTEMS / 2026</div></section><div style={{ background: '#f5f8f7' }} /></main>;
}

function App() {
  return <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Switch><Route path="/" component={LandingPage} /><Route path="/dashboard" component={DashboardPage} /><Route component={NotFound} /></Switch></Router>;
}

export default App;