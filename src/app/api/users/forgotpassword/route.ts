// pages/api/users/forgotpassword.js
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json(); // Use NextRequest to get the body
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // Generate a reset token and send email
        await sendEmail({ email: user.email, emailType: "RESET", userId: user._id });
        return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
