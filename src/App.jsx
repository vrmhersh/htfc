import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Routes, Route, useLocation, useParams, useSearchParams } from "react-router-dom";
import { ArrowRight, Menu, X, Mail, Phone, Linkedin, MessageCircle } from "lucide-react";
import { site } from "./content/site.js";
import { tours } from "./content/tours.js";
import { testimonials } from "./content/testimonials.js";
import { articles, musings } from "./content/writings.js";
import { platforms, podcastIntro, featured, guests, lectures } from "./content/podcast.js";

const today = () => new Date().toISOString().slice(0, 10);
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dates(t) {
  const [a, b] = [t.start, t.end].map((d) => new Date(d + "T12:00:00"));
  const sameM = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  const y = a.getFullYear() !== new Date().getFullYear() ? ` ${a.getFullYear()}` : "";
  return a.getTime() === b.getTime() ? `${a.getDate()} ${MON[a.getMonth()]}${y}`
    : sameM ? `${a.getDate()} – ${b.getDate()} ${MON[b.getMonth()]}${y}` : `${a.getDate()} ${MON[a.getMonth()]} – ${b.getDate()} ${MON[b.getMonth()]}${y}`;
}
const visible = tours.filter((t) => !t.hidden).sort((a, b) => a.start.localeCompare(b.start));
const upcoming = () => visible.filter((t) => t.end >= today());
const past = () => visible.filter((t) => t.end < today()).reverse();
const LABEL = { soldout: "Sold out", private: "Private trip", waitlist: "Waiting list" };

const useTitle = (t) => useEffect(() => { document.title = t ? `${t} | ${site.name}` : `${site.name} | Jewish Heritage Tours with Rabbi Aubrey Hersh`; }, [t]);
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.12 }); io.observe(ref.current); return () => io.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
const Btn = ({ to, href, children, ...p }) => href ? <a className="btn" href={href} target="_blank" rel="noopener noreferrer" {...p}>{children}</a> : <Link className="btn" to={to} {...p}>{children}</Link>;
const Page = ({ title, img, children, wide }) => { useTitle(title); return (<>
  <section className="pagehead" style={img ? { backgroundImage: `url(${img})` } : null}><div className="shade" /><h1 className="serif">{title}</h1></section>{children}</>); };

function Header() {
  const [open, setOpen] = useState(false); const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  const links = [["/tours", "Tours"], ["/podcast", "Podcast"], ["/lectures", "Lectures"], ["/writings", "Writings"], ["/testimonials", "Testimonials"], ["/about", "About"], ["/contact", "Contact"]];
  return (<header className="header"><div className="bar">
    <Link to="/" className="logo" aria-label="Home"><img src={site.logo} alt={site.name} /></Link>
    <nav className={open ? "open" : ""}>{links.map(([to, t]) => <NavLink key={to} to={to}>{t}</NavLink>)}</nav>
    <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header>);
}
function Footer() {
  return (<footer className="footer"><div className="wrap"><div className="frow"><h3 className="serif">{site.name}</h3>
    <div className="flinks">{[["/tours", "Tours"], ["/podcast", "Podcast"], ["/lectures", "Lectures"], ["/writings", "Writings"], ["/about", "About"], ["/contact", "Contact"]].map(([to, t]) => <Link key={to} to={to}>{t}</Link>)}</div></div>
    <div className="fbot"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span><Link to="/privacy">Privacy Policy</Link></div></div></footer>);
}
function Status({ t }) {
  return <>{t.status !== "open" && <span className={`pill ${t.status}`}>{LABEL[t.status]}</span>}{t.note && <span className="pill note">{t.note}</span>}</>;
}
function TourRow({ t }) {
  const body = <><span className="d">{dates(t)}</span><span className="n">{t.title} <Status t={t} /></span></>;
  return t.details.length ? <Link className="trow link" to={`/tours/${t.id}`}>{body}<ArrowRight size={18} /></Link> : <div className="trow">{body}</div>;
}

