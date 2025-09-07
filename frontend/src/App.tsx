import { useContext } from "react"
import Footer from "./components/Footer"
import Login from "./components/Auth"
import Navbar from "./components/Navbar"
import BuyCredit from "./pages/BuyCredit"
import Home from "./pages/Home"
import Result from "./pages/ImageGenerate"

import { Route, Routes } from "react-router-dom"
import { AppContext } from "./context/AppContext"
import Profile from "./pages/profile"

function App() {

   const appContext = useContext(AppContext);
  
  // Check if context exists before destructuring
  if (!appContext) {
    throw new Error("Login must be used within an AppContextProvider");
  }
  
  const { showLogin } = appContext;


  return (
    <div className="dark px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen  ">

<Navbar/>

{showLogin && <Login/> }


      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/generate" element={<Result/>}/>

        <Route path="/pricing" element={<BuyCredit/>}/>

 <Route path="/profile" element={<Profile/>}/>

      </Routes>

      <Footer/>

    </div>
  )
}

export default App


