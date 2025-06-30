import React from "react";

interface LoaderProps {
  isLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <>
      <style>
        {`
          @keyframes loading-bar {
            0% {
              width: 0%;
            }
            50% {
              width: 70%;
            }
            100% {
              width: 100%;
            }
          }
        `}
      </style>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
        }}
      >
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #5b3df5 0%, #f35c9b 100%)",
            boxShadow: "0 2px 8px 0 rgba(80, 0, 80, 0.08)",
            animation: "loading-bar 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
};

export default Loader;
