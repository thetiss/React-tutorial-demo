import React, { useState, useEffect } from "react";
//functional component
export default function Author() {
  const firstName = useInputValue("Mary");
  const surName = useInputValue("Poppings");
  const width = useWindowWidth();
  //在useEffect()中直接调用DOM的API
  useEffect(() => {
    document.title = firstName.value + " " + surName.value;
  });
  return (
    <div>
      <p>
        {" "}
        <input {...firstName} />
      </p>
      <p>
        {" "}
        <input {...surName} />
      </p>
      <p>
        {" "}
        <h1>{width}</h1>
      </p>
    </div>
  );
}
//custom hook return {}
function useInputValue(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleInputValueChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleInputValueChange,
  };
}
//custom hook return width
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWidthChange = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWidthChange);
    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  });
  return width;
}
