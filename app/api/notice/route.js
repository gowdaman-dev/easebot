import { connectMongoDB } from "@/app/util/DB";
import Notice from "@/app/model/noticeModel";
import { NextResponse } from "next/server";
export async function PUT(req) {
  try {
    await connectMongoDB();
    const notice = await Notice.find();
    return NextResponse.json({ notice }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "error from server" }, { status: 500 });
  }
}
