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
        default: "Anonymous", // Default value for name
    },
    phoneNumber: {
        type: String,
        default: "Not Provided", // Default value for phone number
    },
    location: {
        type: String,
        default: "Not Specified", // Default value for location
    },
    dateOfBirth: {
        type: Date,
        default: null, // Default value for date of birth
    },
    nationality: {
        type: String,
        default: "Not Specified", // Default value for nationality
    },
    languages: {
        type: [String],
        default: [], // Default value for languages (empty array)
    },
    currentPosition: {
        type: String,
        default: "Unemployed", // Default value for current position
    },
    workExperience: {
        type: String,
        default: "No Experience", // Default value for work experience
    },
    education: {
        type: String,
        default: "Not Specified", // Default value for education
    },
    skills: {
        type: [String],
        default: [], // Default value for skills (empty array)
    },
    bio: {
        type: String,
        default: "No bio provided.", // Default value for bio
    },
    aboutYou: {
        type: String,
        default: "Tell us about yourself.", // Default value for about you
    },
    professionalGoals: {
        type: String,
        default: "No goals specified.", // Default value for professional goals
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
