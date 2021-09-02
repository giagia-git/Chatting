const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb+srv://giap92446:123456@cluster0.3cwko.mongodb.net/Database?retryWrites=true&w=majority",function() {
    console.log("Connect database success!");
}); 