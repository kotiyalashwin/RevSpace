import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../config";

export interface authReq extends Request {
  user?: string;
}

const authMiddleware = async (
  req: authReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.cookies.authCode;
    console.log("Token from cookies:", authToken);
    if (!authToken) {
      res.status(403).json({ error: "Not authenticated", success: false });
      return;
    }

    const decoded = jwt.verify(
      authToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const valid = await prisma.user.findFirst({
      where: {
        email: decoded.user,
      },
    });

    if (!valid) {
      res.status(403).json({ error: "Not Authenticated", success: false });
      return;
    }
    req.user = decoded.user;
    res.locals.isAuthenticated = true;
    next();
  } catch {}
};

export default authMiddleware;
