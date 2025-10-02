import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "No user found" });

    req.user = { id: user._id, name: user.name };
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Please login" });
  }
};

export default middleware;
