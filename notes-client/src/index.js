import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";

import App from "./App";

class Root extends React.Component {
    render() {
        return (
            <CookiesProvider>
                <App />
            </CookiesProvider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("root"));
