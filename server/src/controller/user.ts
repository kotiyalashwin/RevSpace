import { loginUser, newUser } from "../validation";
import bcrypt from "bcrypt";
import prisma from "../config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authReq } from "../middleware/auth";

export const userSignup = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
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
        email: true,
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

    res.json({ message: `Welcome to RevSpace ${name}`, success: true });
  } catch (err) {
    res.json({ error: `${err}`, success: false });
    // console.error("Error Occurred : ", err);
  }
};

export const userSignin = async (req: Request, res: Response) => {
  try {
    const { success } = loginUser.safeParse(req.body);

    if (!success) {
      throw new Error("Invalid Inputs");
    }

    const { email, password } = req.body;

    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!exist) {
      throw new Error("Invalid Credentials");
    }

    const decodedPassword = await bcrypt.compare(password, exist.password);

    if (!decodedPassword) {
      throw new Error("Invaid Credentials");
    }

    const token = jwt.sign(
      { user: exist.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("authCode", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ success: true, message: `Welcome back ${exist.name}` });
  } catch (err) {
    res.json({ error: `${err}`, success: false });
  }
};

export const userLogOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authCode", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Error Occured : ", err);
    throw new Error("Unable to LogOut");
  }
};

export const sessionValid = (req: authReq, res: Response) => {
  if (res.locals.isAuthenticated) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(201).json({ isAuthenticated: false });
  }
};
