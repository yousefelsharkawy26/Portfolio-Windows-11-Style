import React, { useState, useRef, useEffect } from "react";
import './DesktopIcons.css';

export default function DesktopIcons({ onIconDoubleClick }) {
  const [dragIcon, setDragIcon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [lastValidPosition, setLastValidPosition] = useState({ x: 0, y: 0 });
  const iconRefs = useRef({});

  const icons = [
    { label: "ELSHARKAWY", emoji: "📁", title: "User's Files" },
    { label: "This PC", emoji: "🖥️", title: "This PC" },
    { label: "Recycle Bin", emoji: "🗑️", title: "Recycle Bin" },
    { label: "Network", emoji: "🌐", title: "Network" },
  ];

  const isOverlapping = (icon, x, y) => {
    const currentIcon = iconRefs.current[icon.label];
    if (!currentIcon) return false;

    const width = currentIcon.offsetWidth;
    const height = currentIcon.offsetHeight;
    const testRect = { left: x, top: y, right: x + width, bottom: y + height };

    return icons.some((other) => {
      if (other.label === icon.label) return false;
      const otherRef = iconRefs.current[other.label];
      if (!otherRef) return false;

      const otherLeft = parseInt(otherRef.style.left, 10) || 0;
      const otherTop = parseInt(otherRef.style.top, 10) || 0;
      const otherRect = {
        left: otherLeft,
        top: otherTop,
        right: otherLeft + otherRef.offsetWidth,
        bottom: otherTop + otherRef.offsetHeight,
      };

      return !(
        testRect.right <= otherRect.left ||
        testRect.left >= otherRect.right ||
        testRect.bottom <= otherRect.top ||
        testRect.top >= otherRect.bottom
      );
    });
  };

  const getTaskbarHeight = () => {
    const taskbar = document.querySelector(".taskbar");
    return taskbar ? taskbar.offsetHeight : 0;
  };

  const handleMouseDown = (e, icon) => {
    const iconRef = iconRefs.current[icon.label];
    if (!iconRef) return;

    setDragIcon(icon);
    const rect = iconRef.getBoundingClientRect();
    const currentLeft = parseInt(iconRef.style.left, 10) || 0;
    const currentTop = parseInt(iconRef.style.top, 10) || 0;
    
    setLastValidPosition({ x: currentLeft, y: currentTop });
    setDragOffset({
      x: e.clientX - currentLeft,
      y: e.clientY - currentTop
    });

    iconRef.classList.add("dragging");
    iconRef.style.zIndex = 100;
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!dragIcon) return;

    const iconRef = iconRefs.current[dragIcon.label];
    if (!iconRef) return;

    const iconWidth = iconRef.offsetWidth;
    const iconHeight = iconRef.offsetHeight;
    const taskbarHeight = getTaskbarHeight();
    
    const minLeft = 0;
    const minTop = 0;
    const maxLeft = window.innerWidth - iconWidth;
    const maxTop = window.innerHeight - iconHeight - taskbarHeight;
    
    let newLeft = e.clientX - dragOffset.x;
    let newTop = e.clientY - dragOffset.y;
    
    // Constrain to screen
    newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
    newTop = Math.max(minTop, Math.min(maxTop, newTop));
    
    iconRef.style.left = newLeft + "px";
    iconRef.style.top = newTop + "px";
    
    if (isOverlapping(dragIcon, newLeft, newTop)) {
      iconRef.style.left = lastValidPosition.x + "px";
      iconRef.style.top = lastValidPosition.y + "px";
    } else {
      setLastValidPosition({ x: newLeft, y: newTop });
    }
  };

  const handleMouseUp = () => {
    if (dragIcon) {
      const iconRef = iconRefs.current[dragIcon.label];
      if (iconRef) {
        iconRef.classList.remove("dragging");
        iconRef.style.zIndex = 10;
      }
      setDragIcon(null);
      document.body.style.userSelect = "";
    }
  };

  useEffect(() => {
    if (dragIcon) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragIcon, dragOffset, lastValidPosition]);

  // Position icons initially
  useEffect(() => {
    const iconGap = 36; // Gap between icons
    let y = 0;
    
    icons.forEach((icon) => {
      const iconRef = iconRefs.current[icon.label];
      if (iconRef) {
        iconRef.style.position = "absolute";
        iconRef.style.left = "0px";
        iconRef.style.top = y + "px";
        iconRef.style.zIndex = 10;
        y += iconRef.offsetHeight + iconGap;
      }
    });
  }, []);

  return (
    <div className="desktop-icons" id="desktopIcons">
      {icons.map((icon, i) => (
        <div
          ref={(el) => (iconRefs.current[icon.label] = el)}
          className="desktop-icon"
          title={icon.title}
          key={icon.label}
          onMouseDown={(e) => handleMouseDown(e, icon)}
          onDoubleClick={() => onIconDoubleClick(icon)}
        >
          <span className="desktop-icon-img">{icon.emoji}</span>
          <span className="desktop-icon-label">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}
