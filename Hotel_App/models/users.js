const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Surname: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("User", UserSchema);