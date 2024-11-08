import mongoose from "mongoose"

const connectDB = async() =>{
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    
    const url = `${db.connection.host}:${db.connection.port}`
    console.log(`MongoDb connected on:${url}`)

  } catch (error) {
    console.log(`error: ${errorr.message}`)
    process.exit(1)
  }
}

export default connectDB