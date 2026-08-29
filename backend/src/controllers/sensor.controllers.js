import { SensorReading } from "../models/sensor.reading.model.js";

// Create a sensor reading - called by the HID reader board's
// sensor_reporter.c every ~10s

const createSensorReading = async (req, res) => {

    try {

        const { deviceId, temperatureC, humidityPct, pressureHpa, airQualityIndex } = req.body;

        if (!deviceId) {
            return res.status(400).json({
                message: "deviceId is required"
            });
        }

        const reading = await SensorReading.create({
            deviceId,
            temperatureC,
            humidityPct,
            pressureHpa,
            airQualityIndex
        });

        res.status(201).json({
            message: "Sensor reading recorded",
            reading
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message,
            stack: error.stack
        });
    }
};

// Latest reading (optionally filtered by deviceId) - for the CrowPanel
// display (or any dashboard) to poll

const getLatestSensorReading = async (req, res) => {

    try {

        const { deviceId } = req.query;
        const filter = deviceId ? { deviceId } : {};

        const reading = await SensorReading.findOne(filter).sort({ createdAt: -1 });

        if (!reading) {
            return res.status(404).json({
                message: "No sensor readings found"
            });
        }

        res.status(200).json(reading);

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message,
            stack: error.stack
        });
    }
};

// Recent history (optionally filtered by deviceId, capped by ?limit=) -
// for a future dashboard chart

const getSensorHistory = async (req, res) => {

    try {

        const { deviceId, limit } = req.query;
        const filter = deviceId ? { deviceId } : {};

        const readings = await SensorReading.find(filter)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit) || 100);

        res.status(200).json(readings);

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message,
            stack: error.stack
        });
    }
};

export {
    createSensorReading,
    getLatestSensorReading,
    getSensorHistory
};
