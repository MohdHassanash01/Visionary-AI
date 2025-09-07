import { User2, Mail, Lock, Eye, EyeOff, X } from "lucide-react";
// import { assets } from "../assets/assets";
import { Button } from "./ui/button";
import { useContext, useEffect, useState, type FormEvent } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

  const backendUrl  = import.meta.env.VITE_BACKEND_URL

export default function Auth() {
  
  const appContext = useContext(AppContext);
  
  // Check if context exists before destructuring
  if (!appContext) {
    throw new Error("Login must be used within an AppContextProvider");
  }


  
  const { setShowLogin, setUser } = appContext;

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/signin`, {
          email,
          password
        });

        console.log("data : ",data);
        

        if (data.success) {
          localStorage.setItem("token",data.
            token)

             const cleanUser:{
              id:string,
              username:string,
              email: string,
              creditBalance: number
             } = {
    id: data.user._id,
    username: data.user.username,
    email: data.user.email,
    creditBalance: data.user.creditBalance
  };

   setUser(cleanUser);
  localStorage.setItem("user", JSON.stringify(cleanUser));

          setSuccess("Login successful!");
         setShowLogin(false)
        }

      } else {

        // Sign Up logic would go here
        const { data } = await axios.post(`${backendUrl}/signup`, {
          username,
          email,
          password
        });

        console.log(data);
        

        if (data.success) {
          localStorage.setItem("token",data.token)

           const cleanUser:{
              id:string,
              username:string,
              email: string,
              creditBalance: number
             } = {
    id: data.user._id,
    username: data.user.username,
    email: data.user.email,
    creditBalance: data.user.creditBalance
  };

  setUser(cleanUser);
  localStorage.setItem("user", JSON.stringify(cleanUser));

     setSuccess("Login successful!");
      setShowLogin(false)

        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // console.log(email, password);
  

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close login"
        >
          <X size={24} className="text-gray-500" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{state}</h1>
            <p className="text-gray-500 mt-2">
              {state === "Login" 
                ? "Welcome back! Please sign in to continue" 
                : "Create an account to get started"}
            </p>
          </div>

          <form 
          onSubmit={submitHandler}
         className="space-y-4">
            {state === "Sign Up" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User2 size={18} className="text-gray-400" />
                </div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition 
                  text-neutral-600 font-semibold"
                  required 
                  type="text" 
                  placeholder="Full Name" 
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-neutral-600 font-semibold"
                required 
                type="email" 
                placeholder="Email" 
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-neutral-600 font-semibold"
                required 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>

            {state === "Login" && (
              <div className="text-right">
                <button type="button" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : state === "Login" ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            {state === "Login" ? (
              <p className="text-black">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setState("Sign Up");
                    setError("");
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-black">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setState("Login");
                    setError("");
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}