const jwt = require('jsonwebtoken')
const authToken = async (req,res,next) =>{
    try {
        const token = req.cookies.access_token || req.headers.authorization.split(" ")[1]
        console.log("token" , token)
        if (!token) {
            res.status(401).json({
                message: "Provide token",
                error: true,
                success: false,
            });
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        console.log("decoded" , decoded)
        if (!decoded) {
            res.status(401).json({
                message: "Token verification failed",
                error: true,
                success: false,
            });
        }
        req.userId = decoded.id
        next()
    }catch (error) {
        res.status(401).json({
            message: "Invalid token",
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;