
const {OAuth2Client} = require('google-auth-library');
const router = express.Router();

const client = new OAuth2Client("989704436454-csk7qq6vcu178n8g8potcdhhdc75l06p.apps.googleusercontent.com");

router.post('/logged', async(req,res) => {
    console.log('Solicitud recibida en el /auth/logged');

    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "989704436454-csk7qq6vcu178n8g8potcdhhdc75l06p.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();
        res.status(200).json({success: true});
    } catch (error) {
        res.status(401).json({success: false, error: 'Token no valido'});
    }
})

module.exports = router;