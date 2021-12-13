const mongoose = require('mongoose');
const Pomodoro = require('../models/pomodoroModel')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/mainstreammedia/image/upload/v1635014828/user_j3wira.png"
    },
    PomodoroSessions: [{ type: mongoose.Schema.ObjectId, ref: 'Pomodoro' }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)