import { Router } from 'express';
import { getHealthcheck } from '../controllers/healthcheck.controller.js';

const router = Router();

router.get('/healthcheck', getHealthcheck);

export default router;
