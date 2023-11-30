import {connectMongoDB} from "@/app/util/DB";
import Notice from "@/app/model/noticeModel";
import { NextResponse , NextRequest } from "next/server";
export async function POST(req){
   try {
    let date = new Date().toLocaleTimeString();
    const {name,email,message,uploadtime} = await req.json();
    await connectMongoDB() // Parse the request body as JSON
     console.log(name,email,message,uploadtime);
     await Notice.create({name,email,message,time:date})
     console.log('data inserted');
    return NextResponse.json({ message: 'Success' });
    } catch (error) {
      return NextResponse.json({ message: 'Invalid JSON' });
    }
}