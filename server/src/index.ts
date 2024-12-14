import express from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.post("/api/v1/space", async (req, res) => {
  try {
    const link = `${uuidV4()}`;

    // res.json({
    //   message: "Space Created successfully",
    // });
  } catch {
    console.error("unable to add user");
  }
});

app.listen(3000, () => {
  console.log("Running Backend");
});
