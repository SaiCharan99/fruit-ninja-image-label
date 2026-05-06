import React, { useEffect, useRef, useState, useCallback } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { ImageData, BatchLabelPayload } from "../../types";
import { floorTypes } from "../../constants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FlyingItem {
  id: string;
  url: string;
  fallback: string;
  floorType: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  slashed: boolean;
  slashTime: number;
  pointsEarned: number;
  correct: boolean;
  wasVisible: boolean;
}

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

// ─── Image pool ───────────────────────────────────────────────────────────────

const FQ = "?w=280&q=80&auto=format&fit=crop";
const BASE = "https://images.unsplash.com/photo-";

const POOL: Record<string, { url: string; fallback: string }[]> = {
  Grass: [
    { url: `${BASE}1558618666-fcd25c85cd64${FQ}`, fallback: "Grass" },
    { url: `${BASE}1500382017468-9049fed747ef${FQ}`, fallback: "Grass" },
    { url: `${BASE}1416879595882-3373a0480b5b${FQ}`, fallback: "Grass" },
    { url: `${BASE}1462275646964-a0e3386b89fa${FQ}`, fallback: "Grass" },
    { url: `${BASE}1471879832106-c7ab9e0cee23${FQ}`, fallback: "Grass" },
    { url: `${BASE}1473448912268-2022ce9d1d6a${FQ}`, fallback: "Grass" },
    { url: `${BASE}1487530811176-3780de880c2d${FQ}`, fallback: "Grass" },
    { url: `${BASE}1543168256-4904c35d8a49${FQ}`, fallback: "Grass" },
  ],
  Wood: [
    { url: `${BASE}1505693416388-ac5ce068fe85${FQ}`, fallback: "Wood" },
    { url: `${BASE}1516455590571-18256e5bb9ff${FQ}`, fallback: "Wood" },
    { url: `${BASE}1541123437800-1bb1317badc2${FQ}`, fallback: "Wood" },
    { url: `${BASE}1493809842364-78817add7ffb${FQ}`, fallback: "Wood" },
    { url: `${BASE}1533090161767-e6ffed986c88${FQ}`, fallback: "Wood" },
    { url: `${BASE}1572085783407-09aa286fe376${FQ}`, fallback: "Wood" },
    { url: `${BASE}1513694203232-719a280e7fae${FQ}`, fallback: "Wood" },
    { url: `${BASE}1558036117-15d82a90b9b1${FQ}`, fallback: "Wood" },
  ],
  Carpet: [
    { url: `${BASE}1560448204-e02f11c3d0e2${FQ}`, fallback: "Carpet" },
    { url: `${BASE}1586023492125-27b2c045efd7${FQ}`, fallback: "Carpet" },
    { url: `${BASE}1555041469-a586c61ea9bc${FQ}`, fallback: "Carpet" },
    { url: `${BASE}1484101403633-562f891dc89a${FQ}`, fallback: "Carpet" },
    { url: `${BASE}1618220179428-22790b461013${FQ}`, fallback: "Carpet" },
    { url: `${BASE}1581291518857-4ae2f8e39668${FQ}`, fallback: "Carpet" },
    { url: `${BASE}1567016432779-094069958ea5${FQ}`, fallback: "Carpet" },
    { url: `${BASE}1596162954151-cdcb4c0f70a8${FQ}`, fallback: "Carpet" },
  ],
  Marble: [
    { url: `${BASE}1600585154340-be6161a56a0c${FQ}`, fallback: "Marble" },
    { url: `${BASE}1600566752547-1ce00bcda073${FQ}`, fallback: "Marble" },
    { url: `${BASE}1560440021-33f9b867899d${FQ}`, fallback: "Marble" },
    { url: `${BASE}1565538810643-b5bdb0887544${FQ}`, fallback: "Marble" },
    { url: `${BASE}1615873968403-89daaf3bc1b4${FQ}`, fallback: "Marble" },
    { url: `${BASE}1519710164239-da1d73ab5b53${FQ}`, fallback: "Marble" },
    { url: `${BASE}1578683220520-57e16e43e861${FQ}`, fallback: "Marble" },
  ],
  Tile: [
    { url: `${BASE}1582582429416-3e6514760fd6${FQ}`, fallback: "Tile" },
    { url: `${BASE}1584622650111-993a426fbf0a${FQ}`, fallback: "Tile" },
    { url: `${BASE}1558618047-ffc6a6f95cac${FQ}`, fallback: "Tile" },
    { url: `${BASE}1507003211169-0a1dd7228f2d${FQ}`, fallback: "Tile" },
    { url: `${BASE}1550009158-9ebf69173e03${FQ}`, fallback: "Tile" },
    { url: `${BASE}1567538096630-e0c55bd6374c${FQ}`, fallback: "Tile" },
  ],
  Concrete: [
    { url: `${BASE}1618221118493-9cfa1a1c00da${FQ}`, fallback: "Concrete" },
    { url: `${BASE}1497366811353-6870744d04b2${FQ}`, fallback: "Concrete" },
    { url: `${BASE}1545325483-afc7b5d76e29${FQ}`, fallback: "Concrete" },
    { url: `${BASE}1581578731548-c64695cc6952${FQ}`, fallback: "Concrete" },
    { url: `${BASE}1504307651254-35680f356dfd${FQ}`, fallback: "Concrete" },
    { url: `${BASE}1557499305-0f9beea51843${FQ}`, fallback: "Concrete" },
  ],
};

