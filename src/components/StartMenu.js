import React from "react";
import "./StartMenu.css";

export default function StartMenu({ open, onClose }) {
  return (
    <div className="center">
      <div
        className={`start-menu win11${open ? " visible" : ""}`}
        id="startMenu"
      >
        <div className="start-header">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Type here to search" />
          </div>
          <div className="user-avatar">👤</div>
        </div>
        <div className="pinned-section">
          <div className="section-title">Pinned</div>
          <div className="icons pinned-icons">
            <div
              className="icon"
              onClick={() => alert("About section coming soon!")}
            >
              <div className="icon-emoji">💼</div>
              <div className="icon-label">About</div>
            </div>
            <div
              className="icon"
              onClick={() => alert("Projects section coming soon!")}
            >
              <div className="icon-emoji">🗂️</div>
              <div className="icon-label">Projects</div>
            </div>
            <div
              className="icon"
              onClick={() => alert("Resume section coming soon!")}
            >
              <div className="icon-emoji">📄</div>
              <div className="icon-label">Resume</div>
            </div>
            <div
              className="icon"
              onClick={() => alert("Contact section coming soon!")}
            >
              <div className="icon-emoji">✉️</div>
              <div className="icon-label">Contact</div>
            </div>
          </div>
        </div>
        <div className="recommended-section">
          <div className="section-title">Recommended</div>
          <div className="recommended-list">
            <div className="recommended-item">
              <div className="rec-icon">📝</div>
              <div>
                <div className="rec-title">Latest Project</div>
                <div className="rec-desc">Check out my newest work!</div>
              </div>
            </div>
            <div className="recommended-item">
              <div className="rec-icon">📬</div>
              <div>
                <div className="rec-title">Contact Me</div>
                <div className="rec-desc">Get in touch for collaboration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`overlay${open ? " visible" : ""}`}
        id="menuOverlay"
        onClick={onClose}
      ></div>
    </div>
  );
}
