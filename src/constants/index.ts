import { FloorType, LeaderData, AvatarData } from "../types";

export const brand = {
  bg: "bg-gradient-to-b from-[#06141F] via-[#0B2233] to-[#0F2B3D]",
  card: "bg-white/6 backdrop-blur-xl border border-white/10 shadow-xl",
  primary: "from-cyan-400 to-blue-600",
  primaryText: "text-cyan-400",
  accent: "from-cyan-300 to-blue-500",
};

export const floorTypes: FloorType[] = [
  {
    name: "Grass",
    emoji: "🌱",
    color: "bg-gradient-to-r from-green-400 to-green-700",
  },
  {
    name: "Wood",
    emoji: "🪵",
    color: "bg-gradient-to-r from-amber-500 to-amber-700",
  },
  {
    name: "Carpet",
    emoji: "🟫",
    color: "bg-gradient-to-r from-orange-500 to-orange-700",
  },
  {
    name: "Marble",
    emoji: "💎",
    color: "bg-gradient-to-r from-slate-400 to-slate-600",
  },
  {
    name: "Tile",
    emoji: "🧱",
    color: "bg-gradient-to-r from-gray-500 to-gray-700",
  },
  {
    name: "Concrete",
    emoji: "🏗️",
    color: "bg-gradient-to-r from-gray-600 to-gray-800",
  },
];

export const sampleImages = [
  {
    id: "im1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    fallback: "Grass floor",
  },
  {
    id: "im2",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    fallback: "Marble floor",
  },
  {
    id: "im3",
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    fallback: "Carpet floor",
  },
  {
    id: "im4",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
    fallback: "Wood floor",
  },
  {
    id: "im5",
    url: "https://images.unsplash.com/photo-1582582429416-3e6514760fd6?q=80&w=800&auto=format&fit=crop",
    fallback: "Tile floor",
  },
];

export const sampleLeaders: LeaderData[] = [
  { name: "Ava", points: 1280, badges: ["Gold", "Consistency"], avatar: "A" },
  { name: "Leo", points: 1090, badges: ["Silver"], avatar: "L" },
  { name: "Maya", points: 980, badges: ["Bronze", "Streak"], avatar: "M" },
  { name: "Noah", points: 830, badges: ["Helper"], avatar: "N" },
  { name: "Zoe", points: 790, badges: ["Rookie"], avatar: "Z" },
];

export const avatarData: AvatarData[] = [
  {
    id: "trainer",
    name: "Trainer",
    emoji: "👨‍🎓",
    color: "bg-blue-500",
    unlocked: true,
    requiredPoints: 0,
  },
  {
    id: "trainer-f",
    name: "Trainer",
    emoji: "👩‍🎓",
    color: "bg-pink-500",
    unlocked: true,
    requiredPoints: 0,
  },
  {
    id: "hiker",
    name: "Hiker",
    emoji: "🧗‍♂️",
    color: "bg-orange-500",
    unlocked: true,
    requiredPoints: 0,
  },
  {
    id: "scientist",
    name: "Scientist",
    emoji: "👨‍🔬",
    color: "bg-purple-500",
    unlocked: true,
    requiredPoints: 0,
  },
  {
    id: "ranger",
    name: "Ranger",
    emoji: "👨‍🌾",
    color: "bg-green-500",
    unlocked: false,
    requiredPoints: 100,
  },
  {
    id: "nurse",
    name: "Nurse",
    emoji: "👩‍⚕️",
    color: "bg-red-500",
    unlocked: false,
    requiredPoints: 250,
  },
  {
    id: "engineer",
    name: "Engineer",
    emoji: "👨‍🔧",
    color: "bg-yellow-500",
    unlocked: false,
    requiredPoints: 500,
  },
  {
    id: "artist",
    name: "Artist",
    emoji: "👩‍🎨",
    color: "bg-indigo-500",
    unlocked: false,
    requiredPoints: 750,
  },
  {
    id: "detective",
    name: "Detective",
    emoji: "🕵️‍♂️",
    color: "bg-gray-600",
    unlocked: false,
    requiredPoints: 1000,
  },
  {
    id: "chef",
    name: "Chef",
    emoji: "👨‍🍳",
    color: "bg-orange-600",
    unlocked: false,
    requiredPoints: 1500,
  },
  {
    id: "pilot",
    name: "Pilot",
    emoji: "👨‍✈️",
    color: "bg-blue-600",
    unlocked: false,
    requiredPoints: 2000,
  },
  {
    id: "astronaut",
    name: "Astronaut",
    emoji: "👨‍🚀",
    color: "bg-slate-700",
    unlocked: false,
    requiredPoints: 3000,
  },
  {
    id: "ninja",
    name: "Ninja",
    emoji: "🥷",
    color: "bg-black",
    unlocked: false,
    requiredPoints: 5000,
  },
  {
    id: "wizard",
    name: "Wizard",
    emoji: "🧙‍♂️",
    color: "bg-purple-700",
    unlocked: false,
    requiredPoints: 7500,
  },
  {
    id: "robot",
    name: "Robot",
    emoji: "🤖",
    color: "bg-cyan-600",
    unlocked: false,
    requiredPoints: 10000,
  },
  {
    id: "dragon",
    name: "Dragon",
    emoji: "🐉",
    color: "bg-red-700",
    unlocked: false,
    requiredPoints: 15000,
  },
];
