import { NextResponse } from "next/server";


export async function POST(req) {

    const data = await req.json();
    console.log("---------- ",data)
   return NextResponse.json({
    success:true,
    message:"ok"
   },{status:200})
}