function Home() {
  useTitle(""); const [i, setI] = useState(0); const [pause, setPause] = useState(false);
  useEffect(() => { if (pause) return; const id = setInterval(() => setI((x) => (x + 1) % site.slides.length), 6000); return () => clearInterval(id); }, [pause]);
  const next = upcoming().slice(0, 5);
  return (<>
    <section className="hero" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      {site.slides.map((s, k) => <div key={k} className={`slide ${k === i ? "on" : ""}`} style={{ backgroundImage: `url(${s.img})` }} />)}<div className="shade" />
      <div className="wrap hero-in"><p className="eyebrow">Rabbi Aubrey Hersh</p><h1 className="serif">{site.slides[i].text}</h1>
        <p className="sub">Jewish heritage tours, lectures and the History for the Curious podcast.</p>
        <div className="btns"><Btn to="/tours">View upcoming tours <ArrowRight size={18} /></Btn><Btn href={site.whatsapp} className="btn ghost"><MessageCircle size={18} /> Join our WhatsApp group</Btn></div>
        <div className="dots">{site.slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} className={k === i ? "on" : ""} onClick={() => setI(k)} />)}</div></div></section>
    <section className="band navy center"><Reveal className="wrap narrow"><h2 className="serif">Weekly eye-opening insights</h2><p>Join our WhatsApp group for unique photos and behind-the-scenes images.</p></Reveal></section>
    <section className="band green"><div className="wrap cards3">{[["Explore", "/tours", "Upcoming and past heritage tours", site.images.upcoming], ["Listen", "/podcast", "The History for the Curious podcast", site.images.pastStrip[1]], ["Read", "/writings", "Articles and musings", site.images.writings]].map(([t, to, d, im], k) =>
      <Reveal key={t} delay={k * 100}><Link to={to} className="tile"><img src={im} alt="" loading="lazy" /><h3 className="serif">{t}</h3><p>{d}</p></Link></Reveal>)}</div></section>
    <section className="band navy"><div className="wrap split"><Reveal><img className="round" src={site.images.upcoming} alt="Touring a historic synagogue" loading="lazy" /></Reveal>
      <Reveal delay={100}><h2 className="serif">Upcoming tours</h2><div className="tlist">{next.map((t) => <TourRow key={t.id} t={t} />)}</div><Btn to="/tours">All tours <ArrowRight size={18} /></Btn></Reveal></div></section>
    <section className="band green center"><div className="wrap"><Reveal><h2 className="serif">Past tours</h2><p className="narrow mx">{site.pastCountries}</p></Reveal>
      <div className="strip">{site.images.pastStrip.map((s) => <img key={s} src={s} alt="" loading="lazy" />)}</div></div></section>
    <section className="band navy"><Reveal className="wrap narrow"><h2 className="serif">About</h2><p>{site.about[0]}</p><p>{site.about[1]}</p>
      <div className="stats">{site.stats.map(([n, l]) => <div key={n}><b className="serif">{n}</b><span>{l}</span></div>)}</div><Btn to="/about">Find out more <ArrowRight size={18} /></Btn></Reveal></section>
    <section className="band green center"><Reveal className="wrap"><h2 className="serif">Listen to the podcast</h2><Platforms /></Reveal></section>
    <Quote />
  </>);
}
const Platforms = () => <div className="plats">{platforms.map(([n, u]) => <a key={n} className="btn ghost" href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}</div>;
const Quote = () => <section className="band navy center"><Reveal className="wrap"><p className="bigq serif">“{site.tagline}”</p><Btn to="/contact">Get in touch <ArrowRight size={18} /></Btn></Reveal></section>;

function Tours() {
  const up = upcoming(), pa = past();
  return (<Page title="Tours" img={site.images.tours}>
    <section className="band navy"><div className="wrap narrow"><h2 className="serif">Upcoming tours</h2>
      <div className="tlist">{up.length ? up.map((t) => <TourRow key={t.id} t={t} />) : <p>New tours will be announced soon. Join the WhatsApp group below to hear first.</p>}</div>
      {site.toursIntro.map((p) => <p key={p}>{p}</p>)}<Btn href={site.whatsapp}><MessageCircle size={18} /> Join our WhatsApp group</Btn></div></section>
    <section className="band green"><div className="wrap narrow"><h2 className="serif">Past tours</h2><p>{site.pastCountries}</p>
      <div className="tlist dim">{pa.map((t) => <TourRow key={t.id} t={t} />)}</div><div className="strip">{site.images.pastStrip.map((s) => <img key={s} src={s} alt="" loading="lazy" />)}</div></div></section>
  </Page>);
}
function TourPage() {
  const { id } = useParams(); const t = tours.find((x) => x.id === id);
  useTitle(t ? t.title : "Tour not found");
  if (!t) return <Page title="Tour not found"><section className="band navy"><div className="wrap"><Btn to="/tours">Back to tours</Btn></div></section></Page>;
  const full = t.status === "soldout";
  return (<Page title={t.title} img={site.images.tours}><section className="band navy"><div className="wrap narrow">
    <p className="eyebrow">{dates(t)} <Status t={t} /></p>{t.details.map((p) => <p key={p}>{p}</p>)}
    {t.leaders && <p><b>Accompanied by:</b> {t.leaders}</p>}{t.price && <p><b>Price:</b> {t.price}</p>}
    {t.gallery && <div className="strip">{t.gallery.map((s) => <img key={s} src={s} alt={t.title} loading="lazy" />)}</div>}
    <div className="btns"><Btn to={`/contact?tour=${encodeURIComponent(t.title + " (" + dates(t) + ")")}`}>{full ? "Join the waiting list" : "Register interest"} <ArrowRight size={18} /></Btn><Btn to="/tours" className="btn ghost">All tours</Btn></div></div></section></Page>);
}
const Podcast = () => <Page title="Podcast"><section className="band green center"><div className="wrap narrow"><h2 className="serif">{podcastIntro}</h2>
  <div className="chips">{featured.map((f) => <span key={f}>{f}</span>)}</div><p>{guests}</p><h3 className="serif">Listen on</h3><Platforms /></div></section></Page>;
const Lectures = () => <Page title="Lectures"><section className="band navy"><div className="wrap narrow"><h2 className="serif">Shiurim, interviews & lecture list</h2>
  {lectures.length ? <ul className="plain">{lectures.map((l) => <li key={l.title}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.title}</a></li>)}</ul> : <p>The lecture list is being moved across and will appear here soon. For speaking arrangements, please get in touch.</p>}
  <Btn to="/contact">Speaking enquiries <ArrowRight size={18} /></Btn></div></section></Page>;
