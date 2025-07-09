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


// routers
app.use('/api' , Router)

connectDB(()=>{
    console.log("db connection")
})
const PORT = 8080 || process.env.PORT ;
app.get("/",(req,res)=>{
    ///server to client
    res.json({
        message : "Server is running " + PORT
    })
})
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});