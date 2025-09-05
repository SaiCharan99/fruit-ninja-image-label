import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-blue-600 to-cyan-700 text-white hover:from-blue-500 hover:to-cyan-600 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      : variant === "outline"
      ? "border border-white/20 text-white/90 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      : "text-white/90 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";

  return (
    <button
      {...props}
      className={`rounded-xl px-4 py-2 font-medium transition-all disabled:opacity-50 ${styles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
