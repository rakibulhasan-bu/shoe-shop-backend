import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { cartController } from "./cart.controller";
import { cartValidationSchema } from "./cart.validation";

const route = express.Router();

route.post(
  "/cart",
  validateRequest(cartValidationSchema),
  cartController.createCart
);

route.delete("/cart/:id", cartController.deleteCart);

export const cartRoute = route;
