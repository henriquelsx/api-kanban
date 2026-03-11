import { Router } from 'express';
import { createColumn } from '../controllers/columnController.js';

const router = Router();
router.post('/', createColumn);
export default router;