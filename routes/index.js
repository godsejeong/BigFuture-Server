import { Router } from 'express';

import signHandler from './sign';
import userHandler from './user';
import capsuleHandler from './capsule';
import errorHandler from './error';

const router = Router();

router.use('/sign', signHandler);
router.use('/users', userHandler);
router.use('/capsules', capsuleHandler);
router.use(errorHandler);

export default router;