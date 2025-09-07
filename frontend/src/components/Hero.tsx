import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Button } from "./ui/button";
import {motion} from "framer-motion"
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Hero() {
  

    const appContext = useContext(AppContext);
  
  // Check if context exists before destructuring
  if (!appContext) {
    throw new Error("Login must be used within an AppContextProvider");
  }
  
  const { user, setShowLogin } = appContext;

  const navigate = useNavigate()

  function onclickHandler(){
    if(user){
      navigate("/generate")
    }
    else setShowLogin(true)
  }

  return (
    <motion.div 
    className="flex flex-col justify-center items-center text-center my-20"
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}>
      
      <motion.div className="cursor-pointer  inline-flex text-center gap-2  px-6 py-1 rounded-full border-2 border-neutral-500 "
        initial={{opacity:0, y:-20}}
    animate={{opacity:1, y:0}}
    transition={{delay:0.2, duration:0.8}}>

        <p className="">Create stunning visuals instantly</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

    {/* Main Heading */}
  <motion.h1 
    className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
    initial={{opacity: 0 }}
    animate={{opacity: 1 }}
    transition={{delay: 0.4, duration: 2}}
  >
    Transform your{" "}
    <span className="text-blue-600">ideas</span>  
    {" "}into images in seconds
  </motion.h1>

  <p className="text-center max-w-xl mx-auto mt-5">
    Type anything, and let AI turn it into breathtaking artwork. 
    From concepts to creations—your imagination is the only limit.
  </p>

<Button 
onClick={onclickHandler}
className="sm-text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-4 rounded-full dark:border-2 dark:border-slate-600 dark:hover:bg-blue-500"
>Generate Images 
    <img 
    className="h-6"
    src={assets.star_group} alt="" />
</Button>

<div className="flex flex-wrap justify-center mt-16 gap-4">
{Array(6).fill("").map((_,index) => (
    <img 
    className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
    src={index % 2 === 0 ? assets.catFootball: assets.main_images} alt="" key={index} width={70}/>
))}
</div>


<p className=" ">Created with Visionary AI</p>

    </motion.div>
  )
}
