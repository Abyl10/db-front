import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <MantineProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MantineProvider>
  </BrowserRouter>
);
