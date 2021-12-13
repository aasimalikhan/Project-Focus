const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    challengeCode: {
        type: Number
    },
    challengeName: {
        type: String
    },
    challengeDescription: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Challenge", challengeSchema)