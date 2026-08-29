import { Router } from "express";

import {
    createOrder,
    getOrders
} from "../controllers/order.controllers.js";

const router = Router();

router.route("/:userId")
    .post(createOrder)
    .get(getOrders);

export default router;