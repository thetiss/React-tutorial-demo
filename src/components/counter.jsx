import React, { useState, useEffect } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  function handleClick(byValue) {
    setCount(count + byValue);
  }
  useEffect(() => {
    document.title = "clicked #" + count + " times";
  });
  return (
    <div>
      <h1>You have clicked {count} 次</h1>
      <button onClick={() => handleClick(1)}>Add</button>
      <button onClick={() => handleClick(-1)}>Del</button>
    </div>
  );
}

export default Counter;
