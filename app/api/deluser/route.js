import {connectMongoDB} from "@/app/util/DB";
import { NextResponse , NextRequest } from "next/server";
import User from "@/app/model/userModel";
export async function POST(req){
     try {
        await connectMongoDB();
        const {id} = await req.json();
        console.log(id);
        const user = await User.findByIdAndDelete(id)
        console.log(user);
        return NextResponse.json({message:'reored deleted'})
     } catch (error) {
        return NextResponse.json({error:'error from server'},{status:500})
     }
}
