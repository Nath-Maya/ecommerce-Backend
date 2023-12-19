import { Router } from 'express';
import authorization from '../middlewares/auth.middleware.js';
import  passportCall  from '../utils/utils.js';

const router = Router();

router.get('/private', passportCall("jwt"), authorization('admin'), (req, res) => {
	res.json({ message: 'Private route' });
});

export default router;