// ─── Physics constants ────────────────────────────────────────────────────────
//
// Low gravity = long, floaty arcs that reach the top of the arena.
// vy is computed per-item from the actual arena height so items always arc
// all the way to the top regardless of window size or fullscreen mode.

const GRAVITY       = 0.022;  // very low → long, slow, graceful arcs (~9 s each)
const TARGET_SLASHES = 15;
const MAX_ACTIVE    = 4;       // each item lives ~9 s, so 4 is plenty
const ITEM_SIZE     = 130;
const TARGET_CHANCE = 0.44;
const TRAIL_LIFE    = 300;
const SLASH_ANIM_MS = 550;
const COMBO_RESET_MS = 1500;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

let _uid = 0;
function uid() { return `${++_uid}-${Date.now().toString(36)}`; }

/**
 * Create a flying item that arcs from just below the arena floor all the way
 * to near the top.  vy is derived from arenaH so the behaviour scales with
 * any window / fullscreen height.
 *
 *  physics:  max_rise = vy² / (2 × GRAVITY)
 *  want:     max_rise ≈ arenaH + ITEM_SIZE  (full traversal)
 *  so:       vy = −sqrt(2 × GRAVITY × reach)
 */
function makeItem(
  arenaW: number,
  arenaH: number,
  targetType: string,
  forceTarget = false,
): FlyingItem {
  const allTypes = Object.keys(POOL);
  const isTarget = forceTarget || Math.random() < TARGET_CHANCE;
  const decoyTypes = allTypes.filter((t) => t !== targetType);
  const type = isTarget
    ? targetType
    : decoyTypes[Math.floor(Math.random() * decoyTypes.length)];

  const pool = POOL[type] ?? POOL.Grass;
  const img  = pool[Math.floor(Math.random() * pool.length)];

  // Reach: 88 – 105 % of full arena traversal (top ± a little)
  const reach = (arenaH + ITEM_SIZE) * rand(0.88, 1.05);
  const vyMag = Math.sqrt(2 * GRAVITY * reach);

  return {
    id:          uid(),
    url:         img.url,
    fallback:    img.fallback,
    floorType:   type,
    x:           rand(ITEM_SIZE * 0.65, arenaW - ITEM_SIZE * 0.65),
    y:           arenaH + ITEM_SIZE + 4,   // just off the bottom edge
    vx:          rand(-1.6, 1.6),          // gentle horizontal drift
    vy:          -vyMag,                   // guaranteed to reach near the top
    rotation:    rand(-20, 20),
    rotSpeed:    rand(-1.2, 1.2),          // slow spin matches the slow arc
    size:        ITEM_SIZE,
    slashed:     false,
    slashTime:   0,
    pointsEarned: 0,
    correct:     false,
    wasVisible:  false,
  };
}

// ─── Static star field ────────────────────────────────────────────────────────

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  cx: `${(i * 41.3 + 7) % 100}%`,
  cy: `${(i * 67.7 + 13) % 100}%`,
  r:  0.4 + (i % 4) * 0.35,
  opacity: 0.07 + (i % 7) * 0.045,
}));

