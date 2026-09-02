import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, Route, Router, Switch, useLocation } from 'wouter';
import {
  Activity,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Bell,
  CircleAlert,
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
import logoPath from '@assets/file_000000002d7882119fe342a4cd8dec26_1788350402815.png';
import bandPath from '@assets/1788343388461_1788350402814.png';

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

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <img
      src={logoPath}
      alt="WorkSense — Sense what you can sense"
      className="ws-logo"
      style={dark ? { filter: 'brightness(0) saturate(100%)' } : undefined}
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
          <a href="#how-it-works" data-testid="link-how-it-works">How it works</a>
          <a href="#industries" data-testid="link-industries">Industries</a>
          <a href="#pricing" data-testid="link-pricing">Pricing</a>
          <Link href="/dashboard" className="ws-login-link" data-testid="link-business-login">Business login <ArrowRight size={14} /></Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onScroll = () => {
      const amount = Math.min(window.scrollY, 420);
      setTilt({ x: amount * -0.018, y: amount * 0.025 });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section className="ws-hero" aria-labelledby="hero-title">
      <LandingHeader />
      <div className="ws-container ws-hero-content">
        <div className="ws-reveal">
          <div className="ws-eyebrow" style={{ color: 'var(--brand-green)' }}>Workplace signal / 01</div>
          <h1 id="hero-title" className="ws-display">Safety You Can <em>Sense.</em></h1>
          <p className="ws-hero-copy">WorkSense gives people doing difficult work a clear read on changing risk — before a close call becomes something more.</p>
          <div className="ws-hero-actions">
            <a href="#how-it-works" className="ws-btn ws-btn-primary" data-testid="button-explore-system">Explore the system <ArrowDownRight size={16} /></a>
            <Link href="/dashboard" className="ws-btn ws-btn-ghost" data-testid="button-open-dashboard">Open live demo <ArrowRight size={16} /></Link>
          </div>
          <div className="ws-hero-note"><i className="ws-live-dot" /> Real-time monitoring. Human-first response.</div>
        </div>
        <div className="ws-product-stage ws-reveal ws-delay-2" aria-label="WorkSense safety band product preview">
          <img
            src={bandPath}
            alt="WorkSense black safety band with green status light"
            className="ws-product-image"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
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
          <div><BrandMark /><p>Real-time safety intelligence for people doing difficult work.</p></div>
          <div className="ws-footer-links">
            <div><span>Explore</span><a href="#how-it-works">How it works</a><a href="#industries">Industries</a><a href="#pricing">Pricing</a></div>
            <div><span>Connect</span><Link href="/dashboard">Business login</Link><a href="mailto:hello@worksense.demo">Contact team</a><a href="#hero-title">Back to top</a></div>
          </div>
        </div>
        <div className="ws-footer-bottom"><span>© 2026 WorkSense Systems</span><span>Built for the moments that matter.</span></div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return <main className="ws-app"><Hero /><ProblemSection /><HumanProblemSection /><HowItWorks /><AlertSection /><FeatureCoverage /><IndustrySection /><PricingSection /><Footer /></main>;
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