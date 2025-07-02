import React, { useState, useRef, useEffect } from "react";
import "./ExplorerModal.css";

export default function ExplorerModal({
  open,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  title,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    if (isMaximized) return; // Don't drag if maximized

    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Set higher z-index while dragging
    if (modalRef.current) {
      modalRef.current.style.zIndex = 1000;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !modalRef.current) return;

    const newLeft = e.clientX - dragOffset.x;
    const newTop = e.clientY - dragOffset.y;

    // Constrain to viewport
    const maxLeft = window.innerWidth - modalRef.current.offsetWidth;
    const maxTop = window.innerHeight - modalRef.current.offsetHeight;

    const constrainedLeft = Math.max(0, Math.min(maxLeft, newLeft));
    const constrainedTop = Math.max(0, Math.min(maxTop, newTop));

    modalRef.current.style.left = `${constrainedLeft}px`;
    modalRef.current.style.top = `${constrainedTop}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset z-index
    if (modalRef.current) {
      modalRef.current.style.zIndex = 999;
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={modalRef}
      className={`explorer-modal${isMaximized ? " maximized" : ""}`}
      id="explorerModal"
      style={{ display: open ? "block" : "none" }}
    >
      <div
        className="explorer-titlebar"
        id="explorerTitlebar"
        onMouseDown={handleMouseDown}
      >
        <span className="explorer-title" id="explorerTitle">
          {title || "File Explorer"}
        </span>
        <div className="explorer-window-controls">
          <button
            className="explorer-minimize"
            id="explorerMinimize"
            title="Minimize"
            onClick={onMinimize}
          >
            &#8211;
          </button>
          <button
            className="explorer-maximize"
            id="explorerMaximize"
            title="Maximize"
            onClick={onMaximize}
          >
            &#9723;
          </button>
          <button
            className="explorer-close"
            id="explorerClose"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
      <div className="explorer-toolbar">
        <button className="explorer-nav">◀</button>
        <button className="explorer-nav">▶</button>
        <button className="explorer-nav">⟳</button>
        <input
          className="explorer-path"
          type="text"
          value="C:/Users/You/"
          readOnly
        />
        <input
          className="explorer-search"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="explorer-main">
        <div className="explorer-sidebar">
          <div className="explorer-folder selected">Quick Access</div>
          <div className="explorer-folder">Desktop</div>
          <div className="explorer-folder">Documents</div>
          <div className="explorer-folder">Downloads</div>
          <div className="explorer-folder">Pictures</div>
          <div className="explorer-folder">Music</div>
          <div className="explorer-folder">Videos</div>
          <div className="explorer-folder">This PC</div>
          <div className="explorer-folder">Network</div>
        </div>
        <div className="explorer-content">
          <div className="explorer-grid">
            <div className="explorer-item">
              <span className="explorer-item-icon">📁</span>
              <span className="explorer-item-label">Projects</span>
            </div>
            <div className="explorer-item">
              <span className="explorer-item-icon">📄</span>
              <span className="explorer-item-label">Resume.pdf</span>
            </div>
            <div className="explorer-item">
              <span className="explorer-item-icon">📁</span>
              <span className="explorer-item-label">Portfolio</span>
            </div>
            <div className="explorer-item">
              <span className="explorer-item-icon">🖼️</span>
              <span className="explorer-item-label">Photo.png</span>
            </div>
            <div className="explorer-item">
              <span className="explorer-item-icon">📄</span>
              <span className="explorer-item-label">Notes.txt</span>
            </div>
            <div className="explorer-item">
              <span className="explorer-item-icon">🗑️</span>
              <span className="explorer-item-label">Recycle Bin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
