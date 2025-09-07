import { useContext } from "react";
import {  plans } from "../assets/assets";
import { Button } from "../components/ui/button";
import { AppContext } from "../context/AppContext";


export default function BuyCredit() {

      const appContext = useContext(AppContext);
  
  // Check if context exists before destructuring
  if (!appContext) {
    throw new Error("Login must be used within an AppContextProvider");
  }
  
  const { user } = appContext;

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
     
     <Button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
     </Button>

     <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">Choose the plan
     </h1>

     <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
            <div key={index}
            className="bg-white drop-shadow-sm border-2 rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all border-neutral-600">

<p className="mt-3 mb-1 font-semibold">{item.id}</p>
<p className="text-sm">{item.desc}</p>

<p className="mt-6">
    <span className="text-3xl font-medium">
${item.price}/{item.credits}
    </span>
     credits
</p>

<Button className="w-full bg-gray-800 text-white  mt-8 text-sm rounded-md py-2.5 min-w-52 hover:bg-gray-700">{user ? "Purchase":"Get Started"}</Button>

            </div>
        ))}
     </div>

    </div>
  )
}
