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
