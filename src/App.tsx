import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogIn,
  LogOut,
  Menu,
  X,
  Camera,
  CheckCircle2,
  Home,
  Upload as UploadIcon,
  Sword,
  Trophy,
  User,
  Smile,
} from "lucide-react";

import { brand, sampleImages } from "./constants";
import { ViewType, ImageData, BatchLabelPayload } from "./types";

import Logo from "./components/ui/Logo";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Pill from "./components/ui/Pill";
import FruitNinjaLabelingTool from "./components/labeling/FruitNinjaLabelingTool";

import HomeView from "./views/HomeView";
import UploadView from "./views/UploadView";
import LeaderboardView from "./views/LeaderboardView";
import ProfileView from "./views/ProfileView";
import AvatarView from "./views/AvatarView";
import LoginView from "./views/LoginView";

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV: { key: ViewType; label: string; icon: React.ReactNode }[] = [
  { key: "home",        label: "Home",        icon: <Home className="h-4 w-4" /> },
  { key: "upload",      label: "Upload",      icon: <UploadIcon className="h-4 w-4" /> },
  { key: "label4",      label: "Label",       icon: <Sword className="h-4 w-4" /> },
  { key: "leaderboard", label: "Leaderboard", icon: <Trophy className="h-4 w-4" /> },
  { key: "profile",     label: "Profile",     icon: <User className="h-4 w-4" /> },
  { key: "avatar",      label: "Avatar",      icon: <Smile className="h-4 w-4" /> },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView]               = useState<ViewType>("home");
  const [loggedIn, setLoggedIn]       = useState(true);
  const [points, setPoints]           = useState(420);
  const [queue, setQueue]             = useState<ImageData[]>(sampleImages);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("trainer");

  function navigate(v: ViewType) {
    setView(v);
    setMobileOpen(false);
  }

  return (
    <div className={`min-h-screen ${brand.bg}`}>

      {/* ── Top nav ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50">
        {/* Glassmorphism bar */}
        <div className="border-b border-white/8 bg-[#04090f]/80 backdrop-blur-2xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">

            {/* Logo + desktop links */}
            <div className="flex items-center gap-6">
              <button onClick={() => navigate("home")} className="focus:outline-none">
                <Logo />
              </button>

              <div className="hidden md:flex items-center gap-1">
                {NAV.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => navigate(key)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150 ${
                      view === key
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-white/55 hover:text-white hover:bg-white/6"
                    }`}
                  >
                    {icon}
                    {label}
                    {key === "label4" && (
                      <span className="ml-1 rounded-full bg-cyan-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                        PLAY
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Pill className="hidden bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 md:flex text-xs">
                <span className="font-bold">{points.toLocaleString()}</span> pts
              </Pill>

              {loggedIn ? (
                <Button
                  variant="outline"
                  onClick={() => { setLoggedIn(false); navigate("home"); }}
                  className="text-sm"
                >
                  <LogOut className="mr-1.5 h-3.5 w-3.5" /> Log out
                </Button>
              ) : (
                <Button onClick={() => navigate("login")} className="text-sm">
                  <LogIn className="mr-1.5 h-3.5 w-3.5" /> Sign in
                </Button>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden rounded-xl p-2 text-white/70 hover:bg-white/8 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="md:hidden border-b border-white/8 bg-[#04090f]/95 backdrop-blur-2xl"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => navigate(key)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      view === key
                        ? "bg-white/10 text-white"
                        : "text-white/55 hover:text-white hover:bg-white/6"
                    }`}
                  >
                    {icon} {label}
                  </button>
                ))}
                <div className="pt-2 border-t border-white/8 mt-2">
                  <div className="flex items-center justify-between px-3 py-2 text-sm">
                    <span className="text-white/40">Points</span>
                    <span className="text-cyan-400 font-bold">{points.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <AnimatePresence mode="wait">

          {view === "home" && (
            <HomeView key="home" points={points} onNavigate={navigate} />
          )}

          {view === "upload" && (
            <UploadView
              key="upload"
              queue={queue}
              onQueueUpdate={setQueue}
              onNavigate={navigate}
            />
          )}

          {view === "label4" && (
            <motion.section
              key="label4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Floor Ninja
                  </h1>
                  <p className="text-white/45 text-sm mt-0.5">
                    Slash the right floor type — wrong slash ends the game instantly
                  </p>
                </div>
                <Pill className="bg-white/8 text-white/60 border border-white/10">
                  <Camera className="h-3.5 w-3.5" /> {queue.length} queued
                </Pill>
              </div>

              {queue.length > 0 ? (
                <FruitNinjaLabelingTool
                  images={queue}
                  selectedAvatar={selectedAvatar}
                  onSubmit={(payload: BatchLabelPayload) => {
                    setQueue((q) => q.slice(payload.labeledCount));
                    setPoints((p) => p + payload.labeledCount * 5);
                  }}
                />
              ) : (
                <Card className="p-12 text-center">
                  <div className="mx-auto mb-4 w-fit rounded-2xl bg-emerald-400/12 p-4 border border-emerald-400/15">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Queue empty!</h3>
                  <p className="text-white/45 text-sm mb-6 max-w-sm mx-auto">
                    You've labeled everything in your queue. Upload more images or check the leaderboard.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button onClick={() => navigate("upload")}>Upload more</Button>
                    <Button variant="outline" onClick={() => navigate("leaderboard")}>
                      Leaderboard
                    </Button>
                  </div>
                </Card>
              )}
            </motion.section>
          )}

          {view === "leaderboard" && (
            <LeaderboardView key="leaderboard" points={points} onNavigate={navigate} />
          )}

          {view === "profile" && (
            <ProfileView key="profile" points={points} />
          )}

          {view === "avatar" && (
            <AvatarView
              key="avatar"
              points={points}
              selectedAvatar={selectedAvatar}
              onAvatarSelect={setSelectedAvatar}
            />
          )}

          {view === "login" && (
            <LoginView
              key="login"
              onLogin={() => { setLoggedIn(true); navigate("home"); }}
            />
          )}

        </AnimatePresence>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/6 mt-10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <span>🛡️</span>
            <span>Built for safer mobility in aged care</span>
          </div>
          <div className="text-white/20 text-sm">
            © {new Date().getFullYear()} Senstride
          </div>
        </div>
      </footer>
    </div>
  );
}
