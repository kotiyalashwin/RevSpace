import express from "express";
import { newSpace, spaceDetails } from "../controller/space";
import authMiddleware from "../middleware/auth";

const router = express.Router();

//add userId as params in this request for AuthMiddleware
router.post("/newspace", authMiddleware, newSpace);
router.get("/:link/details", spaceDetails);

export default router;
