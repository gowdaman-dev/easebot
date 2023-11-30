import {connectMongoDB} from "@/app/util/DB";
import { NextResponse , NextRequest } from "next/server";
import User from "@/app/model/userModel";
export async function POST(req){
     try {
        await connectMongoDB();
        const {getrole} = await req.json()
        const admindata = await User.find({role:getrole})
        return NextResponse.json({admindata},{status:201})
     } catch (error){
      console.log(error);
        return NextResponse.json({error:'error 3 from server'},{status:500})
     }
}