import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDb from "./config/db.js";
dotenv.config();

// Routes
import aiRouter from "./routes/aiRoutes.js";
import authRouter from "./routes/auth.routes.js";
import couponRoutes from "./routes/coupon.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";
import shopRouter from "./routes/shop.routes.js";
import userRouter from "./routes/user.routes.js";

// Socket
import { socketHandler } from "./socket.js";

// -------------------
// FRONTEND ORIGINS
// -------------------
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["https://eight-vingo-2.onrender.com", "http://localhost:5173"];

// -------------------
// EXPRESS APP
// -------------------
const app = express();
const server = http.createServer(app);

// -------------------
// SOCKET.IO SETUP
// -------------------
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

// -------------------
// MIDDLEWARES
// -------------------
app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// -------------------
// ROUTES
// -------------------
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);
app.use("/api/ai", aiRouter);
app.use("/api/coupon", couponRoutes);

// -------------------
// SOCKET HANDLER
// -------------------
socketHandler(io);

// -------------------
// START SERVER
// -------------------
const port = process.env.PORT || 5000;
server.listen(port, async () => {
  await connectDb();
  console.log(`Server started at port ${port}`);
  console.log(`✅ Allowed frontend origins: ${allowedOrigins.join(", ")}`);
  console.log(`✅ AI Routes registered at /api/ai`);
});
