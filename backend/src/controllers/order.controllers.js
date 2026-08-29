import { Order } from "../models/order.models.js";

const createOrder = async (req, res) => {

    try {

        const { userId } = req.params;

        const {
            items,
            totalAmount
        } = req.body;

        const order = await Order.create({
                user: userId,
                items,
                totalAmount
            });

        res.status(201).json({
            success: true,
            message: "Order created",
            orderId: order._id,
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getOrders = async (req, res) => {

    try {

        const { userId } = req.params;

        const { from, to } = req.query;

        const orders = await Order.find({
            user: userId,
            createdAt: {
                $gte: new Date(from),
                $lte: new Date(to)
            }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    createOrder,
    getOrders
};