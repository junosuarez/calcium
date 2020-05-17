import React from "react";
import css from "./Toolbar.module.css";

interface Props {}
export function Toolbar(props: Props) {
  return (
    <div className={css.Toolbar}>
      <h1>Canvas</h1>
      <ul>
        <li>
          <button>add node</button>
        </li>
      </ul>
    </div>
  );
}
