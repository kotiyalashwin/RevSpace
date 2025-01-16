import express from "express";
import spaceRoute from "./routes/space";
import userRoute from "./routes/user";
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import testimonialRoute from "./routes/testimonial";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://revspace.woksh.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/space", spaceRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/testimonial", testimonialRoute);

app.listen(PORT, () => {
  console.log("Running Backend");
});
