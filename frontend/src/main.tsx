import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client"

import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./redux-store/index.ts";

import  'react-tooltip/dist/react-tooltip.css'
import "./index.css";

export const socket = io("http://localhost:3000")

const root: HTMLElement = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.Fragment>
    <Provider store={store}>
        <App />
    </Provider>
  </React.Fragment>
);
