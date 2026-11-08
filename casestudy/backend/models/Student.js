const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    department: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },

    section: {
        type: String,
        required: true
    },

    cgpa: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    }

}, { timestamps: true });

studentSchema.index({ department: 1 });

module.exports = mongoose.model("Student", studentSchema);