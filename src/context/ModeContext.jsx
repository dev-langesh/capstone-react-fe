import React, { createContext, useState } from "react";

export const ModeContext = createContext();

export default function ModeContextComponent({ children }) {
  const [mode, setMode] = useState("view");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}
