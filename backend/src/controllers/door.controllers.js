import { DoorEvent } from "../models/door.event.model.js";

// Create a door event - called by the HID reader board on every card
// read (granted or denied)

const createDoorEvent = async (req, res) => {

    try {

        const { deviceId, cardId, granted } = req.body;

        if (!deviceId || !cardId || typeof granted !== "boolean") {
            return res.status(400).json({
                message: "deviceId, cardId, and granted (boolean) are required"
            });
        }

        const event = await DoorEvent.create({ deviceId, cardId, granted });

        res.status(201).json({
            message: "Door event recorded",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message,
            stack: error.stack
        });
    }
};

// Recent history (optionally filtered by deviceId, capped by ?limit=) -
// for a future dashboard / access log view

const getDoorHistory = async (req, res) => {

    try {

        const { deviceId, limit } = req.query;
        const filter = deviceId ? { deviceId } : {};

        const events = await DoorEvent.find(filter)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit) || 100);

        res.status(200).json(events);

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message,
            stack: error.stack
        });
    }
};

export {
    createDoorEvent,
    getDoorHistory
};
