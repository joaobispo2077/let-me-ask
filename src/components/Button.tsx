//rafc

import { useState } from "react"

export const Button = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrementCounter = () => {
    setCounter((prevCounter) =>{
      const newValue = prevCounter + 1;
      console.log(newValue);    
      return newValue
    });
  }

  return (
    <button onClick={handleIncrementCounter}>{counter}</button>
  )
}