const DocList = ({ title, items }) => <div><h2 className="serif">{title}</h2><ul className="doclist">{items.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{t}</a></li>)}</ul></div>;
const Writings = () => <Page title="Writings" img={site.images.writings}><section className="band green"><div className="wrap two"><DocList title="Articles" items={articles} /><DocList title="Musings" items={musings} /></div></section></Page>;
const Testimonials = () => <Page title="Testimonials"><section className="band green"><div className="wrap narrow">{[...testimonials].sort((a, b) => b.year - a.year).map((y) => <div key={y.year} className="year"><h2 className="serif">{y.year}</h2>
  {y.quotes.map(([q, n]) => <blockquote key={q}>“{q}”<cite>{n}</cite></blockquote>)}</div>)}</div></section></Page>;
const About = () => <Page title="About"><section className="band navy"><div className="wrap narrow">{site.about.map((p) => <p key={p}>{p}</p>)}
  <div className="stats">{site.stats.map(([n, l]) => <div key={n}><b className="serif">{n}</b><span>{l}</span></div>)}</div>
  {site.aboutPhotos.map((p) => <figure key={p.img}><img className="round" src={p.img} alt={p.caption} loading="lazy" /><figcaption>{p.caption}</figcaption></figure>)}</div></section><Quote /></Page>;

