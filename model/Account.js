const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    username: String
})

const AccountModel = mongoose.model("myUsers",schema);

module.exports = AccountModel;