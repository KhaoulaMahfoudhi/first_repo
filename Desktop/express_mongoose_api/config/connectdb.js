const mongoose = require("mongoose");
const config = require("config");

const connectToDB = () =>{
    mongoose.connect(config.get("MONGO_URI"), { useNewUrlParser: true , useUnifiedTopology: true })
    .then(()=> console.log("mongoose connected"))
    .catch(()=> console.log("mongoose not connected"))
}
module.exports = connectToDB;