function Contact() {
  const [q] = useSearchParams(); const tour = q.get("tour");
  const [f, setF] = useState({ name: "", email: "", phone: "", topic: tour ? "Tour enquiry" : "", message: tour ? `I would like to find out more about: ${tour}.` : "" });
  const [st, setSt] = useState("idle"); const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  async function submit(e) {
    e.preventDefault(); if (e.target.botcheck.checked) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return setSt("bademail");
    if (!site.web3formsKey) { window.location.href = `mailto:${site.email}?subject=${encodeURIComponent((f.topic || "Enquiry") + " from " + f.name)}&body=${encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\n\n${f.message}`)}`; return; }
    setSt("sending");
    try { const r = await (await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ access_key: site.web3formsKey, subject: `${f.topic || "Enquiry"} from ${f.name}`, from_name: site.name, ...f }) })).json(); setSt(r.success ? "sent" : "error"); } catch { setSt("error"); }
  }
  return (<Page title="Contact"><section className="band navy"><div className="wrap two">
    <form onSubmit={submit}><input type="checkbox" name="botcheck" tabIndex="-1" style={{ display: "none" }} />
      <label><span>Full name *</span><input required value={f.name} onChange={set("name")} /></label>
      <label><span>Email *</span><input required type="email" pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}" title="Please enter a valid email address" value={f.email} onChange={set("email")} /></label>
      <label><span>Phone (optional)</span><input type="tel" value={f.phone} onChange={set("phone")} /></label>
      <label><span>What is your enquiry about?</span><select value={f.topic} onChange={set("topic")}><option value="">Select an option</option><option>Tour enquiry</option><option>Speaking request</option><option>Podcast</option><option>Other</option></select></label>
      <label><span>Message *</span><textarea required rows="5" value={f.message} onChange={set("message")} /></label>
      <label className="consent"><input type="checkbox" required /><span>I agree to my details being used to reply to my enquiry (see the <Link to="/privacy">Privacy Policy</Link>). *</span></label>
      <button className="btn" disabled={st === "sending"}>{st === "sending" ? "Sending..." : "Send message"} <ArrowRight size={18} /></button>
      {st === "sent" && <p className="msg ok">Thank you, your message has been sent.</p>}{st === "bademail" && <p className="msg bad">Please enter a valid email address.</p>}{st === "error" && <p className="msg bad">Sorry, that didn’t send. Please email {site.email} directly.</p>}</form>
    <div className="info"><h2 className="serif">Get in touch</h2><p><Mail size={18} /> <a href={`mailto:${site.email}`}>{site.email}</a></p><p><Phone size={18} /> <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>
      <p><MessageCircle size={18} /> <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp group</a></p><p><Linkedin size={18} /> <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      <p className="muted">Speaking arrangements: {site.email}</p></div></div></section></Page>);
}
const Privacy = () => <Page title="Privacy Policy"><section className="band navy"><div className="wrap narrow">
  <p>When you use the contact form we collect your name, email address, phone number (optional) and message, only to reply to your enquiry. Messages are delivered to {site.email} and are not sold or shared for marketing.</p>
  <p>This website is hosted on Vercel. Contact details are kept only as long as needed to deal with your enquiry. You can ask to see, correct or delete your details at any time by emailing {site.email}. You may also complain to the Information Commissioner’s Office (ico.org.uk).</p></div></section></Page>;

export default function App() {
  return (<><Header /><main><Routes><Route path="/" element={<Home />} /><Route path="/tours" element={<Tours />} /><Route path="/tours/:id" element={<TourPage />} />
    <Route path="/podcast" element={<Podcast />} /><Route path="/lectures" element={<Lectures />} /><Route path="/writings" element={<Writings />} />
    <Route path="/testimonials" element={<Testimonials />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/privacy" element={<Privacy />} />
    <Route path="*" element={<Home />} /></Routes></main><Footer /></>);
}
