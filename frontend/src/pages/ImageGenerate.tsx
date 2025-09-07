import { useContext, useState, type FormEvent } from "react";
import { assets } from "../assets/assets";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


  const backendUrl = import.meta.env.VITE_BACKEND_URL


export default function ImageGenerate() {

  const navigate = useNavigate()

   const appContext = useContext(AppContext);
    
    // Check if context exists before destructuring
    if (!appContext) {
      throw new Error("Login must be used within an AppContextProvider");
    }
    
    const { setCredit } = appContext;

  

    const [image,setImage] = useState<string>(assets.main_images)

    const [isImageLoaded, setIsImagesloaded] = useState(false)

   const [error, setError] = useState<string>("");

    const [loading , setLoading] = useState(false)

    const [input , setInput] = useState("")

      const token = localStorage.getItem("token")


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

    
   async function submitHandler(e: FormEvent<HTMLFormElement>){
      e.preventDefault()
      try {
 
        setLoading(true)
        const {data} = await axios.post(`${backendUrl}/generateImages`,{prompt: input},{headers:{token}})

        console.log(data);

        if (data.success) {
          loadCreditsData()
          setIsImagesloaded(true)
          setImage(data.resultImages)
          setInput("")
        setLoading(false)
console.log("image : ",image);

        }else{

          if (data.creditBalance === 0) {
            navigate("/pricing")
            toast.error("you have no credits")
          }

        }


      } catch (err) {
         if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "An error occurred during sign in");
        toast.error(error)
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
      }
      

    

  return (

    <form onSubmit={submitHandler}  
    className="flex flex-col min-h-[90vh] justify-center items-center">


    <div>
      
      <div className="relative">

        <img src={image} alt="generated" className="max-w-sm rounded"/>

        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? "w-full transition-all duration-[10s]":"w-0"}`}></span>



      </div>
        <p className={!loading ? "hidden":"block"}>loading......</p>

    </div>

         
{!isImageLoaded &&     <div className="flex w-full my-5 max-w-xl  text-white text-sm p-o.5 mt-10 rounded-full ">
        
<Input
value={input}
onChange={(e) => setInput(e.target.value)}
className="flex-1 bg-transparent  ml-8 max-sm:w-20 text-gray-600 font-semibold outline-none border-2 border-neutral-700 rounded-bl-lg  rounded-tl-lg rounded-tr-none rounded-br-none focus-visible:ring-0 
    focus-visible:ring-offset-0 
    focus:border-neutral-700
"

type="text" placeholder="Describe what you want to generate"/>
<Button
className="bg-zinc-900 px-5 sm:px-13 py-3 border-2 text-white border-neutral-700 hover:bg-neutral-700 rounded-bl-none rounded-tl-none"
type="submit">Generate</Button>

    </div>}


{isImageLoaded && 

    <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
        <p
        onClick={() => setIsImagesloaded(false)}
        className="bg-transparent border border-neutral-600-900  px-8 py-3 rounded-full cursor-pointer">Generate Another</p>
        <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer">Download</a>

    </div>

}

    </form>
  )
}


