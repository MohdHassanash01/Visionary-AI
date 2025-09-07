import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Button } from "./ui/button";


export default function Generation() {

  const navigate = useNavigate()

  return (
    <div className="pb-16 text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold dark:text-neutral-500 py-6 md:py-16">See the magic. try</h1>

      <Button 

      onClick={() => navigate("/generate")}
className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500 border-2 hover:bg-blue-400"
>Generate Images 
    <img 
    className="h-6"
    src={assets.star_group} alt="" />
</Button>

    </div>
  )
}
