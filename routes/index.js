import { Router } from 'express';

import helloRouter from './hello';
import errorHandler from './error';

const router = Router();

router.use('/hello', helloRouter);
router.use(errorHandler);

export default router;