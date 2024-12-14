import express from "express";
import prisma from "../config";
import { newSpace, spaceDetails } from "../controller/space";

const router = express.Router();

//add userId as params in this request for AuthMiddleware
router.post("/newspace", newSpace);
router.get("/:link/details", spaceDetails);

export default router;
