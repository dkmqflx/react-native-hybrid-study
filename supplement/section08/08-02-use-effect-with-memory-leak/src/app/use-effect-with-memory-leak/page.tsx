"use client";

import { useEffect, useState } from "react";

export default function UseEffectWithMemoryLeakPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const 나의인터벌 = setInterval(() => {
      alert(`현재 카운트는 몇 일까요? ${count}`);
    }, 5000);

    // return 함수를 실행해서 메모리 누수를 막는다.
    return () => {
      clearInterval(나의인터벌);
    };
  }, [count]);

  const onClickCountUp = () => {
    setCount(count + 1);
  };

  return <button onClick={onClickCountUp}>카운트 올리기</button>;
}
