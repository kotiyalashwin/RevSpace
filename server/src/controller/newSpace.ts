import { Request, Response } from "express";
import { newSpaceSchema } from "../validation";
import prisma from "../config";
import { v4 as uuidv4 } from "uuid";

export const newSpace = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { success } = newSpaceSchema.safeParse(body);
    const link = `${uuidv4()}`;

    if (!success) {
      res.status(500).json({ error: "Invalid Inputs" });
    }

    const { spaceName, description, spaceMetadata } = body;

    try {
      const response = await prisma.space.create({
        data: {
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

      res.json("Successfully added new space");
    } catch {
      res.status(503).json("Unable to add new space");
    }
  } catch {
    res.status(503).json("Function Error");
  }
};
