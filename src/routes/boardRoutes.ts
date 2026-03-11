import { Router } from 'express';
import { createBoard } from '../controllers/boardController.js';

const router = Router();
router.post('/', createBoard);
export default router;