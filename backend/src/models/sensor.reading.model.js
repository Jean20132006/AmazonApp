import mongoose, { Schema } from "mongoose";

const sensorReadingSchema = new Schema(

    {
        deviceId: {
            type: String,
            required: true,
            trim: true
        },

        temperatureC: {
            type: Number
        },

        humidityPct: {
            type: Number
        },

        pressureHpa: {
            type: Number
        },

        airQualityIndex: {
            type: Number
        }

    },

    {
        timestamps: true
    }
);


// Automatically deletes documents once they're older than this - keeps
// storage bounded while still preserving enough history to graph. Adjust
// the window to whatever you actually want to look back on.
sensorReadingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 }); // 7 days

export const SensorReading = mongoose.model('SensorReading', sensorReadingSchema);
