const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, "SECRET_KEY") ; // Use ENV variable
    req.user = decoded; // Attach user data to request

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  auth
}
