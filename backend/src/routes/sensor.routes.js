import { Router } from 'express';
import { createSensorReading, getLatestSensorReading, getSensorHistory } from '../controllers/sensor.controllers.js';
import { deviceAuthMiddleware } from '../middleware/device.auth.middleware.js';

const router = Router();

router.route('/report').post(deviceAuthMiddleware, createSensorReading); // ESP32 posts here
router.route('/latest').get(getLatestSensorReading);                     // display/dashboard polls here
router.route('/history').get(getSensorHistory);                          // dashboard reads here

export default router;
