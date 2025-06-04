import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect()


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if the user exist
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 400});
        }

        // check if password is correct
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return  NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const res = NextResponse.json({
            message: "Login successfull",
            success: true,
            user: user
        })

        res.cookies.set("token", token, {
            httpOnly: true,
        })

        return res;


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

}