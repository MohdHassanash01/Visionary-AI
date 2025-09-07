import { Link, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { Button } from "./ui/button"
import { useContext } from "react"
import {  User2, Zap } from "lucide-react"
import { AppContext } from "../context/AppContext"
import { ModeToggle } from "./mode-toggle"



export default function Navbar() {

  const appContext = useContext(AppContext);
  
  // Check if context exists before destructuring
  if (!appContext) {
    throw new Error("Login must be used within an AppContextProvider");
  }
  
  const { user,setShowLogin,setUser,credit } = appContext;
 
  // console.log(user);
  

  const navigate = useNavigate()

  function handleLogout(){
    navigate("/")
    setUser(null)
localStorage.removeItem("token")
localStorage.removeItem("user")

  }


  

  return (
    <div className="flex justify-between items-center py-4">
    

<Link to={"/"}>
            <div className="flex items-center space-x-2 ">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 " />
              </div>
              <span className="text-xl font-bold ">Visionary AI</span>
            </div>
</Link>



<div>

{user ? 

<div className="flex items-center gap-4 sm:gap-5">

<ModeToggle/>

    <Button 
    onClick={() => navigate("/pricing")}
    className="flex items-center gap-3 bg-blue-100  hover:bg-blue-100 shadow-none px-4 sm:px-6 py-1.5 rounded-full hover:scale-105 transition-all duration-700 ">
      <img className="w-5" src={assets.credit_star} alt="" />

      <p className="text-xs sm:text-sm font-medium text-gray-600 ">Credits left : {credit}</p>

    </Button>

    <p className=" max-sm:hidden pl-4">Hii, {user.username}</p>

<div className="relative group">

<div className="p-2  drop-shadow border-2 rounded-full w-fit dark:border-neutral-500">
 <User2  className=" w-5 h-5 "/>
</div>

 
 <div className="absolute hidden group-hover:block top-10 right-0 z-10 text-black ">

  <ul className="list-none m-0 p-3 bg-transparent rounded-md border-2 text-sm flex flex-col gap-3 border-neutral-600">

    <Button 
    onClick={() => navigate("/profile")}
    className="rounded  px-5 py-1 cursor-pointer pr-10 bg-neutral-700 font-semibold text-white  hover:bg-neutral-600">Profile</Button>

      <Button 
    onClick={handleLogout}
    className="rounded  px-5 py-1 cursor-pointer pr-10 bg-neutral-700 font-semibold text-white  hover:bg-neutral-600">Logout</Button>

  </ul>

 </div>

</div>

</div> : 

<div className="flex gap-3 sm:gap-5">

<Button 
onClick={() => navigate("/pricing")}
className="bg-transparent text-black hover:bg-transparent  cursor-pointer shadow-none">Pricing</Button>

<Button  
onClick={() => setShowLogin(true)}
className="cursor-pointer bg-zinc-800 text-white py-2 sm:px-10 px-8 text-sm  rounded-full">Login</Button>
</div>

}



</div>




    </div>
  )
}
