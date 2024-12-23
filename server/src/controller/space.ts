import { Request, Response } from "express";
import { newSpaceSchema } from "../validation";
import prisma from "../config";
import { v4 as uuidv4 } from "uuid";
import { authReq } from "../middleware/auth";

export const newSpace = async (req: authReq, res: Response) => {
  try {
    const body = req.body;
    const { success } = newSpaceSchema.safeParse(body);
    const link = `${uuidv4()}`;

    if (!success) {
      res.status(500).json({ error: "Invalid Inputs" });
      return;
    }

    const { spaceName, description, spaceMetadata } = body;

    try {
      const response = await prisma.space.create({
        data: {
          userId: req.user ? req.user : "",
          spacename: spaceName,
          description: description,
          link: link,
          metadata: {
            create: {
              formfields: spaceMetadata.formFields,
            },
          },
        },
      });

      res.json({ message: "Successfully added new space", success: true });
    } catch {
      res.json({ error: "Unable to add new space", success: false });
    }
  } catch {
    res.status(503).json("New Space Function Error");
  }
};

export const spaceDetails = async (req: Request, res: Response) => {
  try {
    const { link } = req.params;

    if (!link) {
      res.json(403).json("Invalid Request");
      return;
    }

    const spaceDetails = await prisma.space.findUnique({
      where: { link: link },
      select: {
        metadata: {
          select: {
            formfields: true,
          },
        },
      },
    });

    res.json({
      success: true,
      spaceDetails: spaceDetails?.metadata?.formfields,
    });
  } catch {
    res.status(503).json("Space Details Function Error");
  }
};

export const bulkSpace = async (req: authReq, res: Response) => {
  try {
    const { user }: any = String(req.user);

    const spaces = await prisma.space.findMany({
      where: { userId: user },
      select: { spacename: true, description: true, link: true },
    });

    if (!spaces) {
      res.json({ succes: true, message: "No spaces found" });
      return;
    }

    res.json({ success: true, spaces: spaces });
  } catch {
    res.json({ sucess: false });
  }
};
