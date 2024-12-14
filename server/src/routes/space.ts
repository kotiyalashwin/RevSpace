import express from "express";
import prisma from "../config";
import { newSpace } from "../controller/newSpace";

const router = express.Router();

//add userId as params in this request for AuthMiddleware
router.post("/newspace", newSpace);

export default router;
