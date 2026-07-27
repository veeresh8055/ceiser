import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/auth" , proxy( process.env.AUTH_SERVICE));

app.get("/", (req, res) => {
  res.send("Gateway is running");
} );

app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
