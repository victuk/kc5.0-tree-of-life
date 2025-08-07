const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    otpToken: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    purpose: {
        type: String,
        enum: ["verify-email", "reset-password"],
        required: true
    }
}, {timestamps: true});

schema.plugin(paginate);

const otpModel = mongoose.model("otps", schema);


module.exports = otpModel;