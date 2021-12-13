const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    announcementtype: {
        type: String,
    },
    email: {
        type: String,
    },
    announcementname: {
        type: String,
    },
    announcementdescription: {
        type: String
    },
    date: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Announcement", announcementSchema)