const jwt = require("jsonwebtoken");

const IGNORED_ROUTES = [
    "/auth/login",
    "/auth/register",
    "/auth/token",
    "/players-list",
    "/products-list"
]

function authMiddleware(req, res, next) {
    if(IGNORED_ROUTES.includes(req.url)) {
        return next();
    }

    const accessToken = req.headers["authorization"]
    if(!accessToken) {
        return res.status(401).send({
            error: "Authorization header is not present!"
        })
    }

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        req.user = payload;
    } catch (error) {
        return res.status(401).send({error: error.message})
    }

    next(); 
}

module.exports = authMiddleware;