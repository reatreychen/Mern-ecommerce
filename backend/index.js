const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet')
const morgen = require( 'morgan');
const connectDB = require('./config/connectDB')
const passport = require('./config/passport')
const passportGoogleApi = require('./routes/passportGoogleApi')
const userRouter = require("./routes/userApi")
const categoryRouter = require("./routes/categoryApi")
const subCategoryRouter = require("./routes/subCategoryApi")
const productRouter = require("./routes/productApi")
const cartRouter = require("./routes/cartApi")
const addressRouter = require("./routes/adressApi")
const orderRouter = require("./routes/orderApi")
const uploadRouter = require("./routes/uploadApi")
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
app.use(passport.initialize())


const PORT = 8080 || process.env.PORT ;
app.get("/",(req,res)=>{
    res.json({
        message : "Server is running " + PORT
    })
})

// routers
app.use('/api/user' , userRouter)
app.use('/api/passport', passportGoogleApi)
// Also mount at root so http://localhost:8080/google/callback works
app.use('/', passportGoogleApi)
// Keep Google routes under /api/passport only
app.use('/api/category' , categoryRouter)
app.use('/api/product' , productRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/address' , addressRouter)
app.use('/api/order' , orderRouter)
app.use('/api/sub-category' , subCategoryRouter)
app.use('/api/upload' , uploadRouter)


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})
