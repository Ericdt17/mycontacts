import React from "react";
import "./Skeleton.css";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: boolean | string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  rounded = false,
  className = "",
}) => {
  const style: React.CSSProperties = {
    width: width || "100%",
    height: height || "1em",
    borderRadius:
      rounded === true
        ? "8px"
        : typeof rounded === "string"
        ? rounded
        : "0",
  };

  return (
    <div
      className={`skeleton ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export default Skeleton;

