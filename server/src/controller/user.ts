import { newUser } from "../validation";
import bcrypt from "bcrypt";
import prisma from "../config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { success } = newUser.safeParse(req.body);

    if (!success) {
      throw new Error("Invalid Inputs");
    }

    const { email, password } = req.body;
    if (await prisma.user.findFirst({ where: { email: email } })) {
      throw new Error("User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const name = email.split("@")[0];

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("authCode", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json(`Welcome to RevSpace ${name}`);
  } catch (err) {
    console.error("Error Occurred : ", err);
  }
};

export const userLogOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authCode", {
      httpOnly: true,
      secure: true, // Use true if using HTTPS
      sameSite: "none",
    });
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Error Occured : ", err);
    throw new Error("Unable to LogOut");
  }
};
