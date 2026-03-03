import { useState } from "react"


const UseState = () => {

  const [count,setCount] = useState<number>(0)

  return (
    <div>
        <h2 className='text-center m-3 text-red-400 font-mono text-xl'>useState hook explain</h2>
       
          <h2 className="text-center text-xl underline">value</h2>
          <h2 className="text-center text-3xl font-bold font-sans m-4 text-white">{count}</h2>
        
        <div className="flex justify-center gap-2">
          <button onClick={()=>{setCount(count+1)}} 
            className="border-2 text-xl text-blue-500 rounded-md m-2 px-3 py-1 transition-all hover:text-white hover:bg-blue-400 font-bold bg-white"
            >Increment</button>
          <button onClick={()=>{setCount(count-1)}} 
            className="border-2 text-xl text-red-500 rounded-md m-2 px-3 py-1 transition-all hover:text-white hover:bg-red-400 font-bold bg-white"
            >Decrement</button>
        </div>
    </div>
  )
}

export default UseState