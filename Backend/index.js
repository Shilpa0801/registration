const express = require('express')
const cors = require('cors')

const mysql=require('mysql')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended:true}))
app.use(express.json())

const db=require('./model/dbConnect')
db
const userRouter=require('./route/userRouter')
app.use('/',userRouter)
app.listen(process.env.PORT,()=>{
    console.log('server is running on http://localhost:8000');
})

module.exports=db