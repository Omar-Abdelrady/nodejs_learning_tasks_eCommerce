import connectDB from "./config/db.js";
import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 6000, () => {
  console.log("");
});
