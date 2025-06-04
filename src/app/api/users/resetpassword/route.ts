import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse , NextRequest } from "next/server";



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;

        console.log(token)
        console.log(newPassword)

        const user = await User.findOne({
            forgetPasswordToken: token,
            forgetPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        
        console.log("User found:", user);

        user.password = await bcrypt.hash(newPassword, 10);
        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully", success: true }, { status: 200 });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}