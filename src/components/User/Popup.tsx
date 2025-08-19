import React from "react";

type PopupProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ children, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "0",
          borderRadius: "10px",
          minWidth: "800px",
          maxWidth: "95%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
