import express from 'express';
import { getInactiveUsers } from '../controllers/Productivity';

const router = express.Router();

router.get('/', getInactiveUsers);

export = router;
