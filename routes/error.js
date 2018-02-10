import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
    const err = new Error('NOT_FOUND');
    err.status = 404;
    next(err);
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        status: { success: false, message: err.message }
    });
});

export default router;