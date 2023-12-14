const {OAuth2Client} = require('google-auth-library');

const verifyTokenMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({success: false, error: 'Token no proporcionado'});
    }

    try {
        const cleanedToken = token.replace('Bearer ', '');

        const ticket = await client.verifyIdToken({
            idToken: cleanedToken,
            audience: "989704436454-csk7qq6vcu178n8g8potcdhhdc75l06p.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        
        req.user = payload;

        next();
        
    } catch (error) {
        res.status(401).json({success: false, error: 'Token no valido'});
    }
};

module.exports = verifyTokenMiddleware;
