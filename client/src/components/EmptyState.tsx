import React from "react";
import { MdContacts, MdSearch } from "react-icons/md";
import { Icon } from "./Icon";
import "./EmptyState.css";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  iconType?: "contacts" | "search";
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  actionLabel,
  onAction,
  iconType = "contacts",
}) => {
  const IconComponent = iconType === "search" ? MdSearch : MdContacts;

  return (
    <div className="empty-state">
      <div className="empty-state-card">
        <div className="empty-state-icon">
          <Icon icon={IconComponent} />
        </div>
        <h3 className="empty-state-title">{message}</h3>
        {actionLabel && onAction && (
          <button className="empty-state-action" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

