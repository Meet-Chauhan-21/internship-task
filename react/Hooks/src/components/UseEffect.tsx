import { useEffect, useState } from "react";

const UseEffect = () => {

  const [count,setCount] = useState<number>(0)

  useEffect(()=>{
    console.log("useEffect run in every render")
  })

  useEffect(()=>{
    console.log("useEffect run only first render")
  },[])

  useEffect(()=>{
    console.log("useEffect run when count value change")
    return ()=>{
      console.log("unmount count")
    }
  },[count])

  return (
    <div>
      <h2 className="text-center m-3 text-red-400 font-mono text-xl">
        useEffect hook explain
      </h2>
      <h2 className="font-bold text-3xl text-center m-4">{count}</h2>
      <div className="flex justify-center">
        <button 
          onClick={()=>{setCount(count+1)}}
        className="border-2 px-3 py-1 rounded-md transition-all hover:text-black hover:bg-white">change</button>
      </div>
    
    </div>
  );
};

export default UseEffect;
