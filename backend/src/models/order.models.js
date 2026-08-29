import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                id: {
                    type: String,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                },

                selected: {
                    type: Boolean,
                    default: true
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            default: "Arriving"
        }
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model("Order", orderSchema);