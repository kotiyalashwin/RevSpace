import { NextFunction, Request, Response } from "express";
import prisma from "../config";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.cookies.authCode;
    if (!authToken) {
      res.status(403).json({ error: "Not authenticated", success: false });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string);
    console.log(decoded);

    // next();
  } catch {}
};

export default authMiddleware;
