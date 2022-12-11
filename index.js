const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyparser = require('body-parser')
// const jwt = require('jsonwebtoken');
const port = 3000
mongoose.connect("mongodb://localhost/Smedia")
app.use(bodyparser.json())
const userRoute = require("./routes/user")



app.use("/", userRoute);



app.listen(port , ()=>console.log(`Server is Running at Port => ${port}`))