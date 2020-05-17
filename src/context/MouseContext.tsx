import React, { useEffect, useState } from "react";

interface Mouse {
  x: number;
  y: number;
  button: number;
}

const MouseContext = React.createContext<Mouse>({ x: 0, y: 0, button: 0 });
export default MouseContext;

export function MouseContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [val, setVal] = useState<Mouse>({ x: 0, y: 0, button: 0 });

  useEffect(() => {
    const moveListener = (e: MouseEvent) => {
      setVal((state) => ({ ...state, x: e.clientX, y: e.clientY }));
    };
    const buttonListener = (e: MouseEvent) => {
      setVal((state) => ({ ...state, button: e.buttons }));
    };
    document.body.addEventListener("mousemove", moveListener);
    document.body.addEventListener("mousedown", buttonListener);
    document.body.addEventListener("mouseup", buttonListener);
    return () => {
      document.body.removeEventListener("mousemove", moveListener);
      document.body.removeEventListener("mousedown", buttonListener);
      document.body.removeEventListener("mouseup", buttonListener);
    };
  }, [setVal]);
  return <MouseContext.Provider value={val}>{children}</MouseContext.Provider>;
}
