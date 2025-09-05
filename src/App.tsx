import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogIn,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Camera,
  CheckCircle2,
} from "lucide-react";

import { brand, sampleImages } from "./constants";
import { ViewType, ImageData, BatchLabelPayload } from "./types";

// Components
import Logo from "./components/ui/Logo";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Pill from "./components/ui/Pill";
import SectionTitle from "./components/ui/SectionTitle";
import RobustImage from "./components/ui/RobustImage";
import FruitNinjaLabelingTool from "./components/labeling/FruitNinjaLabelingTool";

// Views
import HomeView from "./views/HomeView";
import UploadView from "./views/UploadView";
import LeaderboardView from "./views/LeaderboardView";
import ProfileView from "./views/ProfileView";
import AvatarView from "./views/AvatarView";
import LoginView from "./views/LoginView";

export default function App() {
  const [view, setView] = useState<ViewType>("home");
  const [loggedIn, setLoggedIn] = useState(true);
  const [points, setPoints] = useState(420);
  const [queue, setQueue] = useState<ImageData[]>(sampleImages);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("trainer");

  // Navigation link style helper
  const navLink = (k: ViewType, txt: string) => (
    <button
      onClick={() => setView(k)}
      className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
        view === k
          ? "bg-white/10 text-white"
          : "text-white/70 hover:text-white hover:bg-white/5"
      }`}
      aria-current={view === k ? "page" : undefined}
    >
      {txt}
    </button>
  );

  return (
    <div className={`min-h-screen ${brand.bg}`}>
      {/* Top nav */}
      <header className="z-40 bg-transparent">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="hidden items-center gap-1 md:flex">
              {navLink("home", "Home")}
              {navLink("upload", "Upload")}
              {navLink("label4", "Label")}
              {navLink("leaderboard", "Leaderboard")}
              {navLink("profile", "Profile")}
              {navLink("avatar", "Avatar")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Pill className="hidden bg-white/10 text-white/80 md:flex">
              <ShieldCheck className="h-4 w-4" />
              Safe-upload scanning enabled
            </Pill>
            {loggedIn ? (
              <Button
                variant="outline"
                onClick={() => {
                  setLoggedIn(false);
                  setView("home");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </Button>
            ) : (
              <Button onClick={() => setView("login")}>
                <LogIn className="mr-2 h-4 w-4" /> Sign in
              </Button>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl p-2 text-white hover:bg-white/5"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-md">
            <div className="px-4 py-3 space-y-2">
              <button
                onClick={() => {
                  setView("home");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                  view === "home"
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setView("upload");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                  view === "upload"
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setView("label4");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                  view === "label4"
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                Label
              </button>
              <button
                onClick={() => {
                  setView("leaderboard");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                  view === "leaderboard"
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                Leaderboard
              </button>
              <button
                onClick={() => {
                  setView("profile");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                  view === "profile"
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setView("avatar");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                  view === "avatar"
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                Avatar
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <HomeView key="home" points={points} onNavigate={setView} />
          )}

          {view === "upload" && (
            <UploadView
              key="upload"
              queue={queue}
              onQueueUpdate={setQueue}
              onNavigate={setView}
            />
          )}

          {view === "label4" && (
            <motion.section
              key="label4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-white">
                    Label Images - Fruit Ninja Style
                  </h1>
                  <p className="text-white/70">
                    Images scroll down continuously. Select only the target
                    floor type!
                  </p>
                </div>
                <Pill className="bg-white/10 text-white/80">
                  <Camera className="h-4 w-4" /> {queue.length} in queue
                </Pill>
              </div>

              {queue.length > 0 ? (
                <FruitNinjaLabelingTool
                  images={queue}
                  selectedAvatar={selectedAvatar}
                  onSubmit={(payload: BatchLabelPayload) => {
                    // Demo: remove labeled images, add points
                    setQueue((q) => q.slice(payload.labeledCount));
                    setPoints((p) => p + payload.labeledCount * 5);
                  }}
                />
              ) : (
                <Card className="p-10 text-center">
                  <div className="mx-auto w-fit rounded-2xl bg-white/10 p-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    All caught up!
                  </h3>
                  <p className="mt-1 text-white/70">
                    You've labeled everything in your queue. Upload more or
                    check the leaderboard.
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <Button onClick={() => setView("upload")}>
                      Upload more
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setView("leaderboard")}
                    >
                      Leaderboard
                    </Button>
                  </div>
                </Card>
              )}
            </motion.section>
          )}

          {view === "leaderboard" && (
            <LeaderboardView
              key="leaderboard"
              points={points}
              onNavigate={setView}
            />
          )}

          {view === "profile" && <ProfileView key="profile" points={points} />}

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
              onLogin={() => {
                setLoggedIn(true);
                setView("home");
              }}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-transparent py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center md:flex-row md:px-6">
          <div className="flex items-center gap-2 text-white/60">
            <span>Built for safer mobility</span>
          </div>
          <div className="text-white/50">
            © {new Date().getFullYear()} Senstride. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
