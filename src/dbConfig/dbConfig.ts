import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("Database connected successfully");
        });

        connection.on('error', (err)=>{
            console.error("Database connection error:", err);
            process.exit(1);
        });
    }
    catch(error){
        console.error("something went wrong:", error);
    }
}