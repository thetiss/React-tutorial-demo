import React, { Component } from "react";

class Child extends Component {
  constructor() {
    super();
    console.log("Child constructor");
  }
  componentWillMount() {
    console.log("Child componentWillMount");
  }
  componentDidMount() {
    console.log("Child componentDidMount");
  }
  componentWillReceiveProps() {
    console.log("Child componentWillReceiveProps");
  }
  shouldComponentUpdate(prevProps, prevState) {
    console.log("Child shouldComponentUpdate");
    return true;
  }
  componentWillUpdate() {
    console.log("Child componentWillUpdate");
  }
  render() {
    console.log("Child render");
    return <div>Child :{this.props.userName}</div>;
  }
}

export default Child;
