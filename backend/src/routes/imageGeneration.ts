import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import userModel from "../models/user.model";
import FormData from "form-data";
import axios from "axios";

import imageModel from "../models/images.model";


export const generateImage = express.Router();

console.log("Clipdrop API Key:", process.env.CLIPDROP_API);

generateImage.post(
  "/generateImages",
  authMiddleware,
  async function (req: Request, res: Response) {
    try {
        //@ts-ignore
      const userId = req.userId;

      const { prompt } = req.body;
      console.log(prompt);
      
      console.log("userid :",userId);
      console.log("prompt :",prompt);

      

      if (!userId || !prompt) {
         res.send({
          success: false,
          message: "Missing Details",
        });
      }

      const user = await userModel.findById(userId);

      console.log("user : ",user);
      

      if (!user) {
         res.send({
          success: false,
          message: "User not found",
        });

        return
      }


      if (user.creditBalance === 0 || user.creditBalance <= 0) {
         res.send({
          success: false,
          message: "No Credit Balance",
          creditBalance: user?.creditBalance,
        });
      }

      const formData = new FormData()
      formData.append("prompt",prompt)

      const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                 ...formData.getHeaders(),
             'x-api-key': process.env.CLIPDROP_API,   
            },
            responseType: "arraybuffer"
      })
 
      console.log("data : ",data);
      

      const base64Image = Buffer.from(data, "binary").toString("base64")
      const resultImages = `data:image/png;base64,${base64Image}`
     
      await imageModel.create({
        image: resultImages,
        userId 
      })

      await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})
    
      res.json({
        success: true,
        message: "Images Generated",
        creditBalance: user.creditBalance -1,
        resultImages
      })
   
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        error: error.message,
        message: "Internal server error",
      });
    }
  }
);
