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

ReactJS hook 不能条件渲染，要置于最顶层。

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

custom hook **useFormInput**.Via this,different components can share data.

By convention,custom hook like this : **useXXX()** 

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
function useFormInput(initValue) {//custom hook example
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

## step 3 useEffect()

~~~jsx
import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";

export default function GreetCard(props) {
  const firstName = useFormInput("Mary");
  const surName = useFormInput("Poppings");

  const width = useWidowsWidth();
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

~~~



# Demo-Couter

> 在Each Button上，给onClick绑定hook

~~~jsx
import React, { useState, useEffect } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  function handleClick(byValue) {
    setCount(count + byValue);
  }
  return (
    <div>
      <h1>You have clicked {count} 次</h1>
      <button onClick={() => handleClick(1)}>Add</button>
      <button onClick={() => handleClick(-1)}>Del</button>
    </div>
  );
}

export default Counter;
~~~



## 错误尝试

思路：1 封装useButton组件，用ADD 或DEL来判断增减。

BUT: HOOK 不支持条件渲染，必须在顶层实现。

结果：无法实现。



