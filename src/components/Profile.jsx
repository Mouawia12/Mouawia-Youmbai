import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { content } from "../content";
import { Icon } from "../icons";
import profileImage from "../assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Framed portrait that matches the "stack panel" aesthetic.
const Portrait = ({ alt, className = "" }) => (
  <div
    className={`relative overflow-hidden rounded-[1.4rem] border border-hair bg-surface ${className}`}
    style={{ boxShadow: "0 0 0 1px rgba(77,141,255,0.15), 0 24px 60px -24px rgba(77,141,255,0.45)" }}
  >
    <img src={profileImage} alt={alt} className="h-full w-full object-cover object-top" />
  </div>
);

const Eyebrow = ({ children }) => (
  <span className="mono-label inline-flex items-center gap-2">
    <span className="inline-block h-px w-6 bg-signal/60" aria-hidden />
    {children}
  </span>
);

// One layer panel of the central "product stack" actor.
const Slab = ({ chapter, i }) => (
  <div className="slab absolute left-1/2 top-1/2 ml-[-150px] mt-[-62px]" data-i={i}>
    <div className="relative flex h-[124px] w-[300px] flex-col justify-between rounded-2xl border border-hair bg-surface/70 p-4 backdrop-blur-sm">
      <div
        className="slab-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0"
        style={{ boxShadow: "0 0 0 1px #4D8DFF, 0 18px 50px -12px rgba(77,141,255,0.55)", background: "rgba(77,141,255,0.08)" }}
      />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.18em] text-signal">{chapter.k}</span>
        <span className="text-lg text-fg-muted">{Icon[chapter.icon]({})}</span>
      </div>
      <div className="relative">
        <p className="text-sm font-semibold text-fg">{chapter.tag}</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {chapter.tech.slice(0, 3).map((t) => (
            <span key={t} className="rounded bg-ink/60 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const [language, setLanguage] = useState("en");
  const copy = content[language];
  const isArabic = copy.isArabic;
  const root = useRef(null);
  const lenisRef = useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "ar" : "en"));

  // Smooth, cursor-aware scroll in sync with ScrollTrigger (off on reduced-motion).
  useEffect(() => {
    if (prefersReduced) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  // Keep the document root in sync for accessibility + SEO, and re-measure on swap.
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = copy.dir;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [language, copy.dir]);

  const onAnchor = (e, href) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    e.preventDefault();
    if (href === "#top") lenis.scrollTo(0);
    else lenis.scrollTo(href, { offset: -8 });
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)", ok: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const reduce = ctx.conditions.reduce;
          const reveals = gsap.utils.toArray(q("[data-reveal]"));
          const titles = gsap.utils.toArray(q(".reveal-title"));

          if (reduce) {
            gsap.set(reveals, { opacity: 1, y: 0 });
            gsap.set(titles, { opacity: 1, clipPath: "inset(0 0 0 0)", y: 0 });
          } else {
            // ===== The scroll theater: central actor builds with progress =====
            const theater = q(".theater-track")[0];
            if (theater) {
              const slabs = gsap.utils.toArray(q(".slab"));
              const tower = q(".tower")[0];
              const chapters = gsap.utils.toArray(q(".chapter"));

              gsap.set(tower, { rotateX: 18, rotateY: -20, scale: 0.9, transformOrigin: "50% 50%" });
              slabs.forEach((s, i) => gsap.set(s, { y: (i - 1.5) * 74, z: 0, scale: 0.95, opacity: 0.4 }));
              gsap.set(chapters, { opacity: 0, y: 40 });

              const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: { trigger: theater, start: "top top", end: "bottom bottom", scrub: 0.5 },
              });

              // Assemble the stack, then push the camera through it.
              tl.from(slabs, { opacity: 0, z: -260, duration: 0.1, stagger: 0.03 }, 0);
              tl.to(".intro", { opacity: 0, y: -40, duration: 0.08, ease: "power2.in" }, 0.05);
              tl.to(tower, { rotateY: 16, scale: 1.03, duration: 1 }, 0);

              // Clean, non-overlapping windows: chapter i fully exits before i+1 enters.
              const seg = [0.12, 0.34, 0.56, 0.78];
              const inDur = 0.07;
              const outAt = 0.15;
              const outDur = 0.06;
              slabs.forEach((s, i) => {
                const glow = s.querySelector(".slab-glow");
                tl.to(s, { z: 90, scale: 1.08, opacity: 1, duration: inDur, ease: "power2.out" }, seg[i]);
                tl.to(glow, { opacity: 1, duration: inDur }, seg[i]);
                tl.fromTo(chapters[i], { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: inDur, ease: "power2.out" }, seg[i]);
                if (i < slabs.length - 1) {
                  tl.to(s, { z: 0, scale: 0.95, opacity: 0.4, duration: outDur }, seg[i] + outAt);
                  tl.to(glow, { opacity: 0, duration: outDur }, seg[i] + outAt);
                  tl.to(chapters[i], { opacity: 0, y: -44, duration: outDur, ease: "power2.in" }, seg[i] + outAt);
                }
              });
            }

            // Top progress bar across the whole page.
            const bar = q(".progress-fill")[0];
            if (bar) {
              gsap.fromTo(
                bar,
                { scaleX: 0 },
                { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
              );
            }

            // Cinematic heading wipes for the lower sections.
            titles.forEach((el) => {
              gsap.from(el, {
                clipPath: "inset(100% 0 0 0)",
                y: 18,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 85%" },
              });
            });

            reveals.forEach((el) => {
              gsap.from(el, {
                opacity: 0,
                y: 26,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 86%" },
              });
            });
          }
        }
      );

      return () => mm.revert();
    },
    // Rebuild the timeline when language swaps — the chapter/slab nodes remount.
    { scope: root, dependencies: [language], revertOnUpdate: true }
  );

  // Pointer-reactive effects (answer the user's motion).
  const tiltMove = (e) => {
    if (prefersReduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: px * 7, rotateX: -py * 7, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
  };
  const tiltReset = (e) => gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  const magnetMove = (e) => {
    if (prefersReduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.4, duration: 0.4, ease: "power2.out" });
  };
  const magnetReset = (e) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });

  const chapters = copy.theater.chapters;
  // Deterministic desktop sides (logical insets collide across the sticky scene).
  const towerSide = isArabic ? "lg:left-[9%] lg:right-auto" : "lg:right-[9%] lg:left-auto";
  const chapterSide = isArabic ? "lg:right-0 lg:left-auto" : "lg:left-0 lg:right-auto";

  return (
    <div
      ref={root}
      dir={copy.dir}
      className={`relative min-h-screen overflow-x-clip bg-ink text-fg ${isArabic ? "font-arabic" : "font-sans"}`}
    >
      {/* Ambient depth */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 start-[-10%] h-[36rem] w-[36rem] rounded-full bg-signal/10 blur-[160px]" />
        <div className="absolute bottom-[-10rem] end-[-8%] h-[32rem] w-[32rem] rounded-full bg-warm/[0.07] blur-[170px]" />
      </div>

      {/* Top progress bar */}
      {!prefersReduced && (
        <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-hair/50">
          <div
            className="progress-fill h-full w-full bg-gradient-to-r from-signal to-warm"
            style={{ transformOrigin: isArabic ? "right" : "left" }}
          />
        </div>
      )}

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-30 mx-auto flex max-w-shell items-center justify-between gap-4 px-6 py-6 md:px-10">
        <a href="#top" onClick={(e) => onAnchor(e, "#top")} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-hair bg-surface/80 font-mono text-sm font-semibold text-signal backdrop-blur">
            MY
          </span>
          <span className="hidden text-sm font-medium text-fg sm:inline">{copy.hero.name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {copy.nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => onAnchor(e, l.href)} className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={copy.toggle.aria}
          className="inline-flex h-11 min-w-[2.75rem] items-center justify-center gap-1.5 rounded-full border border-hair bg-ink/40 px-4 font-mono text-xs font-medium text-fg-muted backdrop-blur transition-colors duration-200 hover:border-signal hover:text-fg"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          {copy.toggle.label}
        </button>
      </header>

      <main id="top">
        {prefersReduced ? (
          /* ===== Static, readable fallback ===== */
          <section className="mx-auto max-w-shell px-6 pb-16 pt-32 md:px-10">
            <Portrait alt={copy.hero.portraitAlt} className="mb-8 h-44 w-36" />
            <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{copy.hero.name}</h1>
            <p className="mt-4 text-2xl font-medium text-fg-muted sm:text-3xl">
              {copy.hero.tagline[0]} <span className="text-warm">{copy.hero.tagline[1]}</span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">{copy.hero.bio}</p>
            <ol className="mt-14 space-y-5">
              {chapters.map((c) => (
                <li key={c.k} className="rounded-2xl border border-hair bg-surface/60 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-hair text-lg text-signal">{Icon[c.icon]({})}</span>
                    <p className="mono-label text-fg-faint">{c.eyebrow}</p>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-fg">{c.title}</h2>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-fg-muted">{c.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tech.map((t) => (
                      <span key={t} className="rounded-lg border border-hair bg-surface-2 px-3 py-1.5 text-sm text-fg/90">{t}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : (
          /* ===== The scroll theater ===== */
          <section className="theater-track relative" style={{ height: "600vh" }} aria-label={copy.hero.eyebrow}>
            <div className="scene stage-3d">
              {/* Central actor: the product stack */}
              <div className={`tower absolute left-1/2 top-[35%] ml-[-160px] mt-[-180px] h-[360px] w-[320px] lg:top-[46%] lg:ml-0 ${towerSide}`}>
                {chapters.map((c, i) => (
                  <Slab key={c.k} chapter={c} i={i} />
                ))}
              </div>

              {/* Intro overlay — fades out as the stack takes over */}
              <div className="intro pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
                <Portrait alt={copy.hero.portraitAlt} className="mb-7 h-40 w-[8.5rem] sm:h-48 sm:w-40" />
                <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
                <h1 className="mt-5 text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl">{copy.hero.name}</h1>
                <p className="mt-4 text-2xl font-medium text-fg-muted sm:text-3xl">
                  {copy.hero.tagline[0]} <span className="text-warm">{copy.hero.tagline[1]}</span>
                </p>
                <div className="mt-12 flex flex-col items-center gap-2 text-fg-faint">
                  <span className="mono-label">{copy.hero.scrollHint}</span>
                  <span className="scroll-dot text-xl">{Icon.arrowDown({})}</span>
                </div>
              </div>

              {/* Chapters — narrate each layer, crossfading with the stack */}
              {chapters.map((c) => (
                <div
                  key={c.k}
                  className={`chapter absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink from-55% via-ink to-transparent px-6 pb-14 pt-20 text-center md:text-start lg:inset-y-0 lg:bottom-auto lg:flex lg:w-[46%] lg:flex-col lg:justify-start lg:bg-none lg:px-0 lg:ps-[8%] lg:pb-0 lg:pt-[23vh] ${chapterSide}`}
                >
                  <div className="mx-auto max-w-md lg:mx-0">
                    <Eyebrow>{c.eyebrow}</Eyebrow>
                    <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">{c.title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-fg-muted md:text-lg">{c.body}</p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                      {c.tech.map((t) => (
                        <span key={t} className="rounded-lg border border-hair bg-surface-2 px-3 py-1.5 font-mono text-xs text-fg/90">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== SELECTED WORK ===== */}
        <section id="work" className="mx-auto max-w-shell scroll-mt-24 px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>{copy.work.eyebrow}</Eyebrow>
              <h2 className="reveal-title mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{copy.work.heading}</h2>
            </div>
            <p className="max-w-xs text-sm text-fg-faint">{copy.work.note}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3" style={{ perspective: "1000px" }}>
            {copy.work.items.map((w, i) => (
              <article
                key={i}
                data-reveal
                onMouseMove={tiltMove}
                onMouseLeave={tiltReset}
                className="flex flex-col overflow-hidden rounded-2xl border border-hair bg-surface/60 [transform-style:preserve-3d]"
              >
                <div className="relative aspect-[16/10] border-b border-hair blueprint-grid">
                  <span className="absolute inset-0 grid place-items-center font-mono text-xs text-fg-faint">{w.status}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span key={t} className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-signal/80">{t}</span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-fg">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{w.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== APPROACH ===== */}
        <section id="approach" className="mx-auto max-w-shell scroll-mt-24 px-6 py-20 md:px-10 md:py-28">
          <div>
            <Eyebrow>{copy.approach.eyebrow}</Eyebrow>
            <h2 className="reveal-title mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{copy.approach.heading}</h2>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.approach.steps.map((step) => (
              <li key={step.k} data-reveal className="relative rounded-2xl border-s-2 border-hair bg-surface/40 p-6 transition-colors duration-300 hover:border-s-signal">
                <span className="font-mono text-sm text-signal">{step.k}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="mx-auto max-w-shell scroll-mt-24 px-6 py-20 md:px-10 md:py-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-hair bg-surface/60 px-6 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" />
            <div className="relative mx-auto max-w-2xl">
              <Eyebrow>{copy.contact.eyebrow}</Eyebrow>
              <h2 className="reveal-title mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">{copy.contact.heading}</h2>
              <p data-reveal className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">{copy.contact.body}</p>
              <a
                href={`mailto:${copy.contact.email}`}
                onMouseMove={magnetMove}
                onMouseLeave={magnetReset}
                className="mt-9 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-signal px-8 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-warm"
              >
                {Icon.mail({ className: "text-base" })}
                {copy.contact.cta}
              </a>
              <p className="mt-4 font-mono text-sm text-fg-muted">{copy.contact.email}</p>
              <div className="mt-10 flex items-center justify-center gap-3">
                {copy.contact.socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-hair text-fg-muted transition-colors duration-200 hover:border-signal hover:text-fg">
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
