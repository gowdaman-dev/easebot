import mongoos from "mongoose";


export const connectMongoDB = async() =>{
    try{
        await mongoos.connect(process.env.MONGODB_URL);
    }catch(err){
        console.log('error in db connect:', err);
    }
}