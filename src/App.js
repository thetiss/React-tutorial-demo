import React, { Component } from "react";
import "./App.css";
import Child from "./components/Child";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userName: "Mary",
    };
    console.log("constructor");
  }
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }
  shouldComponentUpdate(prevProps, prevState) {
    console.log("shouldComponentUpdate");
    return true;
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }
  handleChange = () => {
    this.setState({
      userName: "Jane",
    });
  };
  render() {
    console.log("render");
    return (
      <React.Fragment>
        <div>{this.state.userName}</div>
        <Child userName={this.state.userName} />
        <button onClick={this.handleChange}>Change State</button>
      </React.Fragment>
    );
  }
}

export default App;
