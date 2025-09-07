

import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import userModel from "../models/user.model";


import imageModel from "../models/images.model";


export const profile = express.Router();



profile.get(
  "/profile",
  authMiddleware,
  async function (req: Request, res: Response) {
    try {
        //@ts-ignore
      const userId = req.userId;


      const user = await userModel.findById(userId);

      if (!user) {
         res.send({
          success: false,
          message: "User not found",
        });

        return
      }

      const images = await imageModel.find({userId}).sort({ createdAt: -1 });

      console.log(images);
      
    
      res.json({
        success: true,
        message: "user Profile",
        user,
        images
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
