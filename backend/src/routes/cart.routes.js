import { Router } from "express";

import {
    saveCart,
    getCart
} from "../controllers/cart.controllers.js";

const router = Router();

router.route("/:userId")
    .put(saveCart)
    .get(getCart);

export default router;