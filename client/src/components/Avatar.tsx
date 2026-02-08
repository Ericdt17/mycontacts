import React from "react";
import "./Avatar.css";

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: "small" | "medium" | "large";
}

// Generate initials from first and last name
const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = firstName?.charAt(0)?.toUpperCase() || "";
  const lastInitial = lastName?.charAt(0)?.toUpperCase() || "";
  return `${firstInitial}${lastInitial}` || "?";
};

// Generate a consistent color based on the name
const getColorFromName = (name: string): string => {
  // Color palette with 10 distinct colors
  const colors = [
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316", // Orange
    "#6366f1", // Indigo
  ];

  // Simple hash function to get consistent color for same name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  size = "medium",
}) => {
  const initials = getInitials(firstName, lastName);
  const fullName = `${firstName} ${lastName}`;
  const backgroundColor = getColorFromName(fullName);

  return (
    <div
      className={`avatar avatar-${size}`}
      style={{ backgroundColor }}
      title={fullName}
      aria-label={`Avatar for ${fullName}`}
    >
      <span className="avatar-initials">{initials}</span>
    </div>
  );
};

export default Avatar;

