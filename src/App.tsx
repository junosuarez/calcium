import React from "react";
import "./App.css";
import { Main } from "./pages/Main";
import { MouseContextProvider } from "./context/MouseContext";

function App() {
  return (
    <MouseContextProvider>
      <Main />
    </MouseContextProvider>
  );
}

export default App;
