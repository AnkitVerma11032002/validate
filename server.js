const express=require("express")
const app=express()
const user=require("./routes/user.js")
const {connectDB}=require('./db.js')
const bodyParser = require("body-parser")


//Middlewares

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))


//connection
connectDB()


//routes
app.use('/user',user);

app.listen(8001,()=>{console.log("Server Started at prot 8001")})