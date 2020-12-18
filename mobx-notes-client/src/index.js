import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
