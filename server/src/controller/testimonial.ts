import { Response } from "express";
import { authReq } from "../middleware/auth";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import prisma from "../config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const testimonialUpload = async (req: authReq, res: Response) => {
  try {
    const { link } = req.params;
    const { uploader } = req.params;
    const path = `Testimonials/${req.user}/${link}/${uploader}/`;
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: path },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          res.json({ success: false, error: "Upload failed" });
          return;
        }

        if (result) {
          const upload = await prisma.testimonial.create({
            data: {
              email: uploader,
              v_url: result?.url,
              spaceId: link,
            },
          });

          res.json({
            success: true,
            message: "Successfully Uploaded Testimonial",
          });
        } else {
          res.json({ success: false, error: "Unable to upload Video" });
        }
      }
    );

    // Use streamifier to create a readable stream from the file buffer
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("Error processing upload:", error);
    // @ts-ignore
    res.json({ success: false, error: error.message });
  }
};

export const testimonialDetails = async (req: authReq, res: Response) => {
  const user = req.user;

  const details = await prisma.testimonial.findMany({
    where: {
      space: {
        userId: user,
      },
    },
    select: {
      id: true,
      email: true,
      v_url: true,
    },

    // where: { email: user },
    // select: {
    //   spaces: {
    //     select: {
    //       testimonials: {
    //         select: {
    //           id: true,
    //           email: true,
    //           v_url: true,
    //         },
    //       },
    //     },
    //   },
    // },
  });

  res.json(details);
};
