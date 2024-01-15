const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    id: String,
    guildID: String,
    username: String,
    tag: String,
    xp: {
        "type": Number,
        "default": 1
    },
    level: {
        "type": Number,
        "default": 1
    },
    xpTotal: {
        "type": Number,
        "default": 1
    },
    xpNeeded: {
        "type": Number,
        "default": 500
    },
    messages: {
        "type": Number,
        "default": 0
    },
    rank: {
        "type": Number,
        "default": 0
    }
})

module.exports = mongoose.model("Member", memberSchema);