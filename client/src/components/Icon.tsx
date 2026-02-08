import React from "react";
import type { IconType } from "react-icons";

interface IconProps {
  icon: IconType;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, className, size }) => {
  // Use React.createElement to avoid TypeScript issues with React 19
  return React.createElement(IconComponent as React.ComponentType<any>, {
    className,
    size,
  });
};

