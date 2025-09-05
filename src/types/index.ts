export interface ImageData {
  id: string;
  url: string;
  fallback?: string;
}

export interface LabelPayload {
  type: string;
  notes: string;
  tags: string[];
}

export interface BatchLabelPayload {
  labeledCount: number;
  labels: Array<{ imageId: string; type: string }>;
}

export interface LeaderData {
  name: string;
  points: number;
  badges: string[];
  avatar: string;
}

export interface AvatarData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  unlocked: boolean;
  requiredPoints: number;
}

export type ViewType =
  | "home"
  | "upload"
  | "label4"
  | "leaderboard"
  | "profile"
  | "login"
  | "avatar";

export interface FloorType {
  name: string;
  emoji: string;
  color: string;
  borderColor?: string;
  position?: string;
}
