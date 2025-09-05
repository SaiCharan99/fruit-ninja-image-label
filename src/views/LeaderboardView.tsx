import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown } from "lucide-react";
import { ViewType } from "../types";
import { sampleLeaders } from "../constants";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Pill from "../components/ui/Pill";
import SectionTitle from "../components/ui/SectionTitle";

interface LeaderboardViewProps {
  points: number;
  onNavigate: (view: ViewType) => void;
}

const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  points,
  onNavigate,
}) => {
  const [weekly, setWeekly] = useState(true);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="space-y-6"
    >
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Leaderboard</h1>
          <p className="text-white/60">
            Friendly competition makes better datasets ✨
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Pill className="bg-white/10 text-white/80">
            <Trophy className="h-4 w-4" /> {weekly ? "This week" : "All‑time"}
          </Pill>
          <Button variant="outline" onClick={() => setWeekly((w) => !w)}>
            Toggle range
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 md:col-span-7">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 text-left text-sm text-white/70">
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Points</th>
                  <th className="px-4 py-3">Badges</th>
                </tr>
              </thead>
              <tbody>
                {sampleLeaders.map((u, i) => (
                  <tr
                    key={u.name}
                    className="border-t border-white/10 text-white/90"
                  >
                    <td className="px-4 py-3 font-medium">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm font-semibold">
                          {u.avatar}
                        </div>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{u.points}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {u.badges.map((b) => (
                          <Pill
                            key={`${u.name}-${b}`}
                            className="bg-white/10 text-white/80"
                          >
                            {b}
                          </Pill>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hidden border-l border-white/10 md:col-span-5 md:block">
            <div className="p-6">
              <SectionTitle
                title="Your standing"
                subtitle="You're 40 points from Top 3"
              />
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-b from-amber-400 to-amber-500 text-black">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    Rank #8
                  </div>
                  <div className="text-white/70">{points} pts</div>
                </div>
              </div>
              <div className="mt-5 h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
                  style={{ width: "72%" }}
                />
              </div>
              <Button
                className="mt-6 w-full"
                onClick={() => onNavigate("label4")}
              >
                Keep labeling
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.section>
  );
};

export default LeaderboardView;
