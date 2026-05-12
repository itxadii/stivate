"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const FRAME_COUNT = 240;
const FRAMES_DIR = "/frames/hero_";
const BATCH_SIZE = 8;
// ─────────────────────────────────────────────────────────────────────────────

type Phase = "looping" | "transitioning" | "scrubbing";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const currentIdxRef = useRef(0);
  const phaseRef = useRef<Phase>("looping");
  const stRef = useRef<ScrollTrigger | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("looping");

  // ── paint ─────────────────────────────────────────────────────────────────
  const paintFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // ── preload frames ────────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const frames = framesRef.current;
    const objURLs: string[] = [];

    const loadBatch = async (start: number) => {
      const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
      const tasks = [];

      for (let i = start; i < end; i++) {
        const idx = i;
        tasks.push(
          fetch(`${FRAMES_DIR}${String(idx + 1).padStart(4, "0")}.jpg`)
            .then(r => r.blob())
            .then(blob => new Promise<void>(resolve => {
              const url = URL.createObjectURL(blob);
              objURLs.push(url);
              const img = new Image();
              img.onload = () => {
                frames[idx] = img;
                loaded++;
                if (idx === 0) paintFrame(0);
                setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
                resolve();
              };
              img.onerror = () => { loaded++; resolve(); };
              img.src = url;
            }))
        );
      }

      await Promise.all(tasks);
      if (end < FRAME_COUNT) await loadBatch(end);
    };

    loadBatch(0);
    return () => objURLs.forEach(u => URL.revokeObjectURL(u));
  }, [paintFrame]);

  // ── canvas size ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 854;
    canvas.height = 480;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "low";
    }
  }, []);

  // ── transition: video → canvas scrub ─────────────────────────────────────
  // Called once when the user first scrolls.
  // If frames aren't ready yet we wait; the video keeps looping in the bg.
  const transitionToScrub = useCallback(() => {
    if (phaseRef.current !== "looping") return;
    phaseRef.current = "transitioning";
    setPhase("transitioning");

    const doSwitch = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      // Paint the current video frame onto canvas before fade so there's
      // no blank flash during the crossfade.
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Crossfade: video out, canvas in
      gsap.to(video, {
        opacity: 0, duration: 0.5, ease: "power2.out",
        onComplete: () => { video.pause(); video.style.display = "none"; }
      });
      gsap.to(canvas, { opacity: 1, duration: 0.5, ease: "power2.out" });

      phaseRef.current = "scrubbing";
      setPhase("scrubbing");

      // Now enable the pinned ScrollTrigger scrub
      stRef.current?.enable();
      // Refresh so GSAP recalculates page height now that pin is active
      ScrollTrigger.refresh();
    };

    // If frames are ready: switch immediately. Otherwise wait.
    if (loadProgress === 100) {
      doSwitch();
    } else {
      const check = setInterval(() => {
        if (phaseRef.current === "transitioning" &&
          framesRef.current.every(f => f !== null)) {
          clearInterval(check);
          doSwitch();
        }
      }, 100);
    }
  }, [loadProgress]);

  // ── GSAP setup ────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Entrance animations (play once on mount)
      gsap.fromTo(headingRef.current,
        { autoAlpha: 0, y: 80 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(paragraphRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1.2, delay: 0.25, ease: "power3.out" }
      );
      gsap.fromTo(buttonsRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 1, delay: 0.45, ease: "power3.out" }
      );

      // ── Scroll-driven frame scrub + text fade ────────────────────────────
      // ScrollTrigger starts DISABLED — enabled only after video→canvas switch.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=150%",
          scrub: 0.5,           // snappier than 1.5 for frame scrub
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: 2000,
          // disabled until transition completes — stored in stRef so
          // transitionToScrub() can call .enable() on it
          onToggle: (self) => { stRef.current = self; },
          onUpdate: (self) => {
            const idx = Math.min(
              FRAME_COUNT - 1,
              Math.floor(self.progress * FRAME_COUNT)
            );
            if (idx !== currentIdxRef.current) {
              currentIdxRef.current = idx;
              paintFrame(idx);
            }
          },
        },
      });

      // Store ref immediately after creation
      stRef.current = ScrollTrigger.getAll().at(-1) ?? null;
      // Disable until the user scrolls and frames are ready
      stRef.current?.disable();

      tl.addLabel("start")
        .to(headingRef.current, { autoAlpha: 0, y: -60, ease: "power1.in" }, "start")
        .to(paragraphRef.current, { autoAlpha: 0, y: -36, ease: "power1.in" }, "start+=0.1")
        .to(buttonsRef.current, { autoAlpha: 0, y: -20, ease: "power1.in" }, "start+=0.15");

    }, heroRef);

    return () => ctx.revert();
  }, [paintFrame]);

  // ── Detect first meaningful scroll → trigger transition ───────────────────
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        transitionToScrub();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transitionToScrub]);

  const fullyLoaded = loadProgress === 100;

  return (
    <div ref={heroRef} className="relative h-screen w-full bg-black overflow-hidden">

      {/* ── Looping video (visible during phase="looping") ── */}
      <video
        ref={videoRef}
        src="/your-video.webm"      // ← swap to your file
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 1 }}
      />

      {/* ── Canvas (hidden until transition, then scrub takes over) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", opacity: 0 }}
      />

      {/* Loading overlay — shown until frames are ready */}
      <div
        className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center transition-opacity duration-700"
        style={{ opacity: fullyLoaded ? 0 : 1, pointerEvents: fullyLoaded ? "none" : "auto" }}
      >
        <div className="w-48 h-px bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-white rounded-full transition-all duration-150"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <p className="mt-4 text-white/30 text-xs tracking-[0.3em] uppercase tabular-nums">
          {loadProgress}%
        </p>
      </div>

      {/* Ambient overlays */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-lime-400/10 blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/textures/noise.png')", backgroundRepeat: "repeat", backgroundSize: "256px" }}
      />

      {/* Content */}
      <div className="relative z-30 flex h-full items-center px-8 md:px-20">
        <div className="max-w-6xl">
          <h1
            ref={headingRef}
            className="text-white text-[4rem] md:text-[7rem] leading-[0.9] tracking-[-0.06em] font-semibold"
            style={{ visibility: "hidden" }}
          >
            Cinematic<br />Digital Motion
          </h1>
          <p
            ref={paragraphRef}
            className="mt-8 max-w-2xl text-white/70 text-lg md:text-xl leading-relaxed"
            style={{ visibility: "hidden" }}
          >
            Premium futuristic web experiences engineered for modern creative
            brands and automation-first businesses.
          </p>
          <div ref={buttonsRef} className="mt-10 flex gap-4" style={{ visibility: "hidden" }}>
            <button className="rounded-2xl bg-white px-8 py-4 text-black transition-all duration-300 hover:scale-[1.03]">
              Start Project
            </button>
            <button className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-8 py-4 text-white transition-all duration-300 hover:bg-white/20">
              Explore Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}