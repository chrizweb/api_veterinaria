import express from 'express'
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import veterinaryRoutes from "./Routes/veterinaryRoutes.js";
import patientRoutes from "./Routes/patientRoutes.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
dotenv.config()
connectDB()

app.use("/api/veterinarios", veterinaryRoutes)
app.use("/api/pacientes", patientRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
  console.log(`Server on port:${PORT}`)
})