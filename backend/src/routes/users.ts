import express from 'express';
import { getUsers } from '../controllers/users/users';

const router = express.Router();

router.get('/', getUsers);

export = router;
