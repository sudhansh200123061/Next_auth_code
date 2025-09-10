import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";


connect();

export const GET = async (request: NextRequest) => {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById({_id: userId}).select("-password -isAdmin");
        return NextResponse.json({
            message: "user found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });   
    }
}