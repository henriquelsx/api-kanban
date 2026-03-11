import { Router } from 'express';
import { createCard, moveCard } from '../controllers/cardController.js';

const router = Router();
router.post('/', createCard);
router.patch('/:id/move', moveCard); 
export default router;