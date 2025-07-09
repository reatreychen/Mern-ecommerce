const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet')
const morgen = require( 'morgan');
const connectDB = require('./config/connectDB')
const Router = require("./routes/api")

dotenv.config()

app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgen());
app.use(helmet({
    crossOriginResourcePolicy: false
}))


const PORT = 8080 || process.env.PORT ;
app.get("/",(req,res)=>{
    res.json({
        message : "Server is running " + PORT
    })
})

// routers
app.use('/api' , Router)


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})
