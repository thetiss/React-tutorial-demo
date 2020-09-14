本文旨在熟悉ReactJS中Lifecycle hook。并根据video中的指导逐步完成demo。

# 阶段一 用Class Component,this.setState() and componentDidMounted()

https://www.youtube.com/watch?v=kVyrzn29QPk



`<App/>与<Child/>`

1. 实现相同ReactJS lifecycle hook方法。

   **but**

1. `只在<App/>`实现`handleChange()`
2. console.log时打印会有区别。



# 阶段二 用useState() and useEffect()

In 2018,At React Conf,Dan show us.

## step 1 Basic code(same as /src/componets/GreetCard.jsx)

~~~jsx
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

~~~



## step 2 Advanced code

customer hook **useFormInput**.Via this,different components can share data.

~~~jsx
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

~~~

