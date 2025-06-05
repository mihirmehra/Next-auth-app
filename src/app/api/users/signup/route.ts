import {connect} from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



connect()


export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json()
        const {
            username, 
            email, 
            password,
            name,
            phoneNumber,
            location,
            dateOfBirth,
            nationality,
            languages,
            currentPosition,
            workExperience,
            education,
            skills,
            bio,
            aboutYou,
            professionalGoals,
        } = reqBody
        
        console.log(reqBody);

        if (!username || !email || !password) {
            return NextResponse.json({error: "Please provide all required fields"}, {status: 400});
        }

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            name,
            phoneNumber,
            location,
            dateOfBirth,
            nationality,
            languages,
            currentPosition,
            workExperience,
            education,
            skills,
            bio,
            aboutYou,
            professionalGoals,
            password: hashedPassword
        });

        const savedUser = await newUser.save()

        console.log("User created successfully:", savedUser);

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User created successfully", 
            success: true,
            savedUser
        });
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500}); 
    }
}