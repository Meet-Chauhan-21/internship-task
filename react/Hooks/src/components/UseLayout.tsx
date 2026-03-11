import { useEffect, useLayoutEffect } from 'react'

const UseLayout = () => {
    
    useEffect(()=>{
        console.log("useEffect run")
    })

    useLayoutEffect(()=>{
        console.log("useLayoutEffect run")
    },[])

  return (
    <div>
        <h2 className='text-center m-3 text-red-400 font-mono text-xl'>UseLayout hook explain</h2>
        <h3 className='text-center text-2xl'>Used : execute before dom printing</h3>
    </div>  
  )
}

export default UseLayout