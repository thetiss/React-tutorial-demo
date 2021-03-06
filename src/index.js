import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Greet from "./components/GreetCard";
import Counter from "./components/counter";
import Growup from "./components/Growup";
import Author from "./components/Author";
import * as serviceWorker from "./serviceWorker";

//默认APP
//ReactDOM.render(<App />, document.getElementById("root"));
//Hook 入门
//ReactDOM.render(<Greet />, document.getElementById("root"));
//Hook 重构Counter
//ReactDOM.render(<Counter />, document.getElementById("root"));
//Hook useEffect() Advanced learnning
//ReactDOM.render(<Growup />, document.getElementById("root"));
//Hook by Dan abrmov introduction in React CONF 2018
ReactDOM.render(<Author />, document.getElementById("root"));

serviceWorker.unregister();
