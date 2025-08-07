const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema({
    me: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    theOtherPerson: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    lastMessageId: {
        type: mongoose.Types.ObjectId,
        ref: "messages",
        default: null
    },
    containsFiles: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

schema.plugin(paginate);

const chatsModel = mongoose.model("chats", schema);


module.exports = chatsModel;