import { useContext } from "react"
import { UserContext } from "../context/UserContextProvider"


const UseContext = () => {
  const userDetail = useContext(UserContext);
  
  return (
    <div>
        <h2 className='text-center m-3 text-red-400 font-mono text-xl'>useContext hook explain</h2>
        <p className="text-center">{userDetail.name}</p> 
        <p className="text-center">{userDetail.rno}</p>
    </div>  
    )
}

export default UseContext