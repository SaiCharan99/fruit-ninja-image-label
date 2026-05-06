import React from "react";
import { motion } from "framer-motion";
import {
  Upload,
  ImageIcon,
  Trophy,
  Users,
  Crown,
  BarChart3,
  Award,
  ChevronRight,
  Zap,
  Target,
  Star,
} from "lucide-react";
import { ViewType } from "../types";
import { sampleImages, floorTypes } from "../constants";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

interface HomeViewProps {
  points: number;
  onNavigate: (view: ViewType) => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.09 } },
};

const HomeView: React.FC<HomeViewProps> = ({ points, onNavigate }) => {
  const heroImages = sampleImages.slice(0, 6);
  const nextBadgeAt = 500;
  const progress = Math.min((points / nextBadgeAt) * 100, 100);

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      {/* ── Hero ── */}
      <motion.div variants={fadeUp}>
        <div
          className="relative overflow-hidden rounded-3xl border border-white/8 p-8 md:p-10"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 10% 0%, rgba(6,182,212,0.14) 0%, transparent 55%)," +
              "radial-gradient(ellipse 80% 60% at 90% 10%, rgba(59,130,246,0.12) 0%, transparent 50%)," +
              "linear-gradient(160deg, #081525 0%, #050d1a 100%)",
          }}
        >
          {/* decorative grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 grid items-center gap-10 md:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-400">
                <Trophy className="h-3.5 w-3.5" />
                Weekly challenge live
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                Build smarter{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  fall‑prevention AI
                </span>
              </h1>
              <p className="mt-4 max-w-md text-base text-white/55 leading-relaxed">
                Label floor images in our Fruit Ninja&ndash;style game. Earn
                points, unlock avatars, and help keep aged‑care environments
                safer.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => onNavigate("label4")} className="px-6 py-2.5 text-sm font-bold">
                  <Zap className="mr-2 h-4 w-4" /> Play now
                </Button>
                <Button variant="outline" onClick={() => onNavigate("upload")} className="px-6 py-2.5 text-sm">
                  <Upload className="mr-2 h-4 w-4" /> Upload images
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-white/40">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> 2,481 contributors
                </span>
                <span className="h-4 w-px bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="h-4 w-4" /> 48,000+ images labeled
                </span>
              </div>
            </div>

            {/* Right — image grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {heroImages.map((im, i) => (
                <div
                  key={im.id}
                  className="group relative overflow-hidden rounded-2xl"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={im.url}
                    alt={im.fallback}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/200x200/1e3a5f/64748b?text=${encodeURIComponent(im.fallback ?? "Floor")}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <span className="text-xs text-white/80 font-medium truncate">
                      {im.fallback}
                    </span>
                  </div>
                  {/* stagger entrance */}
                  <motion.div
                    className="absolute inset-0 bg-[#050d1a]"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stats row ── */}
      <motion.div variants={fadeUp} className="grid gap-4 md:grid-cols-3">
        {/* Points */}
        <Card className="p-6 group hover:border-cyan-500/30 transition-colors duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Your points</p>
              <div className="text-4xl font-black text-white">{points.toLocaleString()}</div>
            </div>
            <div className="rounded-xl bg-amber-400/12 p-2.5 border border-amber-400/15">
              <Crown className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-white/35">
              <span>Next badge</span>
              <span>{nextBadgeAt - Math.min(points, nextBadgeAt)} pts away</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </Card>

        {/* Images labeled */}
        <Card className="p-6 group hover:border-sky-500/30 transition-colors duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">This week</p>
              <div className="text-4xl font-black text-white">38</div>
            </div>
            <div className="rounded-xl bg-sky-400/12 p-2.5 border border-sky-400/15">
              <BarChart3 className="h-5 w-5 text-sky-400" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-white/35">
              <span>Weekly goal</span>
              <span>38 / 50</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: "76%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-6 group hover:border-violet-500/30 transition-colors duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Badges earned</p>
              <div className="text-4xl font-black text-white">3</div>
            </div>
            <div className="rounded-xl bg-violet-400/12 p-2.5 border border-violet-400/15">
              <Award className="h-5 w-5 text-violet-400" />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["🔥 Streak", "🤝 Helper", "🥈 Silver"].map((b) => (
              <span
                key={b}
                className="px-2.5 py-1 rounded-lg bg-white/8 border border-white/10 text-xs text-white/75 font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* ── Floor types showcase ── */}
      <motion.div variants={fadeUp}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Floor types</h2>
            <p className="text-sm text-white/40">Six categories to label — pick one and start slashing</p>
          </div>
          <button
            onClick={() => onNavigate("label4")}
            className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            Play now <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {floorTypes.map((ft) => (
            <button
              key={ft.name}
              onClick={() => onNavigate("label4")}
              className={`group relative overflow-hidden rounded-2xl border border-white/10
                hover:border-white/30 hover:scale-105 active:scale-95
                transition-all duration-200 ${ft.color} p-4`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="relative text-center">
                <div className="text-2xl mb-1.5">{ft.emoji}</div>
                <div className="text-white text-xs font-semibold">{ft.name}</div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── How it works ── */}
      <motion.div variants={fadeUp}>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">How it works</h2>
          <p className="text-sm text-white/40">Three simple steps to earn points</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <Target className="h-5 w-5 text-cyan-400" />,
              bg: "bg-cyan-400/10 border-cyan-400/15",
              step: "01",
              title: "Pick a floor type",
              desc: "Choose from Grass, Wood, Carpet, Marble, Tile, or Concrete as your target.",
            },
            {
              icon: <Zap className="h-5 w-5 text-orange-400" />,
              bg: "bg-orange-400/10 border-orange-400/15",
              step: "02",
              title: "Slash matching images",
              desc: "Images fly across the arena — drag to slash only the ones that match your target.",
            },
            {
              icon: <Star className="h-5 w-5 text-yellow-400" />,
              bg: "bg-yellow-400/10 border-yellow-400/15",
              step: "03",
              title: "Earn points & badges",
              desc: "Each correct slash earns points. Build combos for bonus points and unlock avatars.",
            },
          ].map((s) => (
            <Card key={s.step} className="p-5 flex gap-4 items-start">
              <div className={`shrink-0 rounded-xl p-2.5 border ${s.bg}`}>{s.icon}</div>
              <div>
                <div className="text-[10px] text-white/25 font-bold tracking-widest mb-1">STEP {s.step}</div>
                <div className="text-sm font-bold text-white mb-1">{s.title}</div>
                <div className="text-xs text-white/45 leading-relaxed">{s.desc}</div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* ── CTA row ── */}
      <motion.div variants={fadeUp} className="grid gap-4 md:grid-cols-2">
        <Card
          className="group relative overflow-hidden p-6 cursor-pointer hover:border-cyan-500/30 transition-colors duration-300"
          onClick={() => onNavigate("label4")}
        >
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-cyan-500/8 blur-2xl group-hover:bg-cyan-500/15 transition-colors" />
          <div className="relative">
            <p className="text-xs text-white/35 uppercase tracking-widest mb-2">Quick action</p>
            <h3 className="text-xl font-bold text-white mb-1">Jump into labeling</h3>
            <p className="text-sm text-white/50 mb-4">Continue where you left off and keep your streak alive.</p>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
              Start playing <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card
          className="group relative overflow-hidden p-6 cursor-pointer hover:border-amber-500/30 transition-colors duration-300"
          onClick={() => onNavigate("leaderboard")}
        >
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-amber-500/8 blur-2xl group-hover:bg-amber-500/15 transition-colors" />
          <div className="relative">
            <p className="text-xs text-white/35 uppercase tracking-widest mb-2">Competition</p>
            <h3 className="text-xl font-bold text-white mb-1">Check the leaderboard</h3>
            <p className="text-sm text-white/50 mb-4">See how you stack up against others this week.</p>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm group-hover:gap-3 transition-all">
              View rankings <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default HomeView;
