import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { content } from "../content";
import { Icon } from "../icons";
import profileImage from "../assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Eyebrow = ({ children }) => (
  <span className="mono-label inline-flex items-center gap-2">
    <span className="inline-block h-px w-6 bg-signal/60" aria-hidden />
    {children}
  </span>
);

const Profile = () => {
  const [language, setLanguage] = useState("en");
  const copy = content[language];
  const isArabic = copy.isArabic;
  const root = useRef(null);

  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "ar" : "en"));

  // Keep the document root in sync for accessibility + SEO, and re-measure
  // scroll positions after a language/direction swap.
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = copy.dir;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [language, copy.dir]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          ok: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduce = ctx.conditions.reduce;
          const reveals = gsap.utils.toArray("[data-reveal]");

          if (reduce) {
            // Static fallback: everything in its final, readable state.
            gsap.set([".hero-line", ".hero-fade"], { opacity: 1, y: 0 });
            gsap.set(".wire", { opacity: 0 });
            gsap.set(".scan", { opacity: 0 });
            gsap.set(".portrait-img", { filter: "none", scale: 1 });
            gsap.set(reveals, { opacity: 1, y: 0 });
          } else {
            // The single orchestrated page-load moment: the hero "compiles".
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
              .from(
                ".hero-line",
                { opacity: 0, yPercent: 110, duration: 0.9, stagger: 0.12 },
                "-=0.2"
              )
              .from(".hero-fade", { opacity: 0, y: 18, duration: 0.7, stagger: 0.1 }, "-=0.5")
              .fromTo(
                ".scan",
                { yPercent: -120, opacity: 0.9 },
                { yPercent: 120, duration: 1.1, ease: "power1.inOut" },
                "-=1.1"
              )
              .to(".portrait-img", { filter: "grayscale(0) contrast(1)", duration: 1.1 }, "<")
              .to(".wire", { opacity: 0, duration: 0.8 }, "<0.2")
              .to(".scan", { opacity: 0, duration: 0.25 }, ">-0.1");

            // Quiet, uniform section reveals — restrained, not per-card theatrics.
            reveals.forEach((el) => {
              gsap.from(el, {
                opacity: 0,
                y: 26,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 85%" },
              });
            });
          }

          // Scroll progress fills the stack rail (directly tied to scroll).
          const fill = root.current.querySelector(".rail-fill");
          if (fill) {
            gsap.fromTo(
              fill,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
              }
            );
          }
        }
      );

      return () => mm.revert();
    },
    { scope: root, dependencies: [] }
  );

  const railStops = ["Interface", "Logic", "Data", "Contact"];

  return (
    <div
      ref={root}
      dir={copy.dir}
      className={`relative min-h-screen overflow-x-clip bg-ink text-fg ${
        isArabic ? "font-arabic" : "font-sans"
      }`}
    >
      {/* Ambient depth — two faint color fields, static (no autonomous motion). */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 start-[-10%] h-[36rem] w-[36rem] rounded-full bg-signal/10 blur-[160px]" />
        <div className="absolute bottom-[-10rem] end-[-8%] h-[32rem] w-[32rem] rounded-full bg-warm/[0.07] blur-[170px]" />
      </div>

      {/* The Stack — architectural rail doubling as scroll progress (desktop). */}
      <aside
        aria-hidden
        className="pointer-events-none fixed inset-y-0 start-6 z-20 hidden flex-col items-center justify-center min-[1380px]:flex"
      >
        <div className="relative h-56 w-px bg-hair">
          <div className="rail-fill absolute inset-x-0 top-0 h-full origin-top bg-signal" />
        </div>
        <ul className="absolute inset-y-0 flex flex-col items-start justify-center gap-14 ps-5">
          {railStops.map((s) => (
            <li key={s} className="mono-label whitespace-nowrap text-fg-faint">
              {s}
            </li>
          ))}
        </ul>
      </aside>

      {/* Nav */}
      <header className="relative z-30 mx-auto flex max-w-shell items-center justify-between gap-4 px-6 py-7 md:px-10">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-hair bg-surface font-mono text-sm font-semibold text-signal">
            MY
          </span>
          <span className="hidden text-sm font-medium text-fg sm:inline">{copy.hero.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {copy.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={copy.toggle.aria}
          className="inline-flex h-11 min-w-[2.75rem] items-center justify-center gap-1.5 rounded-full border border-hair px-4 font-mono text-xs font-medium text-fg-muted transition-colors duration-200 hover:border-signal hover:text-fg"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          {copy.toggle.label}
        </button>
      </header>

      <main id="top" className="relative z-10">
        {/* HERO — the Compile */}
        <section className="mx-auto grid max-w-shell items-center gap-12 px-6 pb-20 pt-6 md:px-10 md:pb-28 md:pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="text-center md:text-start">
            <div className="hero-eyebrow">
              <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
            </div>

            <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block">{copy.hero.name}</span>
              </span>
            </h1>

            <p className="mt-5 text-2xl font-medium leading-tight text-fg-muted sm:text-3xl">
              {copy.hero.tagline.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-0.5">
                  <span className={`hero-line block ${i === 1 ? "text-warm" : ""}`}>{line}</span>
                </span>
              ))}
            </p>

            <p className="hero-fade mx-auto mt-7 max-w-xl text-base leading-relaxed text-fg-muted md:mx-0 md:text-lg">
              {copy.hero.bio}
            </p>

            <div className="hero-fade mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
              <a
                href="#contact"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-signal px-7 text-sm font-semibold text-ink transition-all duration-300 ease-cine hover:bg-fg"
              >
                {Icon.mail({ className: "text-base" })}
                {copy.hero.primaryCta}
              </a>
              <a
                href="#work"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-hair px-7 text-sm font-semibold text-fg transition-colors duration-300 hover:border-signal"
              >
                {copy.hero.secondaryCta}
                {Icon.arrowDown({ className: "text-base text-fg-muted" })}
              </a>
            </div>
          </div>

          {/* Portrait that resolves from blueprint to render */}
          <div className="hero-fade mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-hair bg-surface">
              <img
                src={profileImage}
                alt={copy.hero.portraitAlt}
                className="portrait-img h-full w-full object-cover object-top"
                style={{ filter: "grayscale(0.9) contrast(0.95)" }}
              />
              <div className="wire pointer-events-none absolute inset-0 blueprint-grid opacity-90" />
              <div className="scan pointer-events-none absolute inset-x-0 top-0 h-28" />

              {/* schematic corner readouts */}
              <span className="absolute start-4 top-4 font-mono text-[10px] text-signal/80">x:0 y:0</span>
              <span className="absolute end-4 top-4 font-mono text-[10px] text-signal/60">4:5</span>

              {/* compile status strip */}
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-hair bg-ink/70 p-3 backdrop-blur">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-signal">{copy.hero.compile[0]}</span>
                  <span className="text-fg-faint">{copy.hero.compile[1]}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-fg-muted">
                  {Icon.pin({ className: "text-sm text-warm" })}
                  <span>{copy.hero.location}</span>
                  <span className="ms-auto inline-flex items-center gap-1.5 text-fg-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                    {copy.hero.available}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="mx-auto max-w-shell px-6 py-16 md:px-10 md:py-24">
          <div data-reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>{copy.about.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {copy.about.heading}
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-fg-muted md:text-lg">
              {copy.about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-shell scroll-mt-24 px-6 py-16 md:px-10 md:py-24">
          <div data-reveal>
            <Eyebrow>{copy.services.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {copy.services.heading}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {copy.services.items.map((s) => (
              <article
                key={s.title}
                data-reveal
                className="group rounded-2xl border border-hair bg-surface/60 p-7 transition-colors duration-300 hover:border-hair-strong hover:bg-surface"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-hair text-xl text-signal transition-colors duration-300 group-hover:border-signal/50 group-hover:text-warm">
                  {Icon[s.icon]({})}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-fg">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="mx-auto max-w-shell px-6 py-16 md:px-10 md:py-24">
          <div data-reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>{copy.skills.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {copy.skills.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-fg-muted">{copy.skills.body}</p>
            </div>
            <ul className="space-y-8">
              {copy.skills.groups.map((g) => (
                <li key={g.label} data-reveal className="border-t border-hair pt-5">
                  <p className="mono-label text-fg-faint">{g.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-hair bg-surface-2 px-3.5 py-2 text-sm text-fg/90 transition-colors duration-200 hover:border-signal/50 hover:text-fg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section id="work" className="mx-auto max-w-shell scroll-mt-24 px-6 py-16 md:px-10 md:py-24">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>{copy.work.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {copy.work.heading}
              </h2>
            </div>
            <p className="max-w-xs text-sm text-fg-faint">{copy.work.note}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.work.items.map((w, i) => (
              <article
                key={i}
                data-reveal
                className="flex flex-col overflow-hidden rounded-2xl border border-hair bg-surface/60"
              >
                <div className="relative aspect-[16/10] border-b border-hair blueprint-grid">
                  <span className="absolute inset-0 grid place-items-center font-mono text-xs text-fg-faint">
                    {w.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span key={t} className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-signal/80">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-fg">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{w.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* APPROACH — a real sequence, so it earns step markers */}
        <section id="approach" className="mx-auto max-w-shell scroll-mt-24 px-6 py-16 md:px-10 md:py-24">
          <div data-reveal>
            <Eyebrow>{copy.approach.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {copy.approach.heading}
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.approach.steps.map((step) => (
              <li
                key={step.k}
                data-reveal
                className="relative rounded-2xl border-s-2 border-hair bg-surface/40 p-6 transition-colors duration-300 hover:border-s-signal"
              >
                <span className="font-mono text-sm text-signal">{step.k}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-shell scroll-mt-24 px-6 py-16 md:px-10 md:py-28">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] border border-hair bg-surface/60 px-6 py-14 text-center md:px-16 md:py-20"
          >
            <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" />
            <div className="relative mx-auto max-w-2xl">
              <Eyebrow>{copy.contact.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                {copy.contact.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
                {copy.contact.body}
              </p>
              <a
                href={`mailto:${copy.contact.email}`}
                className="mt-9 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-signal px-8 py-4 text-sm font-semibold text-ink transition-all duration-300 ease-cine hover:bg-warm"
              >
                {Icon.mail({ className: "text-base" })}
                {copy.contact.cta}
              </a>
              <p className="mt-4 font-mono text-sm text-fg-muted">{copy.contact.email}</p>

              <div className="mt-10 flex items-center justify-center gap-3">
                {copy.contact.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-hair text-fg-muted transition-colors duration-200 hover:border-signal hover:text-fg"
                  >
                    {Icon[s.icon]({ className: "text-lg" })}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-hair">
        <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-fg-faint md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} {copy.hero.name} — {copy.footer.rights}</span>
          <span className="font-mono text-xs">{copy.footer.built}</span>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
