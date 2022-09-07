import express from 'express';
import { getUsers } from '../controllers/Productivity';

const router = express.Router();

router.get('/', getUsers);

export = router;
