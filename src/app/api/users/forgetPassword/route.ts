import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
    try {
        const {token, password} = await request.json();
        console.log(token);
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        
        if(!user){
            return NextResponse.json({error: "Invalid or expired token", success: false});
        }
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();
        return NextResponse.json({message: "Password has been reset successfully", success: true});
        
    } catch (error: any) {
       
        return NextResponse.json({error: error.message}, {status: 500});
    }
}