import { Router } from 'express';
import userRouter from './userRoutes.js';
import boardRouter from './boardRoutes.js';
import columnRouter from './columnRoutes.js';
import cardRouter from './cardRoutes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/boards', boardRouter);
router.use('/columns', columnRouter);
router.use('/cards', cardRouter);

export default router;