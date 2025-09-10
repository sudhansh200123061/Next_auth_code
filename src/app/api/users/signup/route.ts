import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User Already Exists"}, {status: 400});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newuser = new User({
            username,
            email,
            password: hashedpassword
        })

        const savedUser = await newuser.save();
        console.log(savedUser);
        //send verification email
        await sendEmail({email: savedUser.email, emailType: "VERIFY", userId: savedUser._id});
        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser
        })

    } catch (error: Error | any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}


connect();