import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";

export default function GreetCard(props) {
  const firstName = useFormInput("Mary");
  const surName = useFormInput("Poppings");

  const width = useWidowsWidth();
  //使用useEffect()动态更改网页title
  useEffect(() => {
    document.title = firstName.value + " " + surName.value;
  });
  return (
    <section>
      <p>
        <input {...firstName} />{" "}
      </p>
      <p>
        <input {...surName} />
      </p>
      <p>
        <h1>{width}</h1>
      </p>
    </section>
  );
}
function useFormInput(initValue) {
  const [value, setValue] = useState(initValue);
  function handleValueChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleValueChange,
  };
}

function useWidowsWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
}
