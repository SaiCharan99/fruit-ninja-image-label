import React from "react";
import { motion } from "framer-motion";
import { avatarData } from "../constants";
import Card from "../components/ui/Card";

interface AvatarViewProps {
  points: number;
  selectedAvatar: string;
  onAvatarSelect: (avatarId: string) => void;
}

const AvatarView: React.FC<AvatarViewProps> = ({
  points,
  selectedAvatar,
  onAvatarSelect,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="space-y-6"
    >
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Choose Your Avatar
          </h1>
          <p className="text-white/70">
            Select your character for the floor catching adventure!
          </p>
        </div>
        <div className="text-right">
          <div className="text-cyan-400 font-bold text-lg">{points}</div>
          <div className="text-white/60 text-sm">Total Points</div>
        </div>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {avatarData.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => avatar.unlocked && onAvatarSelect(avatar.id)}
              className={`p-4 rounded-2xl border-2 transition-all relative ${
                avatar.unlocked
                  ? selectedAvatar === avatar.id
                    ? "border-cyan-400 bg-cyan-500/20 scale-105"
                    : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                  : "border-gray-600 bg-gray-800/50 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{avatar.emoji}</div>
                <div className="text-white font-medium">{avatar.name}</div>
                {avatar.unlocked ? (
                  selectedAvatar === avatar.id && (
                    <div className="text-cyan-400 text-sm mt-1">✓ Selected</div>
                  )
                ) : (
                  <div className="text-gray-400 text-xs mt-1">
                    {avatar.requiredPoints} pts
                  </div>
                )}
              </div>
              {!avatar.unlocked && (
                <div className="absolute top-2 right-2">
                  <div className="bg-gray-700 rounded-full p-1">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>
    </motion.section>
  );
};

export default AvatarView;
