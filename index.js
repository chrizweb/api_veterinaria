import express from 'express'
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import veterinaryRoutes from "./Routes/veterinaryRoutes.js";

const app = express()
app.use(express.json())
dotenv.config()
connectDB()

app.use("/api/veterinarios", veterinaryRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
  console.log(`Server on port:${PORT}`)
})