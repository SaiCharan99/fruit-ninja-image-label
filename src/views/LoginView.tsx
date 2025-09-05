import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mx-auto max-w-lg"
    >
      <Card className="p-6">
        <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
        <p className="mt-1 text-white/60">
          Sign in to earn points and appear on the leaderboard.
        </p>

        <div className="mt-6 space-y-3">
          <button className="w-full rounded-xl bg-white/90 px-4 py-2 font-medium text-black transition hover:bg-white">
            Continue with Google
          </button>
          <div className="relative my-2 h-px bg-white/10">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent px-2 text-xs text-white/50">
              or
            </span>
          </div>
          <input
            placeholder="Email"
            className="w-full rounded-xl bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full rounded-xl bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="flex items-center justify-between text-sm text-white/70">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5"
              />
              Remember me
            </label>
            <button className="text-white/80 hover:text-white">
              Forgot password?
            </button>
          </div>
          <Button className="mt-2 w-full" onClick={onLogin}>
            Sign in
          </Button>
        </div>
      </Card>
    </motion.section>
  );
};

export default LoginView;
