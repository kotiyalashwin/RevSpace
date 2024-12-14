import express from "express";
import spaceRouter from "./routes/space";

const app = express();
app.use(express.json());
app.use("/api/v1/space", spaceRouter);

app.listen(3000, () => {
  console.log("Running Backend");
});
