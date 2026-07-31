import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "./middlewares/auth.middleware.js";
import getCurrentUser from "./controllers/user.controller.js";
dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

// Express removes the mount path before proxying, so add it back for the auth service.
app.use("/api/auth", proxy(process.env.AUTH_SERVICE, {
  proxyReqPathResolver: (req) => `/auth${req.url}`,
}));

app.get('/api/me' , protect , getCurrentUser )
app.get("/", (req, res) => {
  res.send("Gateway is running");
} );

app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
