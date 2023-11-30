import {connectMongoDB} from "@/app/util/DB";
import { NextResponse , NextRequest } from "next/server";
import Notice from "@/app/model/noticeModel";
export async function POST(req){
     try {
        await connectMongoDB();
        const {id} = await req.json();
        console.log(id);
        const user = await Notice.findByIdAndDelete(id)
        console.log(user);
        return NextResponse.json({message:'reored deleted'})
     } catch (error) {
        return NextResponse.json({error:'error from server'},{status:500})
     }
}
