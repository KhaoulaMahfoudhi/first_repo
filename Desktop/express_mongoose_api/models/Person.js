const mongoose = require("mongoose");

const personschema = mongoose.Schema({
    name: {type: String , required: true},
    age: Number,
    favoriteFoods: [String]
})

module.exports = Person =  mongoose.model("person", personschema )