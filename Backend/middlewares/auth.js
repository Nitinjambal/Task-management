import jwt from "jsonwebtoken"
import { User } from "../models/user.js";


export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(404).json({
                success: false,
                message: "Login First"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(404).json({
            success: false,
            error,
        })
    }
}