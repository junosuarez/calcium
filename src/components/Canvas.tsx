import React from "react";
import css from "./Canvas.module.css";

export default function Canvas({ children }: React.PropsWithChildren<{}>) {
  return <div className={css.Canvas}>{children}</div>;
}
