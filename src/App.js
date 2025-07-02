import React, { useState } from "react";
import "./App.css";
import DesktopIcons from "./components/DesktopIcons";
import Taskbar from "./components/Taskbar";
import StartMenu from "./components/StartMenu";
import ExplorerModal from "./components/ExplorerModal";

function App() {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerMaximized, setExplorerMaximized] = useState(false);

  const handleIconDoubleClick = (icon) => {
    if (
      icon.label === "ELSHARKAWY" ||
      icon.label === "This PC" ||
      icon.label === "Recycle Bin" ||
      icon.label === "Network"
    ) {
      setExplorerOpen(true);
    }
  };

  return (
    <div className="App">
      <DesktopIcons onIconDoubleClick={handleIconDoubleClick} />
      <ExplorerModal
        open={explorerOpen}
        onClose={() => setExplorerOpen(false)}
        onMinimize={() => setExplorerOpen(false)}
        onMaximize={() => setExplorerMaximized((m) => !m)}
        isMaximized={explorerMaximized}
      />
      <StartMenu open={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
      <Taskbar
        onStart={() => setStartMenuOpen((open) => !open)}
        onSearch={() => setStartMenuOpen((open) => !open)}
        onExplorer={() => setExplorerOpen(true)}
        onEdge={() => window.open("https://www.microsoft.com/edge", "_blank")}
      />
    </div>
  );
}

export default App;
