import React from "react";
import "./Header.css";

interface HeaderProps {
  userEmail: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userEmail, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span className="user-email">{userEmail}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <span className="logout-icon">↗</span>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
