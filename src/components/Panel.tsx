import css from "./Panel.module.css";
import { useState, useContext, useEffect } from "react";
import React from "react";
import classnames from "classnames";
import MouseContext from "../context/MouseContext";

interface Props {
  title: string;
  layout?: Layout;
  docked?: "left" | "right";
}

interface Layout {
  offsetX: number;
  offsetY: number;
  sizeX: number;
  sizeY: number | string;
}

export function Panel(props: React.PropsWithChildren<Props>) {
  const mouse = useContext(MouseContext);
  const [layout, setLayout] = useState<Layout>(
    props.layout || {
      offsetX: 0,
      offsetY: 0,
      sizeX: 250,
      sizeY: 200,
    }
  );
  const [docked, setDocked] = useState<"left" | "right" | undefined>(
    props.docked
  );
  const [dragging, setDragging] = useState<
    { x: number; y: number; layout: Layout } | undefined
  >();

  const dockableLeft = dragging && layout.offsetX < 20;

  useEffect(() => {
    if (dragging) {
      if (mouse.button === 1) {
        setLayout((state) => ({
          ...state,
          offsetX: Math.max(0, mouse.x - dragging.x + dragging.layout.offsetX),
          offsetY: Math.max(0, mouse.y - dragging.y + dragging.layout.offsetY),
          sizeY: "80%",
        }));
      } else {
        // end dragging
        setDragging(undefined);
        if (dockableLeft) {
          setDocked("left");
        } else {
          // adjust height now that undocked
          // setLayout((state) => ({
          //   ...state,
          //   size: 400
          // }));
        }
      }
    }
  }, [dragging, mouse, dockableLeft]);

  useEffect(() => {
    switch (docked) {
      case "left":
        setLayout((state) => ({
          ...state,
          offsetX: 0,
          offsetY: 0, // toolbar height
          sizeY: "100%", // ?
        }));
        break;
    }
  }, [docked, setLayout]);

  return (
    <div
      className={classnames(css.Panel, {
        [css.dragging]: dragging,
        [css.dockedLeft]: docked === "left",
        [css.dockedRight]: docked === "right",
        [css.dockableLeft]: dockableLeft,
      })}
      style={{
        height: layout.sizeY,
        width: layout.sizeX,
        top: layout.offsetY,
        left: layout.offsetX,
      }}
    >
      <div className={css.titleBar}>
        <h2
          onMouseDown={(e) => {
            console.log(mouse, layout, e);
            setDragging({ x: mouse.x, y: mouse.y, layout });
            setDocked(undefined);
          }}
        >
          {props.title}
        </h2>
        {!docked ? <button onClick={() => setDocked("left")}>||←</button> : ""}
      </div>
      <div style={{ padding: 3 }}>{props.children}</div>
    </div>
  );
}
