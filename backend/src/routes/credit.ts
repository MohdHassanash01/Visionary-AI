

import express from "express"
import { authMiddleware } from "../middlewares/AuthMiddleware"
import userModel from "../models/user.model"


export const userCredit = express.Router()

userCredit.get("/credits",authMiddleware,async function(req,res){

    try {

        //@ts-ignore
        const userId = req.userId
        const user = await userModel.findById(userId)

        // console.log(user);
        

        if (!user) {
            res.send({
                message:"user not found"
            })
        }else{

            res.json({
                success: true,
                credits: user.creditBalance,
                user:{
                    username: user.username
                }
            })
        }


    } catch (error:any) {
        
        res.send({
            success: false,
            error: error.message,
            message:"Internal server error"
        })

    }

})
