import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./redux-store/index.ts";

import  'react-tooltip/dist/react-tooltip.css'
import "./index.css";
import "./Editor.css"

const root: HTMLElement = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.Fragment>
    <Provider store={store}>
        <App />
    </Provider>
  </React.Fragment>
);
