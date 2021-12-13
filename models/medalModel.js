const mongoose = require('mongoose');

const medalSchema = new mongoose.Schema({
    medalname: {
        type: String,
    },
    medaldetails: [String],
    icon: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Medal", medalSchema)