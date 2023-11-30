import {connectMongoDB} from "@/app/util/DB";
import { NextResponse , NextRequest } from "next/server";
import Notice from "@/app/model/noticeModel";
export async function POST(req){
     try {
        await connectMongoDB();
        const {email} = await req.json();
        const usernotice = await Notice.find({email:email})
        return NextResponse.json({usernotice},{status:201})
     } catch (error){
      console.log(error);
        return NextResponse.json({error:'error 3 from server'},{status:500})
     }
}