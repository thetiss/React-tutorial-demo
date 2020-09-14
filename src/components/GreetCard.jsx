import { render } from "@testing-library/react";
import React, { useState } from "react";

export default function GreetCard(props) {
  const firstName = useFormInput("Mary");
  const surName = useFormInput("Poppings");
  return (
    <section>
      <p>
        <input {...firstName} />{" "}
      </p>
      <p>
        <input {...surName} />
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
