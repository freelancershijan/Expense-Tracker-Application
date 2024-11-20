import React from 'react';

const LoadingSpinner = ({ color = "white" }) => {
  return (
    <div
      className={`animate-spin inline-block w-4 h-4 border-2 border-t-transparent rounded-full`}
      style={{ borderColor: `${color}`, borderTopColor: "transparent" }}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
