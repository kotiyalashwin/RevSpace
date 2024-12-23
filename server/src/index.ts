import express from "express";
import spaceRoute from "./routes/space";
import userRoute from "./routes/user";
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import testimonialRoute from "./routes/testimonial";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/space", spaceRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/testimonial", testimonialRoute);

app.listen(3000, () => {
  console.log("Running Backend");
});
