import express from "express";
import { userLogOut, userSignup } from "../controller/user";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/logout", userLogOut);

export default router;
