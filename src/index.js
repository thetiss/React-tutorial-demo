import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Greet from "./components/GreetCard";
import Counter from "./components/counter";
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
//Hook 入门
//ReactDOM.render(<Greet />, document.getElementById("root"));
//Hook 重构Counter
ReactDOM.render(<Counter />, document.getElementById("root"));

serviceWorker.unregister();
