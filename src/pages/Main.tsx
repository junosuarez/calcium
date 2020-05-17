import React, { useContext } from "react";
import { Toolbar } from "../components/Toolbar";
import { Panel } from "../components/Panel";
import Canvas, { CanvasContext } from "../components/Canvas";

function CanvasInspector() {
  const canvas = useContext(CanvasContext);
  return (
    <div>
      <pre>{JSON.stringify(canvas, null, 2)}</pre>
    </div>
  );
}

export function Main() {
  return (
    <>
      <Toolbar></Toolbar>
      <Canvas>
        <Panel title="Info" docked="left">
          Here is some stuff in a panel!
          <div>
            <CanvasInspector></CanvasInspector>
          </div>
        </Panel>
      </Canvas>
    </>
  );
}
