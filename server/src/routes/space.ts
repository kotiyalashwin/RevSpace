import express from "express";
import { bulkSpace, newSpace, spaceDetails } from "../controller/space";
import authMiddleware from "../middleware/auth";

const router = express.Router();

//add userId as params in this request for AuthMiddleware
router.post("/newspace", authMiddleware, newSpace);
router.get("/:link/details", spaceDetails);
router.get("/spaces", authMiddleware, bulkSpace);

export default router;
