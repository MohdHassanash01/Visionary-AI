
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { dbConnection } from "./config"
import { userRouter } from "./routes/user"
import { userCredit } from "./routes/credit"
import { generateImage } from "./routes/imageGeneration"
import { profile } from "./routes/profile"

dotenv.config()

const app = express()
const PORT = process.env.PORT
const MONGODB_URL= process.env.MONGODB_URL as string

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",userRouter)
app.use("/api/v1",userCredit)
app.use("/api/v1",generateImage)
app.use("/api/v1",profile)





app.listen(PORT, function(){
    dbConnection(MONGODB_URL)
    console.log(`server is running on ${PORT}`);
    
})