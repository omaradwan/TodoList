require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express");
const cors = require("cors");  // used to connect between front and back in browser instead of using extension
const app = express();
//const path = require('path');

const listRoutes = require("./routes/lists")
const users = require("./routes/auth");
const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log("connected");
})
app.use(cors());
app.use(express.json());



app.use(listRoutes);

app.use(users);


// Global error handler
app.use(function (err, req, res, next) {
    res.status(400).json({message: err.message})
  })



app.listen(process.env.PORT,()=>{
    console.log("here");
});
