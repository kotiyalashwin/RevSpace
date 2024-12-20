import { newUser } from "../validation";
import bcrypt from "bcrypt";
import prisma from "../config";
import { Request, Response } from "express";

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

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    res.json(`Welcome to RevSpace ${name}`);
  } catch (err) {
    console.error("Error Occurred : ", err);
  }
};
