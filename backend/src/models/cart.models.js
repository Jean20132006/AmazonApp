import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        items: [
            {
                id: {
                    //type: mongoose.Schema.Types.ObjectId,
                    type: String,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                },

                selected: {
                    type: Boolean,
                    default: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Cart = mongoose.model(
    "Cart",
    cartSchema
);