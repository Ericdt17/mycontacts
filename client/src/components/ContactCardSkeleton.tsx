import React from "react";
import Skeleton from "./Skeleton";
import "./ContactCardSkeleton.css";

const ContactCardSkeleton: React.FC = () => {
  return (
    <div className="contact-card-skeleton">
      <div className="skeleton-main">
        <Skeleton width={48} height={48} rounded={true} className="skeleton-avatar" />
        <div className="skeleton-info">
          <Skeleton width="60%" height={20} className="skeleton-name" />
          <Skeleton width="40%" height={16} className="skeleton-phone" />
        </div>
      </div>
      <div className="skeleton-actions">
        <Skeleton width={32} height={32} rounded={true} />
        <Skeleton width={32} height={32} rounded={true} />
      </div>
    </div>
  );
};

export default ContactCardSkeleton;

