import React, { useContext } from "react";
import { Toolbar } from "../components/Toolbar";
import { Panel } from "../components/Panel";
import Canvas, { CanvasContext } from "../components/Canvas";
import MouseContext from "../context/MouseContext";

function CanvasInspector() {
  const canvas = useContext(CanvasContext);
  return (
    <div>
      <section>
        <strong>Canvas</strong>
        <pre>{JSON.stringify(canvas, null, 2)}</pre>
      </section>
    </div>
  );
}
function ContextInspector({
  contextType,
  title,
}: {
  contextType: any;
  title: string;
}) {
  const ctx = useContext(contextType);
  return (
    <div>
      <section>
        <strong>{title}</strong>
        <pre>{JSON.stringify(ctx, null, 2)}</pre>
      </section>
    </div>
  );
}

export function Main() {
  return (
    <>
      <Toolbar></Toolbar>
      <Canvas>
        <Panel title="Info" docked="left">
          <CanvasInspector />
          <ContextInspector contextType={MouseContext} title="Mouse" />
        </Panel>
        <Panel title="About" docked="right">
          Calcium is a system for building interactive editor apps.
        </Panel>
      </Canvas>
    </>
  );
}
