const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet')
const morgen = require( 'morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
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

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use(limiter);

// Enable compression
app.use(compression());

// CORS: allow multiple frontends (comma-separated in FRONTEND_URLS) and local dev
const allowAllCors = String(process.env.ALLOW_ALL_CORS || '').toLowerCase() === 'true'
const rawAllowed = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "").split(",")
  .map((s) => s.trim().replace(/\/$/, ""))
  .filter(Boolean)
// Always include localhost dev by default
if (!rawAllowed.length) {
  rawAllowed.push("http://localhost:5173")
}

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true) // allow server-to-server and tools
    const cleanOrigin = origin.replace(/\/$/, "")
    if (allowAllCors) return callback(null, true)
    if (rawAllowed.includes(cleanOrigin)) return callback(null, true)
    return callback(new Error("Not allowed by CORS"))
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
  ],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgen());
app.use(helmet({
    crossOriginResourcePolicy: false
}))
app.use(passport.initialize())


const PORT = 8080;
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
