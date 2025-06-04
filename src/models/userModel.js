import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a Username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
    },
    name: {
        type: String,
        default: "Anonymous",
    },
    phoneNumber: {
        type: Number,
        default: "Not Provided",
    },
    location: {
        type: String,
        default: "Not Specified",
    },
    dateOfBirth: {
        type: Date,
        default: null, 
    },
    nationality: {
        type: String,
        default: "Not Specified",
    },
    languages: {
        type: [String],
        default: [], 
    },
    currentPosition: {
        type: String,
        default: "Unemployed", 
    },
    workExperience: {
        type: String,
        default: "No Experience",
    },
    education: {
        type: String,
        default: "Not Specified",
    },
    skills: {
        type: [String],
        default: [], 
    },
    bio: {
        type: String,
        default: "No bio provided.", 
    },
    aboutYou: {
        type: String,
        default: "Tell us about yourself.", 
    },
    professionalGoals: {
        type: String,
        default: "No goals specified.", 
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
