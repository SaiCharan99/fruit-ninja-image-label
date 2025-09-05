import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
}) => (
  <div className="mb-4 flex items-end justify-between gap-4">
    <div>
      <h2 className="text-lg font-semibold text-white/95">{title}</h2>
      {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
    </div>
    {icon}
  </div>
);

export default SectionTitle;
