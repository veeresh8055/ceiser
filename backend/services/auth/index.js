import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import AuthRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth" ,AuthRouter);


app.get("/", (req, res) => {
  res.send("Auth Service is running");
});

app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
  connectDB();
});
