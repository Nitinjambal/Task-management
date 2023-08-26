import express from "express";
import { LoginUser, Logout, RegisterNewUser, getAllUsers, getUserProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


//get all users (read)
router.get("/all", getAllUsers);

//new user (create)
router.post("/register", RegisterNewUser);

//login user
router.post("/login", LoginUser);

//logout user
router.get("/logout", Logout);

//get User-Profile
router.get("/MyProfile", isAuthenticated, getUserProfile);

export default router;
