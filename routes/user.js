const router = require('express').Router();
var jwt = require('jsonwebtoken');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const secret = "RESTAPI"

// router.get("/", async (req, res) => {
//     try {
//         const users = await User.find()
//         res.status(200).send(users)

//     } catch (e) {
//         res.status(400).send(e.message)
//     }
// })
// router.get("/:id", async (req, res) => {
//     const _id = req.params.id
//     try {
//         const users = await User.findById(_id)
//         res.status(200).send(users)

//     } catch (e) {
//         res.status(400).send(e.message)
//     }
// })
router.post("/register"
    , body('name').isAlpha()
    , body('email').isEmail()
    , body('password').isLength({ min: 5, max: 16 })
    , async (req, res) => {
        try {
            const { name, email, password } = req.body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({
                    "errors": errors.array()
                })
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        "message": err.message,
                    })
                }
                const user = await User.create({
                    name: name,
                    email: email,
                    password: hash
                })
                return res.status(200).json({
                    "message": "User Created Successfully",
                    "User": user
                })
            })

        } catch(e) {
            return res.status(400).json({
                message: e.message
            })
        }
    })

router.post("/login"
    , body('email').isEmail()
    , async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({
                    "errors": errors.array()
                })
            }
            const { email, password } = req.body
            let isuser = await User.findOne({ email })
            if (!isuser) {
                return res.status(400).json({
                    message: "No User Found with Given Mail-ID"
                })
            } bcrypt.compare(password, isuser.password, function (err, result) {
                if (err) {
                    return res.status(500).json({
                        "message": err.message,
                    })
                }
                if (result) {

                  const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: isuser._id
                      }, secret);

                    return res.status(200).json({
                        message: "Login SuccessFull",
                        token
                    })
                } else {
                    return res.status(400).json({
                        message: "Login Failed Invalid Credentials"
                    })
                }
            });

        } catch (e) {
            res.status(400).json({
                message: e.message
            })
        }
    })


module.exports = router;