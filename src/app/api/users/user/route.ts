import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        
        if (!userID) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const user = await User.findOne({ _id: userID }).select("-password");
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });
        
    } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        
        if (!userID) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const body = await request.json();
        const updatedUser = await User.findByIdAndUpdate(userID, body, { new: true, select: "-password" });

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User updated successfully",
            data: updatedUser
        });
        
    } catch (error: any) {
        console.error("Error updating user data:", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}