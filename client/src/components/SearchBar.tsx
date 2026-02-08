import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { Icon } from "./Icon";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search contacts...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <Icon icon={HiMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          aria-label="Search contacts"
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search"
          >
            <Icon icon={IoClose} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

