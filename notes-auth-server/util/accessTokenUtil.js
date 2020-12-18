import jwt from 'jsonwebtoken';

function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return res.send(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.body.user = user;
        next();
    });
}

function simulateAuthenticateAccessToken(req, res, next) {
    
    next(); 
}

export { authenticateAccessToken }