import React from "react";
import { FiPlus } from "react-icons/fi";
import { Icon } from "./Icon";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import "./Header.css";

interface HeaderProps {
  userEmail: string;
  onLogout: () => void;
  onAddContact: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  userEmail,
  onLogout,
  onAddContact,
  searchQuery,
  onSearch,
}) => {
  return (
    <header className="app-header">
      <div className="header-content">
        {/* Logo/Titre */}
        <div className="header-logo">
          <span className="logo-text">My Contacts</span>
        </div>

        {/* Barre de recherche et bouton groupés */}
        <div className="header-search-group">
          <div className="header-search">
            <SearchBar onSearch={onSearch} />
          </div>
          <button className="header-add-btn" onClick={onAddContact}>
            <Icon icon={FiPlus} className="add-icon" />
            <span className="add-btn-text">Add Contact</span>
          </button>
        </div>

        {/* User Menu avec avatar et dropdown */}
        <UserMenu userEmail={userEmail} onLogout={onLogout} />
      </div>
    </header>
  );
};

export default Header;
