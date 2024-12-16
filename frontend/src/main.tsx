import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import React from "react";

import { Provider } from "react-redux";
import store from "./redux-store/index.ts";

import "./index.css";

const root: HTMLElement = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
