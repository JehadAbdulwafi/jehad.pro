import { Button } from "@components/ui/button";
import { useCallback, useEffect, useState } from "react";
import Search from "./Search";

const Test = () => {
  console.log("test rerendered");
  const [count, setCount] = useState(0);
  let number = 0;
  const fn = useCallback(() => {
    console.log("fn running");
    // console.log(count);
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>{number}</p>
      <Button onClick={() => number++}>increment</Button>

      <Search onChange={fn} />
    </div>
  );
};

export default Test;
