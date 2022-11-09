import jwt from 'jsonwebtoken';

const SECRET = 'teste';

function VerifyToken(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return next();
  });
}

export default VerifyToken;
