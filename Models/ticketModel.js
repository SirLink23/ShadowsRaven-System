const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    userID: String,
    ticketID: String,
    channelID: String,
    status: String,
    typeofTicket: String,
    staff: {
        "type": String,
        "default": "None"
    },
    isTaken: {
        "type": Boolean,
        "default": false
    },
    dateOpen: String
})

module.exports = mongoose.model("Ticket", ticketSchema);