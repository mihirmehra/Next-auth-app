import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string; // Adjust this based on your actual token structure
    // Add other properties if needed
}

export const getDataFromToken = (request: NextRequest): string | null => {
    try {
        const token = request.cookies.get('token')?.value || '';
        if (!token) {
            return null; // No token found
        }

        if (!process.env.TOKEN_SECRET) {
            throw new Error("Token secret is not defined");
        }

        const decoded:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decoded.id; // Return the user ID or relevant data

    } catch (error: any) {
        console.error("Error decoding token:", error.message);
        return null; // Return null or handle the error as needed
    }
}
