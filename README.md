本文旨在熟悉ReactJS中Lifecycle hook。并根据video中的指导逐步完成demo。

Without React Hook,you may be familar with following this：

1. **wrapper hell**
2. **huge components**
3. **confusing classes**

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

易错点如何理解：

1. useState() and useEffect()均在顶层。
2. setWidth()可在任意位置，不要把setWidth()当作hook.仅需注意useXXX()那10个ReactJS Hook.
3. handleXXX()可单独定义在custom hook外，也可定义在useEffect()里。

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



# React Hooks Demo-Couter #only useState()

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



# Advanced Understanding for useEffect()

https://www.youtube.com/watch?v=-4ni4uCUcvY

## 1 what is "side effect"



Side-effects can happen in response to Redux actions. For example, when a user clicks “Save,” you may want to fire off an AJAX request.

`T` 引进Side-effects 就是要对Redux Action负责。如：用户点击save按钮，Side-effects快速提交AJAX 请求。

## 2 lifecycle

> tips：`useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount`。这三个函数的组合，**绿色部分**
>
> mounting **birth**/updating **grow**/unmounting **die**

<img src="C:\Users\chenh\Desktop\react\0 img\notes\catch a glimpse of react lifecycle.png" alt="catch a glimpse of react lifecycle" style="zoom:35%;" />

## 3 switch lifecycle  to hook with useEffect()

## useEffect() Grammar

>  useEffect()中，()=>{}全都可以用function XXX(){}代替。为迎合ES6规范，Please use Arrow Function，好处是：1 this已指向父级，2 减少代码量。
>
> 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数.
>
> 

### eg.1 useEffect(()=>{},[])

~~~jsx

~~~



### eg.2 useEffect(function growup(){},[])

~~~jsx

~~~



### eg.3 useEffect(()=>{})

~~~jsx

~~~

### eg.4 useEffect(()=>{return ()=>{}})

[return ()=>{}] 是cleanup机制的体现。

~~~jsx

~~~

# React Hook Demo-Growup #mainly in useEffect()

通过本例，入门useEffect()使用。在本例中，联想理解：

- mount-birth-only once

- update-learn sth and mistake-many times

- unmount-death-only once

1. feat: 区别mount，update，unmount

​       通过console.log("")内的give a birth，mask mistake等来联想区分

2. feat:how to control  only once ,many times 

通过useEffect(,nextProps)来区分，nextProps=[]：只执行1次。nextProps=[const]：只执行1次。nextProps不写，则每次均执行。

2. 当growth=40时，先return，再useEffect()主体,nirvana=false。再return ,document.title，主体，nirvana=true。本useEffect()被执行2次。之前(<40)、之后(>40)均是一次。

   <img src="C:\Users\chenh\Desktop\react\0 img\learn from youtube\img\image-20200916152348839.png" alt="image-20200916152348839" style="zoom:67%;" />

~~~jsx
import React, { useState, useEffect } from "react";
//必须定义在组件外，在组件内mount后就置为true，在整个lifecycle中都是true
let birth = false;
export default function Growup() {
  const [growth, setGrowth] = useState(0);
  const [nirvana, setNirvana] = useState(false);

  useEffect(() => {
    console.log("Give a birth");
  }, []);

  useEffect(() => {
    if (birth) {
      //若不在birth=true下，mount后就set title
      document.title = "Nirvana attained";
    }
  }, [nirvana]);

  useEffect(() => {
    if (birth) {
      console.log("make mistake and growup");
    } else {
      birth = true;
    }
    //以下2条语句每次都会打印，因为useEffect()未有参数，会一直执行。
    // console.log("print birth");
    // console.log(birth);
    if (growth > 30) {
      setNirvana(true);
      console.log(nirvana);
    }
    return () => {
      console.log("clean up mistakes");
    };
  });

  function handleGrowth() {
    setGrowth(growth + 10);
  }
  return (
    <div>
      <h1>Growth: {growth}</h1>
      <button onClick={handleGrowth}>Growup it</button>
    </div>
  );
}

~~~



# ReactJS Hook(基础#3，额外#7)

- [基础 Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#basic-hooks)
  - [`useState`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate)
  - [`useEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect)
  - [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)
- [额外的 Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)
  - [`useCallback`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback)
  - [`useMemo`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)
  - [`useRef`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usedebugvalue)

ReactJS hook 不能条件渲染，要置于最顶层。

## 易错点如何理解：

1. useState() and useEffect()均在顶层。
2. setWidth()可在任意位置，不要把setWidth()当作hook.仅需注意useXXX()那10个ReactJS Hook.
3. handleXXX()可单独定义在custom hook外，也可定义在useEffect()里。

# REF

## [1] ReactJS hook官网

https://zh-hans.reactjs.org/docs/hooks-effect.html

## [2] 

## [3] 