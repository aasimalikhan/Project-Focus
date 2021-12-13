const mongoose = require('mongoose');

const pomodoroSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
    },
    sessiontime: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Pomodoro", pomodoroSchema)