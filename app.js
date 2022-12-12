const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyparser = require('body-parser')
var jwt = require('jsonwebtoken');

const userRoute = require("./routes/user")
const PostRoute = require("./routes/posts")
const secret = "RESTAPI"



app.use(bodyparser.json())

app.use('/posts', (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.status(400).json({
                        message: "Not a Valid Token"
                    })
                }
                req.user = decoded.data;
                next()
            })
        } else {
            return res.status(401).json({
                message: "Token Missing"
            })
        }

    } else {
        return res.status(403).json({
            message: "Not Authenticated User"
        })
    }
})

app.use("/", userRoute);
app.use("/", PostRoute);


module.exports = app;