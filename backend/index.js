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
    origin:  process.env.FRONTEND_URL, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));  

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
const port = 3000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});