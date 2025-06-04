import mongoose, { Schema } from "mongoose";

const achievementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: "Untitled Achievement"
    },
    description: {
        type: String,
        default: "No description provided."
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Achievement = mongoose.models.achievements || mongoose.model('achievements', achievementSchema);

export default Achievement;