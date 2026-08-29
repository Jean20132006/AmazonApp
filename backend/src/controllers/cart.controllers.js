

/*const saveCart = async (req, res) => {

    try {

        const { userId } = req.params;

        const { items } = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({
                message: "Items must be an array"
            });
        }

        const cart =
            await Cart.findOneAndUpdate(
                {
                    user: userId
                },
                {
                    items
                },
                {
                    new: true,
                    upsert: true                     // Update if found, otherwise create
                }
            );

        res.status(200).json({
            success: true,
            message: "Cart saved successfully",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};*/

/*const getCart = async (req, res) => {

    try {

        const { userId } = req.params;

        const cart = await Cart.findOne({user: userId});

         if (!cart) {

            return res.status(200).json({
                cart: {
                    items: []
                }
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};*/

import { Cart } from "../models/cart.models.js";
const saveCart = async (req, res) => {

    try {

        const { userId } = req.params;
        const { items } = req.body;

        console.log("=== saveCart reached ===");
        console.log("params:", req.params);
        console.log("body:", req.body);

        console.log("Incoming items:", items);

        let cart = await Cart.findOne({ user: userId });
        console.log("cart found:", cart);

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: items || []
            });
        } else {
            cart.items = items || [];
            await cart.save();
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: []
            });
        }

        res.status(200).json({
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export {
    saveCart,
    getCart
};