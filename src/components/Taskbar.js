import React from "react";
import DateTime from "./DateTime";
import "./Taskbar.css";

export default function Taskbar({ onStart, onSearch, onExplorer, onEdge }) {
  return (
    <div className="taskbar">
      <div className="taskbar-icons">
        <span
          className="taskbar-icon"
          id="startBtn"
          title="Start"
          onClick={onStart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 65 50">
            <radialGradient id="6mg8lban2bXXHIdpfxs4Sa_srWpsuip5wG0_gr1" 
                            cx="31.999" 
                            cy="30.5" 
                            r="30.3" 
                            gradientTransform="translate(0 2)" 
                            gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#f4e9c3"></stop>
              <stop offset=".219" stop-color="#f8eecd"></stop>
              <stop offset=".644" stop-color="#fdf4dc"></stop>
              <stop offset="1" stop-color="#fff6e1"></stop>
            </radialGradient>
            <linearGradient id="6mg8lban2bXXHIdpfxs4Sb_srWpsuip5wG0_gr2" 
                            x1="32" 
                            x2="32" 
                            y1="54" 
                            y2="10" 
                            gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#155cde"></stop>
              <stop offset=".278" stop-color="#1f7fe5"></stop>
              <stop offset=".569" stop-color="#279ceb"></stop>
              <stop offset=".82" stop-color="#2cafef"></stop>
              <stop offset="1" stop-color="#2eb5f0"></stop>
            </linearGradient>
            <path fill="url(#6mg8lban2bXXHIdpfxs4Sb_srWpsuip5wG0_gr2)" 
                  d="M28,54H13c-1.657,0-3-1.343-3-3V36c0-1.657,1.343-3,3-3h15c1.657,0,3,1.343,3,3v15	C31,52.657,29.657,54,28,54z M54,51V36c0-1.657-1.343-3-3-3H36c-1.657,0-3,1.343-3,3v15c0,1.657,1.343,3,3,3h15	C52.657,54,54,52.657,54,51z M31,28V13c0-1.657-1.343-3-3-3H13c-1.657,0-3,1.343-3,3v15c0,1.657,1.343,3,3,3h15	C29.657,31,31,29.657,31,28z M54,28V13c0-1.657-1.343-3-3-3H36c-1.657,0-3,1.343-3,3v15c0,1.657,1.343,3,3,3h15	C52.657,31,54,29.657,54,28z">

            </path>
          </svg>
        </span>
        <span
          className="taskbar-icon"
          id="searchBtn"
          title="Search"
          onClick={onSearch}
        >
          🔍
        </span>
        <span className="taskbar-icon" title="Explorer" onClick={onExplorer}>
          🗂️
        </span>
        <span className="taskbar-icon" title="Edge" onClick={onEdge}>
          🌐
        </span>
      </div>
      <DateTime />
    </div>
  );
}
