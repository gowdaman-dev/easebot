import {connectMongoDB} from "@/app/util/DB";
import User from "@/app/model/userModel";
import { NextResponse , NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
export async function POST(req){
     try {
        await connectMongoDB();
        const {name , email ,role, pass} = await req.json();
        const password = await bcrypt.hash(pass , 10)
        await User.create({name , email , role , password})
        return NextResponse.json({msg:'done'},{status:201})
     } catch (error) {
        return NextResponse.json({error:'error from server'},{status:500})
     }
}

