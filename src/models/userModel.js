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
        required: [true, "Please Provide your Name"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please Provide your Phone Number"],
    },
    location: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    nationality: {
        type: String,
    },
    languages: {
        type: [String],
    },
    currentPosition: {
        type: String,
    },
    workExperience: {
        type: String,
    },
    education: {
        type: String,
    },
    skills: {
        type: [String],
    },
    bio: {
        type: String,
    },
    aboutYou: {
        type: String,
    },
    professionalGoals: {
        type: String,
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
