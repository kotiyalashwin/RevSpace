import express from "express";
import spaceRoute from "./routes/space";
import userRoute from "./routes/user";
require("dotenv").config();
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/space", spaceRoute);
app.use("/api/v1/user", userRoute);

app.listen(3000, () => {
  console.log("Running Backend");
});
