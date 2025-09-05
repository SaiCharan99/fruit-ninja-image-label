import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <div className={`flex items-center gap-2 ${className || ""}`}>
    <img
      src="/assets/icon.png"
      alt="Senstride logo"
      className="h-8 w-8 rounded-xl shadow-md object-cover"
    />
    <span className="font-semibold tracking-tight text-white">Senstride</span>
  </div>
);

export default Logo;