function StarField() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {STARS.map((s) => (
        <circle key={s.id} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
      ))}
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  images: ImageData[];
  selectedAvatar: string;
  onSubmit: (payload: BatchLabelPayload) => void;
}

const FruitNinjaLabelingTool: React.FC<Props> = ({ onSubmit }) => {
  // ── UI state ──────────────────────────────────────────────────────────────
  const [phase, setPhase]           = useState<"select"|"playing"|"gameover"|"win">("select");
  const [targetType, setTargetType] = useState("");
  const [score, setScore]           = useState(0);
  const [lives, setLives]           = useState(3);
  const [correctSlashes, setCorrectSlashes] = useState(0);
  const [combo, setCombo]           = useState(0);
  const [displayItems, setDisplayItems]   = useState<FlyingItem[]>([]);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [isFullscreen, setIsFullscreen]   = useState(false);
  const [comboPopups, setComboPopups]     = useState<
    { id: string; x: number; y: number; text: string }[]
  >([]);

  // ── Game-loop refs (never stale) ──────────────────────────────────────────
  const itemsRef   = useRef<FlyingItem[]>([]);
  const livesRef   = useRef(3);
  const scoreRef   = useRef(0);
  const correctRef = useRef(0);
  const comboRef   = useRef(0);
  const phaseRef   = useRef<"select"|"playing"|"gameover"|"win">("select");
  const targetRef  = useRef("");
  const rafRef     = useRef(0);
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const labeledRef    = useRef<{ imageId: string; type: string }[]>([]);

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const containerRef  = useRef<HTMLDivElement>(null);  // fullscreen element
  const arenaRef      = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const pointerDownRef = useRef(false);
  const trailRef       = useRef<TrailPoint[]>([]);

  // ── Fullscreen ────────────────────────────────────────────────────────────

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFSChange);
    return () => document.removeEventListener("fullscreenchange", onFSChange);
  }, []);

  // Resize the canvas whenever the arena changes size (fullscreen toggle etc.)
  useEffect(() => {
    function sync() {
      const canvas = canvasRef.current;
      const arena  = arenaRef.current;
      if (!canvas || !arena) return;
      canvas.width  = arena.clientWidth;
      canvas.height = arena.clientHeight;
    }
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [phase, isFullscreen]);

  // ── Slash trail ───────────────────────────────────────────────────────────

  function drawTrail(now: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pts = trailRef.current.filter((p) => now - p.t < TRAIL_LIFE);
    trailRef.current = pts;
    if (pts.length < 2) return;
    for (let i = 1; i < pts.length; i++) {
      const age = now - pts[i].t;
      const t   = 1 - age / TRAIL_LIFE;
      ctx.beginPath();
      ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
      ctx.lineTo(pts[i].x,     pts[i].y);
      ctx.strokeStyle = `rgba(130,235,255,${t * 0.9})`;
      ctx.lineWidth   = t * 20;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.stroke();
    }
  }

  // ── Start / restart game ──────────────────────────────────────────────────

  function startGame(type: string) {
    cancelAnimationFrame(rafRef.current);
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);

    targetRef.current  = type;
    phaseRef.current   = "playing";
    livesRef.current   = 3;
    scoreRef.current   = 0;
    correctRef.current = 0;
    comboRef.current   = 0;
    itemsRef.current   = [];
    labeledRef.current = [];
    trailRef.current   = [];
    pointerDownRef.current = false;

    setTargetType(type);
    setPhase("playing");
    setScore(0);
    setLives(3);
    setCorrectSlashes(0);
    setCombo(0);
    setWrongFlash(false);
    setComboPopups([]);

    // Read arena dimensions; fall back to sensible defaults if not yet mounted
    const arenaEl = arenaRef.current;
    const W = arenaEl?.clientWidth  ?? 820;
    const H = arenaEl?.clientHeight ?? 680;

    // Seed initial items — stagger by velocity not by y position
    const seed: FlyingItem[] = [];
    for (let i = 0; i < 5; i++) {
      const item = makeItem(W, H, type, i < 2);
      // Slight velocity stagger so they don't all arrive simultaneously
      item.vy *= (0.82 + i * 0.07);
      seed.push(item);
    }
    itemsRef.current = seed;
    setDisplayItems([...seed]);

    // ── RAF loop defined fresh every game — zero stale-closure risk ──────────
    function loop() {
      if (phaseRef.current !== "playing") return;

      const el  = arenaRef.current;
      const W2  = el?.clientWidth  ?? 820;
      const H2  = el?.clientHeight ?? 680;
      const now = Date.now();

      let missedTarget = false;
      const next: FlyingItem[] = [];

      for (const item of itemsRef.current) {
        // Keep slashed items briefly for the burst animation
        if (item.slashed) {
          if (now - item.slashTime < SLASH_ANIM_MS) next.push(item);
          continue;
        }

        let { x, y, vx, vy, rotation } = item;
        x        += vx;
        y        += vy;
        vy       += GRAVITY;
        rotation += item.rotSpeed;

        // Soft horizontal wall bounce
        if (x - item.size / 2 < 0 || x + item.size / 2 > W2) {
          vx = -vx * 0.70;
          x  = Math.max(item.size / 2, Math.min(W2 - item.size / 2, x));
        }

        const wasVisible = item.wasVisible || y < H2 - 10;

        // Fell below the arena floor
        if (y > H2 + item.size + 30) {
          if (item.floorType === targetRef.current && wasVisible) missedTarget = true;
          continue;
        }

        // Shot clean off the top — silently remove, no penalty
        if (y < -item.size - 40) continue;

        next.push({ ...item, x, y, vx, vy, rotation, wasVisible });
      }

      // Life penalty for a missed target (max once per frame)
      if (missedTarget) {
        const nl = livesRef.current - 1;
        livesRef.current = nl;
        setLives(nl);
        if (nl <= 0) {
          phaseRef.current = "gameover";
          setPhase("gameover");
          itemsRef.current = next;
          setDisplayItems([...next]);
          return;
        }
      }

      // Spawn to fill the arena
      const activeCount = next.filter((i) => !i.slashed).length;
      for (let i = 0; i < MAX_ACTIVE - activeCount; i++) {
        next.push(makeItem(W2, H2, targetRef.current));
      }

      itemsRef.current = next;
      setDisplayItems([...next]);
      drawTrail(now);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
  }

  // ── Slash logic ───────────────────────────────────────────────────────────

  function trySlash(px: number, py: number) {
    if (phaseRef.current !== "playing") return;
    for (const item of itemsRef.current) {
      if (item.slashed) continue;
      const dx = px - item.x;
      const dy = py - item.y;
      if (dx * dx + dy * dy < (item.size / 2) ** 2) {
        doSlash(item, px, py);
        return;
      }
    }
  }

  function doSlash(item: FlyingItem, px: number, py: number) {
    if (item.floorType === targetRef.current) {
      // ✅ Correct slash
      const bonus = comboRef.current * 5;
      const pts   = 10 + bonus;
      scoreRef.current  += pts;
      correctRef.current += 1;
      comboRef.current  += 1;
      labeledRef.current.push({ imageId: item.id, type: item.floorType });

      setScore(scoreRef.current);
      setCorrectSlashes(correctRef.current);
      setCombo(comboRef.current);

      const pid = uid();
      setComboPopups((p) => [
        ...p,
        { id: pid, x: px, y: py, text: bonus > 0 ? `+${pts} ×${comboRef.current}` : `+${pts}` },
      ]);
      setTimeout(() => setComboPopups((p) => p.filter((x) => x.id !== pid)), 900);

      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => { comboRef.current = 0; setCombo(0); }, COMBO_RESET_MS);

      itemsRef.current = itemsRef.current.map((i) =>
        i.id === item.id
          ? { ...i, slashed: true, slashTime: Date.now(), pointsEarned: pts, correct: true }
          : i,
      );

      if (correctRef.current >= TARGET_SLASHES) {
        cancelAnimationFrame(rafRef.current);
        setTimeout(() => {
          phaseRef.current = "win";
          setPhase("win");
          onSubmit({ labeledCount: labeledRef.current.length, labels: labeledRef.current });
        }, 700);
      }
    } else {
      // ❌ Wrong slash → game over
      comboRef.current = 0;
      setCombo(0);
      setWrongFlash(true);

      const pid = uid();
      setComboPopups((p) => [...p, { id: pid, x: px, y: py, text: "✗ NOPE!" }]);
      setTimeout(() => setComboPopups((p) => p.filter((x) => x.id !== pid)), 900);

      itemsRef.current = itemsRef.current.map((i) =>
        i.id === item.id
          ? { ...i, slashed: true, slashTime: Date.now(), pointsEarned: 0, correct: false }
          : i,
      );

      setTimeout(() => setWrongFlash(false), 700);
      setTimeout(() => {
        cancelAnimationFrame(rafRef.current);
        phaseRef.current = "gameover";
        setPhase("gameover");
      }, 480);
    }
  }

  // ── Pointer handlers ──────────────────────────────────────────────────────

  function arenaPos(e: React.PointerEvent<HTMLDivElement>) {
    const rect = arenaRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    pointerDownRef.current = true;
    const pos = arenaPos(e);
    if (!pos) return;
    trailRef.current.push({ ...pos, t: Date.now() });
    trySlash(pos.x, pos.y);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const pos = arenaPos(e);
    if (!pos) return;
    trailRef.current.push({ ...pos, t: Date.now() });
    if (pointerDownRef.current) trySlash(pos.x, pos.y);
  }

  function onPointerUp()    { pointerDownRef.current = false; }

  // ── Cleanup ───────────────────────────────────────────────────────────────

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────

  const targetFloor = floorTypes.find((f) => f.name === targetType);
  const now = Date.now();

  // ── Shared fullscreen button ──────────────────────────────────────────────

  const FSButton = () => (
    <button
      onClick={toggleFullscreen}
      title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
      className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/6
        px-3 py-1.5 text-white/60 text-xs font-medium hover:bg-white/12
        hover:text-white hover:border-white/30 transition-all duration-150"
    >
      {isFullscreen
        ? <><Minimize2 className="h-3.5 w-3.5" /> Exit</>
        : <><Maximize2 className="h-3.5 w-3.5" /> Fullscreen</>}
    </button>
  );

  // ── Arena shared background/content ──────────────────────────────────────

  const arenaStyle: React.CSSProperties = {
    background: "radial-gradient(ellipse at 50% 95%, #0a1a2e 0%, #030810 100%)",
    cursor: "crosshair",
    touchAction: "none",
    // Height: flexible in fullscreen; a tall fixed-ish value otherwise
    ...(isFullscreen
      ? { flex: 1, minHeight: 0 }
      : { height: "min(72vh, 720px)" }),
  };

  // ─── Phase: Select ──────────────────────────────────────────────────────────

  if (phase === "select") {
    return (
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl"
        style={{
          ...(isFullscreen
            ? { display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"center", width:"100vw", height:"100vh",
                background:"#030810" }
            : { minHeight: "min(72vh, 720px)" }),
          background: isFullscreen ? "#030810"
            : "radial-gradient(ellipse at 50% 90%, #0d1f38 0%, #04080f 100%)",
        }}
      >
        <StarField />
        <div className="absolute top-3 right-3 z-20"><FSButton /></div>
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center mb-10 px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/8 backdrop-blur border border-white/10 mb-5 shadow-2xl">
            <span className="text-4xl">🥷</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-3 leading-tight">
            Floor Ninja
          </h2>
          <p className="text-white/50 text-base max-w-sm mx-auto leading-relaxed">
            Pick a floor type. Slash{" "}
            <em className="text-cyan-400 not-italic font-semibold">only</em>{" "}
            those images as they arc across the arena.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/12 border border-red-500/20 text-red-400 text-xs font-medium">
            ⚠ Wrong slash = instant game over
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-lg px-4">
          {floorTypes.map((ft) => (
            <button
              key={ft.name}
              onClick={() => startGame(ft.name)}
              className={`group relative p-5 rounded-2xl border border-white/12
                hover:border-white/40 transition-all duration-200
                hover:scale-105 active:scale-95 focus:outline-none
                focus:ring-2 focus:ring-cyan-400/60 overflow-hidden ${ft.color}`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10 text-left">
                <div className="text-3xl mb-2">{ft.emoji}</div>
                <div className="text-white font-bold text-sm">{ft.name}</div>
              </div>
            </button>
          ))}
        </div>
        <p className="relative z-10 text-white/18 text-xs mt-8">
          Slash 15 correct · Miss 3 targets = game over
        </p>
      </div>
    );
  }

  // ─── Phase: Game Over ──────────────────────────────────────────────────────

  if (phase === "gameover") {
    return (
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl flex flex-col items-center justify-center text-center"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, #1a0508 0%, #04080f 100%)",
          ...(isFullscreen
            ? { width:"100vw", height:"100vh" }
            : { minHeight: "min(72vh, 720px)" }),
        }}
      >
        <StarField />
        <div className="absolute top-3 right-3 z-20"><FSButton /></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-red-900/18 blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6">
          <div className="text-7xl mb-5">💀</div>
          <h2 className="text-5xl font-black text-red-400 mb-3 tracking-tight">GAME OVER</h2>
          <p className="text-white/40 text-sm mb-6">You slashed the wrong floor type</p>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-black text-white">{score.toLocaleString()}</div>
              <div className="text-white/35 text-xs mt-0.5 uppercase tracking-widest">Points</div>
            </div>
            <div className="w-px h-10 bg-white/12" />
            <div className="text-center">
              <div className="text-3xl font-black text-cyan-400">{correctSlashes}</div>
              <div className="text-white/35 text-xs mt-0.5 uppercase tracking-widest">Correct</div>
            </div>
            <div className="w-px h-10 bg-white/12" />
            <div className="text-center">
              <div className="text-3xl font-black">{targetFloor?.emoji}</div>
              <div className="text-white/35 text-xs mt-0.5 uppercase tracking-widest">Target</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startGame(targetType)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
                text-white font-bold hover:scale-105 active:scale-95 transition-all
                shadow-lg shadow-cyan-500/20"
            >
              Try Again
            </button>
            <button
              onClick={() => { phaseRef.current = "select"; setPhase("select"); }}
              className="px-8 py-3 rounded-xl border border-white/18 text-white/65
                hover:bg-white/8 hover:text-white transition-all"
            >
              Change Floor
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Phase: Win ────────────────────────────────────────────────────────────

  if (phase === "win") {
    return (
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl flex flex-col items-center justify-center text-center"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, #0d1f06 0%, #04080f 100%)",
          ...(isFullscreen
            ? { width:"100vw", height:"100vh" }
            : { minHeight: "min(72vh, 720px)" }),
        }}
      >
        <StarField />
        <div className="absolute top-3 right-3 z-20"><FSButton /></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-900/18 blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6">
          <div className="text-7xl mb-5">🎉</div>
          <h2 className="text-5xl font-black text-yellow-400 mb-3 tracking-tight">YOU WIN!</h2>
          <p className="text-white/55 mb-6">{TARGET_SLASHES} {targetType} floors labeled!</p>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-black text-white">{score.toLocaleString()}</div>
              <div className="text-white/35 text-xs mt-0.5 uppercase tracking-widest">Points</div>
            </div>
            <div className="w-px h-10 bg-white/12" />
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">{correctSlashes}</div>
              <div className="text-white/35 text-xs mt-0.5 uppercase tracking-widest">Slashes</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startGame(targetType)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
                text-white font-bold hover:scale-105 active:scale-95 transition-all
                shadow-lg shadow-cyan-500/20"
            >
              Play Again
            </button>
            <button
              onClick={() => { phaseRef.current = "select"; setPhase("select"); }}
              className="px-8 py-3 rounded-xl border border-white/18 text-white/65
                hover:bg-white/8 hover:text-white transition-all"
            >
              Change Floor
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Phase: Playing ────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      className="select-none"
      style={isFullscreen ? {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 14,
        width: "100vw",
        height: "100vh",
        background: "#030810",
      } : { display: "flex", flexDirection: "column", gap: 10 }}
    >
      {/* ── HUD ─────────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-shrink-0">
        {/* Left: target + combo */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15 shadow-lg ${targetFloor?.color}`}>
            <span className="text-lg leading-none">{targetFloor?.emoji}</span>
            <span className="text-white font-bold text-sm leading-none">{targetType}</span>
          </div>
          {combo >= 2 && (
            <div className="px-3 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-black tracking-wide shadow-lg shadow-orange-500/30 animate-pulse">
              ×{combo} COMBO
            </div>
          )}
        </div>

        {/* Right: score / slashes / lives / fullscreen */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-white/30 text-[10px] uppercase tracking-widest">Score</div>
            <div className="text-white font-black text-xl leading-none">{score.toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-white/30 text-[10px] uppercase tracking-widest">Slashes</div>
            <div className="text-cyan-400 font-black text-xl leading-none">
              {correctSlashes}/{TARGET_SLASHES}
            </div>
          </div>
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ fontSize: 20, opacity: i < lives ? 1 : 0.18 }}>
                {i < lives ? "❤️" : "🤍"}
              </span>
            ))}
          </div>
          <FSButton />
        </div>
      </div>

      {/* ── Arena ───────────────────────────────────────────────────────────── */}
      <div
        ref={arenaRef}
        className="relative w-full rounded-3xl overflow-hidden border border-white/7"
        style={arenaStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onContextMenu={(e) => e.preventDefault()}
      >
        <StarField />

        {/* Inner vignette */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.55)" }} />

        {/* Wrong-slash flash */}
        {wrongFlash && (
          <div className="absolute inset-0 z-50 rounded-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(220,38,38,0.42) 0%, rgba(220,38,38,0.12) 100%)",
                     animation: "wrongFlash 0.65s ease-out" }} />
        )}

        {/* Flying items */}
        {displayItems.map((item) => {
          const sp       = item.slashed ? Math.min(1, (now - item.slashTime) / SLASH_ANIM_MS) : 0;
          const isTarget = item.floorType === targetRef.current;
          const ft       = floorTypes.find((f) => f.name === item.floorType);

          return (
            <div
              key={item.id}
              className="absolute pointer-events-none"
              style={{
                width:  item.size,
                height: item.size,
                left:   item.x - item.size / 2,
                top:    item.y - item.size / 2,
                transform: `rotate(${item.rotation}deg) scale(${item.slashed ? 1 + sp * 0.55 : 1})`,
                opacity:   item.slashed ? Math.max(0, 1 - sp * 1.8) : 1,
                willChange: "transform, opacity",
                zIndex: item.slashed ? 20 : 10,
              }}
            >
              {/* Floor image */}
              <img
                src={item.url}
                alt={item.floorType}
                draggable={false}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const p = e.currentTarget.parentElement;
                  if (p && !p.querySelector(".img-fb")) {
                    const d = document.createElement("div");
                    d.className = `img-fb w-full h-full rounded-2xl flex items-center justify-center text-4xl ${ft?.color ?? "bg-slate-700"}`;
                    d.textContent = ft?.emoji ?? "?";
                    p.appendChild(d);
                  }
                }}
              />

              {/* Cyan glow ring for target */}
              {isTarget && !item.slashed && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: "0 0 0 2.5px rgba(34,211,238,0.85), 0 0 28px rgba(34,211,238,0.28)" }} />
              )}

              {/* Floor type emoji badge */}
              <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-black/65 backdrop-blur flex items-center justify-center text-sm pointer-events-none shadow">
                {ft?.emoji ?? "?"}
              </div>

              {/* Slash burst overlay */}
              {item.slashed && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none flex items-center justify-center"
                  style={{
                    background: item.correct
                      ? `rgba(255,255,255,${0.75 * (1 - sp)})`
                      : `rgba(239,68,68,${0.72 * (1 - sp)})`,
                  }}
                >
                  <span className="font-black text-white drop-shadow-lg" style={{ fontSize: 20 }}>
                    {item.correct ? `+${item.pointsEarned}` : "NOPE!"}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Floating score / nope popups */}
        {comboPopups.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none font-black drop-shadow-lg"
            style={{
              left:       p.x,
              top:        p.y,
              transform:  "translate(-50%,-50%)",
              fontSize:   19,
              animation:  "floatUp 0.9s ease-out forwards",
              zIndex:     60,
              color:      p.text.startsWith("✗") ? "#f87171" : "#67e8f9",
              textShadow: "0 2px 14px rgba(34,211,238,0.7)",
            }}
          >
            {p.text}
          </div>
        ))}

        {/* Slash trail canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-40"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/6 rounded-b-3xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
            style={{ width: `${(correctSlashes / TARGET_SLASHES) * 100}%` }}
          />
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-black/45 backdrop-blur text-xs text-white/30">
            Slash <span className="text-cyan-400 font-semibold">{targetType}</span>{" "}
            {targetFloor?.emoji} · wrong slash = game over
          </div>
        </div>
      </div>
    </div>
  );
};

export default FruitNinjaLabelingTool;
