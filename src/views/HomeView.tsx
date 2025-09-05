import React from "react";
import { motion } from "framer-motion";
import {
  Upload,
  ImageIcon,
  Trophy,
  Users,
  Camera,
  Crown,
  BarChart3,
  Award,
  ChevronRight,
} from "lucide-react";
import { ViewType } from "../types";
import { brand, sampleImages } from "../constants";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Pill from "../components/ui/Pill";
import SectionTitle from "../components/ui/SectionTitle";
import RobustImage from "../components/ui/RobustImage";

interface HomeViewProps {
  points: number;
  onNavigate: (view: ViewType) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ points, onNavigate }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="space-y-8"
    >
      {/* Hero */}
      <Card className="relative overflow-hidden p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_400px_at_20%_-10%,rgba(14,165,233,.25),transparent),radial-gradient(800px_300px_at_80%_0%,rgba(59,130,246,.25),transparent)]" />
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="relative z-10">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Help us build smarter fall‑prevention AI
            </h1>
            <p className="mt-3 max-w-prose text-white/70">
              Upload floor images and label what you see. Earn points, climb the
              leaderboard, and contribute to safer environments in aged care.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => onNavigate("upload")} className="px-5">
                <Upload className="mr-2 h-4 w-4" /> Upload now
              </Button>
              <Button variant="outline" onClick={() => onNavigate("label4")}>
                <ImageIcon className="mr-2 h-4 w-4" /> Start labeling
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Pill className="bg-gradient-to-b from-amber-400 to-amber-500 text-black">
                <Trophy className="h-4 w-4" /> Weekly challenge live
              </Pill>
              <Pill className="bg-white/10 text-white/80">
                <Users className="h-4 w-4" /> 2,481 contributors
              </Pill>
            </div>
          </div>
          <div className="relative z-10">
            <div className="grid grid-cols-3 gap-3">
              {sampleImages.slice(2).map((im) => (
                <div key={im.id} className="overflow-hidden rounded-2xl">
                  <RobustImage
                    src={im.url}
                    alt="Floor sample"
                    className="h-28 w-full object-cover"
                    fallbackText={im.fallback || "Floor"}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-white/70">
              <Camera className="h-4 w-4" />
              Real-world floors. Clear labeling. Better data.
            </div>
          </div>
        </div>
      </Card>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <SectionTitle
            title="Your points"
            subtitle="Keep going—unlock the next badge at 500"
            icon={<Crown className="h-5 w-5 text-amber-400" />}
          />
          <div className="text-3xl font-semibold text-white">{points}</div>
          <div className="mt-3 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
              style={{ width: `${Math.min(points / 5, 100)}%` }}
            />
          </div>
        </Card>
        <Card className="p-6">
          <SectionTitle
            title="Images labeled"
            subtitle="This week"
            icon={<BarChart3 className="h-5 w-5 text-sky-400" />}
          />
          <div className="text-3xl font-semibold text-white">38</div>
          <p className="mt-2 text-sm text-white/60">Goal: 50</p>
        </Card>
        <Card className="p-6">
          <SectionTitle
            title="Badges"
            subtitle="Your recent achievements"
            icon={<Award className="h-5 w-5 text-violet-400" />}
          />
          <div className="flex flex-wrap gap-2">
            <Pill className="bg-gradient-to-b from-amber-300 to-amber-500 text-black">
              Streak
            </Pill>
            <Pill className="bg-white/10 text-white/90">Helper</Pill>
            <Pill className="bg-white/10 text-white/90">Silver</Pill>
          </div>
        </Card>
      </div>

      {/* CTA cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">
            Jump back into labeling
          </h3>
          <p className="mt-2 text-white/70">
            Continue where you left off and keep your streak alive.
          </p>
          <Button className="mt-4" onClick={() => onNavigate("label4")}>
            Continue <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">
            Check the leaderboard
          </h3>
          <p className="mt-2 text-white/70">
            See how you stack up against others this week.
          </p>
          <Button className="mt-4" onClick={() => onNavigate("leaderboard")}>
            View leaderboard <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Card>
      </div>
    </motion.section>
  );
};

export default HomeView;
