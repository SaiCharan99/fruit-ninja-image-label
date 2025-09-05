import React from "react";
import { brand } from "../../constants";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <div {...props} className={`rounded-2xl ${brand.card} ${className}`}>
    {children}
  </div>
);

export default Card;
