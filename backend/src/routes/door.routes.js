import { Router } from 'express';
import { createDoorEvent, getDoorHistory } from '../controllers/door.controllers.js';
import { deviceAuthMiddleware } from '../middleware/device.auth.middleware.js';

const router = Router();

router.route('/event').post(deviceAuthMiddleware, createDoorEvent); // ESP32 posts here
router.route('/history').get(getDoorHistory);                       // dashboard reads here

export default router;
