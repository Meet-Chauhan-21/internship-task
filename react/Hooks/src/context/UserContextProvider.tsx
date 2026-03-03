import { createContext } from "react";

// create context
export const UserContext = createContext<any>(null)

// Provide context
const UserContextProvider = ({ children } : any) => {
  const userData = { name: "Meet", rno: 431 };

  return (
    <UserContext.Provider value={userData}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
