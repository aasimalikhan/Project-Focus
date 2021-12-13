const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issueName: {
        type: String,
    },
    email: {
        type: String,
    },
    issueType: {
        type: String,
    },
    issueDescription: {
        type: String
    },
    issueHandled: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Issue", issueSchema)