const express = require("express");
const app = express();
const connectToDB = require("./config/connectdb")
const router = require("./routes/person")

// middleware for using body paser

app.use(express.json());
// router 
app.use("/people", router)

//connection to DB
connectToDB();




//conection server
const port = process.env.PORT || 5000;
app.listen(port , (error) =>{
    error ? console.log("Connection failed") : console.log(`Server is running on port: ${port}`);
});