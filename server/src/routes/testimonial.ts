import express, { Response } from "express";
import authMiddleware, { authReq } from "../middleware/auth";
import {
  testimonialDetails,
  testimonialUpload,
} from "../controller/testimonial";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.post(
  "/videoupload/:link/:uploader",
  authMiddleware,
  upload.single("video"),
  testimonialUpload
);

router.get("/testimonials", authMiddleware, testimonialDetails);

export default router;
