import { getDataFromToken } from "@/helpers/getDataFromToken";
import Achievement from "@/models/achivementModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newAchievement = new Achievement(body);
        await newAchievement.save();

        return NextResponse.json({
            message: "Achievement added successfully",
            data: newAchievement
        }, { status: 201 });
        
    } catch (error: any) {
        console.error("Error adding achievement:", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        
        if (!userID) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const achievements = await Achievement.find({ user: userID }); // Fetch all achievements for the user
        
        if (!achievements.length) {
            return NextResponse.json({ error: "No achievements found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Achievements found",
            data: achievements // Return all achievements
        });
        
    } catch (error: any) {
        console.error("Error fetching achievements:", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
