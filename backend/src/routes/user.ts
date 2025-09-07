import dotenv from "dotenv"
import express from "express"
import {z} from  "zod"
import userModel from "../models/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET 

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export const userRouter = express.Router()

userRouter.post("/signup", async function(req,res){

    console.log(req.body);
    

    const requiredBody = z.object({
   
    username:z.string()
    .nonempty({message: "username is required"}),

    email:z.string()
    .nonempty({ message: "Email is required" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(50, { message: "Email must be less than 320 characters" })
        .email({ message: "Please enter a valid email address" }),


        password: z.string()
             .nonempty({ message: "Password is required" })
        .min(5, { message: "Password must be at least 5 characters long"})
        .max(20, { message: "Password must be less than 20 characters" }) 
        .refine(
            (value) => /[A-Z]/.test(value), 
            { message: "Password must contain at least one uppercase letter" }
          )
          .refine(
            (value) => /[a-z]/.test(value), 
            { message: "Password must contain at least one lowercase letter" }
          )
          .refine((value) => /[0-9]/.test(value), {
            message: "Password must contain at least one number"
        })
    })

    const result = requiredBody.safeParse(req.body)

    
    if (!result.success) {
          res.status(411).send({
            error:"Incorrect Format", 
            message: result.error.issues[0].message
        })

        return
    }

    const {username, email, password} = result.data

    console.log(result.data);
    
    try {

       const existuser = await userModel.findOne({
            email
        })

        if (existuser) {
              res.status(403).send({
                message:"user is already exists in our database",
                success: false
            })

            return
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await  userModel.create({
            username,
            email,
            password:hashedPassword
        })

// 2. Generate JWT token
const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET as string, {
    expiresIn: "7d"
  })


        if (user) {
             res.status(200).send({
                message:"signed up successfully...",
                user,
                token,
                success: true
            })

            return
        }
        
    } catch (error:any) {
        
        console.error(error);  // Log the error for debugging

       res.status(500).send({
        error:`Internal server error `,
        message: error.message,
        success: false
       }) 

    }
    
})



userRouter.post("/signin", async function(req,res){
  
    console.log(req.method, req.url);
    

    const requiredBody = z.object({
   
    email:z.string()
    .nonempty({ message: "Email is required" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(320, { message: "Email must be less than 320 characters" })
        .email({ message: "Please enter a valid email address" }),

        password: z.string()
             .nonempty({ message: "Password is required" })
        .min(5, { message: "Password must be at least 5 characters long"})
        .max(20, { message: "Password must be less than 20 characters" }) 
     

    })

    const result = requiredBody.safeParse(req.body)

    
    if (!result.success) {
         res.status(411).send({
            error:"Validation Format", 
            message:result.error.issues[0].message
        })

        return
    }

    const { email, password} = result.data

    try {

       const user = await userModel.findOne({
            email
        })

        if (!user) {
         res.status(403).send({
                message:"User does not exist. Please sign up first"
            })

            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch) {

            const token = jwt.sign({
                id: user._id.toString()
            },JWT_SECRET)

             res.status(200).send({
                message:"successflly sign in....",
                user,
                token,
                success:true
            })

            
        }else{

             res.status(500).send({
                message:"your credentials is incorrect...",
                success: false
            })

            return

        }
        
    } catch (error:any) {
        
        console.error(error);  // Log the error for debugging

       res.status(500).send({
        error:`Internal server error `,
        message: error.message,
        success: false
       }) 
       
    }
    
})