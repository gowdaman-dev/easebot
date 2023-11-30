import {connectMongoDB} from "@/app/util/DB";
import { NextResponse , NextRequest } from "next/server";
import User from "@/app/model/userModel";

export async function POST(req){
     try {
        await connectMongoDB();
        const {emaildata} = await req.json();
        const {role} = await User.findOne({email:emaildata})
        return NextResponse.json({role})
     } catch (error){
        return NextResponse.json({error:'error from server'},{status:500})
     }
}

export async function GET(req){
     return NextResponse.json({mrssage:"ok"})
}
