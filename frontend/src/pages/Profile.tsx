
import axios from 'axios';
import { Camera } from 'lucide-react';

import { useEffect, useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const token = localStorage.getItem("token")

interface ImageType {
  _id: string;
  image: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

function Profile() {


    const [username, setusername] = useState()
    const [email, setemail] = useState()
    const [credit, setCredit] = useState()

    const [images, setimages] = useState<ImageType[]>([])


    // console.log("Image base64:", images[0].image.slice(0, 100));




   async function fetdata(){


    try {
        
        const {data} = await axios.get(`${backendUrl}/profile`,{
            headers:{
                token
            }
        })

        console.log(data);
        

        if(data.success){
            setemail(data.user.email)
            setusername(data.user.username)
            setCredit(data.user.creditBalance)
            setimages(data.images)
        }
        

    } catch (error) {
        console.log(error);
        
    }


    }


    useEffect(() => {

        fetdata()
    },[])



  return (
    <div className="min-h-screen bg-gray-50 rounded-lg">
      {/* Cover Photo & Profile Header */}
      <div className="relative">
        <div 
          className="h-80 bg-gradient-to-r from-blue-500 to-purple-600 bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200')`
          }}
        >
         
          
       
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <div className="relative">
            <img
              src="https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>


      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-8">

        {/* Profile Info */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{username}</h1>

          <p className="text-gray-600 mb-4">{email}</p>
          
           <h3 className="text-lg font-bold text-gray-900 mb-2">Total Credit : {credit}</h3>
     

        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Photos</h2>
            <span className="text-sm text-gray-500">{images.length} photos</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
                
        

              <div 
                key={index}
                className="relative group overflow-hidden rounded-xl border-4 border-neutral-400 "
              >
                <img
                  src={img.image}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
   


   <a
    href={img.image}
    download
    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md 
               hover:bg-blue-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
  >
    Download
  </a>
              

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;