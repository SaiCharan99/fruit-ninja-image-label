import React from "react";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Pill: React.FC<PillProps> = ({ children, className = "", ...props }) => (
  <span
    {...props}
    className={`inline-flex select-none items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

export default Pill;
