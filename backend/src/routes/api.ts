import Router, { Request, Response } from 'express';
import productivityRoutes from './productivity';
import userRoutes from './users';
import workOrderRoutes from './workOrders';

const router = Router();

router.use('/workorders', workOrderRoutes);
router.use('/productivity', productivityRoutes);
router.use('/users', userRoutes);

/** Health Check */
router.get('/ping', (req: Request, res: Response) => res.status(200).json({ message: 'pong' }));

export = router;
