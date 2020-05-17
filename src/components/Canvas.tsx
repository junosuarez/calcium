import React, { useEffect, useState, useRef } from "react";
import css from "./Canvas.module.css";
import { Layout } from "./Panel";

export const CanvasContext = React.createContext<Layout>({
  top: 0,
  left: 0,
  height: 0,
  width: 0,
});

export default function Canvas({ children }: React.PropsWithChildren<{}>) {
  const [x, setX] = useState<Partial<DOMRect>>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  });

  const ctx = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ctx.current) {
      const el = ctx.current;
      const update = () => {
        const rect = el.getBoundingClientRect();
        setX(rect);
      };
      update();
      window.addEventListener("resize", update);
      return () => {
        window.removeEventListener("resize", update);
      };
    }
  }, [ctx]);

  return (
    <CanvasContext.Provider value={x as any}>
      <div className={css.Canvas} ref={ctx}>
        {children}
      </div>
    </CanvasContext.Provider>
  );
}
