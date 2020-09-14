import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Greet from "./components/GreetCard";
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Greet />, document.getElementById("root"));

serviceWorker.unregister();
