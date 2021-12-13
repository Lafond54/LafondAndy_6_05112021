const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // On décode le Token
    const decodedToken = jwt.verify(token, process.env.RTOKEN);

    // Récuper le UserId qu'on a encodé dans l'objet decodedToken
    const userId = decodedToken.userId;

    // Si jamais on a UserID dans le corps de la réquête et que celui ci est différent de l'UserId -> Invalid Id
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

