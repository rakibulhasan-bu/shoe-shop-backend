import { Request, Response } from "express";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import { cartService } from "./cart.service";

const createCart = CatchAsyncError(async (req: Request, res: Response) => {
  const cart = req.body;

  const isCartExist = await cartService.getCartByTitle(cart?.title);
  if (isCartExist) {
    const result = await cartService.updateCartWithQuantityAndTotal(
      cart,
      isCartExist?.quantity
    );
    res.status(200).json({
      success: true,
      message: "Cart Added successfully!",
      data: result,
    });
  }
  const result = await cartService.creteCartService(cart);

  res.status(201).json({
    success: true,
    message: "Cart added successfully!",
    data: result,
  });
});

const deleteCart = CatchAsyncError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const isCartExist = await cartService.getCartByID(id);
  if (!isCartExist) {
    res.status(400).json({
      success: false,
      message: "Cart not found!",
      data: null,
    });
  }
  const result = await cartService.deleteCart(id);

  res.status(201).json({
    success: true,
    message: "Cart deleted successfully!",
    data: result,
  });
});

export const cartController = { createCart, deleteCart };
