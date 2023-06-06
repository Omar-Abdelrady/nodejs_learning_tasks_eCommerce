import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

const route = express.Router();

route.get("/", getProducts);

route.get("/:id", getProductById);

export default route;
