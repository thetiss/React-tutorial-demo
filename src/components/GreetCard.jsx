import { render } from "@testing-library/react";
import React, { useState } from "react";

export default function GreetCard(props) {
  const [firstName, setFirstName] = useState("Mary");
  const [surName, setSurName] = useState("Poppins");

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }
  function handleSurNameChange(e) {
    setSurName(e.target.value);
  }

  return (
    <section>
      <p>
        <input
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        ></input>
      </p>
      <p>
        <input
          name="surName"
          value={surName}
          onChange={handleSurNameChange}
        ></input>
      </p>
    </section>
  );
}
