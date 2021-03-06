const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'secret');
    req.userData = { 
      username: decodedToken.username,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email, 
      userId: decodedToken.userId, 
      isAdmin: decodedToken.isAdmin 
    };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "You are not authenticated!" });
  }
};
