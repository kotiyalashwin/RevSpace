import express from "express";
import {
  sessionValid,
  userLogOut,
  userSignin,
  userSignup,
} from "../controller/user";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userSignin);
router.post("/logout", userLogOut);
router.get("/session", authMiddleware, sessionValid);

export default router;
