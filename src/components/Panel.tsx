import css from "./Panel.module.css";
import { useState, useContext, useEffect } from "react";
import React from "react";
import classnames from "classnames";
import MouseContext from "../context/MouseContext";
import { CanvasContext } from "./Canvas";

interface Props {
  title: string;
  layout?: Layout;
  docked?: "left" | "right";
}

export interface Layout {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function Panel(props: React.PropsWithChildren<Props>) {
  const mouse = useContext(MouseContext);
  const canvas = useContext(CanvasContext);
  const [layout, setLayout] = useState<Layout>({
    left: 0,
    top: 0,
    width: 250,
    height: canvas.height,
  });
  const [docked, setDocked] = useState<"left" | "right" | undefined>(
    props.docked
  );
  const [dragging, setDragging] = useState<
    { x: number; y: number; layout: Layout } | undefined
  >();

  const [resizing, setResizing] = useState<
    { x: number; y: number; layout: Layout } | undefined
  >();

  const right = layout.left + layout.width;

  const dockable =
    dragging &&
    (layout.left < 20
      ? "left"
      : canvas.width - right < 20
      ? "right"
      : undefined);

  useEffect(() => {
    if (dragging) {
      if (mouse.button === 1) {
        // constrain within visible canvas area
        setLayout((state) => ({
          ...state,
          left: Math.min(
            Math.max(0, mouse.x - dragging.x + dragging.layout.left),
            // include border width
            canvas.width - state.width - 5
          ),
          top: Math.min(
            Math.max(0, mouse.y - dragging.y + dragging.layout.top),
            canvas.height - state.height
          ),
          height: Math.round(canvas.height * 0.8),
        }));
      } else {
        // end dragging
        setDragging(undefined);
        if (dockable) {
          setDocked(dockable);
        } else {
          // adjust height now that undocked
          // setLayout((state) => ({
          //   ...state,
          //   size: 400
          // }));
        }
      }
    }
    if (resizing) {
      if (mouse.button === 1) {
        setLayout((state) => ({
          ...state,
          height: mouse.y - resizing.y + resizing.layout.height,
        }));
      } else {
        // end resizing
        setResizing(undefined);
      }
    }
  }, [dragging, resizing, mouse, dockable]);

  useEffect(() => {
    switch (docked) {
      case "left":
        setLayout((state) => ({
          ...state,
          left: 0,
          top: 0, // toolbar height
          height: canvas.height, // ?
        }));
        break;
      case "right":
        setLayout((state) => ({
          ...state,
          left: canvas.width - state.width,
          top: 0, // toolbar height
          height: canvas.height, // ?
        }));
        break;
    }
  }, [docked, canvas, setLayout]);

  return (
    <div
      className={classnames(css.Panel, {
        [css.dragging]: dragging,
        [css.dockedLeft]: docked === "left",
        [css.dockedRight]: docked === "right",
        [css.dockedRight]: docked === "right",
        [css.dockableLeft]: dockable === "left",
        [css.dockableRight]: dockable === "right",
      })}
      style={{
        height: layout.height,
        width: layout.width,
        top: layout.top,
        left: layout.left,
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
        {!docked ? (
          <>
            <button onClick={() => setDocked("left")}>||←</button>
            <button onClick={() => setDocked("right")}>→||</button>
          </>
        ) : null}
      </div>
      <div className={css.main} style={{ padding: 3 }}>
        {props.children}
        <div>{resizing ? "resizing" : null}</div>
        <div>{dragging ? `dragging ${canvas.width - right}` : null}</div>
        <div>{dockable ? `dockable ${dockable}` : null}</div>
      </div>
      {!docked ? (
        <div
          className={css.foot}
          onMouseDown={(e) => {
            setResizing({ x: mouse.x, y: mouse.y, layout });
          }}
        ></div>
      ) : null}
    </div>
  );
}
