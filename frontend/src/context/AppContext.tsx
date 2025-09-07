/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

import { createContext, useState, type ReactNode, type Dispatch, type SetStateAction, useEffect } from "react";


interface User {
  id?: string;
  username?: string;
  email?: string;
   creditBalance: number
}


interface AppContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  showLogin: boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  credit: number,
  setCredit:Dispatch<SetStateAction<number>>
}

const backendUrl = import.meta.env.VITE_BACKEND_URL

  const token = localStorage.getItem("token")
  


export const AppContext = createContext<AppContextType | null>(null);

function AppContextProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const [credit, setCredit] = useState<number>(0)

  const value: AppContextType = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    credit,
    setCredit
  };


  

 async function loadCreditsData(){

  try {
    
    const {data} = await axios.get(`${backendUrl}/credits`,
      {
        headers:{
          token
        }
      }
    )


    // console.log("credit data : ",data);

    if (data.success) {
      setCredit(data.credits)

    }
    
  } catch (error) {
    console.error('Error:', error);
  }

  }



  useEffect(() => {
    const data = localStorage.getItem("user")
    // console.log("local data : ",data);
    if (data) {
    try {
      setUser(JSON.parse(data));  // parse stored string into object
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }
  },[])


  useEffect(() => {

    if (token) {
      loadCreditsData()
    }

  },[token])


 
  

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;

