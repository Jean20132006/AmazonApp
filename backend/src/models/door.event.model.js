import mongoose, { Schema } from "mongoose";

const doorEventSchema = new Schema(

    {
        deviceId: {
            type: String,
            required: true,
            trim: true
        },

        cardId: {
            type: String,
            required: true,
            trim: true
        },

        granted: {
            type: Boolean,
            required: true
        }

    },

    {
        timestamps: true
    }
);

export const DoorEvent = mongoose.model('DoorEvent', doorEventSchema);
