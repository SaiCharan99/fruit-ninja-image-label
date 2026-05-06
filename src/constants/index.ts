import { FloorType, LeaderData, AvatarData } from "../types";

export const brand = {
  bg: "bg-gradient-to-b from-[#050c18] via-[#08152a] to-[#0a1a30]",
  card: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl",
  primary: "from-cyan-400 to-blue-600",
  primaryText: "text-cyan-400",
  accent: "from-cyan-300 to-blue-500",
};

export const floorTypes: FloorType[] = [
  {
    name: "Grass",
    emoji: "🌿",
    color: "bg-gradient-to-br from-green-500 to-emerald-700",
  },
  {
    name: "Wood",
    emoji: "🪵",
    color: "bg-gradient-to-br from-amber-500 to-orange-700",
  },
  {
    name: "Carpet",
    emoji: "🟫",
    color: "bg-gradient-to-br from-rose-500 to-pink-700",
  },
  {
    name: "Marble",
    emoji: "💎",
    color: "bg-gradient-to-br from-slate-400 to-slate-700",
  },
  {
    name: "Tile",
    emoji: "🧱",
    color: "bg-gradient-to-br from-sky-500 to-blue-700",
  },
  {
    name: "Concrete",
    emoji: "🏗️",
    color: "bg-gradient-to-br from-gray-500 to-gray-800",
  },
];

// Large curated pool of floor images — used across Home, game, and anywhere images are needed
const UB = "https://images.unsplash.com/photo-";
const Q = "?q=80&w=600&auto=format&fit=crop";

export const sampleImages = [
  // Wood floors
  { id: "w1", url: `${UB}1505693416388-ac5ce068fe85${Q}`, fallback: "Wood Floor" },
  { id: "w2", url: `${UB}1516455590571-18256e5bb9ff${Q}`, fallback: "Wood Planks" },
  { id: "w3", url: `${UB}1493809842364-78817add7ffb${Q}`, fallback: "Parquet" },
  { id: "w4", url: `${UB}1513694203232-719a280e7fae${Q}`, fallback: "Hardwood" },
  { id: "w5", url: `${UB}1533090161767-e6ffed986c88${Q}`, fallback: "Wood" },

  // Marble / stone floors
  { id: "m1", url: `${UB}1600585154340-be6161a56a0c${Q}`, fallback: "Marble" },
  { id: "m2", url: `${UB}1600566752547-1ce00bcda073${Q}`, fallback: "Marble" },
  { id: "m3", url: `${UB}1560440021-33f9b867899d${Q}`, fallback: "Stone" },
  { id: "m4", url: `${UB}1578683220520-57e16e43e861${Q}`, fallback: "Marble" },

  // Tile floors
  { id: "t1", url: `${UB}1582582429416-3e6514760fd6${Q}`, fallback: "Tile" },
  { id: "t2", url: `${UB}1584622650111-993a426fbf0a${Q}`, fallback: "Tile" },
  { id: "t3", url: `${UB}1558618047-ffc6a6f95cac${Q}`, fallback: "Tile" },
  { id: "t4", url: `${UB}1550009158-9ebf69173e03${Q}`, fallback: "Tile" },

  // Carpet
  { id: "c1", url: `${UB}1555041469-a586c61ea9bc${Q}`, fallback: "Carpet" },
  { id: "c2", url: `${UB}1560448204-e02f11c3d0e2${Q}`, fallback: "Carpet" },
  { id: "c3", url: `${UB}1586023492125-27b2c045efd7${Q}`, fallback: "Carpet" },
  { id: "c4", url: `${UB}1484101403633-562f891dc89a${Q}`, fallback: "Carpet" },

  // Grass / outdoor
  { id: "g1", url: `${UB}1558618666-fcd25c85cd64${Q}`, fallback: "Grass" },
  { id: "g2", url: `${UB}1500382017468-9049fed747ef${Q}`, fallback: "Grass" },
  { id: "g3", url: `${UB}1416879595882-3373a0480b5b${Q}`, fallback: "Lawn" },
  { id: "g4", url: `${UB}1462275646964-a0e3386b89fa${Q}`, fallback: "Meadow" },

  // Concrete
  { id: "co1", url: `${UB}1618221118493-9cfa1a1c00da${Q}`, fallback: "Concrete" },
  { id: "co2", url: `${UB}1497366811353-6870744d04b2${Q}`, fallback: "Concrete" },
  { id: "co3", url: `${UB}1504307651254-35680f356dfd${Q}`, fallback: "Concrete" },
];

export const sampleLeaders: LeaderData[] = [
  { name: "Ava Chen", points: 3280, badges: ["Gold", "Streak", "Ninja"], avatar: "A" },
  { name: "Leo Park", points: 2790, badges: ["Silver", "Speed"], avatar: "L" },
  { name: "Maya Liu", points: 2140, badges: ["Bronze", "Helper"], avatar: "M" },
  { name: "Noah Kim", points: 1830, badges: ["Rookie", "Consistent"], avatar: "N" },
  { name: "Zoe Hassan", points: 1590, badges: ["Rookie"], avatar: "Z" },
];

export const avatarData: AvatarData[] = [
  { id: "trainer",   name: "Trainer",    emoji: "👨‍🎓", color: "bg-blue-500",    unlocked: true,  requiredPoints: 0 },
  { id: "trainer-f", name: "Trainer",    emoji: "👩‍🎓", color: "bg-pink-500",    unlocked: true,  requiredPoints: 0 },
  { id: "hiker",     name: "Hiker",      emoji: "🧗‍♂️", color: "bg-orange-500",  unlocked: true,  requiredPoints: 0 },
  { id: "scientist", name: "Scientist",  emoji: "👨‍🔬", color: "bg-purple-500",  unlocked: true,  requiredPoints: 0 },
  { id: "ranger",    name: "Ranger",     emoji: "👨‍🌾", color: "bg-green-500",   unlocked: false, requiredPoints: 100 },
  { id: "nurse",     name: "Nurse",      emoji: "👩‍⚕️", color: "bg-red-500",     unlocked: false, requiredPoints: 250 },
  { id: "engineer",  name: "Engineer",   emoji: "👨‍🔧", color: "bg-yellow-500",  unlocked: false, requiredPoints: 500 },
  { id: "artist",    name: "Artist",     emoji: "👩‍🎨", color: "bg-indigo-500",  unlocked: false, requiredPoints: 750 },
  { id: "detective", name: "Detective",  emoji: "🕵️‍♂️", color: "bg-gray-600",   unlocked: false, requiredPoints: 1000 },
  { id: "chef",      name: "Chef",       emoji: "👨‍🍳", color: "bg-orange-600",  unlocked: false, requiredPoints: 1500 },
  { id: "pilot",     name: "Pilot",      emoji: "👨‍✈️", color: "bg-blue-600",    unlocked: false, requiredPoints: 2000 },
  { id: "astronaut", name: "Astronaut",  emoji: "👨‍🚀", color: "bg-slate-700",   unlocked: false, requiredPoints: 3000 },
  { id: "ninja",     name: "Ninja",      emoji: "🥷",  color: "bg-zinc-900",    unlocked: false, requiredPoints: 5000 },
  { id: "wizard",    name: "Wizard",     emoji: "🧙‍♂️", color: "bg-purple-700",  unlocked: false, requiredPoints: 7500 },
  { id: "robot",     name: "Robot",      emoji: "🤖",  color: "bg-cyan-600",    unlocked: false, requiredPoints: 10000 },
  { id: "dragon",    name: "Dragon",     emoji: "🐉",  color: "bg-red-700",     unlocked: false, requiredPoints: 15000 },
];
