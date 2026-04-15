import express from "express";
import authMiddleware from "../middleware/auth";
import {
  testimonialDetails,
  testimonialUpload,
  textTestimonialUpload,
  spaceInsights,
  reanalyzeTestimonial,
  testCloudinary,
} from "../controller/testimonial";
import multer from "multer";
const upload = multer();

const router = express.Router();

// Video testimonial upload
router.post(
  "/videoupload/:link/:uploader",
  upload.single("video"),
  testimonialUpload
);

// Text testimonial upload
router.post("/textupload/:link", textTestimonialUpload);

// Get all testimonials for user
router.get("/testimonials", authMiddleware, testimonialDetails);

// Get insights for a specific space
router.get("/insights/:link", authMiddleware, spaceInsights);

// Re-analyze a testimonial
router.post("/reanalyze/:id", authMiddleware, reanalyzeTestimonial);

// Test Cloudinary credentials
router.get("/test-cloudinary", testCloudinary);

export default router;
