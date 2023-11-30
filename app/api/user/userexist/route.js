import {connectMongoDB} from "@/app/util/DB";
import { NextResponse , NextRequest } from "next/server";
import User from "@/app/model/userModel";
export async function POST(req){
     try {
        await connectMongoDB();
        const {email} = await req.json();
        const user = await User.findOne({email}).select("_id");
        console.log(user);
        return NextResponse.json({user})
     } catch (error) {
        return NextResponse.json({error:'error from server'},{status:500})
     }
}

