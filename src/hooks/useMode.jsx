import { useEffect, useState } from "react";

export default function useMode() {
  const [state, setState] = useState("view");

  useEffect(() => {
    const mode = window.localStorage.getItem("mode");

    if (mode) {
      setState(mode);
    } else {
      window.localStorage.setItem("mode", "view");
    }
  }, []);

  function setMode(mode) {
    setState(mode);
    window.localStorage.setItem("mode", mode);
  }

  return [state, setMode];
}
