import { Router } from 'express';

import signHandler from './sign';
import errorHandler from './error';

const router = Router();

router.use('/sign', signHandler);
router.use(errorHandler);

export default router;