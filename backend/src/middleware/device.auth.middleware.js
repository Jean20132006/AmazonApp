import "dotenv/config";

// Separate from authMiddleware (that one's for human users with JWT
// sessions). Devices can't do an interactive login flow, so this checks
// a static shared-secret header instead - simpler, and appropriately
// scoped to "trusted devices on my own network" rather than arbitrary
// human users. Every ESP32 board sends the same key in an
// "X-Device-Key" header on every request to a device-only route.
export const deviceAuthMiddleware = (req, res, next) => {

    try {

        const deviceKey = req.headers["x-device-key"];

        if (!deviceKey || deviceKey !== process.env.IOT_DEVICE_KEY) {
            return res.status(401).json({
                message: "Unauthorized device"
            });
        }

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Unauthorized device"
        });
    }
};
