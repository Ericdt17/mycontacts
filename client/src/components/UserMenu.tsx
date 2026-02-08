import React, { useState, useEffect, useRef } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { Icon } from "./Icon";
import "./UserMenu.css";

interface UserMenuProps {
  userEmail: string;
  onLogout: () => void;
}

// Generate initials from email
const getInitialsFromEmail = (email: string): string => {
  if (!email) return "?";
  
  // Extract the part before @
  const namePart = email.split("@")[0];
  
  // If it contains dots, take first letter of each part
  if (namePart.includes(".")) {
    const parts = namePart.split(".");
    const firstInitial = parts[0]?.charAt(0)?.toUpperCase() || "";
    const lastInitial = parts[parts.length - 1]?.charAt(0)?.toUpperCase() || "";
    return `${firstInitial}${lastInitial}` || namePart.charAt(0).toUpperCase();
  }
  
  // Otherwise, take first two letters
  return namePart.substring(0, 2).toUpperCase() || "?";
};

// Generate a consistent color based on the email
const getColorFromEmail = (email: string): string => {
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

  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const UserMenu: React.FC<UserMenuProps> = ({ userEmail, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const initials = getInitialsFromEmail(userEmail);
  const backgroundColor = getColorFromEmail(userEmail);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div
          className="user-avatar"
          style={{ backgroundColor }}
        >
          <span className="user-avatar-initials">{initials}</span>
        </div>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-menu-email">{userEmail}</div>
          </div>
          <div className="user-menu-divider"></div>
          <button className="user-menu-item" onClick={handleLogout}>
            <Icon icon={HiOutlineLogout} className="user-menu-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

