const express = require('express')
const {registerUser, loginUser,userHome} = require('../control/userControl')


const userRouter = express.Router()
const verifyToken=require("../middleware/validate")


userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/home').get(verifyToken,userHome)


module.exports = userRouter