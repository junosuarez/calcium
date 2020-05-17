import React from "react";
import { Toolbar } from "../components/Toolbar";
import { Panel } from "../components/Panel";
import Canvas from "../components/Canvas";

export function Main() {
  return (
    <>
      <Toolbar></Toolbar>
      <Canvas>
        <Panel title="Info" docked="left">
          Here is some stuff in a panel!
        </Panel>
      </Canvas>
    </>
  );
}
